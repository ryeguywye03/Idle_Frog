  // stores/frogs.ts
  import { persistentStore } from '$lib/utils/persistentStore';
  import type { FrogData } from '$lib/types';

  export const frogs = persistentStore<FrogData[]>('frogs', []);
