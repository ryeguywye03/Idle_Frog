import { writable } from 'svelte/store';
import type { FrogData } from '$lib/types';

export const frogs = writable<FrogData[]>([]);