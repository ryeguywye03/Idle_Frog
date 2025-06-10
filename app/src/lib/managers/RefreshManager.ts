import { get } from 'svelte/store';
import { resources, buildings } from '$lib/stores';
import { housing } from '$lib/stores/gameStores/housing';
import { Resource } from '$lib/core/Resources';
import { HousingManager } from './HousingManager';
import { createGameObject } from '$lib/utils/createGameObjects';
import { EffectsManager } from '$lib/managers/EffectsManager';

import {
  frogs
} from '$lib/stores';

export class RefreshManager {
  static applyAll(): void {
    // 1. Rehydrate
    let resList = get(resources).map(r => createGameObject('resource', r));
    const bldList = get(buildings).map(b => createGameObject('building', b));

    // 2. Apply all effects using EffectsManager
    EffectsManager.applyEffects(resList, bldList);

    // 3. Update store with plain data
    resources.set(resList.map(r => r.toData()));
  }

  static applyBuildingEffects() {
    let resList = get(resources).map(r => createGameObject('resource', r));
    const bldList = get(buildings).map(b => createGameObject('building', b));



    for (const res of resList) {
      res.resetModifiers?.();
    }

    for (const b of bldList) {
      const count = b.count;
      if (!b.effects || count === 0) {
        continue;
      }

      for (const effect of b.effects) {
        const target = resList.find(r => r.id === effect.target);
        if (!target) {
          continue;
        }

        switch (effect.type) {
          case 'autoRateAdd':
            target.autoRate += effect.value * count;
            break;
          case 'isAuto':
            target.isAuto = Boolean(effect.value);
            break;
          default:
        }
      }
    }

    resources.set([...resList]);
  }

  static applyAutoCollection() {
    const resList = get(resources).map(r => createGameObject('resource', r));
    for (const res of resList) {
      if (res.unlocked && res.isAuto) {
        // No-op: startAutoCollect is deprecated/removed
      }
    }
  }

  static restoreHousingUnits() {
    const housingMgr = HousingManager.fromStore();

    if (housingMgr.homes.length === 0) {
      const bldList = get(buildings);
      for (const b of bldList) {
        if (b.type === 'housing' && b.unlocked) {
          for (let i = 0; i < b.count; i++) {
            housingMgr.createHousingUnit(b.id);
          }
        }
      }
    }

    const savedFrogs = get(frogs);
    if (savedFrogs.length > 0) {
      for (const home of housingMgr.homes) {
        for (const frogId of home.frogs) {
          home.addFrog(frogId);
        }
      }
    }

    housingMgr.sync();
  }
}
