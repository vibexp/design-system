/**
 * @vibexp/design-system/react — React component entry.
 *
 * Brand primitives only for now (Logo family + the inline Icon set). These
 * consume the design tokens via CSS custom properties, so they flip with the
 * `.dark` class for free. Import the token CSS once at your app root:
 *
 *     import "@vibexp/design-system";        // tokens + a11y + prose
 *     import { Logo, Icon } from "@vibexp/design-system/react";
 */
export { Logo, LogoMark, LogoGlyph, LogoLockup } from "./Logo";
export type { LogoProps, LogoMarkProps } from "./Logo";
export { Icon, ICON_NAMES } from "./Icon";
export type { IconProps, IconName } from "./Icon";
