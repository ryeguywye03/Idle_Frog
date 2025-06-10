import { Frog } from '$lib/core/Frogs';
import type { FrogData, FrogJob, FrogJobData } from '$lib/types';
import { get, writable } from 'svelte/store';
import { frogJobs } from '../data/FrogJobData';
import { stats } from '$lib/stores/statsStores/gameStats';
import { HousingManager } from '$lib/managers/HousingManager';
import { createFrogData } from '$lib/data/FrogFactory';

import {
  frogs
} from '$lib/stores';

export class FrogManager {
  population: Frog[];

  constructor(data: FrogData[]) {
    this.population = data.map(f => new Frog(f));
  }

  static fromStore(): FrogManager {
    return new FrogManager(get(frogs));
  }

  createFrog(houseId?: string): Frog {
    const data = createFrogData();
    data.id = `frog_${this.population.length + 1}`;
    data.name = `Frog_Name_${this.population.length + 1}`;
    data.houseId = houseId; // ✅ track housing if needed

    const newFrog = new Frog(data);
    this.population.push(newFrog);
    this.sync(); // ✅ this sets the global frogs store
    console.log(`Created frog ${data.id} (Home: ${houseId})`);
    return newFrog;
  }

  spawnFrogs(housingManager: HousingManager): void {
    for (const home of housingManager.homes) {
      const availableSpots = home.getVacancy();

      for (let i = 0; i < availableSpots; i++) {
        console.log("Calling createFrog");
        const frog = this.createFrog(home.id); // include housing reference if needed
        console.log("Created frog:", frog.id);

        const assigned = housingManager.assignFrogToVacantHome(frog.id);
        if (!assigned) {
          console.warn(`Could not assign frog ${frog.id} to housing`);
        }
      }
    }

    this.sync(); // ✅ Store the final population globally
  }


  sync(): void {
    frogs.set(this.population.map(f => f.toData()));
  }


}
