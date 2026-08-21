(function () {
  var baseText = "DEEPGRUDGE ✦ EST. 2026 ✦ ";
  var speed = 1;

  var jacket = document.getElementById("curvedLoop");
  var measure = document.getElementById("clMeasure");
  var textPath = document.getElementById("clTextPath");

  var spacing = 0;
  var offset = 0;
  var dragging = false;
  var lastX = 0;
  var dir = -1;
  var rafId = null;

  function build() {
    spacing = measure.getComputedTextLength();
    if (!spacing) return;
    var repeats = Math.ceil(1800 / spacing) + 2;
    textPath.textContent = new Array(repeats + 1).join(baseText);
    offset = -spacing;
    textPath.setAttribute("startOffset", offset + "px");
    jacket.style.visibility = "visible";
    if (!rafId) rafId = requestAnimationFrame(step);
  }

  function wrap(val) {
    if (!spacing) return val;
    if (val <= -spacing) val += spacing;
    if (val > 0) val -= spacing;
    return val;
  }

  function step() {
    if (!dragging) {
      offset = wrap(offset + dir * speed);
      textPath.setAttribute("startOffset", offset + "px");
    }
    rafId = requestAnimationFrame(step);
  }

  function onDown(e) {
    dragging = true;
    lastX = e.clientX;
    jacket.classList.add("dragging");
    if (jacket.setPointerCapture && e.pointerId !== undefined) {
      try {
        jacket.setPointerCapture(e.pointerId);
      } catch (err) {}
    }
  }
  function onMove(e) {
    if (!dragging) return;
    var dx = e.clientX - lastX;
    lastX = e.clientX;
    offset = wrap(offset + dx);
    textPath.setAttribute("startOffset", offset + "px");
    dir = dx > 0 ? 1 : -1;
  }
  function onUp() {
    dragging = false;
    jacket.classList.remove("dragging");
  }

  jacket.addEventListener("pointerdown", onDown);
  jacket.addEventListener("pointermove", onMove);
  jacket.addEventListener("pointerup", onUp);
  jacket.addEventListener("pointerleave", onUp);
  jacket.addEventListener("pointercancel", onUp);

  var mq = window.matchMedia("(prefers-reduced-motion: reduce)");
  if (mq.matches) {
    speed = 0;
  }

  if (!mq.matches) {
    var field = document.getElementById("sparkField");
    var colors = ["var(--caution)", "var(--blood-bright)", "#e8a23a"];
    var count = 16;
    for (var i = 0; i < count; i++) {
      var s = document.createElement("div");
      s.className = "spark";
      var size = (Math.random() * 2 + 1.5).toFixed(1);
      var left = (Math.random() * 100).toFixed(1);
      var duration = (Math.random() * 7 + 7).toFixed(1);
      var delay = (Math.random() * -14).toFixed(1);
      var drift = (Math.random() * 50 - 25).toFixed(0);
      var color = colors[Math.floor(Math.random() * colors.length)];
      s.style.width = size + "px";
      s.style.height = size + "px";
      s.style.left = left + "%";
      s.style.background = color;
      s.style.setProperty("--drift", drift + "px");
      s.style.animationDuration = duration + "s";
      s.style.animationDelay = delay + "s";
      field.appendChild(s);
    }
  }

  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(build);
  }
  window.addEventListener("load", build);
})();
