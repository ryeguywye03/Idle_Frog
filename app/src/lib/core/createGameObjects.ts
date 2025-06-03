import { Resource } from './Resources';
import { Building } from './Buildings';
import { Frog } from './Frogs';
import { FrogJob } from './FrogJob';
import { Housing } from './Housing';
import { defaultResources } from '../data/ResourceData';
import { defaultBuildings } from '../data/BuildingData';

export function createGameObject(type: 'resource', data: any): Resource;
export function createGameObject(type: 'building', data: any): Building;
export function createGameObject(type: 'frog', data: any): Frog;
export function createGameObject(type: 'housing', data: any): Housing;
export function createGameObject(type: 'frogJob', data: any): FrogJob;
export function createGameObject(type: string, data: any): any {
  switch (type) {
    case 'resource': {
      const base = defaultResources.find(r => r.id === data.id);
      if (!base) throw new Error(`Unknown resource id: ${data.id}`);
      return new Resource({ ...base, ...data });
    }
    case 'building': {
      const base = defaultBuildings.find(b => b.id === data.id);
      if (!base) throw new Error(`Unknown building id: ${data.id}`);
      return new Building({ ...base, ...data });
    }
    case 'housing': {
      return new Housing(data); // ✅ Fix is here
    }
    case 'frog': {
      // Frogs are user-defined — just rehydrate directly
      return new Frog(data);
    }
    case 'frogJob': {
      return new FrogJob(data);
    }
    default:
      throw new Error(`Unsupported game object type: ${type}`);
  }
}