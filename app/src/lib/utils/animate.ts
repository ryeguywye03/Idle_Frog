import { get } from 'svelte/store';
import { resources } from '$lib/state';

const SPEED = 0.03;              // base speed
const FAST_SPEED = 0.5;          // for large jumps
const MANUAL_DIFF_THRESHOLD = 1.5;
const SNAP_THRESHOLD = 0.001;

export function animateDisplayValues() {
  let lastTime = performance.now();

  function tick(now) {
    const delta = (now - lastTime) / 1000; // in seconds
    lastTime = now;

    const current = get(resources);

    for (const res of current) {
      if (res.display_amount === undefined) {
        res.display_amount = res.amount;
        continue;
      }

      const diff = res.amount - res.display_amount;
      const absDiff = Math.abs(diff);

      if (res.justClicked) {
        // Instant update when manually clicked
        res.display_amount = res.amount;
        res.justClicked = false;
        continue;
      }

      if (diff < 0) {
        // Resource was spent – instantly reduce
        res.display_amount = res.amount;
        continue;
      }

      // Animate toward target with speed based on difference
      const speed = absDiff > MANUAL_DIFF_THRESHOLD ? FAST_SPEED : SPEED;
      res.display_amount += diff * speed * delta;

      // Snap to exact value if very close
      if (absDiff < SNAP_THRESHOLD) {
        res.display_amount = res.amount;
      }
    }

    resources.set(current);
    requestAnimationFrame(tick);
  }

  requestAnimationFrame(tick);
}
