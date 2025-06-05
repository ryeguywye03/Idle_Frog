// saveTypes.ts

import type { ResourceData } from "./coreTypes";
import type { BuildingData } from "./coreTypes";
import type { HousingData } from "./coreTypes";
import type { FrogData, FrogJobData } from "./coreTypes";
import type { Stats } from "./coreTypes";
import type { UpgradeData } from "./coreTypes";


export interface GameData {
  resources: ResourceData[];
  buildings: BuildingData[];
  housing: HousingData[];
  frogs?: FrogData[];
  frogjobs?: FrogJobData[];
  stats: Stats;
  upgrades: UpgradeData[];
}