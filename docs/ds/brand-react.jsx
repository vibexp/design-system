/* global React, Section, SubHead, SubNote, Callout */

/* Each specimen is a standalone HTML document under docs/specimens/, embedded
   here as an <iframe>. The frames render the REAL built ./react components
   (dist/react/index.js) in isolation — so this gallery is true to what the
   package actually ships, not a hand-rolled re-implementation. The frames flip
   with the docs theme toggle via docs/specimens/_theme-sync.js. */

function SpecimenFrame({ src, height, title }) {
  return (
    <div
      className="spec-card"
      style={{ padding: 0, overflow: "hidden", textAlign: "left" }}
    >
      <iframe
        src={src}
        title={title}
        loading="lazy"
        style={{ display: "block", width: "100%", height, border: "none", background: "var(--background)" }}
      />
    </div>
  );
}

function BrandReactSection() {
  return (
    <Section
      id="brand-react"
      eyebrow="Library"
      title="Brand components (./react)"
      lead="The brand React primitives the package ships at @vibexp/design-system/react — the Logo family and the inline Icon set. Each card below is an isolated document rendering the real built component, so what you see is exactly what consumers import."
    >
      <Callout>
        These frames load <code>dist/react/index.js</code>. If a card asks you to build first,
        run <code>npm run build</code> — the components are compiled from <code>src/react/</code> by
        tsup and are not committed. The frames track the theme toggle automatically.
      </Callout>

      <SubHead>Logo</SubHead>
      <SubNote><code>Logo · LogoMark · LogoGlyph · LogoLockup</code> — theme-aware SVG marks; the tile is <code>currentColor</code> and the glyph knocks out to <code>--background</code>, so they flip in dark for free.</SubNote>
      <SpecimenFrame src={(window.DS_BASE || "") + "specimens/logo.html"} height={300} title="Logo specimens" />

      <div style={{ height: 22 }} />

      <SubHead>Icon</SubHead>
      <SubNote><code>Icon</code> (+ <code>ICON_NAMES</code>, <code>IconName</code>) — a curated, zero-dependency Lucide-style set. For the full icon set in production, use <code>lucide-react</code> directly rather than extending this map.</SubNote>
      <SpecimenFrame src={(window.DS_BASE || "") + "specimens/icon.html"} height={400} title="Icon specimens" />
    </Section>
  );
}

Object.assign(window, { BrandReactSection });
