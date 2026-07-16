import * as React from "react";
import { Icon, ICON_NAMES } from "@vibexp/design-system";

const mono = "var(--font-mono)";
const label: React.CSSProperties = {
  fontFamily: mono,
  fontSize: 11,
  letterSpacing: "0.02em",
  color: "var(--muted-foreground)",
  marginBottom: 14,
};

/** The full built-in glyph set — every name in `ICON_NAMES`, size 20, currentColor. */
export function Gallery() {
  return (
    <div style={{ padding: "22px 24px", color: "var(--foreground)" }}>
      <div style={label}>{ICON_NAMES.length} glyphs — ICON_NAMES</div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(84px, 1fr))",
          gap: 10,
        }}
      >
        {ICON_NAMES.map((n) => (
          <div
            key={n}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 8,
              padding: "14px 6px",
              border: "1px solid var(--border)",
              borderRadius: "var(--radius-md, 0.5rem)",
            }}
          >
            <Icon name={n} size={20} />
            <span style={{ fontFamily: mono, fontSize: 10, color: "var(--muted-foreground)" }}>{n}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/** One glyph across the common pixel sizes — width scales with `size`. */
export function Sizes() {
  return (
    <div style={{ padding: "22px 24px", color: "var(--foreground)" }}>
      <div style={label}>size — 16 · 20 · 24 · 32 (2px stroke, currentColor)</div>
      <div style={{ display: "flex", alignItems: "center", gap: 22 }}>
        {[16, 20, 24, 32].map((s) => (
          <Icon key={s} name="rocket" size={s} />
        ))}
      </div>
    </div>
  );
}

/** `stroke` controls line weight; the colour is always `currentColor`. */
export function StrokeWeights() {
  return (
    <div style={{ padding: "22px 24px", color: "var(--foreground)" }}>
      <div style={label}>stroke — 1.5 · 2 · 2.5 · 3</div>
      <div style={{ display: "flex", alignItems: "center", gap: 22 }}>
        {[1.5, 2, 2.5, 3].map((w) => (
          <Icon key={w} name="settings" size={28} stroke={w} />
        ))}
      </div>
    </div>
  );
}

/** Icons inherit `currentColor`, so status roles tint them via the token vars. */
export function StatusColors() {
  const roles: Array<[string, import("@vibexp/design-system").IconProps["name"]]> = [
    ["var(--foreground)", "info"],
    ["var(--success, oklch(0.6 0.13 155))", "check2"],
    ["var(--warning, oklch(0.75 0.15 80))", "alert"],
    ["var(--destructive)", "x"],
  ];
  return (
    <div style={{ padding: "22px 24px", color: "var(--foreground)" }}>
      <div style={label}>currentColor — status roles</div>
      <div style={{ display: "flex", alignItems: "center", gap: 22 }}>
        {roles.map(([c, n]) => (
          <span key={n} style={{ color: c, display: "inline-flex" }}>
            <Icon name={n} size={26} title={n} />
          </span>
        ))}
      </div>
    </div>
  );
}

/** Inline with text — the common product usage, aligned to the label baseline. */
export function WithLabel() {
  const rows: Array<[import("@vibexp/design-system").IconProps["name"], string]> = [
    ["search", "Search agents"],
    ["settings", "Settings"],
    ["rocket", "Deploy"],
    ["github", "View source"],
  ];
  return (
    <div style={{ padding: "22px 24px", color: "var(--foreground)", fontFamily: "var(--font-inter)" }}>
      <div style={label}>inline with text — size 16, gap 8</div>
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {rows.map(([n, t]) => (
          <span key={t} style={{ display: "inline-flex", alignItems: "center", gap: 8, fontSize: 14 }}>
            <Icon name={n} size={16} />
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}
