// defaults.ts

import { defaultResources } from '$lib/data/ResourceData';
import { defaultBuildings } from '$lib/data/BuildingData';
import { defaultFrogJobs } from '$lib/data/FrogJobData';
import { defaultStats } from '$lib/data/Stats'; // <- as discussed earlier

import type { GameData } from '$lib/types';

export function createNewGameData(): GameData {
  return {
    resources: defaultResources.map(r => ({ ...r })),
    buildings: defaultBuildings.map(b => ({ ...b })),
    frogjobs: defaultFrogJobs.map(j => ({ ...j })),
    frogs: [],
    housing: [],
    upgrades: [],
    stats: { ...defaultStats }
  };
}
