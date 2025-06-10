import { persistentStore } from '$lib/utils/persistentStore';
import type { FrogJobData } from '$lib/types';

export const frogJobs = persistentStore<FrogJobData[]>('frogJobs', []); 