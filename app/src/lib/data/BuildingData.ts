// src/lib/data/BuildingData.ts
import type { BuildingData } from './types';

export const defaultBuildings: BuildingData[] = [
  {
    id: 'fly_net',
    name: 'Fly Net',
    btn_label: 'Deploy Fly Net',
    count: 0,
    base_cost: [
      { resource: 'flies', amount: 10 }
    ],
    costGrowth: 1.12,
    unlocked: false,
    unlockConditions: [
      { type: 'resource', id: 'flies', amount: 3 }
    ],
    type: 'production',
    tooltip: {
      label: 'Auto-Fly Collector',
      // html: '<em>Gathers flies passively over time.</em>'
    },
    effects: [
      { type: 'autoRateAdd', target: 'flies', value: 0.57 },
      { type: 'isAuto', target: 'flies', value: true }
    ]
  },
  {
    id: 'lily_pad',
    name: 'Lily Pad',
    btn_label: 'Place Lily Pad',
    count: 0,
    base_cost: [
      { resource: 'stems', amount: 5 }
    ],
    costGrowth: 1.20,
    unlocked: false,
    unlockConditions: [
      { type: 'resource', id: 'stems', amount: 2 }
    ],
    type: 'housing',
    tooltip: {
      label: 'Frog Housing',
      // html: '<em>Each Lily Pad can house up to 2 frogs.</em>'
    },
    effects: [
      { type: 'space', target: 'frogs', value: 2 }
    ]
  }
];
