import { get } from 'svelte/store';
import { resources, buildings, housing, frogs } from '$lib/state';
import { Resource } from '$lib/core/Resources';
import { HousingManager } from './HousingManager';

export class RefreshManager {
  static applyAll(): void {
    this.applyBuildingEffects();
    this.applyAutoCollection();
    this.restoreHousingUnits();
  }

  static applyBuildingEffects() {
    const resList = get(resources);
    const bldList = get(buildings);

    for (const res of resList) {
      res.resetModifiers?.();
    }

    for (const b of bldList) {
      const count = b.count;
      if (!b.effects || count === 0) continue;

      for (const effect of b.effects) {
        const target = resList.find(r => r.id === effect.target);
        if (!target) continue;

        switch (effect.type) {
          case 'autoRateAdd':
            target.autoRate += effect.value * count;
            break;
          case 'isAuto':
            target.isAuto = Boolean(effect.value);
            break;
        }
      }
    }

    resources.set([...resList]);
  }

    static applyAutoCollection() {
        for (const res of get(resources)) {
            if (res.unlocked && res.isAuto) {
                res.startAutoCollect();
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
