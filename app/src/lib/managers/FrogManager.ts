import { Frog } from '$lib/core/Frogs';
import type { FrogData, FrogJob, FrogJobData } from '../data/types';
import { get, writable } from 'svelte/store';
import { frogJobs } from '../data/FrogJobData';
import { frogs, stats } from '../state';
import { HousingManager } from '$lib/managers/HousingManager';
import { createFrogData } from '$lib/data/FrogFactory';

export class FrogManager {
  population: Frog[];

  constructor(data: FrogData[]) {
    this.population = data.map(f => new Frog(f));
  }

  static fromStore(): FrogManager {
    return new FrogManager(get(frogs));
  }

  createFrog(): Frog {
    const id = `frog_${this.population.length + 1}`;
    const newFrog = new Frog({ id, name: id, job: 'idle', exp: 0, level: 1, isAuto: false, autoRate: 0, tooltip: '' });
    this.population.push(newFrog);
    this.sync();
    console.log(`Created frog ${id}`);
    return newFrog;
  }

  spawnFrogs(housingManager: HousingManager): void {
    // Check how many vacant spots are available
    const vacant = housingManager.homes.reduce((acc, h) => acc + h.getVacancy(), 0);

    
    console.log('Vacant slots available:', vacant);

    for (let i = 0; i < vacant; i++) {
      const frog = this.createFrog();
      const assigned = housingManager.assignFrogToVacantHome(frog.id);

      if (assigned) {
        console.log(`Spawned and assigned Frog ${frog.id}`);
      } else {
        console.warn(`No home for frog ${frog.id}`);
      }
    }
  }


  sync(): void {
    frogs.set(this.population.map(f => f.toData()));
  }


}
