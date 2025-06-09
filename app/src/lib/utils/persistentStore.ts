// src/lib/utils/persistentStore.ts
import { writable } from 'svelte/store';
import { browser } from '$app/environment';

export function persistentStore<T>(key: string, initialValue: T) {
	let initial = initialValue;

	if (browser) {
		try {
			const stored = localStorage.getItem(key);
			if (stored !== null) {
				initial = JSON.parse(stored);
			}
		} catch (e) {
			console.warn(`Error reading from localStorage[${key}]`, e);
		}
	}

	const store = writable<T>(initial);

	if (browser) {
		store.subscribe(value => {
			try {
				localStorage.setItem(key, JSON.stringify(value));
			} catch (e) {
				console.warn(`Error writing to localStorage[${key}]`, e);
			}
		});
	}

	return store;
}
