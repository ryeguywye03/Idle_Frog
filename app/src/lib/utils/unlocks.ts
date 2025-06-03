import type { UnlockCondition, Stats } from '$lib/data/types';
import type { Resource } from '$lib/core/Resources';
import type { Building } from '$lib/core/Buildings';
import type { Frog } from '$lib/core/Frogs';

export function checkUnlockConditions(
  conditions: UnlockCondition[],
  context: {
    resources: Map<string, Resource>,
    buildings: Map<string, Building>,
    frogs: Map<string, Frog>,
    upgrades?: string[]
  }
): boolean {
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

      case 'frog': {
        const f = context.frogs.get(condition.id);
        if (!f || f.level < (condition.level ?? 1)) return false;
        break;
      }

      case 'upgrade': {
        if (!context.upgrades?.includes(condition.id)) return false;
        break;
      }

      default:
        return false;
    }
  }

  return true;
}
