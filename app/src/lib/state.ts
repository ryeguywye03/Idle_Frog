// src/lib/state.ts

import { writable } from 'svelte/store';
export const gameLoaded = writable(false);
import type { Resource } from './core/Resources';
import type { Building } from './core/Buildings';
import type { Housing } from './core/Housing';
import type { Frog } from './core/Frogs';
import type { FrogJob } from './core/FrogJob';

import type { HousingData, FrogData } from '$lib/types';

import { type StatsData, type UpgradeData } from '$lib/types';

export const resources = writable<Resource[]>([]);

export const buildings = writable<Building[]>([]);

export const upgrades = writable<UpgradeData[]>([]);

export const housing = writable<HousingData[]>([]);

// export const frogs = writable<Frog[]>([]);

export const frogJobs = writable<FrogJob[]>([]);

export const stats = writable<StatsData>({
  total_clicks: 0,
  flies_collected: 0,
  flies_spent: 0,
  total_frogs: 0
});



