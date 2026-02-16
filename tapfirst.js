/* TapFirst.js — mobile tap, desktop QR (same destination) */
(function () {
  function isProbablyMobile() {
    const ua = navigator.userAgent || "";
    const byUA = /Android|iPhone|iPad|iPod|IEMobile|Opera Mini/i.test(ua);
    const byTouch = (navigator.maxTouchPoints || 0) > 1;
    const byPointer = window.matchMedia && window.matchMedia("(pointer: coarse)").matches;
    return byUA || (byTouch && byPointer);
  }

  function setVisible(el, show) {
    if (!el) return;
    el.style.display = show ? "" : "none";
  }

  function init() {
    const dest =
      document.querySelector("[data-tapfirst-dest]")?.getAttribute("data-tapfirst-dest") ||
      document.querySelector('meta[name="tapfirst-dest"]')?.content ||
      "";

    if (!dest) {
      console.warn("TapFirst: No destination set. Add data-tapfirst-dest or meta tapfirst-dest.");
      return;
    }

    const tapWrap = document.getElementById("tapfirst-tap");
    const qrWrap = document.getElementById("tapfirst-qr");
    const tapLink = document.getElementById("tapfirst-link");
    const tapBtn = document.getElementById("tapfirst-button");
    const qrImg = document.getElementById("tapfirst-qrimg");
    const qrLink = document.getElementById("tapfirst-qrlink");

    if (tapLink) { tapLink.href = dest; tapLink.textContent = dest; }

    if (tapBtn) tapBtn.href = dest;

    if (qrImg) {
      const qrUrl =
        "https://api.qrserver.com/v1/create-qr-code/?size=240x240&data=" +
        encodeURIComponent(dest);
      qrImg.src = qrUrl;
      qrImg.alt = "QR code for: " + dest;
    }
    if (qrLink) qrLink.href = dest;

    const mobile = isProbablyMobile();
    setVisible(tapWrap, mobile);
    setVisible(qrWrap, !mobile);

    console.log("TapFirst: mode =", mobile ? "MOBILE_TAP" : "DESKTOP_QR", "| dest =", dest);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();

