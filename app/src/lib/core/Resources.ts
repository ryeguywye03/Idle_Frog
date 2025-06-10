import { TICK_INTERVAL_MS } from '../config';
import type { ResourceData, UnlockCondition, CraftRequirement } from '$lib/types';
import { resources, stats } from '$lib/stores';
import { StatsManager } from '$lib/managers/StatsManager';

export class Resource {
  id: string;
  name: string;
  amount: number;
  display_amount: number;
  storage: number;
  increment: number;
  isAuto: boolean;
  autoRate: number;
  unlocked: boolean;
  manual: boolean;
  wasClicked?: boolean;
  wasCrafted?: boolean;
  wasAutoCollected?: boolean;
  isCraftable: boolean;
  btn_label?: string;
  unlockConditions?: UnlockCondition[];
  craftRequirement?: CraftRequirement[];
  tooltip?: { label: string; html?: string };

  constructor(data: Partial<ResourceData>) {
    this.id = data.id ?? '';
    this.name = data.name ?? '';
    this.amount = data.amount ?? 0;
    this.display_amount = data.display_amount ?? 0;
    this.storage = data.storage ?? 0;
    this.increment = data.increment ?? 1;
    this.isAuto = data.isAuto ?? false;
    this.autoRate = data.autoRate ?? 0;
    this.unlocked = data.unlocked ?? false;
    this.manual = data.manual ?? false;
    this.wasClicked = data.wasClicked ?? false;
    this.wasCrafted = data.wasCrafted ?? false;
    this.isCraftable = data.isCraftable ?? false;
    this.tooltip = data.tooltip;
    this.btn_label = data.btn_label;
    this.unlockConditions = data.unlockConditions;
    this.craftRequirement = data.craftRequirement;
    this.wasAutoCollected = false;
  }

  toData(): ResourceData {
    return {
      id: this.id,
      name: this.name,
      amount: this.amount,
      display_amount: this.display_amount,
      storage: this.storage,
      increment: this.increment,
      isAuto: this.isAuto,
      autoRate: this.autoRate,
      unlocked: this.unlocked,
      manual: this.manual,
      wasClicked: this.wasClicked,
      wasCrafted: this.wasCrafted,
      isCraftable: this.isCraftable,
      tooltip: this.tooltip,
      btn_label: this.btn_label,
      unlockConditions: this.unlockConditions,
      craftRequirement: this.craftRequirement
    };
  }

  updateStoreTrigger() {
    resources.update(list => list);
  }

  resetModifiers() {
    this.autoRate = 0;
  }

  generate() {
    if (!this.unlocked || !this.isAuto || this.autoRate <= 0) return;

    const before = performance.now();

    this.amount += this.autoRate;
    if (this.amount > this.storage) this.amount = this.storage;

    this.updateStoreTrigger();

    const after = performance.now();
    // console.log(`[${this.name}] Tick took ${Math.round(after - before)}ms`);
  }

  get productionRate(): number {
    if (!this.isAuto) return 0;
    return this.autoRate;
  }

  collect(isManual = true) {
    if (!this.unlocked) return;
    if (isManual && !this.manual) return;

    this.amount += this.increment;
    if (this.amount > this.storage) this.amount = this.storage;

    StatsManager.increment('flies_collected',this.increment);
    
    
    this.wasClicked = true;
    this.updateStoreTrigger();
  }

  canAfford(resources: Map<string, Resource>): boolean {
    if (!this.craftRequirement) return true;

    return this.craftRequirement.every(req => {
      const res = resources.get(req.id);
      return res !== undefined && res.amount >= req.amount;
    });
  }

  spend(amount: number): boolean {
    if (this.amount < amount) return false;
    this.amount -= amount;
  
    stats.update(s => {
      // if (this.id === 'flies') {
      //   s.flies_spent += amount;
      // }
      return s;
    });
  
    return true;
  }

  canCraft(resources: Map<string, Resource>): boolean {
    if (!this.unlocked || !this.craftRequirement) return false;

    return this.craftRequirement.every(req => {
      const res = resources.get(req.id);
      return res !== undefined && res.amount >= req.amount;
    });
  }

  craft(resources: Map<string, Resource>) {
    console.log('Craft Call');

    if (!this.canCraft(resources)) {
      console.warn('Craft failed: requirements not met.');
      return;
    }

    for (const req of this.craftRequirement!) {
      const res = resources.get(req.id);
      if (!res?.spend(req.amount)) {
        console.warn(`Craft failed during cost deduction: ${req.id}`);
        return;
      }
    }

    this.amount = Math.min(this.amount + this.increment, this.storage);
    this.wasCrafted = true; // ✅ Set only after a successful craft
    this.updateStoreTrigger();
  }

  updateFromData(data: ResourceData) {
    this.amount = data.amount;
    this.increment = data.increment;
    this.isAuto = data.isAuto ?? this.isAuto;
    this.autoRate = data.autoRate ?? this.autoRate;
    this.unlocked = data.unlocked ?? this.unlocked;
    this.manual = data.manual ?? this.manual;
  }
}