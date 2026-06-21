/* global React, useState, useEffect, Icon, LogoMark */

/* ------------------------------------------------------------------ */
/* Shared docs chrome — sidebar + topbar + theme toggle.               */
/*                                                                     */
/* Reused by docs/index.html (the catalog landing) and every page      */
/* under docs/pages/. Buildless: loaded as <script type="text/babel">  */
/* AFTER ds/primitives.jsx, which puts React, the hooks, Icon and      */
/* LogoMark on window — so the bare references below resolve globally.  */
/*                                                                     */
/* A page renders one section inside the shell:                        */
/*   <Shell active="colors" base="" homeHref="../index.html">          */
/*     <ColorsSection />                                                */
/*   </Shell>                                                           */
/* The catalog landing uses base="pages/" homeHref="index.html".       */
/* ------------------------------------------------------------------ */

const DS_NAV = [
  {
    group: "Get started",
    items: [{ id: "overview", label: "Overview", icon: "box", home: true }],
  },
  {
    group: "Foundations",
    items: [
      { id: "colors", label: "Color", icon: "palette", file: "color.html" },
      { id: "typography", label: "Typography", icon: "type", file: "typography.html" },
      { id: "spacing", label: "Spacing & radius", icon: "ruler", file: "spacing.html" },
      { id: "accessibility", label: "Accessibility", icon: "shield", file: "accessibility.html" },
    ],
  },
  {
    group: "Library",
    items: [
      { id: "components", label: "Components", icon: "layout", file: "components.html" },
      { id: "brand-react", label: "Brand · React", icon: "bot", file: "brand-react.html" },
      { id: "patterns", label: "Patterns", icon: "box", file: "patterns.html" },
      { id: "guidelines", label: "Guidelines", icon: "shield", file: "guidelines.html" },
    ],
  },
];

const DS_CRUMBS = {
  overview: "Overview", colors: "Color", typography: "Typography", spacing: "Spacing & radius",
  accessibility: "Accessibility", components: "Components", "brand-react": "Brand components",
  patterns: "Patterns", guidelines: "Guidelines",
};

/* theme state + side effects (class flip, persistence, iframe broadcast) */
function useDsTheme() {
  const [dark, setDark] = useState(() => {
    const saved = localStorage.getItem("vibexp-ds-theme");
    if (saved) return saved === "dark";
    return false;
  });
  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    localStorage.setItem("vibexp-ds-theme", dark ? "dark" : "light");
    // broadcast to embedded specimen iframes — they also read localStorage,
    // but postMessage covers file:// where storage events don't fire.
    document.querySelectorAll("iframe").forEach((f) => {
      try { f.contentWindow && f.contentWindow.postMessage({ type: "ds-theme", dark }, "*"); } catch (e) { /* cross-origin guard */ }
    });
  }, [dark]);
  return [dark, setDark];
}

function Shell({ active, base = "", homeHref = "index.html", children }) {
  const [dark, setDark] = useDsTheme();
  const hrefFor = (it) => (it.home ? homeHref : base + it.file);
  return (
    <div className="shell">
      <aside className="sidebar">
        <a className="sidebar__brand" href={homeHref} style={{ textDecoration: "none", color: "inherit" }}>
          <LogoMark className="brandmark" size={34} />
          <div>
            <div className="sidebar__title">VibeXP</div>
            <div className="sidebar__sub">Design System</div>
          </div>
        </a>
        {DS_NAV.map((g) => (
          <div className="nav-group" key={g.group}>
            <div className="nav-group__label">{g.group}</div>
            {g.items.map((it) => (
              <a key={it.id} className={"nav-link" + (active === it.id ? " is-active" : "")} href={hrefFor(it)}>
                <Icon name={it.icon} size={15} />
                {it.label}
              </a>
            ))}
          </div>
        ))}
      </aside>

      <div className="main">
        <div className="topbar">
          <div className="topbar__crumb">VibeXP DS&nbsp;&nbsp;/&nbsp;&nbsp;<b>{DS_CRUMBS[active] || "Overview"}</b></div>
          <div className="topbar__right">
            <button className="theme-toggle" onClick={() => setDark(!dark)} aria-label="Toggle theme">
              <Icon name={dark ? "sun" : "moon"} size={15} />
              {dark ? "Light" : "Dark"}
            </button>
          </div>
        </div>
        <div className="content">{children}</div>
      </div>
    </div>
  );
}

Object.assign(window, { DS_NAV, DS_CRUMBS, useDsTheme, Shell });
