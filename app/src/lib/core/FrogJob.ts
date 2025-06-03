import type { FrogJobData, UnlockCondition } from '../data/types';

export class FrogJob implements FrogJobData {
  id: string;
  name: string;
  unlocked: boolean;
  unlockConditions?: UnlockCondition[];

  constructor(data: Partial<FrogJobData>) {
    this.id = data.id ?? '';
    this.name = data.name ?? '';
    this.unlocked = data.unlocked ?? false;
    this.unlockConditions = data.unlockConditions ?? [];
  }

  toData(): FrogJobData {
    return {
      id: this.id,
      name: this.name,
      unlocked: this.unlocked,
      unlockConditions: this.unlockConditions
    };
  }

  meetsConditions(getters: {
    resource: (id: string) => number;
    building: (id: string) => number;
    stat: (key: string) => number;
  }): boolean {
    if (!this.unlockConditions) return true;

    return this.unlockConditions.every(cond => {
      switch (cond.type) {
        case 'resource': return getters.resource(cond.id) >= cond.amount;
        case 'building': return getters.building(cond.id) >= cond.amount;
        case 'stat': return getters.stat(cond.key) >= cond.value;
        case 'upgrade': return false; // Extend when needed
      }
    });
  }
}
