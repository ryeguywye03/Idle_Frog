import { get } from 'svelte/store';
import { GameSaveManager } from './managers/GameSaveManager';
import { defaultResources } from './data/ResourceData';
import { defaultBuildings } from './data/BuildingData';
import { defaultFrogJobs } from './data/FrogJobData';
import { defaultStats } from './data/Stats';
import { createGameObject } from './core/createGameObjects';
import { rehydrateMap } from './utils/rehydration';
import { resources, buildings, frogJobs , frogs, housing, stats, gameLoaded } from './state';
import type { GameData } from './data/types';
import { GameEngine } from './core/GameEngine';
import { engine } from './core/EngineStore';
import { buildSaveData } from './core/saveHelpers';
import { animateDisplayValues } from '$lib/utils/animate';
import { Frog } from '$lib/core/Frogs';


declare global {
  interface Window {
    __autosaveStarted?: boolean;
  }
}



export async function initGame(): Promise<GameData> {
  const saved = GameSaveManager.load();

  const resourceMap = rehydrateMap('resource', saved?.resources ?? defaultResources);
  const buildingMap = rehydrateMap('building', saved?.buildings ?? defaultBuildings);

  const housingArray = saved?.housing ?? [];
  const housingMap = rehydrateMap('housing',housingArray);

  const savedJobs = saved?.frogjobs ?? defaultFrogJobs;
  frogJobs.set(savedJobs);

  const frogArray = (saved?.frogs ?? []).map(data => createGameObject('frog', data));
  const frogMap = new Map<string, Frog>(frogArray.map(f => [f.id, f]));

  
  const gameEngine = new GameEngine(resourceMap, buildingMap, frogMap);
  engine.set(gameEngine);

  animateDisplayValues();

  resources.set([...resourceMap.values()]);
  buildings.set([...buildingMap.values()]);

  housing.set([...housingMap.values()]);
  // stats.set(saved?.stats ?? defaultStats);
  // frogs.set(frogArray);

  gameEngine.checkAllUnlocks();



  if (typeof window !== 'undefined' && !window.__autosaveStarted) {
    GameSaveManager.startAutosave(() => buildSaveData());
    window.__autosaveStarted = true;
  }



  gameLoaded.set(true);

  return buildSaveData();
}
