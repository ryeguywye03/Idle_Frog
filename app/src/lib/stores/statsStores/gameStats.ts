import { persistentStore } from '$lib/utils/persistentStore';
import type { StatsData } from '$lib/types';

export const stats = persistentStore<StatsData>('stats', {
  total_clicks: 0,
  manual_clicks: 0,
  auto_collections: 0,
  manual_collections: 0,
  flies_collected: 0,
  flies_spent: 0,
  total_frogs: 0,
  frogs_spawned: 0,
  buildings_built: 0,
  upgrades_purchased: 0,
  time_played: 0,
  last_save: 0,
  game_started: 0,
  game_version: '1.0.0',
  achievements_unlocked: 0,
  total_resources_generated: 0
}); 