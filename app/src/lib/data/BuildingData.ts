import type { BuildingData } from '$lib/types';
import raw from '$lib/data/raw/buildings.json';

export const defaultBuildings: BuildingData[] = raw as BuildingData[];
