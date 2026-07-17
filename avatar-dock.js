/* =====================================================================
   Avatar dock — smooth glide
   ---------------------------------------------------------------------
   The avatar starts in the hero. As you scroll down it rises with the
   page like everything else; as it nears the nav bar it GLIDES up into
   it — shrinking to fit and settling to the LEFT of your name, which
   slides over to make room. Scroll back up and it hands back to the hero.

   How it works:
     • A floating COPY of the avatar is positioned freely on screen.
       Near the top it sits exactly where the hero avatar is, so nothing
       looks different.
     • Each scroll frame we work out a progress value: 0 = fully in the
       hero, 1 = fully docked in the nav.
     • We BLEND the avatar's position + size between those two states by
       that progress — a continuous glide, not a jump.
     • A "slot" beside your name grows from 0 to the avatar's width in
       sync, sliding the name right to welcome it.
   ===================================================================== */

(function () {
  "use strict";

  /* ---- TUNING BLOCK — safe to play with -------------------------------
     DOCK_SIZE : avatar diameter once docked in the nav (px)
     DOCK_GAP  : gap between the docked avatar and your name (px)
     GLIDE     : how many px of scrolling the glide is spread over. Bigger
                 = slower, more gradual hand-off.                          */
  var DOCK_SIZE = 46;
  var DOCK_GAP  = 14;
  var GLIDE     = 90;
  /* ---- End of tuning block -------------------------------------------- */

  var anchor = document.querySelector(".portrait");    // hero avatar (our ruler)
  var header = document.querySelector(".site-header");
  var brand  = document.querySelector(".brand");
  var slot   = document.querySelector(".dock-slot");
  if (!anchor || !header || !brand || !slot) return;

  var root = document.documentElement;

  // Keep --nav-h in sync with the sticky nav's real height, so the
  // per-entry sticky headers pin exactly under it. Runs regardless of the
  // avatar glide below (hence before the early returns). Height only
  // changes on resize / after fonts load, so we don't touch it on scroll.
  function setNavH() {
    root.style.setProperty("--nav-h", header.getBoundingClientRect().height + "px");
  }
  setNavH();
  window.addEventListener("resize", setNavH);
  window.addEventListener("load", setNavH);

  // ---- Shrink each case-study heading while it's pinned ----------------
  // CSS can't yet tell a stuck sticky element from an unstuck one, so we
  // detect it: a heading is "pinned" when its top has reached the sticky
  // line (nav height + gap). We add/remove .is-pinned; CSS does the shrink.
  var headings = Array.prototype.slice.call(
    document.querySelectorAll(".entry__company"));
  var pinTop = 0;
  function measurePin() {
    // The resolved `top` of the sticky heading = nav height + gap, in px.
    if (headings[0]) pinTop = parseFloat(getComputedStyle(headings[0]).top) || 0;
  }
  measurePin();
  window.addEventListener("resize", measurePin);
  window.addEventListener("load", measurePin);

  var pinTicking = false;
  function updatePinned() {
    pinTicking = false;
    var mobile = window.matchMedia("(max-width: 640px)").matches;
    for (var i = 0; i < headings.length; i++) {
      var pinned = !mobile &&
        headings[i].getBoundingClientRect().top <= pinTop + 1;
      headings[i].classList.toggle("is-pinned", pinned);
    }
  }
  function onPinScroll() {
    if (!pinTicking) { window.requestAnimationFrame(updatePinned); pinTicking = true; }
  }
  window.addEventListener("scroll", onPinScroll, { passive: true });
  updatePinned();

  // Respect reduced-motion: leave the avatar in the hero, no glide.
  if (window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    return;
  }

  // Build the floating copy we actually move around.
  var heroImg = anchor.querySelector("img");
  var floatEl = document.createElement("div");
  floatEl.className = "portrait-float";
  var floatImg = document.createElement("img");
  floatImg.src = heroImg ? heroImg.src : "assets/portrait.jpg";
  floatImg.alt = ""; // decorative; the hero avatar keeps the real alt text
  floatEl.appendChild(floatImg);
  document.body.appendChild(floatEl);

  // Hide the hero avatar (but keep it in the layout + accessibility tree)
  // so the floating copy is the only one you see.
  anchor.style.opacity = "0";

  function clamp(v, min, max) { return Math.max(min, Math.min(max, v)); }
  function lerp(a, b, t) { return a + (b - a) * t; }
  function isMobile() { return window.matchMedia("(max-width: 640px)").matches; }

  function update() {
    ticking = false;

    // On mobile the nav is a compact hamburger bar and the avatar is
    // centred in the hero — skip the whole effect there.
    if (isMobile()) {
      floatEl.style.display = "none";
      anchor.style.opacity = "";
      slot.style.width = "0px";
      return;
    }
    floatEl.style.display = "";
    anchor.style.opacity = "0";

    var a = anchor.getBoundingClientRect(); // avatar's live on-screen box
    var h = header.getBoundingClientRect();
    var b = brand.getBoundingClientRect();

    // Where the avatar should sit once docked (centred on your name,
    // at the far-left where the slot opens up). We compute this against
    // the header's STUCK position (pinned to the top) so the maths don't
    // wobble while the header is still scrolling up to the top.
    var brandOffsetInHeader = b.top - h.top;        // constant as they move together
    var dockTop  = brandOffsetInHeader + b.height / 2 - DOCK_SIZE / 2;
    var dockLeft = b.left;

    // Scroll progress toward docking.
    //   anchorTopDoc = the avatar's fixed position in the document.
    //   S_dock       = the scroll amount at which it reaches the dock.
    // Progress ramps from 0 to 1 over the final GLIDE px before S_dock.
    var anchorTopDoc = a.top + window.scrollY;
    var sDock = anchorTopDoc - dockTop;
    var progress = clamp((window.scrollY - (sDock - GLIDE)) / GLIDE, 0, 1);

    // Blend the box between "in the hero" (a.*) and "docked" (dock*).
    var top  = lerp(a.top,   dockTop,   progress);
    var left = lerp(a.left,  dockLeft,  progress);
    var size = lerp(a.width, DOCK_SIZE, progress);

    floatEl.style.top    = top + "px";
    floatEl.style.left   = left + "px";
    floatEl.style.width  = size + "px";
    floatEl.style.height = size + "px";

    // Grow the slot in step so your name slides right to make room.
    slot.style.width = (progress * (DOCK_SIZE + DOCK_GAP)) + "px";
  }

  // Run once per animation frame while scrolling (smooth + cheap).
  var ticking = false;
  function onScroll() {
    if (!ticking) {
      window.requestAnimationFrame(update);
      ticking = true;
    }
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", update);
  update(); // set the correct state on first load
})();
