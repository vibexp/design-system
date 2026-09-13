# Changelog

All notable changes to `@vibexp/design-system` are documented here.
This project adheres to [Semantic Versioning](https://semver.org/).

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
