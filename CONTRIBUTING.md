# Contributing to `@vibexp/design-system`

This repo is the **single source of truth** for design tokens across every
shaharia-lab service (product app, website, blog, docs). A change here is a
change everywhere — so the bar is consistency, not speed.

> **TL;DR:** edit a token → bump the version → update the changelog →
> commit to `main` → tag a release. Consumers opt in by pinning the new tag.

---

## What lives where

| File | Change this when… |
| --- | --- |
| `tokens/tokens.css` | A colour value, the radius seed, or a `:root` / `.dark` token changes. **This is the source of truth.** |
| `tokens/theme.css` | You add/remove a token that needs a Tailwind utility (`@theme inline`), or change the radius scale. |
| `tokens/prose.css` | Long-form (blog/docs) typography changes. |
| `tokens/fonts.css` | A typeface or font stack changes. |
| `tokens.json` | **Always mirror** any colour/radius/font change you made in `tokens.css` — non-CSS consumers (Figma, codegen) read this. |
| `brand/` | The logo or wordmark changes. |
| `docs/` | The reference site — update specimens/copy when foundations change. |

**Golden rule:** never hard-code a hex/oklch literal in a consuming service.
If a service needs a value that doesn't exist yet, add a **token here** first.

---

## Making a change

### 1. Edit the token(s)
Keep light and dark in sync, and keep `tokens.json` matching `tokens.css`.
If you add a brand-new token, wire it in three places:
`tokens/tokens.css` (value) → `tokens/theme.css` (`--color-*` mapping, if it
needs a utility) → `tokens.json` (machine-readable mirror).

### 2. Bump the version (semver)
In `package.json` and add a dated entry to `CHANGELOG.md`.

| Bump | When | Example |
| --- | --- | --- |
| **patch** `0.1.x` | A value tweak, typo, doc fix — visually backwards-compatible. | nudge `--ring` lightness |
| **minor** `0.x.0` | Add a token / component / pattern. Nothing existing breaks. | add a `warning` status token |
| **major** `x.0.0` | Rename or remove a token, or any breaking change. | rename `--primary` |

### 3. Commit & push to `main`
```bash
git add .
git commit -m "feat(tokens): add warning status token"   # or fix:/docs:/refactor:
git push origin main
```
CI runs automatically: validates `tokens.json`, checks every `package.json`
exports path resolves, and dry-run packs. Keep it green.

### 4. Tag a release
The tag **must** match the `version` in `package.json`.
```bash
git tag v0.2.0
git push origin v0.2.0
```
`release.yml` verifies the tag matches, publishes to GitHub Packages, and cuts
a GitHub Release with generated notes.

### 5. Consumers opt in
Each service updates when it's ready — nothing auto-changes under them:
```bash
npm install github:vibexp/design-system#v0.2.0
```

---

## Working with the design partner (Claude)

Design-level changes — new tokens, components, patterns, prose, marketing,
docs — are best made in the **design project**, where the full context lives
(the `vibexp.io` codebase + this repo + the docs site). Ask there with a
specific request, e.g.:

- "Add a `warning` + `info` status token to the system."
- "Document the website hero + pricing patterns."
- "Add Dialog and Dropdown to the components docs."

You'll get edited files back to push through the loop above.

**Important — avoid overwrites:** the design project edits its own copy of
these files. If the team has pushed changes to this repo directly since the
last design session, say so (or point at the repo) so it re-syncs **before**
editing — otherwise a regenerated file could clobber a manual change.

For tiny mechanical edits (a single hex value, a version bump), it's fine to
edit here in GitHub directly and run the loop yourself.

---

## Checklist before you push

- [ ] Light **and** dark values updated (if a colour changed)
- [ ] `tokens.json` mirrors `tokens/tokens.css`
- [ ] New token also mapped in `tokens/theme.css` (if it needs a utility)
- [ ] `docs/` specimen updated (if a foundation changed)
- [ ] `package.json` version bumped + `CHANGELOG.md` entry added
- [ ] Commit message uses a conventional prefix (`feat:` / `fix:` / `docs:`)
- [ ] Tag pushed **only after** CI is green on `main`
