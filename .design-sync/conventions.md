# @vibexp/design-system — how to build with it

This library ships the **brand primitives** for shaharia-lab / vibexp surfaces — the logo family and a curated icon set — on top of the shadcn-default, neutral-base, OKLCH **design tokens**. The brand is deliberately **monochrome**: emphasis is `--primary` (black in light, white in dark); there is **no accent hue**. Hue appears only for *functional* status meaning (`--destructive`, `--success`, `--warning`, `--info`) and the chart scale.

## Setup — no provider, just the tokens

There is **no provider or context wrapper**. Every component styles itself through CSS custom properties (`var(--foreground)`, `var(--font-inter)`, …), so the only requirement is that **`styles.css` is loaded** on the page — it defines all 177 tokens and pulls in the fonts. Without it the marks fall back to the browser default color/font. That's the single failure mode to avoid.

**Dark mode is a value-flip on `.dark`.** Add `class="dark"` to any ancestor and every token (and therefore every component) flips — the `LogoMark` tile inverts, the icons re-tint — with no prop changes.

## The styling idiom — typed props + token vars, not classes

These are **prop-driven** components. **They expose no CSS class vocabulary** — do not invent `bg-*` / `text-*` classes for them; style them via their props, and style your own surrounding layout with the DS **token variables**:

| Concern | Use |
|---|---|
| Text / surface color | `var(--foreground)`, `var(--background)`, `var(--muted-foreground)`, `var(--card)`, `var(--primary)` |
| Borders / focus | `var(--border)`, `var(--ring)` |
| Status (functional only) | `var(--destructive)`, `var(--success)`, `var(--warning)`, `var(--info)` |
| Radius | `var(--radius)` (single seed; all radii derive from it) |
| Type | `var(--font-inter)` (website/docs), `var(--font-system)` (app UI), `var(--font-mono)` |

**Reference roles, never literals** — never hard-code a hex/oklch value; if a role seems missing, it almost certainly exists as a token. Read `styles.css` and its `./tokens/*.css` imports (`tokens.css` = colors, `typography.css`, `fonts.css`) for the full list before styling.

## Component API (read each `<Name>.prompt.md` + `.d.ts` for detail)

- **`Logo`** / **`LogoLockup`** — mark + `vibexp.io` wordmark (Inter). Props: `size` (px, default 32), `wordmark` (string). `Logo` is the default brand usage; `LogoLockup` is its alias.
- **`LogoMark`** — the rounded tile with the waveform knocked out. Props: `size`, `radius` (defaults to ~26% of size).
- **`LogoGlyph`** — the bare waveform stroke, no tile; inherits `currentColor`.
- **`Icon`** — inline stroke icons. `name` is one of **33** built-in glyphs (`check`, `chevronDown`, `search`, `plus`, `x`, `info`, `alert`, `settings`, `rocket`, `github`, `bot`, … see `ICON_NAMES`). Props: `size` (default 16), `stroke` (default 2), `title` (a11y label). Icons render in `currentColor`, so tint them by setting `color` on a parent. This is a **curated subset** — in production apps, the full icon set comes from `lucide-react` directly.

## Idiomatic snippet

```tsx
// A brand header row — DS component for the mark, token vars for the glue.
<header style={{ display: "flex", alignItems: "center", gap: 16, padding: "12px 20px",
                 borderBottom: "1px solid var(--border)", background: "var(--background)",
                 color: "var(--foreground)", fontFamily: "var(--font-inter)" }}>
  <Logo size={28} />
  <button style={{ marginLeft: "auto", display: "inline-flex", alignItems: "center", gap: 8,
                   color: "var(--muted-foreground)", background: "none", border: "none", cursor: "pointer" }}>
    <Icon name="settings" size={16} /> Settings
  </button>
</header>
```
