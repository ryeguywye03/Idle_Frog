import { persistentStore } from '$lib/utils/persistentStore';
import type { BuildingData } from '$lib/types/coreTypes';

export const buildings = persistentStore<BuildingData[]>('buildings', []); 