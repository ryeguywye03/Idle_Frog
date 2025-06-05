// src/lib/managers/StatsManager.ts

import { writable } from 'svelte/store';
import { defaultStats } from '$lib/data/Stats';
import type { StatsData } from '$lib/types';

function mergeWithDefaults(saved: Partial<StatsData>): StatsData {
  return {
    ...defaultStats,
    ...saved,
    resources_gained: {
      ...defaultStats.resources_gained,
      ...saved.resources_gained
    },
    resources_spent: {
      ...defaultStats.resources_spent,
      ...saved.resources_spent
    }
  };
}

export class StatsManager {
  static store = writable<StatsData>({ ...defaultStats });

  static init(saved?: Partial<StatsData>) {
    const merged = mergeWithDefaults(saved ?? {});
    StatsManager.store.set(merged);
  }

  static increment(key: keyof StatsData, amount = 1) {
    StatsManager.store.update(s => {
      if (typeof s[key] === 'number') {
        (s[key] as number) += amount;
      }
      return s;
    });
  }

  static addResourceGain(id: string, amount: number) {
    StatsManager.store.update(s => {
      s.resources_gained[id] = (s.resources_gained[id] ?? 0) + amount;
      return s;
    });
  }

  static addResourceSpent(id: string, amount: number) {
    StatsManager.store.update(s => {
      s.resources_spent[id] = (s.resources_spent[id] ?? 0) + amount;
      return s;
    });
  }

  static updateLastActive() {
    StatsManager.store.update(s => {
      s.last_active = new Date().toISOString();
      return s;
    });
  }

  static get() {
    let value: StatsData;
    StatsManager.store.subscribe(v => (value = v))();
    return value!;
  }
}
