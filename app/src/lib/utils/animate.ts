import { get } from 'svelte/store';
import { resources } from '$lib/stores';

const SPEED = 0.03;              // base speed
const FAST_SPEED = 0.5;          // for large jumps
const MANUAL_DIFF_THRESHOLD = 1.5;
const SNAP_THRESHOLD = 0.001;

import { TICK_INTERVAL_MS } from '$lib/config';

export function animateDisplayValues() {
  function update() {
    const current = get(resources);

    for (const res of current) {
      if (res.display_amount === undefined) {
        res.display_amount = res.amount;
        continue;
      }

      if (res.wasClicked || res.wasCrafted) {
        res.display_amount = res.amount;
        res.wasClicked = false;
        res.wasCrafted = false;
        continue;
      }

      // Always animate if there's a difference
      const diff = res.amount - res.display_amount;
      const absDiff = Math.abs(diff);

      if (absDiff > 0.001) {
        // Animate towards amount
        const speed = absDiff > 1.5 ? 0.5 : 0.03;
        const increment = diff * speed;
        res.display_amount += Math.sign(diff) * Math.min(absDiff, Math.abs(increment));
      } else {
        res.display_amount = res.amount;
      }
    }

    resources.set(current);
  }

  function tick() {
    update();
    requestAnimationFrame(tick);
  }

  requestAnimationFrame(tick);
}


