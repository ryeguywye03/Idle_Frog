import { nanoid } from 'nanoid';
import type { FrogData } from '$lib/types';

export function createFrogData(): FrogData {
  return {
    id: nanoid(),
    name: 'Unnamed Frog',
    job: 'idle',
    exp: 0,
    level: 1,
    isAuto: false,
    autoRate: 0
  };
}
