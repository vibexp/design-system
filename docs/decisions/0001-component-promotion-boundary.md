# 0001 — Which VibeXP app patterns move into the design system

- **Status:** Accepted · 2026-09-13
- **Issue:** vibexp/design-system#5 (epic vibexp/vibexp#899, phase P5)
- **Measured against:** `vibexp/vibexp@7514e90b70e02d183ae03fda0f9f4abd8c666e0e` (`frontend/src/`), `@vibexp/design-system@0.2.0`

## Decision in one paragraph

**Nothing is promoted now.** The package keeps shipping only components that
style themselves through CSS custom properties (`Logo*`, `Icon`) and does not
take on Tailwind-classed components or the shadcn/ui kit (**Q1: no, Q2: the
compositions stay in the app**). `SegmentedControl`, `ListPage` and `Panel` are
**deferred** with an explicit trigger to reopen them; `ReadingPage` and the
resource descriptor types are **rejected**. All five have one consumer today,
the VibeXP app. Promoting them would add a permanent consumer contract and
runtime dependencies to share code that nothing else uses yet.

## The two package-level questions

### Q1 — Does the package ship Tailwind-classed components (with `clsx` + `tailwind-merge`)?

**No, not yet.**

Every candidate is styled with Tailwind utility strings through the app's
`cn = twMerge(clsx(…))` (`lib/utils.ts`). Hosting even one of them here means:

1. **Two runtime dependencies**, `clsx` and `tailwind-merge`. That breaks the
   package's own rule that a primitive stays near-zero-dependency: `./react`
   currently has no runtime dependencies and `react` is only a peer. It also
   couples consumers to the package's `tailwind-merge` major (the app is on 3.x).
2. **A new consumer contract.** Tailwind only generates classes it finds while
   scanning, so every consumer would need to add the package's `dist/` to its
   sources (e.g. `@source "../node_modules/@vibexp/design-system/dist";`). A
   consumer that misses this gets unstyled components with no error.
3. **A Tailwind v4 requirement on consumers.** Today the token layer works with
   any framework or none; `Logo`/`Icon` read `var(--foreground)` and need no build.

Those costs are permanent. The benefit today is sharing code that only one
consumer uses.

**Reopen Q1 when** a second shaharia-lab surface (website, blog, docs, another
service) needs one of the deferred candidates. Then decide it together with
the consumer contract above, and write it down as a new decision that
supersedes this one.

### Q2 — Does the package host the shadcn/ui primitives, or take them injected?

**Neither for now: compositions of shadcn primitives stay in the app.**

Of the three shapes, (a) owning `Button`/`Card`/`Alert`/`Skeleton`/`Sheet`
would turn this repo into the product UI kit. `CLAUDE.md` explicitly places
that outside the boundary, and the app has already customised its copies (a
`chip` size on `ui/button.tsx:51`). (b) Injecting primitives through props or
slots makes every call site pass four components, which is worse ergonomics
than importing a local file. That leaves (c): compositions stay in the app, and
only dependency-free pieces are candidates. Under Q1's "no", even those wait.

## Verdicts

| Candidate | Verdict | Dependency closure (measured) | Why |
|---|---|---|---|
| `SegmentedControl` | **Defer** — first in line when Q1 reopens | `components/SegmentedControl.tsx`, 63 LOC; imports only `cn`; semantic tokens only; 3 importers | Technically the cleanest. Blocked only by Q1 |
| `ListPage` | **Defer** | `patterns/list-page/ListPage.tsx`, 215 LOC, + `PageHeader` (34) + `types` (16); shadcn `Alert`, `Button`, `Card`, `Skeleton`; `cn`; 16 importers | No domain imports, but needs Q2, and has hardcoded English strings (`"Failed to load"`, `"Showing X of Y"`, `"Previous"`/`"Next"`, naive `${noun}s` plural) that a shared component would have to take as props |
| `Panel` | **Defer** | `components/ui/panel.tsx`, 182 LOC; `Button` including the app-only `chip` size; `cn`; `text-[13px]` literal; 11 importers | Needs Q2 and the custom button size. Its own comment (lines 98–100) says `.type-card-title` (20px) is too large for panel titles in the app, which is a type-scale question to settle in tokens first |
| `ReadingPage` | **Reject** | `patterns/reading-page/ReadingPage.tsx`, 254 LOC, + `DetailsPanel` (108) + `ReadingActions` (147) + `types` (54) + app `layout/ShellContext` (175 → `constants/storageKeys`, `hooks/useLocalStorage`, `hooks/useMediaQuery`); shadcn `Sheet`, `Separator`, `Tooltip`; 15 importers | Bound to the app shell: nav/details collapse state, localStorage keys, and a header height assumed in `top-14 h-[calc(100dvh-3.5rem)]`. Making it portable means redesigning the shell contract, not moving a file |
| Resource descriptor types | **Reject** — not a design-system concern | `patterns/resource/types.ts` (323) + `defineResource.ts` (567); `StatusTone` from app `StatusBadge`; 35 importing files | No UI. It describes the VibeXP API's resources: filter source `'prompt-labels'`, form control `'project'`, OpenAPI-coupled field specs. If it is ever shared, it belongs in a VibeXP SDK/types package, not a design system |

## API each deferred candidate would ship with

Recorded so the follow-up, if Q1 reopens, starts from the current contract.

- **`SegmentedControl`** — `options: readonly { value: string; label: string }[]`,
  `value: string`, `onChange(value: string)`, `size?: "sm" | "md"`, `aria-label?`;
  exports `SegmentedOption`.
- **`ListPage`** (compound) — `ListPage.Header { title, description?, actions? }`,
  `.Container { className? }`, `.Filters`, `.Body { status: "loading" | "error" | "empty" | "ready", errorTitle?, errorMessage?, loadingRows? = 6, empty? }`,
  `.Footer { count?: { visible, total, noun, nounPlural? }, pagination?: { page, totalPages, onPageChange }, note?, hideCount? }`.
  A shared version would also need label props (or a `labels` object) for its
  English strings, plus `PageHeader { title, description?, actions?, className? }`.
- **`Panel`** — `PanelPresentationProvider { value: "card" | "flat" }`,
  `usePanelPresentation()`, `usePanelInset()`, and forwardRef `Panel`,
  `PanelHeader`, `PanelTitle { as? = "h3" }`, `PanelAction`, `PanelBody`,
  `PanelRow { as? }`.

## Consequences

- **No follow-up issues are opened.** None of the five is accepted. The
  deferred ones have a concrete trigger (above) rather than a ticket that would
  go stale.
- **The app keeps its implementations; nothing is duplicated.** The
  "no duplicate implementation" criterion holds because nothing moved.
- **`CLAUDE.md`'s boundary paragraph** now points here, so a future session
  doesn't reopen these five without new evidence.
- **Consumer-contract note for any future Tailwind-classed component:** it must
  ship with documented `@source` instructions and a test that fails when a
  class is missing from the built CSS. Class stripping fails silently.
- Observed but out of scope: the app's `styles/index.css` hardcodes `#0f172a` /
  `#ffffff` (lines 300–301), against the "reference roles, never literals" rule.
