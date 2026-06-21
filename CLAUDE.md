# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this repo is

`@vibexp/design-system` — the single source of truth for design tokens **and brand React components** across all shaharia-lab services (product app, website, blog, docs). It is the shadcn/ui default theme on a neutral (grayscale) base in OKLCH; the brand is deliberately monochrome with no accent hue. Dark mode is a value-flip on the `.dark` class.

Two distribution surfaces:
- **Tokens** — pure CSS/JSON, no build, framework-agnostic. Imported via the CSS barrel (`index.css`) or `tokens.json`. This is still the core.
- **React components** (`./react`) — TypeScript brand primitives (`Logo*`, `Icon`) in `src/react/`, compiled by tsup to `dist/react/`. React is a **peer dependency**; consumers that only want tokens never pull it in. This layer was added in v0.6.0 — the package is no longer tokens-only.

## Commands

The token layer needs no build. The React layer does. CI (`.github/workflows/ci.yml`) runs the full sequence — reproduce it locally before pushing:

```bash
npm ci             # install dev + peer deps (needed for the React layer)
npm run typecheck  # tsc --noEmit over src/
npm test           # vitest run — component tests in src/react/*.test.tsx
npm run build      # tsup → dist/react/ (also runs on publish via prepublishOnly)

# token + packaging checks (unchanged):
node -e "JSON.parse(require('fs').readFileSync('tokens.json','utf8'))"  # tokens.json valid JSON
# every package.json "exports" path resolves — note ./react resolves to dist/, so build first
npm pack --dry-run
```

`dist/` is gitignored and built in CI / on publish — never commit it. Preview the docs site by serving the repo root over HTTP (the pages fetch their JSX modules, so `file://` won't work) — e.g. `python3 -m http.server`, then open `/docs/index.html`. It loads React + Babel standalone from CDN and compiles the JSX in-browser, so there's no docs build step.

## Architecture: the token chain

Tokens flow through three files that must stay in sync. When adding a new token, wire it in all three:

1. **`tokens/tokens.css`** — source of truth. `:root` (light) + `.dark` custom properties. Every colour change needs both light *and* dark values.
2. **`tokens/theme.css`** — Tailwind v4 `@theme inline` block mapping variables → utilities (`--color-*`). Only needed if the token should generate a utility class.
3. **`tokens.json`** — machine-readable mirror for Figma/codegen/non-CSS consumers. Must always match `tokens.css`.

`index.css` is the barrel that imports `tokens/` files in the right order; it is the package's main entry. `tokens/fonts.css` holds font stacks (system sans for the app, Inter for website/blog/docs, Poppins legacy-only) and `tokens/prose.css` holds long-form `.prose` styles.

`docs/` is the live reference site (buildless React via Babel standalone). It is **multi-page**: `docs/index.html` is a catalog landing (hero + searchable card grid over every surface), and each foundation/library section is its own deep-linkable page under `docs/pages/*.html` (e.g. `pages/color.html`, `pages/components.html`). Every page loads only its own section, so they stay fast and are individually shareable. The shared chrome — sidebar nav, breadcrumb, theme toggle — lives in `docs/shared/shell.js` (the `Shell` component + the `DS_NAV` config, the single source of truth for the nav). The section content lives as `*Section` components in `docs/ds/*.jsx` (each exposed on `window`); a page composes one into `<Shell active="…">`. To add a section: add a `*Section` in `docs/ds/`, add a `DS_NAV` entry in `shell.js`, add a thin `docs/pages/<name>.html` (copy an existing page), and add a catalog card in `index.html`. Pages under `docs/pages/` set `window.DS_BASE = "../"` so the shared section modules resolve `../specimens/*` correctly.

**Page map** — every docs surface, what it covers, and the file to edit to change it. The page is a thin wrapper; the content lives in the `*Section` component in the source file:

| Page (serve root + this path)   | Renders            | Edit this source                       | Covers |
|---------------------------------|--------------------|----------------------------------------|--------|
| `docs/index.html`               | `Hero` + `Catalog` | `docs/index.html` (inline) + `CATALOG` array | Landing: hero, stat tiles, searchable card grid over every surface. Add a card here when you add a page. |
| `docs/pages/color.html`         | `ColorsSection`    | `docs/ds/foundations.jsx`              | Semantic colour tokens, status roles (destructive/success/warning/info), chart scale; live swatches per theme. |
| `docs/pages/typography.html`    | `TypographySection`| `docs/ds/foundations.jsx`              | `.type-*` role vocabulary, fluid display tiers, font stacks. |
| `docs/pages/spacing.html`       | `SpacingSection`   | `docs/ds/foundations.jsx`              | Spacing scale and every radius derived from the `--radius` seed. |
| `docs/pages/accessibility.html` | `AccessibilitySection` | `docs/ds/accessibility.jsx`        | Contrast targets, focus rings, motion, both-theme rules. |
| `docs/pages/components.html`    | `ComponentsSection`| `docs/ds/components-section.jsx`       | shadcn/ui primitive specimens (Button, Badge, …) with the authentic `className` strings to copy. |
| `docs/pages/brand-react.html`   | `BrandReactSection`| `docs/ds/brand-react.jsx`              | The shipped `./react` primitives — embeds `specimens/{logo,icon}.html` as iframes (real `dist/react/`). |
| `docs/pages/patterns.html`      | `PatternsSection`  | `docs/ds/patterns.jsx`                 | Composed layouts / recurring recipes built from the primitives. |
| `docs/pages/guidelines.html`    | `GuidelinesSection`| `docs/ds/patterns.jsx`                 | How to consume the system — the reference-roles-never-literals rules, do/don't guidance. |

Shared building blocks every page pulls in: `docs/ds/primitives.jsx` (`Icon`, `Section`, `SubHead`, `Chip`, `Example`, `PropTable`, `Callout`, `Btn`, `Badge`, `Logo*` — all assigned to `window`) and `docs/shared/shell.js` (`Shell`, `DS_NAV`, `useDsTheme`). The real-component specimens are `docs/specimens/{logo,icon,type-scale}.html`. So: to change *what a foundation says*, edit the `*Section` in `docs/ds/`; to change *the nav or chrome*, edit `docs/shared/shell.js`; to change *the landing/catalog*, edit `docs/index.html`.

Update the specimens when a foundation changes. The shell chrome uses hand-rolled buildless primitives; the **"Brand · React" page embeds `docs/specimens/*.html` as `<iframe>`s** that import the *real* built components (`dist/react/index.js`) via an import map + esm.sh — so that gallery is true to what ships, with no drift. Each specimen is a standalone page; frames track the theme toggle via `docs/specimens/_theme-sync.js`. **Run `npm run build` first** (the specimens need `dist/`), and serve over HTTP (ES modules don't load from `file://`) — e.g. `python3 -m http.server`.

## Architecture: the React layer (`./react`)

Brand React primitives live in `src/react/` as TypeScript (`.tsx`), compiled by tsup (`tsup.config.ts`) to `dist/react/` (ESM + `.d.ts`), exported at `@vibexp/design-system/react`. Currently: `Logo` / `LogoMark` / `LogoGlyph` / `LogoLockup` and the inline `Icon` set (+ `ICON_NAMES`, `IconName`).

- These consume tokens via CSS custom properties (`var(--foreground)`, `var(--font-inter)`), so they flip with `.dark` for free and add **no new hardcoded values** — the "reference roles, never literals" rule applies in `.tsx` too.
- `react` is a **peer dependency** (`>=18`); `react-dom` and the testing stack are dev-only. Don't add runtime dependencies lightly — a brand primitive should stay near-zero-dep.
- The `Icon` map is a **curated subset**, not a Lucide clone. For the full icon set in production, services use `lucide-react` directly — do not grow this map into a parallel icon library (it would drift from upstream Lucide). Add a glyph here only when it's needed buildless (docs/prototyping) or is a genuinely common product glyph.
- Every component has a colocated `*.test.tsx` (vitest + @testing-library/react, jsdom). Add tests with new components; they run in CI.

## Conventions

- Reference roles, never literals — no hard-coded hex/oklch values in consumers; if a value doesn't exist, add a token here first.
- No accent hues or gradients **in the brand** — brand emphasis is `--primary` (black in light, white in dark). Hue is allowed only for *functional* meaning: the status roles (`destructive`, `success`, `warning`, `info`, each with `-foreground` and `-subtle`) and the chart scale. Don't introduce a new hue for decoration; if you need one for state, it already exists here.
- Everything radius-related derives from the single seed `--radius: 0.625rem`.
- Commit messages use conventional prefixes (`feat:` / `fix:` / `docs:` / `refactor:`).
- This package owns tokens **and brand React primitives** (`Logo*`, `Icon`). It does **not** yet own the product UI kit — services still generate shadcn/ui components themselves (default style, neutral base). The boundary today: brand/identity primitives ship here; app-level primitives (Button, Card, forms, …) live in services. Promote a component into this package deliberately (it adds maintenance + a test), not by reflex.

## Release flow

Tag-driven, publishing to GitHub Packages (org-internal; repo is private and the package inherits that visibility):

1. Bump `version` in `package.json` (semver: patch = value tweak, minor = new token, major = rename/remove) **and** mirror it in `tokens.json`'s `version` field; add a dated `CHANGELOG.md` entry.
2. Commit to `main` and wait for CI to go green.
3. Tag `vX.Y.Z` (must exactly match `package.json` version — `release.yml` fails otherwise) and push the tag. That publishes the package and cuts a GitHub Release. `release.yml` runs `npm ci`, and `npm publish` triggers `prepublishOnly` → `npm run build`, so `dist/react/` is built fresh from source at publish time (it is never committed).

**The changelog gates the release — never release without it.** Before tagging any `vX.Y.Z`, `CHANGELOG.md` MUST already carry a dated `## [X.Y.Z]` entry for that exact version, on `main`, describing what ships. No changelog entry → do not tag. Update the changelog (and the two `version` fields) *first*, let that land on `main`, then release. There must be one changelog heading per released tag — don't leave an un-tagged version section behind (if work gets folded into a later release, fold its notes under that release's heading too).

Do not push a tag unless explicitly asked — pushing a `v*` tag triggers a release. Branch protection requires PRs to `main` (direct pushes only work via bypass).
