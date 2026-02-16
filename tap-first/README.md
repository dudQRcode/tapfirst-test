# Tap-First Access

A reference implementation of the Tap-First Access rule.

If access can’t be used immediately on the device it’s shown on, it isn’t access.

---

## The Problem: Dud QR

A Dud QR is any QR code that cannot be used on the device it’s shown on.

Common case:
A QR displayed on a mobile screen, with no same-device path.

Users screenshot.
Switch apps.
Get stuck.
Abandon.

This is a design failure, not a user failure.

---

## The Rule

If access is shown on mobile, it must be tappable.

QR is allowed.
QR is not primary.
QR is a transport, not the interface.

Same destination.
Context decides surface.

---

## What This Repository Provides

1. TapFirst.js (reference implementation)
2. Behaviour contract for Tap-First compliant systems
3. Licensing boundary for commercial embedding

---

## Installation

Include the script:

<script src="tapfirst.js"></script>

Mark a container:

<div data-tapfirst data-destination="https://example.com">
  <div class="tapfirst-tap">
    <a href="#">Open now</a>
  </div>

  <div class="tapfirst-qr">
    <img alt="QR">
  </div>
</div>

Then initialize:

<script>
  document.addEventListener("DOMContentLoaded", function () {
    TapFirst.initialize();
  });
</script>

---

## Behaviour Contract

A system is Tap-First compliant if:

- Same-device completion is possible.
- Tap is primary on touch devices.
- QR is secondary.
- The same destination is used everywhere.
- No instructions are required to proceed.

---

## Free Use

Free for:
- Personal projects
- Learning
- Prototypes
- Open source work

---

## Commercial Use

A paid licence is required for:

- Internal company systems
- Client-facing platforms
- Revenue-generating products
- Educational institutions
- SaaS platforms

Contact: (replace with your email)

---

This already exists as a problem.
Tap-First simply names it and fixes it properly.
