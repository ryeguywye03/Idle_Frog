import { createGameObject } from '../core/createGameObjects';

type GameObjectType = 'resource' | 'building' | 'frog' | 'housing' | 'frogJob';

export function rehydrateMap<T extends { id: string }>(
  type: GameObjectType,
  data: T[]
): Map<string, any> {
  const map = new Map<string, any>();
  for (const obj of data) {
    const instance = createGameObject(type, obj); // ✅ now resolved
    map.set(instance.id, instance);
  }
  return map;
}
