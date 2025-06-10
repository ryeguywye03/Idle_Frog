import { Resource } from './Resources';
import { Building } from './Buildings';
import { Frog } from './Frogs';
import { resources, buildings, upgrades } from '$lib/stores';
import { stats } from '$lib/stores/statsStores/gameStats';
import { frogs } from '$lib/stores/frogs';
import { get } from 'svelte/store';
import { UnlockManager } from '$lib/managers/UnlockManager';
import { FrogManager } from '$lib/managers/FrogManager';
import { HousingManager } from '$lib/managers/HousingManager';
import { RefreshManager } from '$lib/managers/RefreshManager';
import { createGameObject } from '$lib/utils/createGameObjects';

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

  tick() {
    // Get latest resources from the store and rehydrate for logic
    const latestResources = get(resources).map(r => createGameObject('resource', r));

    // Centralized auto-collect
    for (const res of latestResources) {
      if (res.unlocked && res.isAuto && res.autoRate > 0) {
        res.amount += res.autoRate;
        if (res.amount > res.storage) res.amount = res.storage;
      }
    }

    // After logic, update the store with the new values
    resources.set(latestResources.map(r => r.toData()));

    // Try to spawn frogs into vacant homes
    console.log(this.housingManager.hasVacancy());
    if(this.housingManager.hasVacancy() === true){
      this.frogManager.spawnFrogs(this.housingManager);
    }

    // Sync everything
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

    if (building.count > 0 && building.type === 'housing') {
      this.housingManager.createHousingUnit(id);
    }

    buildings.set(Array.from(this.buildings.values()).map(b => b.toData()));
    resources.set(Array.from(this.resources.values()).map(r => r.toData()));
  }

  refresh() {
    RefreshManager.applyAll();
    frogs.set([...this.frogs.values()]);
  }

 
  checkAllUnlocks() {
    UnlockManager.updateAllUnlocks();
    this.refresh();
  }

}
