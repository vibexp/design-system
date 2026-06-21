import * as React from "react";

/* VibeXP logo — theme-aware, inline SVG (mirrors brand/logo*.svg).
   currentColor drives the rounded tile (= --foreground); the waveform glyph
   knocks out to --background. So the whole mark flips for dark mode with no
   prop changes. */

export interface LogoMarkProps extends React.SVGProps<SVGSVGElement> {
  /** Square size in px. @default 34 */
  size?: number;
  /** Corner radius in px. Defaults to ~26% of size. */
  radius?: number;
}

export interface LogoProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Mark height in px (wordmark scales from it). @default 32 */
  size?: number;
  /** Wordmark text. @default "vibexp.io" */
  wordmark?: string;
}

/** Rounded-tile mark with the waveform glyph knocked out. */
export function LogoMark({ size = 34, radius, style, ...rest }: LogoMarkProps) {
  const r = radius == null ? Math.round(size * 0.26) : radius;
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 512 512"
      fill="none"
      role="img"
      aria-label="VibeXP"
      style={{ display: "block", flexShrink: 0, color: "var(--foreground)", borderRadius: r, ...style }}
      {...rest}
    >
      <title>VibeXP</title>
      <rect width="512" height="512" rx="90" fill="currentColor" />
      <path
        d="M128 256h48l32-96 64 192 32-96h48"
        style={{ stroke: "var(--background)" }}
        strokeWidth="40"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}

/** The bare waveform stroke, no tile — inherits currentColor. */
export function LogoGlyph({ size = 34, style, ...rest }: LogoMarkProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 512 512"
      fill="none"
      role="img"
      aria-label="VibeXP"
      style={{ display: "block", flexShrink: 0, color: "var(--foreground)", ...style }}
      {...rest}
    >
      <title>VibeXP</title>
      <path
        d="M64 256 L136 256 L184 112 L280 400 L328 256 L400 256"
        stroke="currentColor"
        strokeWidth="54"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}

/** Horizontal lockup — mark + wordmark, set in Inter. */
export function LogoLockup({ size = 32, wordmark = "vibexp.io", style, ...rest }: LogoProps) {
  return (
    <span
      style={{ display: "inline-flex", alignItems: "center", gap: Math.round(size * 0.32), color: "var(--foreground)", ...style }}
      {...rest}
    >
      <LogoMark size={size} radius={Math.round(size * 0.26)} />
      <span style={{ fontFamily: "var(--font-inter)", fontWeight: 700, fontSize: Math.round(size * 0.62), letterSpacing: "-0.02em", lineHeight: 1 }}>
        {wordmark}
      </span>
    </span>
  );
}

/** The lockup (mark + wordmark) — the default brand usage. */
export function Logo(props: LogoProps) {
  return <LogoLockup {...props} />;
}
