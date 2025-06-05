// coreTypes.ts

export type UnlockCondition =
  | { type: 'resource'; id: string; amount: number }
  | { type: 'building'; id: string; amount: number }
  // | { type: 'frog'}
  | { type: 'frogJob'; id: string }
  | { type: 'stat'; key: keyof StatsData; value: number }
  | { type: 'upgrade'; id: string };

export interface Unlockable {
  id: string;
  unlocked: boolean;
  unlockConditions?: UnlockCondition[];
}

export type CraftRequirement = { type: 'resource'; id: string; amount: number }


export interface ResourceData {
  id: string;
  name: string;
  amount: number;
  display_amount: number;
  storage: number;
  increment: number;
  isAuto: boolean;
  autoRate: number;
  unlocked: boolean;
  manual?: boolean;
  wasClicked?: boolean;
  wasCrafted?: boolean;
  isCraftable?: boolean;
  tooltip?: {
    label: string;
    html?: string;
  };
  btn_label?: string;
  unlockConditions?: UnlockCondition[];
  craftRequirement?: CraftRequirement[];
}

export interface BuildingEffect {
  type: 'autoRateAdd' | 'isAuto' | 'space'; // Extend as needed
  target: string; // resource id
  value: number | boolean;
}

export type BuildingType = 'housing' | 'production' | 'undefined';

export interface BuildingData {
  id: string;
  name: string;
  btn_label?: string;
  count: number; 
  maxCount?: number;
  base_cost: { resource: string; amount: number }[];
  costGrowth?: number;                 
  unlocked: boolean;
  unlockConditions?: UnlockCondition[];
  type: BuildingType;
  tooltip?: {
    label: string;
    html?: string;
  };                   
  effects?: BuildingEffect[];
}

export type UpgradeData = {
    id: string;
    name: string;
    cost: number;
    appliesTo: string; // resource ID
    unlocked?: boolean;
    purchased?: boolean;
    condition?: (resources: Map<string, ResourceData>) => boolean;
    effect: (r: ResourceData) => ResourceData;
};

export interface HousingData {
  id: string;
  type: string;
  space: number;
  frogs: string[];   
}

export type FrogJob = 'idle' | 'Stemcutter' | 'builder';

export interface FrogJobData  {
  id: string;
  name: string;
  unlocked: boolean;
  unlockConditions?: UnlockCondition[]; 
}

export interface FrogData {
  id: string;
  name: string;
  job: FrogJob;
  exp: number;
  level?: number;
  isAuto: boolean;
  autoRate: number;
  tooltip?: { label: string; html: string };
  houseId?: string
}

export interface StatsData {
  total_clicks: number;
  manual_clicks: number;
  auto_collections: number;
  manual_collections: number;

  flies_collected: number;
  flies_spent: number;
  stems_collected?: number; // optional based on game depth

  total_frogs: number;
  frogs_spawned: number;
  frogs_assigned_jobs: number;
  frogs_unassigned: number;

  total_crafts: number;
  resources_spent_on_crafting: number;

  buildings_constructed: number;
  housing_units_built: number;

  resources_gained: Record<string, number>;
  resources_spent: Record<string, number>;

  unlocks_achieved: number;
  total_conditions_met: number;

  time_played_seconds: number;
  sessions_started: number;
  last_active: string;
}
