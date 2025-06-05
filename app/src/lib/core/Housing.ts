import { TICK_INTERVAL_MS } from '../config';
import type { FrogData, FrogJob, HousingData } from '$lib/types';
import { resources, buildings } from '../state';


export class Housing {
  id: string;
  type: string;
  space: number;
  frogs: string[];

  constructor(data: HousingData) {
    this.id = data.id;
    this.type = data.type;
    this.space = data.space;
    this.frogs = data.frogs;
  }

  hasSpace(): boolean {
    return this.frogs.length < this.space;
  }

  getVacancy(): number {
    return this.space - this.frogs.length;
  }

  isFull(): boolean {
    return this.frogs.length >= this.space;
  }


  addFrog(frogId: string): boolean {
    if (this.isFull()) return false;
    if (this.frogs.includes(frogId)) return false;
    this.frogs.push(frogId);
    return true;
  }

  removeFrog(frogId: string): boolean {
    const index = this.frogs.indexOf(frogId);
    if (index !== -1) {
      this.frogs.splice(index, 1);
      return true;
    }
    return false;
  }

  toData(): HousingData {
    return {
      id: this.id,
      type: this.type,
      space: this.space,
      frogs: this.frogs
    };
  }
}
  