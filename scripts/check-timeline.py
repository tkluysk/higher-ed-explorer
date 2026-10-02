#!/usr/bin/env python3
"""Verify a rendered timeline's geometry.

A timeline that *looks* right is the failure mode: a tick in the wrong place is
invisible without the arithmetic. Run this on the generated HTML, not a screenshot.

    node timeline.js > out.html && python3 check.py out.html

Checks, in the order they tend to break:
  1. every record produced exactly one minimap tick
  2. tick positions rise with date (a sort or parse bug shows up here first)
  3. positions stay within 0-100%
  4. every vertical row pairs with a tick at the same position - two code paths
     computing position from the same dates and disagreeing is the classic bug
  5. same-day records fan vertically (--i) rather than sharing one spot
"""
import re
import sys

# Ordinary ticks carry a fan index; the target marker is a different element with no --i.
# Both are "a record's position on the rail", so both must be counted — matching only .tk
# silently undercounts the moment a page adds a target, and the pairing check then fails
# against a page that is actually correct.
TICK = re.compile(
    r'class="tk([^"]*)" style="left:([\d.]+)%;--i:(\d+)[^"]*" data-d="([^"]+)"'
)
TARGET = re.compile(r'class="tgt" style="left:([\d.]+)%" data-d="([^"]+)"')
ROW = re.compile(r'class="ev [^"]*" data-s="[^"]*" data-p="([\d.]+)"')


def main(path):
    html = open(path, encoding="utf-8").read()
    ticks = TICK.findall(html) + [("", l, "0", d) for l, d in TARGET.findall(html)]
    ticks.sort(key=lambda t: t[3])
    rows = ROW.findall(html)

    if not ticks:
        print("FAIL: no ticks found - did the markup change?")
        return 1

    print(f"{'date':12} {'left%':>8} {'fan':>4}  state")
    for cls, left, i, date in ticks:
        state = "done" if "is-done" in cls else "open"
        print(f"{date:12} {float(left):8.3f} {i:>4}  {state}")

    pos = [float(t[1]) for t in ticks]
    dates = [t[3] for t in ticks]
    ok = True

    def check(label, cond, detail=""):
        nonlocal ok
        print(f"  {'ok  ' if cond else 'FAIL'}  {label}{'' if cond else '  ' + detail}")
        ok &= cond

    print()
    check("ticks match records", len(ticks) == len(rows),
          f"{len(ticks)} ticks vs {len(rows)} rows")
    check("positions rise with date",
          all(pos[k] <= pos[k + 1] for k in range(len(pos) - 1)))
    check("positions within 0-100%", min(pos) >= 0 and max(pos) <= 100,
          f"{min(pos)}..{max(pos)}")
    check("rows pair with ticks", sorted(rows) == sorted(t[1] for t in ticks))

    # Same-day records must fan vertically, never share a spot.
    byday = {}
    for cls, left, i, date in ticks:
        byday.setdefault(date, []).append(int(i))
    clashes = [d for d, idx in byday.items() if len(idx) != len(set(idx))]
    check("same-day records fan vertically", not clashes, f"clashing: {clashes}")

    print("\n" + ("PASS" if ok else "FAIL"))
    return 0 if ok else 1


if __name__ == "__main__":
    sys.exit(main(sys.argv[1] if len(sys.argv) > 1 else "out.html"))
