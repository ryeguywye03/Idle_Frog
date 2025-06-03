// src/lib/Stats.ts
import { writable } from 'svelte/store';

export const defaultStats = writable({
	clicks: 0,
	fliesManual: 0,
	fliesAuto: 0,
	fliesSpent: 0,
	frogs: 0
});
