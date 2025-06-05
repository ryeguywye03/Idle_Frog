import type { GameData } from '$lib/types';
import { buildSaveData } from '$lib/core/saveHelpers';
import { createNewGameData } from '$lib/utils/defaults';

const STORAGE_KEY = 'idleFrogGameSave';
let autosaveId: number | null = null;

export class GameSaveManager {
  static save(data: GameData): void {
    try {
      const json = JSON.stringify(data);
      localStorage.setItem(STORAGE_KEY, json);
    } catch (error) {
      console.error('Error saving game data:', error);
    }
  }

  static load(): GameData {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      console.info('No save found. Starting new game...');
      return createNewGameData();
    }

    try {
      const parsed = JSON.parse(raw);

      if (
        typeof parsed !== 'object' ||
        !Array.isArray(parsed.resources) ||
        typeof parsed.stats !== 'object'
      ) {
        console.warn('Invalid save format. Clearing and resetting...');
        GameSaveManager.clear();
        return createNewGameData();
      }

      return parsed as GameData;
    } catch (error) {
      console.error('Failed to parse saved game data:', error);
      GameSaveManager.clear();
      return createNewGameData();
    }
  }

  static clear(): void {
    localStorage.removeItem(STORAGE_KEY);
    console.info('Game save cleared.');
  }

  static hasSave(): boolean {
    return localStorage.getItem(STORAGE_KEY) !== null;
  }

  static startAutosave(callback: () => GameData = buildSaveData, ms: number = 30000): void {
    if (autosaveId !== null) {
      clearInterval(autosaveId);
    }

    autosaveId = window.setInterval(() => {
      try {
        const data = callback();
        GameSaveManager.save(data);
        console.log('Autosaved game data');
        console.log(data);
      } catch (error) {
        console.error('Autosave failed:', error);
      }
    }, ms);
  }

  static stopAutosave(): void {
    if (autosaveId !== null) {
      clearInterval(autosaveId);
      autosaveId = null;
      console.info('Stopped autosave.');
    }
  }
}
