import { persistentStore } from '$lib/utils/persistentStore';
import type { HousingData } from '$lib/types';

export const housing = persistentStore<HousingData[]>('housing', []); 