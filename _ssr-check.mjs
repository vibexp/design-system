import { renderToStaticMarkup } from "react-dom/server";
import { createElement as h } from "react";
import * as DS from "./dist/react/index.js";

const names = Object.keys(DS);
console.log("exports:", names.join(", "));

const logo = renderToStaticMarkup(h(DS.LogoMark, { size: 48 }));
console.log("\nLogoMark(48):");
console.log(logo);

const glyph = renderToStaticMarkup(h(DS.LogoGlyph, {}));
const lockup = renderToStaticMarkup(h(DS.LogoLockup, { wordmark: "vibexp.io" }));
console.log("\nLogoGlyph has <rect>?", glyph.includes("<rect") ? "yes (BAD)" : "no (correct — bare glyph)");
console.log("LogoLockup contains wordmark?", lockup.includes("vibexp.io") ? "yes" : "no");

const iconDecorative = renderToStaticMarkup(h(DS.Icon, { name: "rocket", size: 20 }));
const iconLabeled = renderToStaticMarkup(h(DS.Icon, { name: "settings", title: "Settings" }));
console.log("\nIcon(rocket,20):", iconDecorative);
console.log("decorative aria-hidden?", iconDecorative.includes('aria-hidden="true"') ? "yes" : "no");
console.log("labeled role=img + aria-label?", (iconLabeled.includes('role="img"') && iconLabeled.includes('aria-label="Settings"')) ? "yes" : "no");
console.log("ICON_NAMES count:", DS.ICON_NAMES.length);

// assertions
const ok =
  logo.includes('role="img"') && logo.includes('aria-label="VibeXP"') &&
  logo.includes('width="48"') && logo.includes('currentColor') &&
  !glyph.includes("<rect") && lockup.includes("vibexp.io") &&
  iconDecorative.includes('viewBox="0 0 24 24"') && iconDecorative.includes('aria-hidden="true"') &&
  iconLabeled.includes('role="img"') && DS.ICON_NAMES.length >= 33;
console.log("\nALL ASSERTIONS:", ok ? "PASS ✓" : "FAIL ✗");
process.exit(ok ? 0 : 1);
