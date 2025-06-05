import type { FrogJobData, UnlockCondition } from '$lib/types';

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

}
