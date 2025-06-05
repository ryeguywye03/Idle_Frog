// UnlockManager.ts

import { get } from 'svelte/store';
import { buildings, resources, frogs, frogJobs, upgrades, stats } from '../state';
import type { UnlockCondition, Stats, GameState} from '$lib/types';
import type { Resource } from '$lib/core/Resources';
import type { Building } from '$lib/core/Buildings';
import type { Frog } from '$lib/core/Frogs';
import type { FrogJob } from '$lib/core/FrogJob';

type UnlockContext = {
  resources: Map<string, Resource>,
  buildings: Map<string, Building>,
  frogs: Map<string, Frog>,
  frogJobs: Map<string, FrogJob>,
  upgrades?: string[],
  stats?: Stats
};

export class UnlockManager {
  static updateAllUnlocks(): void {
    const context: UnlockContext = {
      resources: new Map(get(resources).map(r => [r.id, r])),
      buildings: new Map(get(buildings).map(b => [b.id, b])),
      frogs: new Map(get(frogs).map(f => [f.id, f])),
      frogJobs: new Map((get(frogJobs) ?? []).map(j => [j.id, j])),
      upgrades: get(upgrades).filter(u => u.purchased).map(u => u.id),
      stats: get(stats)
    };

    this.updateResources(context);
    this.updateFrogJobs(context);
    this.updateBuildings(context);

  }

  static applyUnlocksToState(state: GameState): void {
    const context: UnlockContext = {
      resources: state.resources,
      buildings: state.buildings,
      frogs: state.frogs,
      frogJobs: state.frogJobs,
      upgrades: state.upgrades.filter(u => u.purchased).map(u => u.id),
      stats: state.stats
    };

    for (const r of state.resources.values()) {
      if (!r.unlocked && this.conditionsMet(r.unlockConditions ?? [], context)) {
        r.unlocked = true;
      }
    }

    for (const b of state.buildings.values()) {
      if (!b.unlocked && this.conditionsMet(b.unlockConditions ?? [], context)) {
        b.unlocked = true;
      }
    }

    for (const j of state.frogJobs.values()) {
      if (!j.unlocked && this.conditionsMet(j.unlockConditions ?? [], context)) {
        j.unlocked = true;
      }
    }
  }

  static updateResources(context: UnlockContext): void {
    const rsres = get(resources);
    let changed = false;

    for (const r of rsres) {
      if (!r.unlocked && this.conditionsMet(r.unlockConditions ?? [], context)) {
        r.unlocked = true;
        changed = true;
      }
    }

    if (changed) resources.set([...rsres]);
  }

  static updateFrogJobs(context: UnlockContext): void {
    const jobs = get(frogJobs);
    let changed = false;

    for (const job of jobs) {
      if (!job.unlocked && this.conditionsMet(job.unlockConditions ?? [], context)) {
        job.unlocked = true;
        changed = true;
      }
    }

    if (changed) frogJobs.set([...jobs]);
  }

  static updateBuildings(context: UnlockContext): void {
    const bldgs = get(buildings);
    let changed = false;

    for (const b of bldgs) {
      if (!b.unlocked && this.conditionsMet(b.unlockConditions ?? [], context)) {
        b.unlocked = true;
        changed = true;
      }
    }

    if (changed) buildings.set([...bldgs]);
  }

  // ✅ Replaces checkUnlockConditions
  static conditionsMet(conditions: UnlockCondition[], context: UnlockContext): boolean {
    for (const condition of conditions) {
      switch (condition.type) {
        case 'resource': {
          const r = context.resources.get(condition.id);
          if (!r || r.amount < condition.amount) return false;
          break;
        }
        case 'building': {
          const b = context.buildings.get(condition.id);
          if (!b || b.count < condition.amount) return false;
          break;
        }
        case 'frogJob': {
          const f = context.frogJobs.get(condition.id);
          if (!f || !f.unlocked) return false;
          break;
        }
        case 'upgrade': {
          if (!context.upgrades?.includes(condition.id)) return false;
          break;
        }
        case 'stat': {
          const s = context.stats?.[condition.key];
          if (s === undefined || s < condition.value) return false;
          break;
        }
        default:
          return false;
      }
    }
    return true;
  }


}