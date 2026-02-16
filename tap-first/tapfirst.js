/*!
 * Tap-First.js v1.0.0
 * Reference implementation of the Tap-First Access behaviour contract.
 *
 * Behaviour:
 * - On touch/mobile devices → show tap surface
 * - On non-touch/desktop → show QR surface
 * - Same destination always
 *
 * No tracking.
 * No cookies.
 * No external dependencies.
 */

(function (root, factory) {
  if (typeof define === "function" && define.amd) {
    define([], factory);
  } else if (typeof module === "object" && module.exports) {
    module.exports = factory();
  } else {
    root.TapFirst = factory();
  }
})(this, function () {
  "use strict";

  var VERSION = "1.0.0";

  function isTouchDevice() {
    var hasTouchPoints = navigator.maxTouchPoints && navigator.maxTouchPoints > 1;
    var coarsePointer =
      window.matchMedia && window.matchMedia("(pointer: coarse)").matches;
    var mobileUA = /Android|iPhone|iPad|iPod|IEMobile|Opera Mini/i.test(
      navigator.userAgent || ""
    );

    return hasTouchPoints || coarsePointer || mobileUA;
  }

  function enhanceElement(el) {
    var destination = el.getAttribute("data-destination");
    if (!destination) return;

    var tapContainer = el.querySelector(".tapfirst-tap");
    var qrContainer = el.querySelector(".tapfirst-qr");

    if (!tapContainer || !qrContainer) return;

    if (isTouchDevice()) {
      tapContainer.style.display = "";
      qrContainer.style.display = "none";
    } else {
      tapContainer.style.display = "none";
      qrContainer.style.display = "";
    }

    var tapLink = tapContainer.querySelector("a");
    if (tapLink) {
      tapLink.setAttribute("href", destination);
    }

    var qrImg = qrContainer.querySelector("img");
    if (qrImg && !qrImg.src) {
      qrImg.src =
        "https://api.qrserver.com/v1/create-qr-code/?size=240x240&data=" +
        encodeURIComponent(destination);
      qrImg.alt = "QR code for " + destination;
    }
  }

  function initialize() {
    var targets = document.querySelectorAll("[data-tapfirst]");
    for (var i = 0; i < targets.length; i++) {
      enhanceElement(targets[i]);
    }
  }

  return {
    version: VERSION,
    initialize: initialize
  };
});
