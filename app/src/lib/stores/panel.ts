// src/lib/stores/panel.ts
import { writable } from 'svelte/store';

export const currentPanel = writable<'main' | 'camp'>('main');
