import * as React from "react";
import { LogoMark } from "@vibexp/design-system";

const label: React.CSSProperties = {
  fontFamily: "var(--font-mono)",
  fontSize: 11,
  letterSpacing: "0.02em",
  color: "var(--muted-foreground)",
  marginBottom: 16,
};

/** The rounded tile — the waveform glyph knocks out to `--background`, so it flips in dark mode. */
export function Default() {
  return (
    <div style={{ padding: "26px 28px", color: "var(--foreground)" }}>
      <div style={label}>LogoMark — rounded tile</div>
      <LogoMark size={56} />
    </div>
  );
}

/** `size` is the square edge in px; radius defaults to ~26% of it. */
export function Sizes() {
  return (
    <div style={{ padding: "26px 28px", color: "var(--foreground)" }}>
      <div style={label}>size — 32 · 48 · 64 · 88</div>
      <div style={{ display: "flex", alignItems: "center", gap: 22, flexWrap: "wrap" }}>
        {[32, 48, 64, 88].map((s) => (
          <LogoMark key={s} size={s} />
        ))}
      </div>
    </div>
  );
}

/** `radius` overrides the derived corner — from a square tile to a pill. */
export function CornerRadius() {
  return (
    <div style={{ padding: "26px 28px", color: "var(--foreground)" }}>
      <div style={label}>radius — 0 · default · 20 · 32</div>
      <div style={{ display: "flex", alignItems: "center", gap: 22, flexWrap: "wrap" }}>
        <LogoMark size={64} radius={0} />
        <LogoMark size={64} />
        <LogoMark size={64} radius={20} />
        <LogoMark size={64} radius={32} />
      </div>
    </div>
  );
}
