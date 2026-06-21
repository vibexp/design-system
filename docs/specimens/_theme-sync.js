/* Keep an embedded specimen's theme in lockstep with the docs shell.
   Three signals, any of which flips this frame's <html class="dark">:
     1. on load — read the shared localStorage key the shell writes
     2. storage events — fire in this frame when the shell toggles (same-origin)
     3. postMessage — the shell also broadcasts to iframes (robust on file://,
        where localStorage / storage events are often unavailable) */
(function () {
  var KEY = "vibexp-ds-theme";
  function apply(dark) {
    document.documentElement.classList.toggle("dark", !!dark);
  }
  try {
    apply(localStorage.getItem(KEY) === "dark");
  } catch (e) {
    /* localStorage blocked (e.g. file://) — wait for postMessage instead */
  }
  window.addEventListener("storage", function (e) {
    if (e.key === KEY) apply(e.newValue === "dark");
  });
  window.addEventListener("message", function (e) {
    if (e.data && e.data.type === "ds-theme") apply(e.data.dark);
  });
})();
