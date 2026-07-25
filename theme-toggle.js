/* =====================================================================
   Portrait → light/dark switch (the "moon")
   ---------------------------------------------------------------------
   Clicking the portrait (in the hero OR docked in the nav) flips the
   site between light and dark. The palette lives in CSS tokens; all we
   do here is set data-theme on <html> — CSS handles the colours, the
   crescent-shadow sweep, and the cross-fade.

   • .theme-anim is added just for the switch, so the colour change
     glides. We remove it right after so it never slows normal use.
   • The choice is saved to localStorage and restored on the next visit
     (the tiny script in <head> applies it before the page paints, and
     it takes precedence over the device's light/dark setting).
   ===================================================================== */

(function () {
  "use strict";

  var root = document.documentElement;

  function toggleTheme() {
    var toDark = root.dataset.theme !== "dark";

    root.classList.add("theme-anim");          // colour cross-fade on

    if (toDark) {
      // Night falls: the moon sweeps IN from the left to its crescent.
      root.dataset.theme = "dark";
    } else {
      // Day returns: keep the moon moving right and OFF the far side,
      // then silently re-park it on the left so the next click starts
      // the sweep from the left again.
      root.classList.add("moon-exit");         // slide to translateX(110%)
      root.dataset.theme = "light";
      window.setTimeout(function () {
        root.classList.add("moon-reset");      // freeze transitions
        root.classList.remove("moon-exit");    // snaps back to the left, unseen
        void root.offsetWidth;                 // force that snap to apply now
        root.classList.remove("moon-reset");   // restore transitions (for hover)
      }, 720);                                 // just past the 0.7s sweep
    }

    try { localStorage.setItem("theme", toDark ? "dark" : "light"); } catch (e) {}

    window.setTimeout(function () {
      root.classList.remove("theme-anim");
    }, 800); // just past the 0.7s sweep / 0.55s fade
  }

  // One click listener for the whole page: fire only when the click
  // landed on the hero portrait or its floating copy (the docked moon).
  document.addEventListener("click", function (e) {
    if (e.target.closest(".portrait, .portrait-float")) toggleTheme();
  });

  // Keyboard access: the hero portrait is role="button" tabindex="0",
  // so Enter and Space should activate it too.
  document.addEventListener("keydown", function (e) {
    if ((e.key === "Enter" || e.key === " ") &&
        e.target.closest(".portrait")) {
      e.preventDefault();     // stop Space from scrolling the page
      toggleTheme();
    }
  });
})();
