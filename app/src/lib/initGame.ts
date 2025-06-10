// initGame.ts

import { GameSaveManager } from '$lib/managers/GameSaveManager';
import { GameRehydrationManager } from '$lib/managers/GameRehydrationManager';

import { engine } from '$lib/stores/engine';
import { GameEngine } from '$lib/core/GameEngine';
import { buildSaveData } from '$lib/core/saveHelpers';
import { animateDisplayValues } from '$lib/utils/animate';

import { resources, buildings, frogs, frogJobs } from '$lib/stores';
import { housing } from '$lib/stores/gameStores/housing';
import { stats } from '$lib/stores/statsStores/gameStats';
import { gameLoaded } from '$lib/stores/engine';


import type { GameData, GameState } from '$lib/types';

declare global {
  interface Window {
    __autosaveStarted?: boolean;
  }
}

export async function initGame(): Promise<GameState> {
  const saved: GameData = GameSaveManager.load();

  // ✅ NEW — use your manager!
  const state: GameState = GameRehydrationManager.rehydrate(saved);

  const gameEngine = new GameEngine(state.resources, state.buildings, state.frogs);
  engine.set(gameEngine);

  // ✅ Set all stores from state
  resources.set([...state.resources.values()]);
  buildings.set([...state.buildings.values()]);
  frogJobs.set([...state.frogJobs.values()]);
  frogs.set([...state.frogs.values()]);
  housing.set(state.housing);
  stats.set(state.stats); // Once implemented

  animateDisplayValues();
  gameEngine.checkAllUnlocks();

  if (typeof window !== 'undefined' && !window.__autosaveStarted) {
    GameSaveManager.startAutosave(() => buildSaveData());
    window.__autosaveStarted = true;
  }

  gameLoaded.set(true);

  return state;
}
