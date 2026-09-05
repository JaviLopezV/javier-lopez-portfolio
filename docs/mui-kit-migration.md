# @jlopvil/mui-kit migration

## Scope

This inventory covers the authored UI in `app/`. Generated files and dependencies are excluded. The installed library version is `@jlopvil/mui-kit@0.2.0`; its peer ranges are compatible with the project's React 19, MUI 7, and Emotion 11 installations, and `npm ls` resolves each peer to a single deduplicated copy. Next.js is not a peer dependency of the library.

The package root was also imported at runtime successfully. All migrations use only the public `@jlopvil/mui-kit` entrypoint.

## Verified public API

The root entrypoint exports:

- Foundation: `Button`, `IconButton`, `Surface`, `Typography`, `Link`
- Forms: `TextField`, `SelectField`, `Checkbox`, `RadioGroup`
- Feedback: `Alert`, `Dialog`, `DialogTitle`, `DialogContent`, `DialogActions`
- Layout: `Container`, `Stack`, `Grid`, `Section`
- Theme: `MyUiProvider`, `MyUiInitColorSchemeScript`, `createMyUiTheme`, `breakpoints`, `controlSizes`, `motion`, `publicTokens`, `shape`, `spacingUnit`, `zIndex`, `myUiModeStorageKey`, `myUiColorSchemeStorageKey`
- Public types: `ButtonProps`, `IconButtonProps`, `SurfaceProps`, `SurfaceVariant`, `SurfacePadding`, `SelectFieldProps`, `SelectOption`, `SelectValue`, `DialogProps`, `SectionProps`, `MyUiProviderProps`, `MyUiInitColorSchemeScriptProps`, `MyUiThemeOptions`, `MyUiColorScheme`, `SemanticTone`, `ControlSize`, `ResponsiveValue`, plus the prop types of the reexported MUI primitives

`Container`, `Stack`, `Typography`, `Link`, `TextField`, `Checkbox`, `RadioGroup`, `Grid`, and `Alert` are direct MUI reexports. `Button` wraps MUI Button and adds `tone` and `loadingLabel` while preserving MUI's normal button API. `IconButton` requires an accessible name. `Surface`, `SelectField`, `Dialog`, and `Section` are library abstractions with their own documented contracts.

## Project inventory and migration order

Usage counts are JSX instances in authored source before this first migration. Risk describes replacement risk, not component complexity. The table is ordered from lower to higher migration risk.

| Current component                   | @jlopvil/mui-kit equivalent         | Classification             |          Usage count | Risk        |
| ----------------------------------- | ----------------------------------- | -------------------------- | -------------------: | ----------- |
| MUI `Container`                     | `Container`                         | DIRECTLY_MIGRATABLE        |                    4 | Low         |
| MUI `Stack`                         | `Stack`                             | DIRECTLY_MIGRATABLE        |                   16 | Low         |
| MUI `Typography`                    | `Typography`                        | DIRECTLY_MIGRATABLE        |                   18 | Low         |
| MUI `Link`                          | `Link`                              | DIRECTLY_MIGRATABLE        |                    8 | Low         |
| MUI `Button`                        | `Button`                            | DIRECTLY_MIGRATABLE        |                    1 | Low         |
| MUI `ThemeProvider` + `CssBaseline` | `MyUiProvider`                      | MIGRATABLE_WITH_ADAPTATION |                    1 | Medium      |
| Inline legal content sections       | `Section`                           | MIGRATABLE_WITH_ADAPTATION | 1 mapped render site | Medium      |
| MUI `Box`                           | No export                           | NO_EQUIVALENT              |                   22 | Medium      |
| MUI `Chip` project tags             | No export                           | LIBRARY_GAP                | 1 mapped render site | Medium      |
| Custom portfolio theme              | `createMyUiTheme` with overrides    | MIGRATABLE_WITH_ADAPTATION |                    1 | Medium–High |
| `SiteHeader`                        | No composite equivalent             | PROJECT_SPECIFIC           |                    1 | High        |
| Hero composition                    | No composite equivalent             | PROJECT_SPECIFIC           |                    1 | High        |
| Project list item composition       | `Surface` is only a partial concept | LIBRARY_GAP                | 1 mapped render site | High        |
| `ProjectPreview`                    | No equivalent                       | PROJECT_SPECIFIC           | 1 mapped render site | High        |
| Site footer                         | No composite equivalent             | PROJECT_SPECIFIC           |                    1 | High        |
| `LegalPage` route/data logic        | No equivalent                       | PROJECT_SPECIFIC           |                    1 | High        |

## First migration

The low-risk batch changes imports for `Button`, `Container`, `Link`, `Stack`, and `Typography` to the package root. The four primitives are the exact MUI implementations reexported by the library. The existing Button use is compatible with the library wrapper: `href`, `endIcon`, `sx`, and children are preserved, and its default semantic tone maps to the same theme `primary` color.

No local components are deleted: none become unused in this batch.

## Deferred candidates

1. Move the existing project theme and baseline into `MyUiProvider`, after visual regression checks for color-scheme and provider behavior.
2. Consider `Section` for semantic legal/article sections once its built-in vertical padding can be reconciled with the current `Stack` spacing.
3. Adopt `Surface` for framed content only after confirming that its Paper element, radius, padding, and border recipes match the portfolio art direction.
4. Migrate future forms, dialogs, alerts, and icon buttons directly to library components as they are introduced.
