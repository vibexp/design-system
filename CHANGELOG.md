# Changelog

All notable changes to `@vibexp/design-system` are documented here.
This project adheres to [Semantic Versioning](https://semver.org/).

## [0.1.1] — 2026-06-21

### Changed
- **CI: publish to npm via OIDC Trusted Publishing.** Replaced the long-lived
  `NPM_TOKEN` with npm Trusted Publishing (`id-token: write`), upgraded the
  release job to npm ≥ 11.5.1 on Node 24, and now emit a provenance
  attestation automatically. No consumer-facing changes.

## [0.1.0] — 2026-06-21

### Added
- Initial release.
