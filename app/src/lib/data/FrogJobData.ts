import { writable } from 'svelte/store';
import type { FrogJobData } from '$lib/types';

export const defaultFrogJobs: FrogJobData[] = [
  {
    id: 'stemcutter',
    name: 'Stem Cutter',
    unlocked: false,
    unlockConditions: [
      { type: 'building', id: 'lily_pad', amount: 1 }
    ]
  }
];

export const frogJobs = writable<FrogJobData[]>(defaultFrogJobs);
