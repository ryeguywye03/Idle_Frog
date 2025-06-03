// engineStore.ts
import { writable } from 'svelte/store';
import type { GameEngine } from '$lib/core/GameEngine';

export const engine = writable<GameEngine | null>(null);