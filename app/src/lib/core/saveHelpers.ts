import { get } from 'svelte/store';
import { resources, buildings, upgrades, frogJobs } from '$lib/stores';
import { housing } from '$lib/stores/gameStores/housing';
import { stats } from '$lib/stores/statsStores/gameStats';
import { frogs } from '$lib/stores/frogs';

import type { GameData } from '$lib/types';
import { HousingManager } from '$lib/managers/HousingManager';

export function buildSaveData(): GameData {
  return {
    resources: get(resources).map(r => ({
      id: r.id,
      amount: r.amount,
      autoRate: r.autoRate,
      isAuto: r.isAuto
    })),
    buildings: get(buildings).map(b => ({
      id: b.id,
      count: b.count,
      unlocked: b.unlocked
    })),
    upgrades: get(upgrades).map(u => u.id),
    stats: get(stats),
    frogs: get(frogs).map(f => ({
      id: f.id,
      name: f.name,
      job: f.job,
      exp: f.exp,
      level: f.level,
      isAuto: f.isAuto,
      autoRate: f.autoRate,
      tooltip: f.tooltip
    })),
    frogjobs: get(frogJobs).map(job => ({
      id: job.id,
      unlocked: job.unlocked
    })),
    housing: HousingManager.fromStore().toData()

  };
}
