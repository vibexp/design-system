/* global React */
const { useState, useRef, useEffect, useCallback } = React;

/* ------------------------------------------------------------------ */
/* Icon set — inline Lucide-style SVGs (the product uses lucide-react) */
/* ------------------------------------------------------------------ */
const ICON_PATHS = {
  check: <polyline points="20 6 9 17 4 12" />,
  chevronDown: <polyline points="6 9 12 15 18 9" />,
  search: <><circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /></>,
  plus: <><path d="M5 12h14" /><path d="M12 5v14" /></>,
  x: <><path d="M18 6 6 18" /><path d="m6 6 12 12" /></>,
  info: <><circle cx="12" cy="12" r="10" /><path d="M12 16v-4" /><path d="M12 8h.01" /></>,
  alert: <><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" /><path d="M12 9v4" /><path d="M12 17h.01" /></>,
  sun: <><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" /></>,
  moon: <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />,
  copy: <><rect width="14" height="14" x="8" y="8" rx="2" ry="2" /><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" /></>,
  palette: <><circle cx="13.5" cy="6.5" r=".5" fill="currentColor" /><circle cx="17.5" cy="10.5" r=".5" fill="currentColor" /><circle cx="8.5" cy="7.5" r=".5" fill="currentColor" /><circle cx="6.5" cy="12.5" r=".5" fill="currentColor" /><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z" /></>,
  type: <><polyline points="4 7 4 4 20 4 20 7" /><line x1="9" x2="15" y1="20" y2="20" /><line x1="12" x2="12" y1="4" y2="20" /></>,
  ruler: <><path d="M21.3 15.3a2.4 2.4 0 0 1 0 3.4l-2.6 2.6a2.4 2.4 0 0 1-3.4 0L2.7 8.7a2.41 2.41 0 0 1 0-3.4l2.6-2.6a2.41 2.41 0 0 1 3.4 0Z" /><path d="m14.5 12.5 2-2M11.5 9.5l2-2M8.5 6.5l2-2M17.5 15.5l2-2" /></>,
  box: <><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" /><polyline points="3.29 7 12 12 20.71 7" /><line x1="12" x2="12" y1="22" y2="12" /></>,
  layout: <><rect width="18" height="18" x="3" y="3" rx="2" /><path d="M3 9h18M9 21V9" /></>,
  shield: <><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" /><path d="m9 12 2 2 4-4" /></>,
  inbox: <><polyline points="22 12 16 12 14 15 10 15 8 12 2 12" /><path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z" /></>,
  bot: <><path d="M12 8V4H8" /><rect width="16" height="12" x="4" y="8" rx="2" /><path d="M2 14h2M20 14h2M15 13v2M9 13v2" /></>,
  sliders: <><line x1="4" x2="4" y1="21" y2="14" /><line x1="4" x2="4" y1="10" y2="3" /><line x1="12" x2="12" y1="21" y2="12" /><line x1="12" x2="12" y1="8" y2="3" /><line x1="20" x2="20" y1="21" y2="16" /><line x1="20" x2="20" y1="12" y2="3" /><line x1="2" x2="6" y1="14" y2="14" /><line x1="10" x2="14" y1="8" y2="8" /><line x1="18" x2="22" y1="16" y2="16" /></>,
};

function Icon({ name, size = 16, stroke = 2, className, style }) {
  const path = ICON_PATHS[name];
  return (
    <svg
      className={className}
      style={style}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={stroke}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {path}
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* Section + headings                                                  */
/* ------------------------------------------------------------------ */
function Section({ id, eyebrow, title, lead, children }) {
  return (
    <section className="section" id={id} data-screen-label={title}>
      {eyebrow && <p className="section__eyebrow">{eyebrow}</p>}
      <h2 className="section__title">{title}</h2>
      {lead && <p className="section__lead">{lead}</p>}
      {children}
    </section>
  );
}

function SubHead({ children }) { return <h3 className="subhead">{children}</h3>; }
function SubNote({ children }) { return <p className="subnote">{children}</p>; }

/* ------------------------------------------------------------------ */
/* Copyable code chip                                                  */
/* ------------------------------------------------------------------ */
function Chip({ text, label }) {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard?.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1100);
    }).catch(() => {});
  };
  return (
    <button className={"chip" + (copied ? " copied" : "")} onClick={copy} title="Copy">
      <Icon name={copied ? "check" : "copy"} size={12} className="chip__icon" />
      {label || text}
    </button>
  );
}

/* ------------------------------------------------------------------ */
/* Example card: rendered demo + the authentic Tailwind/JSX code       */
/* ------------------------------------------------------------------ */
function Example({ children, code, block, center }) {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard?.writeText(code).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1100);
    }).catch(() => {});
  };
  const stageClass =
    "example__stage" + (block ? " example__stage--block" : "") + (center ? " example__stage--center" : "");
  return (
    <div className="example">
      <div className={stageClass}>{children}</div>
      {code && (
        <div className="example__code">
          <button
            className={"chip" + (copied ? " copied" : "")}
            onClick={copy}
            style={{ position: "absolute", top: 10, right: 10 }}
            title="Copy code"
          >
            <Icon name={copied ? "check" : "copy"} size={12} className="chip__icon" />
            {copied ? "Copied" : "Copy"}
          </button>
          <code>{code}</code>
        </div>
      )}
    </div>
  );
}

/* prop / variant reference table */
function PropTable({ cols, rows }) {
  return (
    <table className="prop-table">
      <thead>
        <tr>{cols.map((c) => <th key={c}>{c}</th>)}</tr>
      </thead>
      <tbody>
        {rows.map((r, i) => (
          <tr key={i}>
            {r.map((cell, j) => (
              <td key={j}>{cell}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function Callout({ children }) {
  return (
    <div className="callout">
      <Icon name="info" size={16} />
      <div>{children}</div>
    </div>
  );
}

/* shared component-level primitives reused across demos */
function Btn({ variant = "default", size, children, ...rest }) {
  const cls = ["sh-btn", "sh-btn--" + variant, size ? "sh-btn--" + size : ""].join(" ").trim();
  return <button className={cls} {...rest}>{children}</button>;
}
function Badge({ variant = "default", children }) {
  return <span className={"sh-badge sh-badge--" + variant}>{children}</span>;
}

/* ---- brand: inline, theme-aware logo (mirrors brand/*.svg) ---------------
   currentColor drives the tile (foreground); the glyph/text knock out to
   --background, so the whole mark flips for dark mode automatically. */
function LogoMark({ size = 34, radius = 9, style, ...rest }) {
  return (
    <svg width={size} height={size} viewBox="0 0 512 512" fill="none" role="img" aria-label="VibeXP"
      style={{ display: "block", flexShrink: 0, color: "var(--foreground)", borderRadius: radius, ...style }} {...rest}>
      <rect width="512" height="512" rx="90" fill="currentColor" />
      <path d="M128 256h48l32-96 64 192 32-96h48" style={{ stroke: "var(--background)" }}
        strokeWidth="40" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </svg>
  );
}
function LogoGlyph({ size = 34, style, ...rest }) {
  return (
    <svg width={size} height={size} viewBox="0 0 512 512" fill="none" role="img" aria-label="VibeXP"
      style={{ display: "block", flexShrink: 0, color: "var(--foreground)", ...style }} {...rest}>
      <path d="M64 256 L136 256 L184 112 L280 400 L328 256 L400 256" stroke="currentColor"
        strokeWidth="54" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </svg>
  );
}
function LogoLockup({ size = 32, style, ...rest }) {
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: Math.round(size * 0.32),
      color: "var(--foreground)", ...style }} {...rest}>
      <LogoMark size={size} radius={Math.round(size * 0.26)} />
      <span style={{ fontFamily: "var(--font-inter)", fontWeight: 700, fontSize: Math.round(size * 0.62),
        letterSpacing: "-0.02em", lineHeight: 1 }}>vibexp.io</span>
    </span>
  );
}

Object.assign(window, {
  React, useState, useRef, useEffect, useCallback,
  Icon, Section, SubHead, SubNote, Chip, Example, PropTable, Callout, Btn, Badge,
  LogoMark, LogoGlyph, LogoLockup,
});
