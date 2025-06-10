import { persistentStore } from '$lib/utils/persistentStore';
import type { UpgradeData } from '$lib/types';

export const upgrades = persistentStore<UpgradeData[]>('upgrades', []); 