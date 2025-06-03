// src/lib/Resources/ResourceData.ts
import type { ResourceData } from './types';

export const defaultResources: ResourceData[] = [
  {
    id: 'flies',
    name: 'Flies',
    btn_label: 'Catch Flies',
    amount: 0,
    display_amount: 0,
    storage: 5000,
    increment: 1,
    isAuto: false,
    autoRate: 0,
    unlocked: true,
    manual: true,
    tooltip: {
      label: 'Catch some flies',
      // html: `<em>Basic frog currency. Gathered manually or by frog units.</em>`
    }
  },
  {
    id: 'stems',
    name: 'Stems',
    btn_label: 'Refine Flies → Stems',
    amount: 0,
    display_amount: 0,
    storage: 5000,
    increment: 1,
    isAuto: false,
    autoRate: 0,
    unlocked: false,
    manual: false,
    isCraftable: true,
    craftRequirement: [
      { type: 'resource', id: 'flies', amount: 100 }
    ],
    unlockConditions: [
      { type: 'resource', id: 'flies', amount: 2 }
    ],
    tooltip: {
      label: 'Refine Flies → Stems',
      // html: `<em>Basic frog currency. Gathered manually or by frog units.</em>`
    }
  }
];
