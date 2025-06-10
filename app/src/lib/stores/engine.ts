// engineStore.ts
import { writable } from 'svelte/store';
import type { GameEngine } from '$lib/core/GameEngine';
import { persistentStore } from '$lib/utils/persistentStore';

export const engine = writable<GameEngine | null>(null);
export const gameLoaded = persistentStore<boolean>('gameLoaded', false);