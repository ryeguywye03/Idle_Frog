
import { Resource } from './Resources';
import { Building } from './Buildings';
import { Frog } from './Frogs';
import { resources, buildings, frogs, upgrades, stats } from '$lib/state';
import { get } from 'svelte/store';
import { checkUnlockConditions } from '../utils/unlocks';
import type { Unlockable, Stats } from '../data/types';
import { UnlockManager } from '$lib/managers/UnlockManager';
import { FrogManager } from '$lib/managers/FrogManager';
import { HousingManager } from '$lib/managers/HousingManager';
import { RefreshManager } from '$lib/managers/RefreshManager';

export class GameEngine {
  resources: Map<string, Resource>;
  buildings: Map<string, Building>;
  frogs: Map<string, Frog>;

  frogManager: FrogManager;
  housingManager: HousingManager;

  constructor(
    resources: Map<string, Resource>,
    buildings: Map<string, Building>,
    frogs?: Map<string, Frog>
  ) {
    if (!resources) throw new Error('GameEngine Missing Resource Maps.');
    if (!buildings) throw new Error('GameEngine Missing Building Maps.');
    if (!frogs) throw new Error('GameEngine Missing Frogs Maps.');

    this.resources = resources;
    this.buildings = buildings;
    this.frogs = frogs;

    // Initialize managers using state
    this.frogManager = FrogManager.fromStore();
    this.housingManager = HousingManager.fromStore();


    this.initialize();
  }

  private initialize() {
    console.log('Initializing engine');
    this.checkAllUnlocks();
    this.refresh();
  }

  get(id: string): Resource | undefined {
    return this.resources.get(id);
  }

  get_resources(): Resource[] {
    return [...this.resources.values()];
  }

  get_buildings(): Building[] {
    return [...this.buildings.values()];
  }

  collect(id: string) {
    this.resources.get(id)?.collect(true);
    this.checkAllUnlocks();
  }

  craft(id: string) {
    console.log('[ENGINE] Craft triggered for:', id);

    const res = this.resources.get(id);
    if (!res) {
      console.warn('No resource found for:', id);
      return;
    }

    res.craft(this.resources);
    this.checkAllUnlocks();
  }

  build(id: string) {
    const building = this.buildings.get(id);
    if (!building) return;

    building.build(this.resources);

    if(building.count > 0 && building.type === 'housing'){

      this.housingManager.createHousingUnit(id);

    }
    this.checkAllUnlocks();
  }

  checkAutoGenerators() {
    for (const res of this.resources.values()) {
      if (res.unlocked && res.isAuto) {
        res.startAutoCollect();
      }
    }
  }

  tick() {
    // console.log('Tick');
    // Existing generators
    this.checkAutoGenerators();

    // Try to spawn frogs into vacant homes

    console.log(this.housingManager.hasVacancy());


    if(this.housingManager.hasVacancy() === true){
      this.frogManager.spawnFrogs(this.housingManager);
    }

    // this.frogManager.spawnFrogs(this.housingManager);

    // Sync everything
    this.refresh();
  }

  refresh() {
    RefreshManager.applyAll();
    resources.set(this.get_resources());
    buildings.set(this.get_buildings());
    frogs.set([...this.frogs.values()]);
  }

 
  checkAllUnlocks() {
    UnlockManager.updateAllUnlocks();
    this.refresh();
  }

}
