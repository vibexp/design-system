# Changelog

All notable changes to `@vibexp/design-system` are documented here.
This project adheres to [Semantic Versioning](https://semver.org/).

## [0.3.0] — 2026-10-13

Reading, markdown and chart tokens (#10). **Two changes are visible to existing
consumers on upgrade** — see *Changed*.

### Changed
- **Chart palette replaced** (`--chart-1`…`--chart-5`, light and dark). The
  old set led with a saturated red-orange in light (it read as "destructive"
  on a single-series chart) and used a different hue order in each theme, so
  a series changed identity when the theme did. The new set keeps one hue
  order in both themes — neutral, blue, teal, amber, violet — and only
  lightness moves. Every colour clears 3:1 against `--card` in both themes
  (light 7.43 / 4.85 / 3.75 / 3.30 / 5.18, dark 8.96 / 6.24 / 7.59 / 9.41 /
  6.35). **Every chart that reads these tokens changes colour.** Blue
  (`--chart-2`) and violet (`--chart-5`) sit at one lightness and merge for
  red-green colour blindness; a chart that plots both needs a second cue
  (direct labels, dash or marker shape).
- **Prose: inline code is regular weight and blockquotes are upright**
  (`tokens/prose.css`). Inline `code` goes from weight 600 to 400 — bold
  monospace shouts in dense text, and the `--muted` background already marks
  it as code. `blockquote` goes from italic to `font-style: normal` with
  `quotes: none`, and `blockquote p::before/::after` are emptied, so a quoted
  instruction never gains characters that are not in its source. **Every
  `.prose` surface (website, blog, docs, app) changes appearance.** To keep
  the old look, override those three properties after the import.

### Added
- **`tokens/markdown.css`** — rendered-markdown blocks, exported as
  `@vibexp/design-system/markdown.css` and added to the barrel after
  `prose.css`: the fenced code-block frame (`.code-block`, `.code-block-bar`,
  `.copy-button`), token-driven syntax colours for Prism-style `.token` spans,
  and the GFM task-list checkbox (`.task-list-item`, `.task-checkbox`). All
  rules are scoped under `.prose` and match nothing without that markup; the
  `.token` colours apply only inside `.code-block`, so a surface running its
  own Prism theme on a bare `.prose pre` is not restyled. The file header
  documents the markup contract.
- **Reading tokens.** `--measure-prose` (40rem) and `--measure-article`
  (64rem) in the sizing group, generating `max-w-measure-prose` /
  `max-w-measure-article` (and `w-*`, `min-w-*`) through `--container-*`; and
  a long-form body size `--text-reading` (1.0625rem) with `--text-reading-lh`
  (1.7) in `tokens/typography.css`, generating `text-reading`.
- **`--header-height`** (3.5rem), mapped as `--spacing-header`, which
  generates `h-header`, `min-h-header`, `top-header`, `pt-header` and
  `scroll-mt-header`. In arithmetic use the raw variable:
  `h-[calc(100dvh-var(--header-height))]`.
- All of the above mirrored in `tokens.json` (`size.measure-prose`,
  `size.measure-article`, `size.header-height`, `text.reading`, and the ten
  `chart-*` colours).

  **Apps that keep their own entry-file `@theme inline` block must add the new
  mapping lines there** for the utilities to exist (Tailwind v4 only reads
  `@theme` from the entry file):

  ```css
  --container-measure-prose: var(--measure-prose);
  --container-measure-article: var(--measure-article);
  --spacing-header: var(--header-height);
  --text-reading: var(--text-reading);
  --text-reading--line-height: var(--text-reading-lh);
  ```

### Docs
- **Elevation rule stated:** shadows are for floating layers only (popovers,
  menus, tooltips, dialogs). A surface at rest is separated by a border or by
  spacing — one device per level. Cards are documented without `shadow-sm`
  and empty states without a dashed container (components, patterns, spacing
  and guidelines pages).
- Chart swatches, the reading size and measures, `--header-height` and a live
  rendered-markdown specimen added to the reference site.
- Decision 0001: the recorded `SegmentedControl` API now lists the option
  fields `title` and `disabled`. The verdict is unchanged.

## [0.2.1] — 2026-09-13

### Fixed
- `tokens/scrollbar.css` no longer restyles the document scrollbar. The
  rules excluded `html` but not `body`, and Chrome draws the viewport
  scrollbar from `body`'s `::-webkit-scrollbar` rules whenever body's
  overflow propagates to the viewport (the normal case), so the page bar
  came out 10px thin instead of native, contradicting the file's own
  contract. Both `html` and `body` are excluded now; every in-app overflow
  container is unchanged.

## [0.2.0] — 2026-09-13

### Added
- **Sizing tokens** for recurring layout widths, in `:root` only (sizes don't
  flip in dark): `--control-width-sm` (150px), `--control-search-min` (240px),
  `--control-search-max` (480px), `--rail-collapsed` (60px),
  `--rail-expanded` (264px), `--details-column` (320px). Mapped in
  `tokens/theme.css` under Tailwind v4's `--container-*` namespace, generating
  `w-control-sm`, `min-w-control-search-min`, `max-w-control-search-max`,
  `w-rail-collapsed`, `w-rail-expanded` and `w-details-column`; mirrored in
  `tokens.json` under a new `size` key. Documented on the spacing page.
  Apps that keep their own entry-file `@theme inline` block must add the six
  `--container-*` lines there for the utilities to exist.
- **Scrollbar tokens and stylesheet.** `--scrollbar-thumb` and
  `--scrollbar-thumb-hover` (translucent `--foreground` mixes, so they flip
  with `.dark` and keep contrast on every surface — `--border` is 10% white in
  dark and vanishes as a thumb), mirrored in `tokens.json` under `scrollbar`.
  New `tokens/scrollbar.css` (in the barrel; also exported as
  `./scrollbar.css`) draws a thin rounded thumb on a transparent track for
  every overflow container except the document, with a `.scrollbar-hover`
  class that reveals the bar only under the pointer for sticky side columns.
  WebKit pseudo-elements for Chrome/Safari, `scrollbar-width`/`scrollbar-color`
  for Firefox. Documented on the accessibility page.

### Fixed
- `tokens.json` `version` now matches `package.json` (it had drifted to `0.7.1`).

## [0.1.1] — 2026-06-21

### Changed
- **CI: publish to npm via OIDC Trusted Publishing.** Replaced the long-lived
  `NPM_TOKEN` with npm Trusted Publishing (`id-token: write`), upgraded the
  release job to npm ≥ 11.5.1 on Node 24, and now emit a provenance
  attestation automatically. No consumer-facing changes.

## [0.1.0] — 2026-06-21

### Added
- Initial release.
