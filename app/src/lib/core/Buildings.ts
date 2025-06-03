// src/lib/core/Building.ts
import type { BuildingData, BuildingEffect, BuildingType, UnlockCondition } from '../data/types';
import { Resource } from './Resources';
import { buildings, stats } from '../state';
import { get } from 'svelte/store';

export class Building {
  id: string;
  name: string;
  btn_label?: string;
  count: number;
  maxCount?: number;
  base_cost: { resource: string; amount: number } [];
  costGrowth: number;
  unlocked: boolean;
  unlockConditions: UnlockCondition[];
  type: BuildingType;
  tooltip?: { label: string; html: string };
  effects?: BuildingEffect[];

  constructor(data: Partial<BuildingData>) {
    this.id = data.id  ?? '';
    this.name = data.name  ?? '';
    this.btn_label = data.btn_label;
    this.count = data.count  ?? 0;
    this.maxCount = data.maxCount;
    this.base_cost = data.base_cost ?? [];
    this.costGrowth = data.costGrowth ?? 1;
    this.unlocked = data.unlocked ?? false;
    this.unlockConditions = data.unlockConditions ?? [];
    this.type = data.type ?? "undefined";
    this.tooltip = data.tooltip ?? {};
    this.effects = data.effects ?? [];
  }

  toData(): BuildingData {
    return {
      id: this.id,
      name: this.name,
      btn_label: this.btn_label,
      count: this.count,
      maxCount: this.maxCount,
      base_cost: this.base_cost,
      costGrowth: this.costGrowth,
      unlocked: this.unlocked,
      unlockConditions: this.unlockConditions,
      type: this.type,
      tooltip: this.tooltip,
      effects: this.effects
    };
  }

  getCurrentCost(): { resource: string; amount: number }[] {
    return this.base_cost.map(c => ({
      resource: c.resource,
      amount: +(c.amount * Math.pow(this.costGrowth, this.count)).toFixed(2)
    }));
  }

  

  build(resources: Map<string, Resource>) {
    const costItems = this.getCurrentCost();
    if (!this.unlocked || !this.base_cost) return;

    for (const cost of costItems) {
      const res = resources.get(cost.resource);
      if (!res || res.amount < cost.amount) return;

      res?.spend(cost.amount);

    }
    this.count += 1;
  }
  
  getTooltipHTML(): string {
    const lines: string[] = [];
  
    // Optional header
    if (this.tooltip?.label) {
      lines.push(`<div><strong>${this.tooltip.label}</strong></div>`);
    }
  
    // Optional description
    if (this.tooltip?.html) {
      lines.push(`<div style="color: #444; font-size: 0.9rem; margin-top: 4px;">${this.tooltip.html}</div>`);
    }
  
    // Horizontal divider
    lines.push(`<hr style="margin: 6px 0; border: none; border-top: 1px solid #888;" />`);
  
    // Build cost section (align name left, amount right)
    const costs = this.getCurrentCost();
    for (const cost of costs) {
      lines.push(`
        <div style="display: flex; justify-content: space-between; font-size: 0.9rem;">
          <span style="color: #222;">${cost.resource}</span>
          <span style="color: crimson;">${cost.amount}</span>
        </div>
      `);
    }
    
    // Optional italic flavor (tooltip.label doubles as label+flavor)
    if (this.tooltip?.label) {
      lines.push(`<div style="font-style: italic; font-size: 0.75rem; margin-top: 6px; text-align: right;">${this.tooltip.label}</div>`);
    }
  
    return `<div style="min-width: 200px;">${lines.join('')}</div>`;
  }
}