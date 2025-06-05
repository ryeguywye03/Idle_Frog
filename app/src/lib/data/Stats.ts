// src/lib/Stats.ts
import type { StatsData } from '$lib/types';

export const defaultStats: StatsData = {
  total_clicks: 0,
  manual_clicks: 0,
  auto_collections: 0,
  manual_collections: 0,
  flies_collected: 0,
  flies_spent: 0,
  total_frogs: 0,
  frogs_spawned: 0,
  frogs_assigned_jobs: 0,
  frogs_unassigned: 0,
  total_crafts: 0,
  resources_spent_on_crafting: 0,
  buildings_constructed: 0,
  housing_units_built: 0,
  resources_gained: {},
  resources_spent: {},
  unlocks_achieved: 0,
  total_conditions_met: 0,
  time_played_seconds: 0,
  sessions_started: 0,
  last_active: new Date().toISOString()
};
