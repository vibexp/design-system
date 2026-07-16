import * as React from "react";
import { LogoGlyph } from "@vibexp/design-system";

const label: React.CSSProperties = {
  fontFamily: "var(--font-mono)",
  fontSize: 11,
  letterSpacing: "0.02em",
  color: "var(--muted-foreground)",
  marginBottom: 16,
};

/** The bare waveform stroke — no tile — inheriting `currentColor` (= `--foreground`). */
export function Default() {
  return (
    <div style={{ padding: "26px 28px", color: "var(--foreground)" }}>
      <div style={label}>LogoGlyph — bare waveform</div>
      <LogoGlyph size={56} />
    </div>
  );
}

/** `size` is the square edge in px. */
export function Sizes() {
  return (
    <div style={{ padding: "26px 28px", color: "var(--foreground)" }}>
      <div style={label}>size — 32 · 48 · 64 · 88</div>
      <div style={{ display: "flex", alignItems: "center", gap: 22, flexWrap: "wrap" }}>
        {[32, 48, 64, 88].map((s) => (
          <LogoGlyph key={s} size={s} />
        ))}
      </div>
    </div>
  );
}

/** Because it inherits `currentColor`, the glyph tints to whatever the context colour is. */
export function InheritsColor() {
  return (
    <div style={{ padding: "26px 28px" }}>
      <div style={label}>currentColor — tinted by the parent</div>
      <div style={{ display: "flex", alignItems: "center", gap: 26, flexWrap: "wrap" }}>
        <span style={{ color: "var(--foreground)", display: "inline-flex" }}>
          <LogoGlyph size={48} />
        </span>
        <span style={{ color: "var(--muted-foreground)", display: "inline-flex" }}>
          <LogoGlyph size={48} />
        </span>
        <span style={{ color: "var(--primary)", display: "inline-flex" }}>
          <LogoGlyph size={48} />
        </span>
      </div>
    </div>
  );
}
