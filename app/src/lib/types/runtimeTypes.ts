// runtimeTypes.ts

import type { FrogData, FrogJobData, UpgradeData } from './coreTypes';


import type { Resource } from '$lib/core/Resources';
import type { Building } from '$lib/core/Buildings';
import type { Frog } from '$lib/core/Frogs';
import type { FrogJob } from '$lib/core/FrogJob';
import type { Housing } from '$lib/core/Housing';
import type { Stats } from './coreTypes';



export interface GameState {
  resources: Map<string, Resource>;
  buildings: Map<string, Building>;
  housing: Housing[];
  frogs: Map<string, Frog>;
  frogJobs: Map<string, FrogJob>;
  stats: Stats;
  upgrades: UpgradeData[];
}