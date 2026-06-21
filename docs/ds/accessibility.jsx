/* global React, Section, SubHead, SubNote, Example, PropTable, Callout, Icon, Btn, Badge */

/* Verified contrast pairings — ratios computed from the OKLCH tokens against
   their adjacent surface (sRGB, WCAG 2.1 relative-luminance formula). */
const CONTRAST = [
  ["Body text", "foreground / background", "19.8 : 1", "19.0 : 1", "AAA", "pass"],
  ["Primary button", "primary-foreground / primary", "17.2 : 1", "16.8 : 1", "AAA", "pass"],
  ["Secondary text", "muted-foreground / background", "4.74 : 1", "5.94 : 1", "AA", "pass"],
  ["Caption on muted fill", "muted-foreground / muted", "4.35 : 1", "5.46 : 1", "AA Large", "warn"],
  ["Status · success", "tone fg / 10% tint", "4.8 : 1", "8.9 : 1", "AA", "pass"],
  ["Status · warning", "tone fg / 12% tint", "5.1 : 1", "9.4 : 1", "AA", "pass"],
  ["Status · destructive", "tone fg / 10% tint", "5.7 : 1", "7.1 : 1", "AA", "pass"],
  ["Status · info", "tone fg / 12% tint", "5.2 : 1", "8.2 : 1", "AA", "pass"],
  ["Focus ring", "ring / background", "7.46 : 1", "5.0 : 1", "WCAG 2.2 ✓", "pass"],
  ["Hairline border", "border / background", "1.4 : 1", "—", "decorative", "info"],
];

const KEYMAP = [
  ["Tab / Shift+Tab", "Move focus forward / backward through all interactive elements."],
  ["Enter / Space", "Activate the focused button, link, checkbox or switch."],
  ["Arrow keys", "Move within a composite widget — tabs, radio group, menu, slider."],
  ["Esc", "Dismiss the open overlay (dialog, popover, tooltip) and restore focus to its trigger."],
  ["Focus trap", "While a modal dialog is open, Tab cycles inside it — focus never reaches the page behind."],
];

function StatusDot({ kind }) {
  const map = {
    pass: ["success", "Pass"],
    warn: ["warning", "Caution"],
    info: ["neutral", "Decorative"],
  };
  const [variant, label] = map[kind] || map.info;
  return <Badge variant={variant}>{label}</Badge>;
}

function AccessibilitySection() {
  return (
    <Section
      id="accessibility"
      eyebrow="Foundations"
      title="Accessibility"
      lead="A11y is built into the foundation, not bolted on afterwards. Import the tokens and every surface inherits accessible focus, motion and contrast behaviour for free. These are the guarantees the system makes — and the rules it asks of you in return."
    >
      <Callout>
        Shipped in <code>tokens/a11y.css</code> (in the barrel and exported as{" "}
        <code>@vibexp/design-system/a11y.css</code>): a token-driven{" "}
        <code>:focus-visible</code> ring on every interactive element,{" "}
        <code>prefers-reduced-motion</code> handling, and <code>.sr-only</code> /{" "}
        <code>.skip-link</code> utilities. Target: <strong>WCAG 2.1 AA</strong>.
      </Callout>

      {/* ---- CONTRAST ---- */}
      <SubHead>Colour contrast — verified</SubHead>
      <SubNote>
        Ratios computed from the OKLCH tokens against their adjacent surface. Normal text needs{" "}
        <code>4.5:1</code> (AA), large/bold text and non-text UI need <code>3:1</code>. Toggle the
        theme top-right; both modes are accounted for below.
      </SubNote>
      <div className="tokens" style={{ padding: 0, overflow: "hidden" }}>
        <table className="prop-table" style={{ margin: 0 }}>
          <thead>
            <tr>
              <th>Pairing</th>
              <th>Tokens</th>
              <th>Light</th>
              <th>Dark</th>
              <th>Grade</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {CONTRAST.map((r) => (
              <tr key={r[0]}>
                <td style={{ fontWeight: 600 }}>{r[0]}</td>
                <td><code style={{ fontSize: 11.5 }}>{r[1]}</code></td>
                <td style={{ fontVariantNumeric: "tabular-nums" }}>{r[2]}</td>
                <td style={{ fontVariantNumeric: "tabular-nums" }}>{r[3]}</td>
                <td>{r[4]}</td>
                <td><StatusDot kind={r[5]} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Callout>
        <b>One caution.</b> <code>muted-foreground</code> on a <code>muted</code> fill is{" "}
        <code>4.35:1</code> — fine for large or secondary text, but don't set small body copy in that
        exact pairing. On the page <code>background</code> the same token clears AA at{" "}
        <code>4.74:1</code>.
      </Callout>

      {/* ---- FOCUS ---- */}
      <SubHead>Focus ring</SubHead>
      <SubNote>
        The <code>--ring</code> token was lifted off the shadcn default (<code>oklch(0.708)</code>,
        only <code>2.58:1</code> on white — a WCAG 2.2 SC 1.4.11 failure) to{" "}
        <code>oklch(0.45)</code> in light (<code>7.46:1</code>) and <code>oklch(0.6)</code> in dark
        (<code>5:1</code>). Every interactive element gets it via <code>:focus-visible</code>, so
        mouse users keep a clean UI while keyboard users always see where they are.
      </SubNote>
      <Example
        code={`/* tokens/a11y.css — applied for you */
:where(a, button, input, select, textarea,
       summary, [tabindex]):focus-visible {
  outline: 2px solid var(--ring);
  outline-offset: 2px;
}
/* Never strip the outline without a replacement. */`}
      >
        <div className="col" style={{ gap: 14, alignItems: "flex-start" }}>
          <span className="subnote" style={{ margin: 0 }}>Tab to these — the ring is the real token:</span>
          <div className="row" style={{ gap: 12, flexWrap: "wrap" }}>
            <Btn variant="brand">Primary action</Btn>
            <Btn variant="outline">Secondary</Btn>
            <a href="#accessibility" className="nav-link" style={{ display: "inline-flex" }}>A link</a>
          </div>
        </div>
      </Example>

      {/* ---- KEYBOARD ---- */}
      <SubHead>Keyboard model</SubHead>
      <SubNote>
        Every component is operable with the keyboard alone. Build on native{" "}
        <code>&lt;button&gt;</code> / <code>&lt;a&gt;</code> where possible; custom controls mirror
        the role plus its <code>aria-*</code> state and key handling.
      </SubNote>
      <div className="tokens" style={{ padding: 0, overflow: "hidden" }}>
        <table className="prop-table" style={{ margin: 0 }}>
          <thead>
            <tr><th style={{ width: 180 }}>Key</th><th>Behaviour</th></tr>
          </thead>
          <tbody>
            {KEYMAP.map((k) => (
              <tr key={k[0]}>
                <td><code>{k[0]}</code></td>
                <td>{k[1]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ---- MOTION ---- */}
      <SubHead>Reduced motion</SubHead>
      <SubNote>
        Users who set “reduce motion” at the OS level get animation, transitions and smooth-scroll
        neutralised automatically — including the skeleton pulse. Nothing to wire per-component.
      </SubNote>
      <Example
        code={`@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.001ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.001ms !important;
  }
  html { scroll-behavior: auto; }
}`}
      >
        <div className="callout" style={{ margin: 0 }}>
          <Icon name="info" size={16} />
          <div>WCAG 2.3.3 — honoured globally by <code>tokens/a11y.css</code>.</div>
        </div>
      </Example>

      {/* ---- AUTHORING RULES ---- */}
      <SubHead>Rules for authors</SubHead>
      <SubNote>What the system can't enforce for you — own these when you compose UI.</SubNote>
      <PropTable
        cols={["Do", "Why"]}
        rows={[
          [<span>Pair every input with a visible <code>&lt;label htmlFor&gt;</code> tied to the input <code>id</code>.</span>,
            "Placeholder-as-label disappears on type and fails contrast. Labels are announced and clickable."],
          [<span>Give icon-only buttons an <code>aria-label</code> (or <code>.sr-only</code> text).</span>,
            "A bare “×” or hamburger reads as nothing to a screen reader."],
          [<span>Use native <code>&lt;button&gt;</code> / <code>&lt;a&gt;</code>; reach for ARIA only for custom widgets.</span>,
            "Native elements bring role, focus and keyboard behaviour at no cost."],
          [<span>Give images meaningful <code>alt</code> — or <code>alt=\"\"</code> if purely decorative.</span>,
            "Screen readers skip empty alt and announce meaningful ones."],
          [<span>Don't put critical info only in a tooltip.</span>,
            "Tooltips are hard to reach on touch and with assistive tech — keep them supplementary."],
        ]}
      />

      <Callout>
        <b>Label demo, done right.</b> The forms in the Components section render their label as a
        real <code>&lt;label htmlFor&gt;</code> bound to the field <code>id</code> — copy that markup,
        not placeholder-only fields.
      </Callout>
    </Section>
  );
}

Object.assign(window, { AccessibilitySection });
