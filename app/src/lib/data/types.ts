// types.ts

export type UnlockCondition =
  | { type: 'resource'; id: string; amount: number }
  | { type: 'building'; id: string; amount: number }
  | { type: 'stat'; key: keyof Stats; value: number }
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
  justClicked?: boolean;
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

export interface Stats {
    total_clicks: number;
    flies_collected: number;
    flies_spent: number;
    total_frogs: number;
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
}

export interface GameData {
  resources: ResourceData[];
  upgrades: UpgradeData[];
  buildings: BuildingData[];
  frogjobs?: FrogJobData[];
  frogs?: FrogData[];
  housing: HousingData[];
  stats: Stats;
}