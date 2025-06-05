import type { GameState, GameData } from "$lib/types";
import { createGameObject } from "$lib/utils/createGameObjects";
import { UnlockManager } from "./UnlockManager";
import { HousingManager } from "./HousingManager";

export class GameRehydrationManager {
  static rehydrate(saved: GameData): GameState {
    const resources = new Map(
      (saved.resources ?? []).map(data => [data.id, createGameObject('resource', data)])
    );

    for (const r of resources.values()) {
      r.display_amount = r.amount;
    }

    const buildings = new Map(
      (saved.buildings ?? []).map(data => [data.id, createGameObject('building', data)])
    );

    const housingManager = new HousingManager([]);

    // Step 1: Create housing from building counts
    for (const [buildingId, building] of buildings.entries()) {
      if (building.type === 'housing') {
        for (let i = 0; i < building.count; i++) {
          housingManager.createHousingUnit(buildingId);
        }
      }
    }

    // Step 2: Restore frog assignments from saved housing
    for (const savedUnit of saved.housing ?? []) {
      const unit = housingManager.homes.find(h => h.id === savedUnit.id);
      if (unit) {
        unit.frogs = savedUnit.frogs ?? [];
      }
    }

    const frogJobs = new Map(
      (saved.frogjobs ?? []).map(data => [data.id, createGameObject('frogJob', data)])
    );

    const frogs = new Map(
      (saved.frogs ?? []).map(data => [data.id, createGameObject('frog', data)])
    );

    const stats = saved.stats ?? null;

    return {
      resources,
      buildings,
      housing: housingManager.homes, // ✅ use rebuilt housing
      frogs,
      frogJobs,
      stats,
      upgrades: saved.upgrades ?? []
    };
  }
}
