/* global React, Section, SubHead, SubNote, Example, PropTable, Callout, Chip, Icon, Badge,
   LogoMark, LogoGlyph, LogoLockup */

/* ---- color token data (verbatim from index.css) -------------------- */
const SEMANTIC = [
  ["background", "bg-background", "oklch(1 0 0)", "oklch(0.145 0 0)", "App surface base"],
  ["foreground", "text-foreground", "oklch(0.145 0 0)", "oklch(0.985 0 0)", "Primary text"],
  ["card", "bg-card", "oklch(1 0 0)", "oklch(0.205 0 0)", "Card surface"],
  ["card-foreground", "text-card-foreground", "oklch(0.145 0 0)", "oklch(0.985 0 0)", "Text on cards"],
  ["popover", "bg-popover", "oklch(1 0 0)", "oklch(0.205 0 0)", "Menus, dropdowns"],
  ["primary", "bg-primary", "oklch(0.205 0 0)", "oklch(0.922 0 0)", "Primary action"],
  ["primary-foreground", "text-primary-foreground", "oklch(0.985 0 0)", "oklch(0.205 0 0)", "Text on primary"],
  ["secondary", "bg-secondary", "oklch(0.97 0 0)", "oklch(0.269 0 0)", "Secondary action"],
  ["muted", "bg-muted", "oklch(0.97 0 0)", "oklch(0.269 0 0)", "Muted fills"],
  ["muted-foreground", "text-muted-foreground", "oklch(0.556 0 0)", "oklch(0.708 0 0)", "Secondary text"],
  ["accent", "bg-accent", "oklch(0.97 0 0)", "oklch(0.269 0 0)", "Hover / highlight"],
  ["destructive", "bg-destructive", "oklch(0.577 0.245 27.3)", "oklch(0.704 0.191 22.2)", "Danger / delete"],
  ["success", "bg-success", "oklch(0.52 0.14 150)", "oklch(0.7 0.15 150)", "Success / active"],
  ["warning", "bg-warning", "oklch(0.7 0.145 75)", "oklch(0.78 0.15 80)", "Warning / pending"],
  ["info", "bg-info", "oklch(0.52 0.13 245)", "oklch(0.68 0.16 245)", "Info / running"],
  ["border", "border-border", "oklch(0.922 0 0)", "oklch(1 0 0 / 10%)", "Hairline borders"],
  ["input", "border-input", "oklch(0.922 0 0)", "oklch(1 0 0 / 15%)", "Field borders"],
  ["ring", "ring-ring", "oklch(0.45 0 0)", "oklch(0.6 0 0)", "Focus ring · WCAG 2.2 ≥3:1"],
];

const SIDEBAR = [
  ["sidebar", "oklch(0.985 0 0)", "oklch(0.205 0 0)"],
  ["sidebar-foreground", "oklch(0.145 0 0)", "oklch(0.985 0 0)"],
  ["sidebar-primary", "oklch(0.205 0 0)", "oklch(0.488 0.243 264)"],
  ["sidebar-accent", "oklch(0.97 0 0)", "oklch(0.269 0 0)"],
  ["sidebar-border", "oklch(0.922 0 0)", "oklch(1 0 0 / 10%)"],
];

const STATUS = [
  ["destructive", "Failed", "irreversible / error state"],
  ["success", "Active", "completed, healthy, running ok"],
  ["warning", "Pending", "needs attention, degraded"],
  ["info", "Running", "neutral informational state"],
];

/* [token, hue, light, dark] */
const CHART = [
  ["chart-1", "neutral", "oklch(0.45 0.02 255)", "oklch(0.78 0.02 255)"],
  ["chart-2", "blue", "oklch(0.55 0.14 250)", "oklch(0.68 0.14 250)"],
  ["chart-3", "teal", "oklch(0.6 0.1 185)", "oklch(0.72 0.11 185)"],
  ["chart-4", "amber", "oklch(0.65 0.13 75)", "oklch(0.8 0.14 75)"],
  ["chart-5", "violet", "oklch(0.55 0.15 300)", "oklch(0.7 0.15 300)"],
];

function TokenRow({ name, tw, val, dark, desc, swatchVar }) {
  return (
    <div className="token-row">
      <span className="swatch" style={{ background: "var(--" + (swatchVar || name) + ")" }} />
      <span className="token-name">--{name}</span>
      {tw ? <span className="token-tw">{tw}</span> : <span className="token-val">{val}</span>}
      <span className="token-desc">{desc}</span>
    </div>
  );
}

function SwatchCard({ name, label }) {
  return (
    <div className="swatch-card">
      <div className="swatch-card__chip" style={{ background: "var(--" + name + ")" }} />
      <div className="swatch-card__meta">
        <div className="swatch-card__name">--{name}</div>
        <div className="swatch-card__val">{label}</div>
      </div>
    </div>
  );
}

function ColorsSection() {
  return (
    <Section
      id="colors"
      eyebrow="Foundations"
      title="Color"
      lead="Every colour is a semantic CSS variable in the OKLCH colour space — never a raw hex. The neutral base ships pure grayscale; components reference roles (primary, muted, destructive…) so the entire UI re-themes by swapping the token, and dark mode is a value flip on .dark with zero component changes."
    >
      <Callout>
        Defined once in <code>src/styles/index.css</code> under <code>:root</code> and{" "}
        <code>.dark</code>, then exposed to Tailwind via <code>@theme inline</code> as{" "}
        <code>--color-*</code>. Use the role, e.g. <code>bg-primary</code>, not the literal value.
      </Callout>

      <SubHead>Semantic tokens</SubHead>
      <SubNote>
        Swatch shows the live value for the current mode. Toggle the theme in the top bar to see the
        dark value resolve in place.
      </SubNote>
      <div className="tokens">
        {SEMANTIC.map((t) => (
          <TokenRow key={t[0]} name={t[0]} tw={t[1]} desc={t[4]} />
        ))}
      </div>

      <SubHead>Brand color</SubHead>
      <SubNote>
        VibeXP's brand is <strong>neutral black</strong>. There is no accent hue. Every brand
        moment — primary actions, active nav, the logomark, links — uses the global{" "}
        <code>--primary</code> token: near-black in light, near-white in dark. The codebase makes
        this a rule, not a coincidence.
      </SubNote>
      <Callout>
        From <code>website/src/pages/features/FeaturePageTemplate.tsx</code>:{" "}
        <em>“global neutral <code>--primary</code> token — no per-feature accents or gradients.”</em>{" "}
        Status and data-viz colour live in the tonal + chart scales below; the brand itself stays
        monochrome.
      </Callout>
      <div className="swatch-grid">
        <SwatchCard name="primary" label="oklch(0.205 0 0) · the brand" />
        <SwatchCard name="primary-foreground" label="oklch(0.985 0 0) · on primary" />
        <SwatchCard name="foreground" label="oklch(0.145 0 0) · body text" />
        <SwatchCard name="accent" label="oklch(0.97 0 0) · hover / active" />
      </div>

      <SubHead>Logo</SubHead>
      <SubNote>
        A black tile (<code>rx 90 / 512 ≈ 18%</code> radius) carrying a knocked-out activity-pulse
        glyph — the brand made literal: monochrome, no gradient. The marks are{" "}
        <strong>theme-aware</strong>: the tile is <code>currentColor</code> and the glyph knocks out to{" "}
        <code>--background</code>, so when the SVG is <em>inlined</em> it flips automatically for dark
        mode. Loaded as an <code>&lt;img&gt;</code> it renders the static black-on-white fallback.
      </SubNote>

      {/* live, theme-aware specimens (inline SVG) */}
      <Example center>
        <div className="row" style={{ gap: 22, alignItems: "center", flexWrap: "wrap" }}>
          <div className="logo-frame is-light">
            <LogoMark size={60} radius={15} />
            <span className="token-val">mark · light</span>
          </div>
          <div className="logo-frame is-dark">
            <LogoMark size={60} radius={15} />
            <span className="token-val">mark · dark (auto-flip)</span>
          </div>
          <div className="sh-separator sh-separator--v" style={{ height: 76 }} />
          <div className="logo-frame is-light">
            <LogoGlyph size={56} />
            <span className="token-val">mono · glyph only</span>
          </div>
          <div className="logo-frame is-light">
            <LogoLockup size={34} />
            <span className="token-val">lockup · Inter</span>
          </div>
        </div>
      </Example>

      <SubNote>
        Three files, three jobs. All live in <code>brand/</code> and ship in the package
        (<code>@vibexp/design-system/brand/*</code>).
      </SubNote>
      <PropTable
        cols={["File", "Role", "Use it for"]}
        rows={[
          [<code>logo.svg</code>, "Primary mark — tile + pulse", "App icon, sidebar, favicon source, anywhere the brand tile reads"],
          [<code>logo_wu.svg</code>, "Lockup — mark + wordmark", "Splash, marketing headers, OG images, email — where the name must read"],
          [<code>logo-mono.svg</code>, "Single-ink glyph, no tile", "Watermarks, dense UI, CSS masks, one-colour print/stamp"],
        ]}
      />

      <Callout>
        <b>Inline to theme, <code>&lt;img&gt;</code> for simplicity.</b> An <code>&lt;img&gt;</code> is
        opaque to page CSS, so <code>currentColor</code> can't flip it — it stays black-on-white (a
        fine static fallback). To get the automatic dark-mode flip, <em>inline</em> the SVG (import as
        a component / raw markup) inside an element whose <code>color</code> is the foreground.
      </Callout>

      <SubNote>
        Prefer a CSS lockup over the baked-text SVG when you can — it uses the live{" "}
        <code>--font-inter</code> webfont and stays crisp at any size:
      </SubNote>
      <Example
        code={`/* mark + live brand type — preferred lockup */
<span style="display:inline-flex;align-items:center;gap:10px;
             color:var(--foreground)">
  <!-- inline contents of brand/logo.svg here -->
  <span style="font-family:var(--font-inter);font-weight:700;
               letter-spacing:-.02em">vibexp.io</span>
</span>`}
      >
        <LogoLockup size={40} />
      </Example>

      <PropTable
        cols={["Do", "Don't"]}
        rows={[
          ["Keep clearspace ≥ the tile's corner radius on all sides", "Crowd the mark against text or edges"],
          ["Let it flip via currentColor, or use the right static file", "Recolour the tile to a brand hue — there isn't one"],
          ["Use logo-mono where a single ink is required", "Re-add a drop shadow, gradient or outline to the glyph"],
          ["Scale the whole SVG uniformly", "Stretch, skew, or rebuild the pulse path"],
        ]}
      />

      <Callout>
        <b>Distribution is package-only.</b> Services <em>reference</em> these files from the installed
        package — never copy the SVG into a service repo. To change the logo everywhere: edit it here,
        bump the version, and each service picks it up on its next dependency update.
      </Callout>

      <SubHead>Semantic status roles</SubHead>
      <SubNote>
        Functional status colour — the one place hue is allowed outside the brand. Each role ships a{" "}
        <strong>solid</strong> (<code>--x</code> + <code>--x-foreground</code>) for badges and a{" "}
        <strong>subtle</strong> (<code>--x-subtle</code>) for alert panels. On a subtle panel the body
        text stays <code>--foreground</code> (≈17:1) and the solid colours the icon, border and title.
        Every pairing clears WCAG AA. Toggle the theme to see the dark values resolve.
      </SubNote>
      <Example
        code={`{/* solid badge */}
<span className="bg-success text-success-foreground">Active</span>

{/* subtle alert: tinted bg, neutral body, role-coloured accent */}
<div className="bg-warning-subtle border-warning">
  <Icon className="text-warning" /> Pending review…
</div>`}
      >
        <div className="col" style={{ gap: 14, width: "100%" }}>
          <div className="row" style={{ gap: 8, flexWrap: "wrap" }}>
            {STATUS.map(([role, label]) => (
              <span
                key={role}
                style={{
                  background: "var(--" + role + ")",
                  color: "var(--" + role + "-foreground)",
                  borderRadius: "var(--radius-md)",
                  padding: "3px 10px",
                  fontSize: 12,
                  fontWeight: 600,
                }}
              >
                {label}
              </span>
            ))}
          </div>
          <div className="col" style={{ gap: 8, width: "100%" }}>
            {STATUS.map(([role, , line]) => (
              <div
                key={role}
                style={{
                  background: "var(--" + role + "-subtle)",
                  border: "1px solid var(--" + role + ")",
                  borderRadius: "var(--radius-lg)",
                  padding: "10px 12px",
                  color: "var(--foreground)",
                  fontSize: 13,
                  display: "flex",
                  gap: 8,
                  alignItems: "center",
                }}
              >
                <span style={{ width: 8, height: 8, borderRadius: 99, background: "var(--" + role + ")", flexShrink: 0 }} />
                <span style={{ fontWeight: 600, color: "var(--" + role + ")" }}>--{role}</span>
                <span style={{ color: "var(--muted-foreground)" }}>{line}</span>
              </div>
            ))}
          </div>
        </div>
      </Example>

      <SubHead>Chart palette</SubHead>
      <SubNote>
        Five categorical colours (<code>--chart-1</code>…<code>--chart-5</code>) for data viz, in{" "}
        <strong>one hue order in both themes</strong> — neutral, blue, teal, amber, violet — so a
        series keeps its identity when the theme flips; only lightness moves. The set leads with a
        neutral, so a single-series chart reads as data rather than as a status. Every colour clears
        3:1 against <code>--card</code> in both themes.
      </SubNote>
      <div className="swatch-grid">
        {CHART.map((c) => (
          <SwatchCard key={c[0]} name={c[0]} label={c[1] + " · " + c[2] + " · dark " + c[3]} />
        ))}
      </div>
      <Callout>
        Assign series in order, <code>--chart-1</code> first. Blue (<code>--chart-2</code>) and violet
        (<code>--chart-5</code>) sit at the same lightness and merge for red-green colour blindness:
        a chart that plots both needs a second cue — direct labels, a dash pattern or a marker shape.
      </Callout>

      <SubHead>Sidebar surface</SubHead>
      <SubNote>A dedicated token group so app navigation can diverge from the main canvas.</SubNote>
      <div className="tokens">
        {SIDEBAR.map((s) => (
          <TokenRow key={s[0]} name={s[0]} val={s[1]} desc={"light " + s[1] + "  ·  dark " + s[2]} />
        ))}
      </div>
    </Section>
  );
}

/* ---- typography ---------------------------------------------------- */
/* The canonical .type-* role vocabulary (tokens/typography.css). Every surface
   shares these — they replace website/blog's typography.tsx and frontend's
   ad-hoc text-[…]. [role, class, size, weight, tracking, use] */
const TYPE_ROLES = [
  ["Display", "type-display", "fluid 36 → 60px", "700", "tighter", "Marketing hero headline"],
  ["Title", "type-title", "fluid 36 → 48px", "700", "tight", "Standalone page title (H1)"],
  ["Section", "type-section", "fluid 30 → 48px", "700", "tight", "Section-band heading"],
  ["Heading", "type-heading", "24px", "700", "tight", "Panel / prominent in-card heading"],
  ["Card title", "type-card-title", "20px", "600", "tight", "Card / feature / step title"],
  ["Stat", "type-stat", "fluid 30 → 36px", "700", "tight · tabular-nums", "Numeric stat value"],
  ["Lead", "type-lead", "fluid 18 → 20px", "400", "muted", "Lead paragraph under a heading"],
  ["Body", "type-body", "16px", "400", "—", "Default body copy"],
  ["Body sm", "type-body-sm", "14px", "400", "—", "Dense / secondary body"],
  ["Label", "type-label", "14px", "500", "—", "Form labels"],
  ["Caption", "type-caption", "14px", "400", "muted", "Captions, helper text"],
  ["Overline", "type-overline", "12px", "600", "wider · UPPERCASE", "Eyebrows, section kickers"],
  ["Code", "type-code", "14px", "400", "mono", "Inline code"],
];

/* prose heading scale — verbatim from .prose overrides (blog + docs) */
const PROSE_SCALE = [
  ["prose h1", "1.5rem / 24px", "700", "2rem", 24, 700],
  ["prose h2", "1.25rem / 20px", "600", "1.75rem", 20, 600],
  ["prose h3", "1.125rem / 18px", "600", "1.5rem", 18, 600],
  ["prose h4", "1.125rem / 18px", "600", "1.5rem", 18, 600],
  ["prose h5", "1rem / 16px", "600", "1.5rem", 16, 600],
  ["prose h6", "0.875rem / 14px", "600", "1.25rem", 14, 600],
  ["prose body", "0.875rem / 14px", "400", "1.75", 14, 400],
];

function TypographySection() {
  return (
    <Section
      id="typography"
      eyebrow="Foundations"
      title="Typography"
      lead="Three typefaces, one per surface. The frontend app (shadcn v2) renders on a native system-ui stack; the public website, blog and docs run on Inter; Poppins is held back to legacy v1 pages only. All three are bound to the same token-driven sizing."
    >
      <div className="row" style={{ gap: 16, marginTop: 8, alignItems: "stretch" }}>
        <TypeCard
          name="System sans"
          font="var(--font-system)"
          stack="ui-sans-serif, system-ui, -apple-system…"
          badge="App · v2"
          badgeVariant="default"
          weights="Native weights"
          use="Frontend product UI (.v2-root)"
        />
        <TypeCard
          name="Inter"
          font="var(--font-inter)"
          stack="'Inter', system-ui, Avenir…"
          badge="Web · blog · docs"
          badgeVariant="success"
          weights="400 · 500 · 600 · 700 · 800"
          use="Website, blog & documentation"
        />
        <TypeCard
          name="Poppins"
          font="var(--font-poppins)"
          stack="'Poppins', Inter, system-ui…"
          badge="Legacy · v1"
          badgeVariant="neutral"
          weights="300 → 900"
          use="Legacy v1 app pages only"
        />
      </div>

      <Callout>
        Surface → font is deterministic: <code>.v2-root</code> ⇒ system sans · website /{" "}
        <code>.prose</code> ⇒ Inter · v1 ⇒ Poppins. Bodies bind to the design tokens, so unstyled
        text already matches the monochrome system. Don't bring Poppins into v2 components.
      </Callout>

      <SubHead>Semantic type roles</SubHead>
      <SubNote>
        The canonical <code>.type-*</code> vocabulary — the public API every surface shares (it
        replaces the per-site <code>typography.tsx</code> and ad-hoc <code>text-[…]</code>). Roles
        are surface-agnostic: family inherits (system sans here, Inter on the web). The display tier
        and <code>.type-lead</code> are fluid via <code>clamp()</code>; <code>.type-lead</code> and{" "}
        <code>.type-caption</code> bake in the muted colour.{" "}
        <a href={(window.DS_BASE || "") + "specimens/type-scale.html"} target="_blank" rel="noreferrer">Full specimen ↗</a>
      </SubNote>
      <div className="tokens" style={{ padding: "4px 22px" }}>
        {TYPE_ROLES.map((t, i) => (
          <div className="type-scale-row" key={i}>
            <div className="type-scale-meta">
              <Chip text={`.${t[1]}`} />
              <span className="type-scale-spec">{t[2]} · {t[3]} · {t[4]}</span>
              <span className="type-scale-spec" style={{ color: "var(--muted-foreground)" }}>{t[5]}</span>
            </div>
            <div className={t[1]} style={{ minWidth: 0 }}>
              {t[1] === "type-code"
                ? "npm i @vibexp/design-system"
                : t[1] === "type-stat"
                  ? "1,248"
                  : "Generate, review and ship in one flow"}
            </div>
          </div>
        ))}
      </div>

      <SubHead>Long-form / prose scale</SubHead>
      <SubNote>
        The <code>.prose</code> system for blog posts and docs — exact values from the{" "}
        <code>@tailwindcss/typography</code> overrides. Body is <code>14px / 1.75</code>; headings
        step down from <code>24 → 14px</code>. Links use <code>--primary</code>. Inline code sits on{" "}
        <code>--muted</code> at regular weight — the background marks it as code, and bold monospace
        shouts in dense text. A blockquote is upright and gains no quote marks: a quoted instruction
        must not show characters that are not in its source.
      </SubNote>
      <div className="tokens" style={{ padding: "4px 22px", marginBottom: 18 }}>
        {PROSE_SCALE.map((t, i) => (
          <div className="type-scale-row" key={i}>
            <div className="type-scale-meta">
              <Chip text={t[0]} />
              <span className="type-scale-spec">{t[1]} · {t[2]} · lh {t[3]}</span>
            </div>
            <div style={{ fontSize: t[4], fontWeight: t[5], lineHeight: 1.2 }}>
              Configure your first agent
            </div>
          </div>
        ))}
      </div>
      <Example block code={`<article className="prose">
  <h2>…</h2><p>…</p>
</article>`}>
        <div className="ds-prose" style={{ maxWidth: 640 }}>
          <h2>Configure your first agent</h2>
          <p>
            Agents run autonomously inside your workspace. Give one a clear instruction, connect a{" "}
            <a href="#typography">trigger</a>, and it will execute on every matching event. Keep
            prompts specific — <code>label by severity</code> beats <code>handle issues</code>.
          </p>
          <h3>What you'll need</h3>
          <ul>
            <li>A connected repository or inbox</li>
            <li>A model with enough context budget</li>
            <li>At least one trigger or schedule</li>
          </ul>
          <blockquote>Start narrow, then widen the agent's scope as you trust its output.</blockquote>
        </div>
      </Example>

      <SubHead>Reading size & measure</SubHead>
      <SubNote>
        A page that is read rather than scanned — an article, a document — sets its body at{" "}
        <code>--text-reading</code> (17px, leading 1.7) and caps the line at{" "}
        <code>--measure-prose</code> (40rem, about 80 characters). The 14px <code>.prose</code>{" "}
        default stays for every other surface (cards, feeds, previews). Wide blocks — code, tables,
        diagrams — may run past the prose column up to <code>--measure-article</code> (64rem).
      </SubNote>
      <PropTable
        cols={["Token", "Value", "Utility", "Role"]}
        rows={[
          [<code>--text-reading</code>, "1.0625rem · 17px, lh 1.7", <Chip text="text-reading" />, "Long-form body type"],
          [<code>--measure-prose</code>, "40rem · 640px", <Chip text="max-w-measure-prose" />, "Longest line of running prose"],
          [<code>--measure-article</code>, "64rem · 1024px", <Chip text="max-w-measure-article" />, "Reading article; ceiling for a wide block"],
        ]}
      />
      <Example block code={`<article className="max-w-measure-article">
  <div className="prose text-reading [&>*]:max-w-measure-prose">…</div>
</article>`}>
        <div className="ds-prose" style={{ maxWidth: "var(--measure-prose)", fontSize: "var(--text-reading)", lineHeight: "var(--text-reading-lh)" }}>
          <p style={{ margin: 0 }}>
            Agents run autonomously inside your workspace. Give one a clear instruction, connect a
            trigger, and it will execute on every matching event. A line this long is about as far as
            the eye follows back to the start of the next one without losing its place.
          </p>
        </div>
      </Example>

      <SubHead>Rendered-markdown blocks</SubHead>
      <SubNote>
        <code>tokens/markdown.css</code> (<code>@vibexp/design-system/markdown.css</code>, part of the
        barrel) styles the parts of a markdown body a renderer has to emit markup for: the fenced
        code-block frame with its language bar and copy button, token-driven syntax colours, and the
        GFM task-list checkbox. Everything is scoped under <code>.prose</code>, and the syntax colours
        only apply inside <code>.code-block</code> — a surface that runs its own Prism theme on a bare{" "}
        <code>pre</code> is not restyled. This specimen loads the real stylesheet.
      </SubNote>
      <Example block code={`<div class="code-block">
  <div class="code-block-bar">
    <span>ts</span>
    <button type="button" class="copy-button" aria-label="Copy code">…</button>
  </div>
  <pre><code><span class="token keyword">const</span> …</code></pre>
</div>

<li class="task-list-item">
  <span class="task-checkbox" role="img" data-checked="true" aria-label="Completed"></span>
  Connect a repository
</li>`}>
        <div className="ds-prose prose" style={{ maxWidth: 640, width: "100%" }}>
          <div className="code-block">
            <div className="code-block-bar">
              <span>ts</span>
              <button type="button" className="copy-button" aria-label="Copy code" style={{ border: 0, background: "none", cursor: "pointer" }}>
                <Icon name="copy" size={14} />
              </button>
            </div>
            <pre style={{ overflowX: "auto", fontSize: "0.875rem", lineHeight: 1.5 }}>
              <code>
                <span className="token comment">{"// retry a failed run, at most three times"}</span>{"\n"}
                <span className="token keyword">const</span>{" attempts "}<span className="token operator">=</span>{" "}<span className="token number">3</span><span className="token punctuation">;</span>{"\n"}
                <span className="token keyword">const</span>{" label "}<span className="token operator">=</span>{" "}<span className="token string">"by severity"</span><span className="token punctuation">;</span>
              </code>
            </pre>
          </div>
          <ul>
            <li className="task-list-item">
              <span className="task-checkbox" role="img" data-checked="true" aria-label="Completed" />
              Connect a repository
            </li>
            <li className="task-list-item">
              <span className="task-checkbox" role="img" data-checked="false" aria-label="Not completed" />
              Add a trigger or schedule
            </li>
          </ul>
        </div>
      </Example>
      <PropTable
        cols={["Tokens", "Colour", "Why"]}
        rows={[
          ["comment, prolog, doctype, cdata", <code>--muted-foreground</code>, "Italic; recedes"],
          ["punctuation, operator", <code>--muted-foreground</code>, "Structure stays quiet"],
          ["keyword, tag, selector, atrule", "inherits · weight 600", "Carried by weight, not hue"],
          ["string, char, attr-value, regex, inserted", <code>--success</code>, "Literals take a status role tuned for text"],
          ["number, boolean, constant, builtin, variable", <code>--info</code>, "Same"],
          ["deleted", <code>--destructive</code>, "Diff removal"],
        ]}
      />
    </Section>
  );
}

function TypeCard({ name, font, stack, badge, badgeVariant, weights, use }) {
  return (
    <div className="sh-card" style={{ flex: 1, minWidth: 240, display: "flex", flexDirection: "column" }}>
      <div className="sh-card__header">
        <div className="row" style={{ justifyContent: "space-between" }}>
          <div className="sh-card__title" style={{ fontSize: "1.05rem", fontFamily: font }}>{name}</div>
          <Badge variant={badgeVariant}>{badge}</Badge>
        </div>
        <div className="sh-card__desc" style={{ fontFamily: "var(--font-mono)", fontSize: 11 }}>{stack}</div>
      </div>
      <div className="sh-card__content" style={{ marginTop: "auto" }}>
        <div style={{ fontFamily: font, fontSize: 32, fontWeight: 600, letterSpacing: "-0.02em", lineHeight: 1.05 }}>
          Ship the vibe
        </div>
        <div style={{ fontFamily: font, color: "var(--muted-foreground)", marginTop: 6, fontSize: 13.5 }}>
          The quick brown fox jumps over the lazy dog. 0123456789
        </div>
        <div className="sh-separator sh-separator--h" style={{ margin: "12px 0 10px" }} />
        <div className="type-scale-spec" style={{ display: "block" }}>{weights}</div>
        <div className="type-scale-spec" style={{ display: "block", color: "var(--muted-foreground)", marginTop: 3 }}>{use}</div>
      </div>
    </div>
  );
}

/* ---- spacing / radius / elevation ---------------------------------- */
const RADII = [
  ["radius-sm", "calc(var(--radius) - 4px)", "≈ 6px", "rounded-sm", "Checkbox, tabs, chips"],
  ["radius-md", "calc(var(--radius) - 2px)", "≈ 8px", "rounded-md", "Buttons, inputs, selects"],
  ["radius-lg", "var(--radius)", "10px", "rounded-lg", "Cards, alerts, popovers"],
  ["radius-xl", "calc(var(--radius) + 4px)", "≈ 14px", "rounded-xl", "Large containers"],
];
const SHADOWS = [
  ["shadow-sm", "Control thumbs — the active tab or segment"],
  ["shadow-md", "Dropdowns, popovers, tooltips"],
  ["shadow-lg", "Dialogs, sheets; the switch thumb"],
];
const SPACE = [
  ["1", "0.25rem", "4px"], ["2", "0.5rem", "8px"], ["3", "0.75rem", "12px"],
  ["4", "1rem", "16px"], ["6", "1.5rem", "24px"], ["8", "2rem", "32px"], ["12", "3rem", "48px"],
];
const SIZES = [
  ["control-width-sm", "9.375rem · 150px", "w-control-sm", "Compact filter select trigger"],
  ["control-search-min", "15rem · 240px", "min-w-control-search-min", "Search field floor"],
  ["control-search-max", "30rem · 480px", "max-w-control-search-max", "Search field ceiling"],
  ["rail-collapsed", "3.75rem · 60px", "w-rail-collapsed", "Nav rail, icons only"],
  ["rail-expanded", "16.5rem · 264px", "w-rail-expanded", "Nav rail, labelled"],
  ["details-column", "20rem · 320px", "w-details-column", "Reading-page details column"],
  ["measure-prose", "40rem · 640px", "max-w-measure-prose", "Longest line of running prose"],
  ["measure-article", "64rem · 1024px", "max-w-measure-article", "Reading article; ceiling for a wide block"],
  ["header-height", "3.5rem · 56px", "h-header · top-header", "App header height, and the offset below it"],
];

function SpacingSection() {
  return (
    <Section
      id="spacing"
      eyebrow="Foundations"
      title="Spacing, radius & elevation"
      lead="A single --radius token (0.625rem) seeds the whole corner system; everything else derives from it. Spacing follows Tailwind's 4px base unit, elevation is a restrained three-step shadow ramp reserved for floating layers, and recurring layout sizes are named sizing roles."
    >
      <SubHead>Radius</SubHead>
      <SubNote>Set <code>--radius: 0.625rem</code> once; the sm/md/lg/xl steps compute off it.</SubNote>
      <div className="spec-grid">
        {RADII.map((r) => (
          <div className="spec-card" key={r[0]}>
            <div className="spec-card__demo">
              <div style={{ width: 72, height: 56, background: "var(--brand-muted)", border: "1.5px solid var(--brand)", borderRadius: "var(--" + r[0] + ")" }} />
            </div>
            <div className="spec-card__name">{r[3]}</div>
            <div className="spec-card__val">--{r[0]} · {r[2]}</div>
          </div>
        ))}
      </div>

      <SubHead>Elevation</SubHead>
      <SubNote>
        <strong>Shadows are for floating layers only</strong> — popovers, menus, tooltips, dialogs:
        things that sit above the page and can cover it. A surface at rest (a card, a panel, an
        empty state) casts none; it is separated from its surroundings by a border <em>or</em> by
        spacing — one device per level, never both plus a shadow.
      </SubNote>
      <div className="spec-grid">
        {SHADOWS.map((s) => (
          <div className="spec-card" key={s[0]}>
            <div className="spec-card__demo">
              <div style={{ width: 72, height: 56, background: "var(--card)", borderRadius: "var(--radius-md)", boxShadow: "var(--" + s[0] + ")", border: "1px solid var(--border)" }} />
            </div>
            <div className="spec-card__name">{s[0]}</div>
            <div className="spec-card__val">{s[1]}</div>
          </div>
        ))}
      </div>
      <Callout>
        The one resting use of a shadow is a control's moving part — the active tab or segment, the
        switch thumb — where it marks which piece is raised inside the control, not a surface.
      </Callout>

      <SubHead>Spacing unit</SubHead>
      <SubNote>4px base. Component padding lands on this grid — buttons <code>px-4 py-2</code>, cards <code>p-6</code>.</SubNote>
      <div className="tokens" style={{ padding: "8px 16px" }}>
        {SPACE.map((s) => (
          <div className="row" key={s[0]} style={{ padding: "8px 0", borderBottom: "1px solid var(--border)", gap: 18 }}>
            <Chip text={"p-" + s[0]} />
            <span className="token-val" style={{ width: 120 }}>{s[1]} · {s[2]}</span>
            <div style={{ height: 14, width: s[2], background: "var(--brand)", borderRadius: 3 }} />
          </div>
        ))}
      </div>

      <SubHead>Sizing roles</SubHead>
      <SubNote>Named sizes for recurring layout roles — use these instead of <code>w-[150px]</code>- or <code>top-14</code>-style literals. Sizes don't flip in dark, so they live in <code>:root</code> only.</SubNote>
      <PropTable
        cols={["Token", "Value", "Utility", "Role"]}
        rows={SIZES.map((s) => [<code>--{s[0]}</code>, s[1], <Chip text={s[2]} />, s[3]])}
      />
      <Callout>
        <code>--details-column</code> is the reading-page details column specifically, not a general 320px width — popovers that happen to use <code>w-80</code> should keep it.
        <code>--header-height</code> is a length on both axes, so it maps under <code>--spacing-header</code> rather than <code>--container-*</code>: that one line gives <code>h-header</code>, <code>top-header</code>, <code>pt-header</code> and <code>scroll-mt-header</code>. In arithmetic use the raw variable, e.g. <code>h-[calc(100dvh-var(--header-height))]</code>.
        Tailwind v4 only reads <code>@theme</code> from your entry CSS: if your app keeps its own <code>@theme inline</code> block, copy the <code>--container-*</code>, <code>--spacing-header</code> and <code>--text-reading</code> lines from <code>tokens/theme.css</code> there or the utilities won't exist.
      </Callout>
    </Section>
  );
}

Object.assign(window, { ColorsSection, TypographySection, SpacingSection });
