# design-sync notes — @vibexp/design-system

Package shape (no Storybook). Ships 5 brand primitives (`Logo`, `LogoLockup`, `LogoMark`, `LogoGlyph`, `Icon`) + the OKLCH token set. Synced to Claude Design project **@vibexp/design-system** (`9ad1e41e-ed1f-4b6e-9928-a9e9892f619e`).

## Repo-specific gotchas (why the config looks the way it does)

- **Components live under `exports["./react"]`, not `.`.** The package's main `.` export is CSS (`index.css`), and there is **no top-level `types` field** — types are only under `exports["./react"].types`. So the converter's auto-discovery (`exportedNames`/`findTypesRoot`) finds **zero** components (`[ZERO_MATCH]` → tokens-only). Fixed by pinning all 5 in **`componentSrcMap`** → their `src/react/*.tsx`. The build `--entry` is `./dist/react/index.js` (the real ESM bundle with the named exports).
- **Tokens are in-repo (`tokens/*.css`), not a node_modules package.** `copyTokens` only copies from a package under `node_modules`. Fixed by **symlinking the repo as its own package** and setting `tokensPkg: "@vibexp/design-system"` + `tokensGlob: "tokens/*.css"`:
  ```sh
  mkdir -p node_modules/@vibexp && ln -sfn ../.. node_modules/@vibexp/design-system
  ```
  **This symlink is gitignored (node_modules) — recreate it on every fresh clone before running the converter**, or tokens won't copy and every design renders unstyled.
- **Do NOT set `cssEntry` to the barrel `index.css`.** It has (a) commented example lines `@import 'tailwindcss';` / `@import '@vibexp/design-system';` that the validate scanner false-flags as `[CSS_IMPORT_MISSING]`, and (b) relative `@import './tokens/*'` that don't self-resolve in the bundle. With `cssEntry` unset, `_ds_bundle.css` is the runtime stub (`[CSS_RUNTIME]`, expected — components self-style via inline CSS vars) and `styles.css` `@import`s the copied `./tokens/*.css` directly. This is correct — leave `cssEntry` out.
- **Group = Brand via docsMap stubs.** `src/react` → group would be `general` (`react` is in the converter's `GENERIC_DIR`). Frontmatter-only stubs in `.design-sync/docs/<Name>.md` (`category: Brand`) regroup without replacing the synthesized `.prompt.md` bodies.
- **`dtsPropsFor.Icon` is hand-written.** `Icon` extends `React.SVGProps`, so auto-extraction truncated the 33-name `name` union (`+17 more`) and added a noisy internal `ref` type. The override carries the full 33-name union + clean props.
- **Playwright:** cache had `chromium-1217` → pinned **playwright@1.59.1** in `.ds-sync` (repo has no playwright of its own).

## Known render warns

- `[CSS_RUNTIME] _ds_bundle.css is the runtime-styles stub` — **expected**. These components carry no CSS classes; they self-style via inline `style` + CSS custom properties. Not a defect.
- `[DTS_STYLE_SYSTEM] filtering @types/react props` — expected; SVG/HTML-attribute shorthands filtered from the props. Real API (`size`/`radius`/`wordmark`/`name`/`stroke`/`title`) is preserved (Icon via `dtsPropsFor`).

## Fonts

Inter + Poppins load via a **remote Google Fonts `@import`** inside `tokens/fonts.css` (`[FONT_REMOTE]`, informational). Nothing is shipped in `fonts/`; the families load at runtime. No `[FONT_MISSING]`.

## Re-sync risks (what can silently go stale)

- **The `node_modules/@vibexp/design-system` symlink** must exist (recreate on fresh clone — see above). Without it, `tokensPkg` fails to resolve, `styles.css` gets no token imports, and designs render unstyled.
- **`dist/react/` must be freshly built** (`npm run build`) before the converter — it's gitignored/built in CI.
- **`dtsPropsFor.Icon` drifts from source.** It is a hand-maintained mirror of `ICON_PATHS`. If icons are added/removed in `src/react/Icon.tsx`, update the union in `.design-sync/config.json` **and** the "33"/name list in `.design-sync/conventions.md`.
- **`conventions.md` hard-codes the icon count (33) and sample names.** Re-validate against `ICON_NAMES` / the built `Icon.d.ts` on every re-sync.
- **`componentSrcMap` lists all 5 explicitly.** If the React layer grows (e.g. a new brand primitive), add it to `componentSrcMap` + a `.design-sync/docs/<Name>.md` stub — auto-discovery will NOT pick it up (see the `exports["./react"]` gotcha).
- Repo `package.json` version (0.1.1) and `tokens.json` version (0.7.1) disagree — cosmetic, not a sync concern, but noted.
