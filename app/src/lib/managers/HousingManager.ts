import { get } from 'svelte/store';
import { housing, buildings } from '$lib/state';
import type { HousingData } from '$lib/types';
import { Housing } from '$lib/core/Housing';
import type { Building } from '$lib/core/Buildings';

import {
  frogs
} from '$lib/stores';

export class HousingManager {
  homes: Housing[];

  constructor(data: HousingData[]) {
      this.homes = data.map(h => new Housing(h));
  }

  static fromStore(): HousingManager {
      return new HousingManager(get(housing));
  }

  private generateHousingId(type: string): string {
      const typeCount = this.homes.filter(h => h.type === type).length;
  return `${type}_${typeCount + 1}`;
  }

  getHousingSpaceFromBuilding(buildingId: string): number {
      const b = get(buildings).find(b => b.id === buildingId);
      if (!b || !b.effects) return 0;

      const spaceEffect = b.effects.find(e => e.type === 'space' && e.target === 'frogs');
      return typeof spaceEffect?.value === 'number' ? spaceEffect.value : 0;
  }

  createHousingUnit(buildingType: string): void {
      const id = this.generateHousingId(buildingType);
      const space = this.getHousingSpaceFromBuilding(buildingType);

      const newHome = new Housing({
          id,
          type: buildingType,
          space,
          frogs: []
      });

      this.homes.push(newHome);
      this.sync();
  }   

  hasVacancy(): boolean {
    return this.homes.some(h => h.hasSpace());
  }

  findVacantHome(): Housing | undefined {
      console.log('All homes:', this.homes);
      return this.homes.find(h => h.hasSpace());
  }

  assignFrogToVacantHome(frogId: string): boolean {
    const home = this.findVacantHome();
    if (home) {
      home.addFrog(frogId);
      this.sync();
      return true;
    }
    return false;
  }

  removeFrogFromAll(frogId: string): void {
    for (const h of this.homes) {
      h.removeFrog(frogId);
    }
    this.sync();
  }

  sync(): void {
    housing.set(this.homes.map(h => h.toData()));
  }

  toData(): HousingData[] {
    return this.homes.map(h => h.toData());
  }
}
