import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Icon, ICON_NAMES } from "./Icon";

describe("Icon", () => {
  it("renders a 24x24 currentColor svg at the requested size", () => {
    const { container } = render(<Icon name="rocket" size={20} />);
    const svg = container.querySelector("svg");
    expect(svg).toBeInTheDocument();
    expect(svg).toHaveAttribute("viewBox", "0 0 24 24");
    expect(svg).toHaveAttribute("stroke", "currentColor");
    expect(svg).toHaveAttribute("width", "20");
  });

  it("is decorative (aria-hidden) without a title", () => {
    const { container } = render(<Icon name="search" />);
    const svg = container.querySelector("svg");
    expect(svg).toHaveAttribute("aria-hidden", "true");
    expect(svg).not.toHaveAttribute("role", "img");
  });

  it("is exposed to assistive tech when given a title", () => {
    const { container, getByText } = render(<Icon name="settings" title="Settings" />);
    const svg = container.querySelector("svg");
    expect(svg).toHaveAttribute("role", "img");
    expect(svg).toHaveAttribute("aria-label", "Settings");
    expect(getByText("Settings", { selector: "title" })).toBeInTheDocument();
  });

  it("exports every name in the path map", () => {
    expect(ICON_NAMES).toContain("rocket");
    expect(ICON_NAMES.length).toBeGreaterThanOrEqual(33);
  });
});
