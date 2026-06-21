import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Logo, LogoGlyph, LogoLockup, LogoMark } from "./Logo";

describe("Logo family", () => {
  it("LogoMark renders an accessible svg at the given size", () => {
    const { container } = render(<LogoMark size={48} />);
    const svg = container.querySelector("svg");
    expect(svg).toBeInTheDocument();
    expect(svg).toHaveAttribute("role", "img");
    expect(svg).toHaveAttribute("aria-label", "VibeXP");
    expect(svg).toHaveAttribute("width", "48");
  });

  it("LogoMark derives a default corner radius (~26% of size)", () => {
    const { container } = render(<LogoMark size={100} />);
    const svg = container.querySelector("svg");
    expect(svg?.style.borderRadius).toBe("26px");
  });

  it("LogoGlyph renders the bare waveform stroke with no tile", () => {
    const { container } = render(<LogoGlyph />);
    expect(container.querySelector("rect")).toBeNull();
    expect(container.querySelector("path")).toBeInTheDocument();
  });

  it("LogoLockup renders the mark plus the wordmark text", () => {
    const { getByText, container } = render(<LogoLockup wordmark="vibexp.io" />);
    expect(container.querySelector("svg")).toBeInTheDocument();
    expect(getByText("vibexp.io")).toBeInTheDocument();
  });

  it("Logo defaults to the lockup", () => {
    const { getByText } = render(<Logo />);
    expect(getByText("vibexp.io")).toBeInTheDocument();
  });
});
