import { get } from 'svelte/store';
import { resources } from '$lib/state';

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

      const diff = res.amount - res.display_amount;
      const absDiff = Math.abs(diff);

      if (res.wasClicked || res.wasCrafted) {
        res.display_amount = res.amount;
        res.wasClicked = false;
        res.wasCrafted = false;
        continue;
      }

      if (diff < 0) {
        res.display_amount = res.amount;
        continue;
      }

      const speed = absDiff > MANUAL_DIFF_THRESHOLD ? FAST_SPEED : SPEED;
      const increment = diff * speed;
      res.display_amount += Math.sign(diff) * Math.min(absDiff, Math.abs(increment));

      if (absDiff < SNAP_THRESHOLD) {
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


