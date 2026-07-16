import * as React from "react";
import { Logo } from "@vibexp/design-system";

const label: React.CSSProperties = {
  fontFamily: "var(--font-mono)",
  fontSize: 11,
  letterSpacing: "0.02em",
  color: "var(--muted-foreground)",
  marginBottom: 16,
};

/** The default brand usage — mark + `vibexp.io` wordmark set in Inter. */
export function Default() {
  return (
    <div style={{ padding: "26px 28px", color: "var(--foreground)" }}>
      <div style={label}>Logo — the default lockup</div>
      <Logo />
    </div>
  );
}

/** `size` drives the mark height; the wordmark scales from it. */
export function Sizes() {
  return (
    <div style={{ padding: "26px 28px", color: "var(--foreground)" }}>
      <div style={label}>size — 24 · 32 · 44</div>
      <div style={{ display: "flex", alignItems: "center", gap: 32, flexWrap: "wrap" }}>
        {[24, 32, 44].map((s) => (
          <Logo key={s} size={s} />
        ))}
      </div>
    </div>
  );
}

/** `wordmark` overrides the default text — one lockup per shaharia-lab surface. */
export function CustomWordmark() {
  return (
    <div style={{ padding: "26px 28px", color: "var(--foreground)" }}>
      <div style={label}>wordmark — per-surface text</div>
      <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
        <Logo size={30} wordmark="vibexp.io" />
        <Logo size={30} wordmark="docs" />
        <Logo size={30} wordmark="blog" />
      </div>
    </div>
  );
}
