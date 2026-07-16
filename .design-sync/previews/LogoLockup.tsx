import * as React from "react";
import { LogoLockup } from "@vibexp/design-system";

const label: React.CSSProperties = {
  fontFamily: "var(--font-mono)",
  fontSize: 11,
  letterSpacing: "0.02em",
  color: "var(--muted-foreground)",
  marginBottom: 16,
};

/** Horizontal lockup — the same mark + Inter wordmark that `Logo` renders. */
export function Default() {
  return (
    <div style={{ padding: "26px 28px", color: "var(--foreground)" }}>
      <div style={label}>LogoLockup — mark + wordmark</div>
      <LogoLockup />
    </div>
  );
}

/** `size` sets the mark height; gap and wordmark scale from it. */
export function Sizes() {
  return (
    <div style={{ padding: "26px 28px", color: "var(--foreground)" }}>
      <div style={label}>size — 22 · 32 · 44</div>
      <div style={{ display: "flex", alignItems: "center", gap: 32, flexWrap: "wrap" }}>
        {[22, 32, 44].map((s) => (
          <LogoLockup key={s} size={s} />
        ))}
      </div>
    </div>
  );
}

/** A custom `wordmark` string, useful for sub-brands and section headers. */
export function CustomWordmark() {
  return (
    <div style={{ padding: "26px 28px", color: "var(--foreground)" }}>
      <div style={label}>wordmark override</div>
      <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
        <LogoLockup size={30} wordmark="vibexp.io" />
        <LogoLockup size={30} wordmark="studio" />
      </div>
    </div>
  );
}
