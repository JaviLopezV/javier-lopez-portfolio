# UI Component Audit

## Scope and methodology

This audit covers all authored application files under `app/` and the supporting project configuration, i18n files, global styles, and package manifest. Generated output in `.next/`, dependencies in `node_modules/`, and the static Open Graph image are not treated as source UI. No application code was changed as part of the audit.

The project is a small Next.js 15 App Router application using React 19, Material UI 7, Emotion, and `next-intl`. There is no dedicated `components/` or theme directory. Most of the reusable UI currently exists as inline JSX and repeated `sx` objects in route files.

Classification:

- **A. GENERIC**: reusable without project/domain knowledge and a clear candidate for `my-ui-library`.
- **B. GENERIC-WITH-REFACTOR**: potentially reusable, but coupled to portfolio data, routing, translations, or page structure.
- **C. PROJECT-SPECIFIC**: expresses portfolio content or a domain-specific visual and should remain in this project.

Complexity is an estimate of the extraction effort: **Low**, **Medium**, or **High**.

## Current component inventory

### Authored React components and route-level UI

| Current component or pattern                      | File                                     | Kind                      | Responsibility                                                                                            | Classification                      |
| ------------------------------------------------- | ---------------------------------------- | ------------------------- | --------------------------------------------------------------------------------------------------------- | ----------------------------------- |
| `LocaleLayout`                                    | `app/[locale]/layout.tsx`                | Server layout             | Locale validation, metadata context, HTML shell, and `NextIntlClientProvider`                             | C                                   |
| `Home`                                            | `app/[locale]/page.tsx`                  | Client route              | Composes the entire portfolio home page, owns the MUI theme, project data, hero, project list, and footer | C                                   |
| `SiteHeader`                                      | `app/[locale]/page.tsx`                  | Local client component    | Brand, project anchor, availability copy, and locale navigation                                           | B                                   |
| Theme bootstrap (`ThemeProvider` + `CssBaseline`) | `app/[locale]/page.tsx`                  | Inline provider pattern   | Applies the local MUI theme only to the home route                                                        | A, but misplaced                    |
| Full-width responsive page gutter                 | `app/[locale]/page.tsx`                  | Repeated inline pattern   | Repeats `Container maxWidth={false}` and responsive horizontal padding                                    | A                                   |
| Hero section                                      | `app/[locale]/page.tsx`                  | Inline composition        | Location eyebrow, display heading, description, and CTA                                                   | C                                   |
| Hero CTA button                                   | `app/[locale]/page.tsx`                  | Styled MUI instance       | High-emphasis, offset-shadow action button                                                                | A                                   |
| Section heading row                               | `app/[locale]/page.tsx`                  | Inline composition        | Top rule, section title, and trailing metadata                                                            | A                                   |
| Project list/item                                 | `app/[locale]/page.tsx`                  | Inline mapped composition | Alternating responsive project information and preview link                                               | B                                   |
| Project tag chip                                  | `app/[locale]/page.tsx`                  | Styled MUI instance       | Displays technology labels                                                                                | A                                   |
| Underlined action link                            | `app/[locale]/page.tsx`                  | Styled MUI instance       | Text action with optional trailing icon                                                                   | A                                   |
| Linked media frame                                | `app/[locale]/page.tsx`                  | Styled MUI instance       | Bordered dark frame with hover transform around project media                                             | A                                   |
| `ProjectPreview`                                  | `app/[locale]/project-preview.tsx`       | Client component          | Renders one of two stylized mock previews for known portfolio projects                                    | C                                   |
| Skeleton/decorative bars                          | `app/[locale]/project-preview.tsx`       | Repeated inline primitive | Creates non-semantic mock text/navigation bars                                                            | A only as a low-level primitive; P3 |
| Site footer                                       | `app/[locale]/page.tsx`                  | Inline composition        | Portfolio closing statement and legal navigation                                                          | B                                   |
| `LegalPage`                                       | `app/[locale]/legal/[document]/page.tsx` | Server route              | Resolves legal document data and renders legal content                                                    | C                                   |
| Back link                                         | `app/[locale]/legal/[document]/page.tsx` | Inline `LocaleLink` style | Icon-leading navigation back to the home route                                                            | A                                   |
| Legal document layout                             | `app/[locale]/legal/[document]/page.tsx` | Inline composition        | Constrained readable page, title, metadata, sections, and paragraphs                                      | B                                   |
| Legal content section                             | `app/[locale]/legal/[document]/page.tsx` | Inline mapped composition | Section heading followed by paragraph stack                                                               | B                                   |

### Requested categories not present

No authored Inputs, Selects, TextFields, Modals, Dialogs, Tables, Loaders, Empty states, form controls/forms, Badges, Tooltips, Alerts, Accordions, Tabs, or Pagination were found. There are no calls to Emotion/MUI `styled()`, no custom hooks for UI, and no local icon components. Cards are not implemented as MUI `Card`; the project item plus preview frame is the closest card-like composition.

### Direct Material UI usage

All authored UI components use MUI directly; there is no wrapper layer today.

| File                                     | MUI components                                                                                                     | MUI icons                             |
| ---------------------------------------- | ------------------------------------------------------------------------------------------------------------------ | ------------------------------------- |
| `app/[locale]/page.tsx`                  | `Box`, `Button`, `Chip`, `Container`, `CssBaseline`, `Link`, `Stack`, `ThemeProvider`, `Typography`, `createTheme` | `ArrowOutward`, `NorthEast`, `Circle` |
| `app/[locale]/project-preview.tsx`       | `Box`, `Stack`, `Typography`                                                                                       | None                                  |
| `app/[locale]/legal/[document]/page.tsx` | `Box`, `Container`, `Stack`, `Typography`                                                                          | `ArrowBack`                           |

## Generic components

The following are clear library candidates. Some do not yet exist as named components; their “current name” describes the inline pattern being audited.

### `AppThemeProvider` (current: inline theme bootstrap)

- **File:** `app/[locale]/page.tsx`
- **Responsibility:** provide the design-system theme and MUI baseline styles.
- **Dependencies:** React children; MUI `ThemeProvider`, `CssBaseline`, `createTheme`.
- **Current props:** none; it is written inline around `Home`.
- **MUI dependency:** direct and fundamental.
- **Project-specific logic:** theme values are embedded in the route; no business logic.
- **Reuse level:** very high across any consumer of `my-ui-library`.
- **Required changes:** export a library theme plus a provider accepting `children`, optional `theme`/theme augmentation, and an opt-in baseline. Mount it at the application layout boundary so every route receives the same theme.
- **Proposed name:** `UiProvider` and `createUiTheme`.
- **Priority / complexity:** P0 / Medium.

### `PageContainer` (current: repeated full-width `Container`)

- **File:** `app/[locale]/page.tsx` (header, main, and footer).
- **Responsibility:** establish consistent responsive page gutters.
- **Dependencies:** MUI `Container`; theme breakpoints and spacing.
- **Observed props:** `maxWidth={false}` and `sx={{ px: { xs: 2.5, md: 5, lg: 8 } }}`.
- **MUI dependency:** `Container` and `sx` responsive values.
- **Project-specific logic:** none.
- **Reuse level:** high.
- **Required changes:** replace literal gutters with theme tokens; support `maxWidth`, `component`, `disableGutters`, and standard `ContainerProps` forwarding.
- **Proposed name:** `PageContainer`.
- **Priority / complexity:** P0 / Low.

### `Button` variant (current: hero CTA button)

- **File:** `app/[locale]/page.tsx`
- **Responsibility:** render a high-emphasis action with an acid background, border, offset shadow, and pressed-like hover motion.
- **Dependencies:** MUI `Button`, `ArrowOutward` supplied through `endIcon`, theme/CSS color values.
- **Observed props:** `href`, `endIcon`, children, and a large `sx` object.
- **MUI dependency:** direct `Button` use.
- **Project-specific logic:** destination anchor and translated label only; these belong to the consumer.
- **Reuse level:** high once expressed as a variant.
- **Required changes:** move visuals into `MuiButton.variants`; accept normal MUI button/link props; use theme palette, border, and shadow tokens; preserve focus-visible and disabled states; avoid fixing the icon in the abstraction.
- **Proposed name:** `Button` with `variant="accent"` (or a semantic library variant agreed across products).
- **Priority / complexity:** P1 / Medium.

### `Tag` (current: project tag chip)

- **File:** `app/[locale]/page.tsx`
- **Responsibility:** display a compact outlined categorical label.
- **Dependencies:** MUI `Chip`.
- **Observed props:** `label`, `variant="outlined"`, `size="small"`; local `borderRadius: 10`, `fontWeight: 700`.
- **MUI dependency:** direct `Chip` use.
- **Project-specific logic:** mapping the project tag strings; not part of the visual component.
- **Reuse level:** high.
- **Required changes:** define theme variant/defaults; forward all `ChipProps`; decide whether removable/clickable behavior is in scope.
- **Proposed name:** `Tag`, implemented through `Chip variant="tag"`, or simply library `Chip` with `variant="outlined"` defaults.
- **Priority / complexity:** P1 / Low.

### `ActionLink` (current: project action and legal back link)

- **Files:** `app/[locale]/page.tsx`, `app/[locale]/legal/[document]/page.tsx`
- **Responsibility:** render icon-leading or icon-trailing textual navigation with strong emphasis.
- **Dependencies:** MUI `Link` in one case, `next-intl` `LocaleLink` plus inline style in the other; MUI icons.
- **Observed props:** `href`, `target`, `rel`, `underline`, `component`, children, leading/trailing icon, `aria-label` as applicable.
- **MUI dependency:** `Link`; icon slots should accept `ReactNode` rather than importing icons internally.
- **Project-specific logic:** localized routing and external-link behavior vary by consumer.
- **Reuse level:** high if routing is injected polymorphically.
- **Required changes:** expose `startIcon`, `endIcon`, `external`, and polymorphic `component`; forward accessibility and anchor props; define `plain`, `underline`, and optionally `back` variants. Do not make the library depend on `next-intl`.
- **Proposed name:** `ActionLink`.
- **Priority / complexity:** P1 / Medium.

### `SectionHeader` (current: selected-work heading row)

- **File:** `app/[locale]/page.tsx`
- **Responsibility:** combine a divider, section heading, and optional trailing metadata/action.
- **Dependencies:** MUI `Stack`, `Typography`; spacing and border tokens.
- **Observed props:** not formalized; current inputs are title and the `2025—2026` trailing label.
- **MUI dependency:** layout and typography primitives.
- **Project-specific logic:** current title/year values only.
- **Reuse level:** medium to high.
- **Required changes:** slots for `title`, `eyebrow`, and `action`/`meta`; configurable heading level; responsive stacking; no translation dependency.
- **Proposed name:** `SectionHeader`.
- **Priority / complexity:** P2 / Low.

### `MediaFrame` (current: linked project preview frame)

- **File:** `app/[locale]/page.tsx`
- **Responsibility:** frame arbitrary visual content and optionally make it interactive.
- **Dependencies:** MUI `Link`/`Box`; theme borders, colors, transitions.
- **Observed props:** `href`, `target`, `rel`, `aria-label`, children; alternating responsive `order` is currently mixed into the frame.
- **MUI dependency:** MUI surface/link primitives.
- **Project-specific logic:** URL, accessibility label, preview child, and alternating order.
- **Reuse level:** medium.
- **Required changes:** move ordering to the parent layout; expose `children`, interaction props, `tone`, and hover behavior; use theme transitions and focus-visible styling.
- **Proposed name:** `MediaFrame` or `InteractiveFrame`.
- **Priority / complexity:** P2 / Medium.

### `SkeletonBar` (current: decorative preview bars)

- **File:** `app/[locale]/project-preview.tsx`
- **Responsibility:** render a fixed-height decorative line in mock content.
- **Dependencies:** MUI `Box` only.
- **Observed props:** derived width, height, color, and margin.
- **MUI dependency:** unnecessary; could be a styled primitive.
- **Project-specific logic:** width arrays and tone selection belong to `ProjectPreview`.
- **Reuse level:** low outside mockups; it is not a loading indicator and must not be announced as one.
- **Required changes:** accept visual dimensions/color, mark decorative usage appropriately, and avoid naming it `Skeleton` unless it represents loading state.
- **Proposed name:** `PlaceholderLine`.
- **Priority / complexity:** P3 / Low.

## Components requiring refactor

### `SiteHeader`

- **File:** `app/[locale]/page.tsx`
- **Responsibility:** portfolio brand, primary anchor navigation, availability message, and language selection.
- **Dependencies:** `useTranslations`, `useLocale`, `LocaleLink`, MUI `Box`, `Container`, `Stack`, `Link`, `Typography`, and `Circle` icon.
- **Current props:** none; all content, links, supported locales, and brand are closed over.
- **MUI dependency:** all presentation is composed directly from MUI.
- **Project-specific logic:** translation namespace, locale comparison, fixed `/` localized links, `#proyectos`, name, availability text, and exactly two languages.
- **Reuse level:** medium after decomposition.
- **Required changes:** compose a generic `Header` shell with `brand`, `navigation`, `actions`, and `status` slots. Extract a separate controlled `LocaleSwitcher` only if multiple applications need it; pass locales, active locale, labels, and link renderer. Keep portfolio content in the project.
- **Proposed library names:** `Header`, optionally `Header.Brand`, `Header.Nav`, `Header.Actions`; `LocaleSwitcher` as a separate P2 component.
- **Priority / complexity:** P1 / High.

### Project list item (unnamed inline composition)

- **File:** `app/[locale]/page.tsx`
- **Responsibility:** present project number, eyebrow, title, description, tags, action, and media in an alternating two-column layout.
- **Dependencies:** project data, translations, MUI layout/typography/link/chip primitives, `ProjectPreview`, and `NorthEast`.
- **Current props:** implicit fields from the mapped `projects` item plus `index`; translated eyebrow/description are looked up by project ID.
- **MUI dependency:** extensive.
- **Project-specific logic:** project schema, translation keys, external URLs, alternating order based on index, and preview type.
- **Reuse level:** medium as a generic editorial/media composition; low as a portfolio-specific card.
- **Required changes:** split layout from content using slots (`media`, `title`, `description`, `meta`, `tags`, `actions`); replace `index` logic with an explicit `mediaPosition`; keep data mapping and translations in the project.
- **Proposed library name:** `MediaCard` using compound parts or slots.
- **Priority / complexity:** P1 / High.

### Site footer (unnamed inline composition)

- **File:** `app/[locale]/page.tsx`
- **Responsibility:** closing statement, copyright, and legal navigation.
- **Dependencies:** translations, `LocaleLink`, MUI layout/typography/link primitives, CSS color variables.
- **Current props:** none; all content and links are embedded.
- **MUI dependency:** direct.
- **Project-specific logic:** all text, link destinations, and localization.
- **Reuse level:** medium after slotting.
- **Required changes:** generic `Footer` surface/layout with `headline`, `meta`, and `links`/`actions` slots; consumer owns legal routes and copy.
- **Proposed library name:** `Footer` with `Footer.Main` and `Footer.Bottom` composition if needed.
- **Priority / complexity:** P2 / Medium.

### Legal document layout and content section

- **File:** `app/[locale]/legal/[document]/page.tsx`
- **Responsibility:** readable document shell with back action, page title, metadata, section headings, and paragraphs.
- **Dependencies:** MUI primitives, `LocaleLink`, `ArrowBack`, translated data.
- **Current props:** implicit `document`, title, last-updated label, and `Section[]` content.
- **MUI dependency:** direct, but this route is currently outside the custom home theme.
- **Project-specific logic:** legal document validation, translation lookup, metadata, and routing.
- **Reuse level:** medium.
- **Required changes:** extract presentation as `DocumentLayout` and `Prose`/`ContentSection`; accept slots/content and heading levels; keep fetching, validation, and translation in the route.
- **Proposed library names:** `DocumentLayout`, `Prose`, or a composed `Article`.
- **Priority / complexity:** P2 / Medium.

### Locale switcher pattern

- **File:** `app/[locale]/page.tsx` inside `SiteHeader`
- **Responsibility:** show supported languages and mark the active one through underline state.
- **Dependencies:** `next-intl` locale state and localized `LocaleLink`.
- **Current props:** none; locales and labels are hard-coded to Spanish and English.
- **MUI dependency:** MUI `Link` and `Stack`.
- **Project-specific logic:** framework-specific route component and locale API.
- **Reuse level:** medium only if made adapter-driven.
- **Required changes:** controlled API (`value`, `options`, `onChange` or `renderLink`), accessible current-state semantics such as `aria-current`, and no `next-intl` import in the library.
- **Proposed library name:** `LocaleSwitcher`.
- **Priority / complexity:** P2 / Medium.

## Project-specific components

### `Home`

`Home` is a route-level composition and should remain in the application. It owns translated copy and the portfolio project dataset. Its provider setup, layout primitives, button styling, tags, section header, media frame, and project-item layout can be replaced incrementally by library components.

### Hero section

The typography, content, location label, CTA destination, and art direction form the identity of this portfolio. Keep the section composition project-specific. Move only its underlying typography variants, button variant, container, and token values to the library.

### `ProjectPreview`

- **Props:** `type: "cv" | "aj"`, `tone: string`.
- **Dependencies:** `useTranslations("Home")`; MUI `Box`, `Stack`, `Typography`.
- **Project coupling:** discriminated rendering is hard-coded for exactly two portfolio projects; translation keys (`cvName`, `cvProfile`, `fireHeadline`, `fireCaption`) are internal; colors and placeholder geometry describe those projects.
- **Decision:** keep in the project. It may be refactored locally into `CvProjectPreview` and `AjProjectPreview`, or accept a `renderPreview`/children slot from the project item, but moving it to a general UI library would encode portfolio-specific mock art.

### `LegalPage` and `LocaleLayout`

These components own Next.js metadata, locale validation, translation retrieval, legal route validation, and application document structure. They belong to the project. Only their presentational shells are candidates for extraction.

## Duplicate patterns

### Strong duplicates

1. **Responsive page gutters:** `px: { xs: 2.5, md: 5, lg: 8 }` appears on the header, home main container, and footer. Centralize in `PageContainer` or `theme.components.MuiContainer`.
2. **Muted text:** `color: "text.secondary"` is repeatedly applied to availability, hero emphasis, section metadata, project number/description, and legal metadata/body. Add semantic typography variants or a reusable `color="text.secondary"` convention.
3. **Heavy display headings:** weights `800`/`900`, tight negative letter spacing, and responsive sizes recur across hero, section, project, footer, and legal headings. Define `display`, `h1`, `h2`, `h3`, `eyebrow`, and `bodyLarge` variants.
4. **Small uppercase eyebrow text:** both the hero location and project eyebrow use `fontSize: 12`, uppercase, wide tracking, and bold weight with slightly different tracking. One `eyebrow` typography variant can cover both.
5. **Icon action links:** the project external link and legal back link combine text, an icon, inline-flex alignment, gap, and bold weight. They are directional variants of `ActionLink`.
6. **Rule-separated rows:** header bottom rule, selected-work top rule, preview header bottom rule, and footer top rule repeatedly express separators with locally selected colors. Introduce semantic divider/border tokens and use MUI `Divider` or a composed section header.
7. **Decorative preview bars:** multiple `Box` instances repeat height, color, and bottom margin while changing only width. Consolidate locally or via `PlaceholderLine`.
8. **Circle marks:** brand status, avatar mock, and fire-service mark all create circles, but their meanings differ. Share only a low-level `StatusDot` for the brand/status case; do not force all circles into one semantic component.

### Conceptually similar components that should be variants

| Current patterns                                         | Consolidation                                                                                                    |
| -------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| Hero CTA; future primary/secondary/destructive actions   | One `Button` with theme variants such as `accent`, standard `contained`/`outlined`/`text`, and semantic color    |
| Project external link; legal back link; header nav links | One `ActionLink` with `plain`, `underline`, `nav`, and icon placement options, or theme-level `MuiLink` variants |
| Project tag chip; future filters/status labels           | One `Chip`/`Tag` with `outlined`, `filled`, and semantic color variants                                          |
| Hero, project, footer, and legal headings                | One typography system with named variants rather than page-specific `sx`                                         |
| Dark preview frame and possible future visual cards      | One `MediaFrame` variant or `Card` surface variant; interaction is opt-in                                        |

### Patterns that should use composition

The project item should not become separate `PortfolioCardLeft` and `PortfolioCardRight` components. Prefer:

```tsx
<MediaCard mediaPosition="end">
  <MediaCard.Content>
    <MediaCard.Meta>...</MediaCard.Meta>
    <MediaCard.Title>...</MediaCard.Title>
    <MediaCard.Description>...</MediaCard.Description>
    <MediaCard.Tags>...</MediaCard.Tags>
    <MediaCard.Actions>...</MediaCard.Actions>
  </MediaCard.Content>
  <MediaCard.Media>...</MediaCard.Media>
</MediaCard>
```

Likewise, header, footer, document, and section-header abstractions should expose slots/compound parts rather than accepting portfolio-specific strings or routes. A generic surface/card family can follow `Card`, `CardHeader`, `CardContent`, `CardMedia`, and `CardActions`; `ProjectPreview` remains a child supplied by this application.

## Material UI usage

### Current state

- `@mui/material` and `@mui/icons-material` are used directly in every visual route/component.
- No project-owned wrapper currently exists around a MUI primitive.
- No MUI `styled()` usage exists; styling is split between inline `sx`, one inline React `style` object, and global CSS.
- `@emotion/react`, `@emotion/styled`, and `@emotion/cache` are installed, but no authored Emotion API usage was found outside MUI's transitive styling mechanism.
- `CssBaseline` is rendered only inside `Home`.
- The custom `ThemeProvider` is rendered only inside `Home`. `LegalPage` therefore receives MUI's default theme for values like `text.secondary`, spacing, typography defaults, and breakpoints while simultaneously using global portfolio CSS variables. This is the highest-priority consistency issue.
- Most `sx` objects are one-off, but the same token choices are repeated manually. Extraction should prefer theme variants/defaults before introducing wrappers for every MUI primitive.

### Repeated `sx` and style concerns

- Responsive syntax is consistently mobile-first and uses MUI keys `xs`, `sm`, `md`, and `lg`; there are no custom breakpoints.
- `xs → md` is the dominant transition: page vertical padding, grid activation, font sizes, media height, direction, alignment, and gap all switch at `md` (MUI default: 900 px unless customized later).
- `sm` is used for header availability visibility, language/header spacing, hero font size, and footer direction.
- `lg` is used only for page gutters and the largest hero font size.
- Alternating project layout couples responsiveness to item index through `gridTemplateColumns` and `order`. This should become an explicit layout prop.
- The legal back link uses the React `style` prop while the rest of the project uses `sx`; it also encodes `gap: 8` and `marginBottom: 48` as raw pixels rather than theme spacing.
- Many hard-coded pixel values are legitimate art direction, but shared values should become tokens: 1 px borders, compact icon/text gaps, page gutters, display tracking, and action shadows.

### Icons

Current icon set:

- `ArrowOutward`: hero CTA.
- `NorthEast`: external project action.
- `ArrowBack`: legal back navigation.
- `Circle`: brand/status marker.

The library should depend on icon slots (`startIcon`, `endIcon`, or `icon`) and may re-export an agreed icon set only if that is an explicit design-system goal. Domain components should not hard-code icon imports. Standardize icon sizes (`small` versus explicit `12px`), alignment, accessible labels for icon-only controls, and whether decorative icons receive `aria-hidden`.

## Theme analysis

### Palette

Current MUI theme in `app/[locale]/page.tsx`:

| Token                        | Value     |
| ---------------------------- | --------- |
| `palette.mode`               | `light`   |
| `palette.primary.main`       | `#191a16` |
| `palette.background.default` | `#f3f1e9` |
| `palette.background.paper`   | `#e9e6dc` |
| `palette.text.primary`       | `#191a16` |
| `palette.text.secondary`     | `#696b61` |

Global CSS duplicates or extends this palette:

| CSS variable | Value                    | Observation                     |
| ------------ | ------------------------ | ------------------------------- |
| `--ink`      | `#191a16`                | Duplicates primary/text primary |
| `--paper`    | `#f3f1e9`                | Duplicates background default   |
| `--line`     | `rgba(25, 26, 22, 0.18)` | Missing theme divider mapping   |
| `--acid`     | `#d7ff4f`                | Missing semantic palette entry  |
| `--muted`    | `#696b61`                | Duplicates text secondary       |

Other literals include hover acid `#c9f236`, brand/status green `#a4c92c`, project tones `#702457` and `#d32f2f`, footer border/text values `#494a44`/`#a9aaa1`, and preview-only neutral/project colors. Centralize system colors (`ink`, `paper`, `divider`, `accent`, `accentHover`, muted foreground, inverse surface/foreground) in the library. Keep project preview tones and mockup art colors in the application unless they are adopted as system colors.

Recommended direction: make the theme the single source of truth and, if CSS variables are required, generate/use MUI CSS theme variables rather than manually duplicating hex values. Add semantic entries through module augmentation, for example `palette.accent`, `palette.surface.inverse`, and `palette.text.inverse`, or map the accent to a standard palette color if its semantics are universal.

### Typography

Configured values are limited to:

- `fontFamily: "Arial, Helvetica, sans-serif"`.
- `typography.button.textTransform: "none"`.
- `typography.button.fontWeight: 700`.

All other typography is local `sx`. Observed weights include 400, 700, 800, 850, and 900; `850` depends on font/browser interpolation and has no benefit with Arial if that exact weight is unavailable. Font sizes range from 9 px to a responsive `16vw`/136 px. Letter spacing ranges from `-0.075em` to `0.18em`, plus raw numeric `2` values. Line heights range from `0.83` to `1.75`.

Centralize named variants for `display`, `h1`, `h2`, `h3`, `eyebrow`, `bodyLarge`, `body`, `caption`, and action text. Define responsive values in theme variants, normalize available font weights, and preserve semantic heading elements via the `component` prop or `variantMapping`.

### Spacing

No custom `theme.spacing` is configured, so MUI's default 8 px factor is active. The code uses fractional factors (`1.2`, `1.25`, `1.5`, `2.5`) and large values (`13`, `14`), resulting in a broad implicit scale. Raw pixels coexist in the legal back link and numerous preview dimensions.

Keep the 8 px base if it is intentional, but publish a documented semantic scale for page gutters, section spacing, component gaps, and control padding. `PageContainer` should own the repeated 20/40/64 px gutters (`2.5`, `5`, `8` theme units).

### Breakpoints

No custom breakpoints exist. The project uses MUI defaults and the `xs`, `sm`, `md`, `lg` keys. Centralize responsive layout decisions in components/theme only when they are cross-product rules. At minimum, make `PageContainer` gutters and typography variants responsive through library definitions. Keep content-specific project alternation in the app or expose it explicitly through `MediaCard.mediaPosition`.

### Shape and borders

`shape.borderRadius` is globally set to `0`, but project chips and preview circles locally override it with `10`, `20`, and `50%`. This signals a useful shape scale rather than a single global radius:

- `none: 0` for structural surfaces.
- `sm`/`pill` for tags and bars.
- `round: 50%` for dots/avatars.

MUI only exposes a numeric global `shape.borderRadius` by default, so add typed custom shape tokens or component-specific variants. Map `--line` to `palette.divider`; create consistent border widths and inverse divider colors.

### Component overrides, default props, and variants

None are currently configured. Recommended library ownership:

- `MuiCssBaseline`: base body foreground/background/font, selection behavior where portable, and reduced-motion defaults where compatible.
- `MuiContainer`: shared page gutter defaults or a `PageContainer` wrapper.
- `MuiButton`: no uppercase transform, bold action typography, accent variant, focus-visible/disabled/hover states.
- `MuiChip`: outlined tag variant with pill radius and strong label weight.
- `MuiLink`: action/nav variants, consistent underline offsets, focus-visible treatment, and icon alignment.
- `MuiTypography`: named variants and semantic `variantMapping`.
- `MuiPaper`/`MuiCard`: zero-radius structural surface defaults and any framed/inverse variants.
- `MuiDivider`: default divider color based on the semantic palette token.

The radial body background and `rise` hero animation are portfolio art direction and should remain in project styles. The reduced-motion rule is broadly reusable and can be centralized only if the library deliberately owns global baseline behavior.

### Default props recommendation

Use default props sparingly. Good candidates are `MuiButton.disableElevation` if all products share that choice, `MuiButton` action typography, and `MuiChip.size = "small"` only for a dedicated tag variant rather than globally. Avoid globally setting link routing components in the library because Next.js/`next-intl` integration is application-specific.

## Proposed library components

| Proposed component/token   | Source pattern                                     | Form                                                          | Priority |
| -------------------------- | -------------------------------------------------- | ------------------------------------------------------------- | -------- |
| `createUiTheme`            | Inline `createTheme`                               | Theme factory with typed semantic tokens                      | P0       |
| `UiProvider`               | Inline `ThemeProvider` + `CssBaseline`             | Root provider                                                 | P0       |
| Design tokens              | Theme plus `:root` variables and repeated literals | Palette, typography, spacing, shape, borders, shadows, motion | P0       |
| `PageContainer`            | Three repeated responsive containers               | Thin MUI `Container` wrapper or override                      | P0       |
| `Button` accent variant    | Hero CTA                                           | MUI theme variant                                             | P1       |
| `Tag`/`Chip` tag variant   | Project tags                                       | MUI theme variant or thin wrapper                             | P1       |
| `ActionLink`               | Project and legal links                            | Polymorphic component with icon slots                         | P1       |
| `Header`                   | `SiteHeader` shell                                 | Slot/compound composition                                     | P1       |
| `MediaCard`                | Project item layout                                | Slot/compound composition                                     | P1       |
| Typography variants        | Repeated display/heading/eyebrow/body styles       | Theme variants                                                | P1       |
| `SectionHeader`            | Selected-work row                                  | Slot-based component                                          | P2       |
| `MediaFrame`               | Linked preview frame                               | Surface/interactive wrapper                                   | P2       |
| `Footer`                   | Home footer shell                                  | Slot/compound composition                                     | P2       |
| `DocumentLayout` / `Prose` | Legal page presentation                            | Slot-based layout and typography                              | P2       |
| `LocaleSwitcher`           | Header language links                              | Controlled, adapter-driven component                          | P2       |
| `StatusDot`                | Header availability mark                           | Small semantic status primitive                               | P3       |
| `PlaceholderLine`          | Preview mock bars                                  | Decorative primitive                                          | P3       |

No new library component should be added merely to hide a single MUI import. Prefer theme tokens and MUI variants for visual consistency; create wrappers where there is real behavioral, accessibility, or compositional value.

## Proposed component API

The following APIs are directional and should be validated against other consumers before implementation.

```tsx
<UiProvider themeOptions={consumerOverrides} enableCssBaseline>
  {children}
</UiProvider>

<PageContainer component="main" maxWidth={false}>
  {children}
</PageContainer>

<Button
  variant="accent"
  color="primary"
  href="#work"
  endIcon={<ArrowOutward />}
>
  View work
</Button>

<Tag label="Next.js" variant="outlined" size="small" />

<ActionLink
  href="https://example.com"
  external
  endIcon={<NorthEast />}
>
  Visit project
</ActionLink>

<ActionLink
  component={LocalizedLink}
  href="/"
  startIcon={<ArrowBack />}
  variant="plain"
>
  Back home
</ActionLink>
```

```tsx
<Header>
  <Header.Brand>{brand}</Header.Brand>
  <Header.Nav aria-label="Primary">{navigation}</Header.Nav>
  <Header.Actions>{actions}</Header.Actions>
</Header>

<SectionHeader
  title="Selected work"
  headingLevel="h2"
  meta="2025—2026"
/>

<MediaCard mediaPosition="start">
  <MediaCard.Media>{preview}</MediaCard.Media>
  <MediaCard.Content>
    <MediaCard.Meta>{meta}</MediaCard.Meta>
    <MediaCard.Title component="h3">{title}</MediaCard.Title>
    <MediaCard.Description>{description}</MediaCard.Description>
    <MediaCard.Tags>{tags}</MediaCard.Tags>
    <MediaCard.Actions>{actions}</MediaCard.Actions>
  </MediaCard.Content>
</MediaCard>
```

```tsx
<LocaleSwitcher
  value="es"
  options={[
    { value: "es", label: "ES", href: "/es" },
    { value: "en", label: "EN", href: "/en" },
  ]}
  renderLink={({ href, children, current }) => (
    <LocalizedLink href={href} aria-current={current ? "page" : undefined}>
      {children}
    </LocalizedLink>
  )}
/>

<DocumentLayout
  backAction={backLink}
  title={title}
  meta={lastUpdated}
>
  <Prose>{content}</Prose>
</DocumentLayout>
```

API principles:

- Extend and forward the relevant MUI props and refs instead of narrowing standard capabilities.
- Keep routing, translation, analytics, and project data outside the library.
- Prefer slots/children for content-rich structures and variants for purely visual differences.
- Preserve semantic elements and heading levels independently from visual typography variants.
- Include keyboard focus, disabled, hover, reduced-motion, external-link, and `aria-current` behavior in the component contract and tests.
- Avoid accepting raw `index` to determine layout; use explicit semantic props.

## Migration priorities

### P0 — foundational

1. Move theme creation to `my-ui-library` as `createUiTheme` and establish typed palette/shape/typography tokens.
2. Add `UiProvider` at the shared application layout boundary so home and legal routes use the same MUI theme and baseline.
3. Remove the split source of truth between theme colors and global CSS variables through a deliberate CSS-variable strategy.
4. Establish `PageContainer`/container overrides for shared responsive gutters.

### P1 — highly reusable

1. Convert display, heading, eyebrow, body-large, caption, and action text styles into typography variants.
2. Convert the hero CTA into a `Button` accent variant with complete interaction states.
3. Standardize tags through a `Chip` theme variant or `Tag` wrapper.
4. Implement polymorphic `ActionLink` with icon slots and router adapters.
5. Extract the slot-based `Header` shell.
6. Extract the generic `MediaCard` composition while leaving portfolio data and `ProjectPreview` local.

### P2 — reusable

1. Add `SectionHeader`, `MediaFrame`, and slot-based `Footer`.
2. Extract `DocumentLayout`/`Prose` after validating a second content-heavy use case.
3. Add an adapter-driven `LocaleSwitcher` only if it is needed outside this portfolio.

### P3 — optional

1. Add `StatusDot` if status display recurs.
2. Add `PlaceholderLine` only if mock previews become a repeated library use case.
3. Keep preview artwork and portfolio animations local unless multiple products adopt them.

### Suggested migration order and boundaries

Start with tokens/provider and typography because every later extraction depends on them. Next migrate variants (`Button`, `Chip`, `Link`), then low-level layout (`PageContainer`), and finally compositions (`Header`, `MediaCard`, `Footer`). This minimizes wrappers that merely preserve today's inline literals. `Home`, `LegalPage`, `LocaleLayout`, project data, translation lookups, routes, and `ProjectPreview` should never move wholesale into the library.

## Summary

| Current component                          | Proposed library component               | Category                 | Priority | Complexity |
| ------------------------------------------ | ---------------------------------------- | ------------------------ | -------- | ---------- |
| Inline `createTheme`                       | `createUiTheme` + design tokens          | A. GENERIC               | P0       | Medium     |
| Inline `ThemeProvider` + `CssBaseline`     | `UiProvider`                             | A. GENERIC               | P0       | Medium     |
| Repeated full-width containers             | `PageContainer`                          | A. GENERIC               | P0       | Low        |
| Hero CTA `Button`                          | `Button variant="accent"`                | A. GENERIC               | P1       | Medium     |
| Project `Chip`                             | `Tag` / `Chip variant="tag"`             | A. GENERIC               | P1       | Low        |
| Project action link                        | `ActionLink`                             | A. GENERIC               | P1       | Medium     |
| Legal back link                            | `ActionLink`                             | A. GENERIC               | P1       | Medium     |
| Repeated heading/eyebrow/body `Typography` | Theme typography variants                | A. GENERIC               | P1       | Medium     |
| `SiteHeader`                               | `Header` shell                           | B. GENERIC-WITH-REFACTOR | P1       | High       |
| Inline project list item                   | `MediaCard`                              | B. GENERIC-WITH-REFACTOR | P1       | High       |
| Selected-work heading row                  | `SectionHeader`                          | A. GENERIC               | P2       | Low        |
| Linked project preview frame               | `MediaFrame`                             | A. GENERIC               | P2       | Medium     |
| Inline site footer                         | `Footer` shell                           | B. GENERIC-WITH-REFACTOR | P2       | Medium     |
| Legal document presentation                | `DocumentLayout` / `Prose`               | B. GENERIC-WITH-REFACTOR | P2       | Medium     |
| Header language links                      | `LocaleSwitcher`                         | B. GENERIC-WITH-REFACTOR | P2       | Medium     |
| Header status circle                       | `StatusDot`                              | A. GENERIC               | P3       | Low        |
| Preview decorative bars                    | `PlaceholderLine`                        | A. GENERIC               | P3       | Low        |
| `Home` route                               | None; compose library primitives locally | C. PROJECT-SPECIFIC      | —        | —          |
| Hero section                               | None; compose library primitives locally | C. PROJECT-SPECIFIC      | —        | —          |
| `ProjectPreview`                           | None; remain local                       | C. PROJECT-SPECIFIC      | —        | —          |
| `LegalPage` route/data logic               | None; remain local                       | C. PROJECT-SPECIFIC      | —        | —          |
| `LocaleLayout`                             | None; remain local                       | C. PROJECT-SPECIFIC      | —        | —          |
