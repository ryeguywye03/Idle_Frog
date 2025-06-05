import { TICK_INTERVAL_MS } from '../config';
import type { FrogData, FrogJob } from '$lib/types';
import { resources, buildings, housing, frogs, frogJobs } from '../state';

export class Frog {
  id: string;
  name: string;
  job: FrogJob;
  exp: number;
  level: number;
  isAuto: boolean;
  autoRate: number;
  tooltip?: { label: string; html: string };
  houseId?: string;

  constructor(data: Partial<FrogData>) {
    this.id = data.id ?? '';
    this.name = data.name ?? '';
    this.job = data.job ?? 'idle';
    this.exp = data.exp ?? 0;
    this.level = data.level ?? 1;
    this.isAuto = data.isAuto ?? false;
    this.autoRate = data.autoRate ?? 0;
    this.tooltip = data.tooltip;
    this.houseId = data.houseId;
  }

  toData(): FrogData {
    return {
      id: this.id,
      name: this.name,
      job: this.job,
      exp: this.exp,
      level: this.level,
      isAuto: this.isAuto,
      autoRate: this.autoRate,
      tooltip: this.tooltip,
      houseId: this.houseId // ✅ include for saving
    };
  }

  findHousing(): boolean {
    const housingList = get(housing);
    for (const unit of housingList) {
      const hasSpace = unit.frogs.length < unit.space;
      const alreadyInHouse = unit.frogs.includes(this.id);
      if (hasSpace && !alreadyInHouse) {
        unit.frogs.push(this.id);
        housing.set([...housingList]); // trigger reactivity
        return true;
      }
    }
    return false; // No housing found
  }

  leaveHousing(): void {
    const housingList = get(housing);
    for (const unit of housingList) {
      const index = unit.frogs.indexOf(this.id);
      if (index !== -1) {
        unit.frogs.splice(index, 1);
      }
    }
    housing.set([...housingList]);
  }
}