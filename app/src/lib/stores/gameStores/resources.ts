import { persistentStore } from '$lib/utils/persistentStore';
import type { ResourceData } from '$lib/types/coreTypes';

export const resources = persistentStore<ResourceData[]>('resources', []); 