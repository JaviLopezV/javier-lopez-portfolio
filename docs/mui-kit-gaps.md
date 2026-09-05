# @jlopvil/mui-kit gaps

## Box

### Current project requirement

The portfolio uses MUI `Box` extensively as a polymorphic layout primitive (`header`, `main`, `footer`, `article`, `section`, and `span`) with responsive `sx` values.

### Current library API

The library uses Box internally for `Section`, but does not export a general Box primitive. `Section` always renders a semantic section and adds vertical spacing, so it is not a drop-in replacement.

### Missing API

A public polymorphic layout primitive for neutral elements and arbitrary MUI system styling.

### Proposed solution

Consider reexporting MUI `Box` from the package root, following the existing transparent reexport policy used for `Stack`, `Container`, and `Typography`. Do not expand `Section` into a catch-all Box replacement.

## Chip

### Current project requirement

Project technology tags use `label`, `variant="outlined"`, `size="small"`, and local radius/font-weight styling.

### Current library API

There is no `Chip` or tag/badge abstraction in the public API.

### Missing API

A compact categorical label with standard MUI Chip behavior and support for outlined presentation, size, and normal Chip props.

### Proposed solution

Either reexport MUI `Chip` as a theme-governed primitive or add a narrowly scoped `Tag` component that forwards `ChipProps`. Its styling should be expressed through library theme defaults or a documented variant rather than portfolio-specific values.

## Portfolio theme integration

### Current project requirement

The site has an intentionally square, editorial visual language: zero border radius, a custom light palette, Arial typography, and a bespoke accent CTA.

### Current library API

`MyUiProvider` accepts a prebuilt theme, while `createMyUiTheme` accepts brand colors, typography, and component overrides. The library theme defaults include rounded controls and surfaces, a different palette, CSS color schemes, and library tokens.

### Missing API

There is no documented migration path for adopting library tokens and provider behavior while preserving an existing full MUI theme and its exact visual output.

### Proposed solution

Document whether passing `theme` to `MyUiProvider` is the supported compatibility bridge and which library guarantees are intentionally unavailable in that mode. A future theme-preset or explicit token override API could make incremental adoption safer; the portfolio-specific palette itself should remain in this project.

## Media frame / project card

### Current project requirement

Each project entry combines alternating responsive media placement, editorial metadata, tags, an external action, and a custom preview with a square framed interaction treatment.

### Current library API

`Surface` offers plain, outlined, elevated, and glass Paper treatments with tokenized padding and a fixed large radius. It does not provide link behavior, media/content slots, square framing, or alternating layout.

### Missing API

A reusable media-card or interactive-frame composition would need polymorphic/link behavior, slots, focus treatment, and opt-in layout without owning portfolio data.

### Proposed solution

Only add such an abstraction after another product demonstrates the same composition. Prefer a slot-based `MediaCard`/`InteractiveSurface`; keep project data, translations, ordering, and preview artwork in the consuming application.
