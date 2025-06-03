import { TICK_INTERVAL_MS } from '../config';
import type { ResourceData, UnlockCondition, CraftRequirement } from '../data/types';
import { resources, stats } from '../state';

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
  justClicked?: boolean;
  isCraftable: boolean;
  btn_label?: string;
  unlockConditions?: UnlockCondition[];
  craftRequirement?: CraftRequirement[];
  tooltip?: { label: string; html: string };


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
    this.justClicked = data.justClicked ?? false;
    this.isCraftable = data.isCraftable ?? false;
    this.tooltip = data.tooltip;
    this.btn_label = data.btn_label;
    this.unlockConditions = data.unlockConditions;
    this.craftRequirement = data.craftRequirement;
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
      justClicked: this.justClicked,
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

  startAutoCollect() {
    // console.log("start automation");
    if (this.autoTimer) return;
    if (!this.unlocked || !this.isAuto || this.autoRate <= 0) return;
  
    this.autoTimer = setInterval(() => {
      this.generate();
    }, TICK_INTERVAL_MS);
  }

  generate() {
    if (!this.unlocked) return;
    if (this.isAuto){
      this.amount += this.autoRate;
      // console.log("Generate ",this.name);
      if (this.amount > this.storage) this.amount = this.storage;

      this.updateStoreTrigger();
    }
  }

  get productionRate(): number {
    if (!this.isAuto) return 0;
    if (this.isAuto) {
      // console.log(this.autoRate)
      return this.autoRate;
    }
  }

  collect(isManual = true) {
    if (!this.unlocked) return;
    if (isManual && !this.manual) return;

    this.amount += this.increment;
    if (this.amount > this.storage) this.amount = this.storage;

    stats.update(s => {
      if (isManual) s.total_clicks += 1;
      if (this.id === 'flies') {
        if (isManual) s.flies_collected += this.increment;
        this.justClicked = true;
      }
      if (this.id === 'stems') {
        if (isManual) s.flies_collected += this.increment;
        this.justClicked = true;
      }
      return s;
    });
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
      if (this.id === 'flies') {
        s.flies_spent += amount;
      }
      return s;
    });
  
    return true;
  }

  canCraft(){
    console.log('Can Craft Test');
  }

  craft(resource: Map<string, Resource>) {
    console.log('Craft Call');

    this.canCraft();

    if (!this.unlocked || !this.craftRequirement) return;

    const canCraft = this.craftRequirement.every(req => {
      const res = resource.get(req.id);
      return res && res.amount >= req.amount;
    });

    if(canCraft){
      console.log('Can Craft True');
      for (const req of this.craftRequirement) {
        const res = resource.get(req.id);
        if (!res?.spend(req.amount)) return; // ✅ uses the updated .spend(amount) method
      }
    }

    this.amount = Math.min(this.amount + this.increment, this.storage);
  }

  updateFromData(data: ResourceData) {
    this.amount = data.amount;
    this.increment = data.increment;
    this.isAuto = data.isAuto ?? this.isAuto;
    this.autoRate = data.autoRate ?? this.autoRate;
    this.unlocked = data.unlocked ?? this.unlocked;
    this.manual = data.manual ?? this.manual;
  }

  getTooltipHTML(): string {
    const lines: string[] = [];
  
    // Optional label
    if (this.tooltip?.label) {
      lines.push(`<div><strong>${this.tooltip.label}</strong></div>`);
    }
  
    // Optional description
    if (this.tooltip?.html) {
      lines.push(`<div style="color: #444; font-size: 0.9rem; margin-top: 4px;">${this.tooltip.html}</div>`);
    }
  
    // Divider
    lines.push(`<hr style="margin: 6px 0; border: none; border-top: 1px solid #888;" />`);
  
    // Craft requirement
    if (this.craftRequirement) {
      lines.push(`
        <div style="display: flex; justify-content: space-between; font-size: 0.9rem;">
          <span style="color: darkgreen;">${this.craftRequirement.resource}</span>
          <span style="color: crimson;">${this.craftRequirement.amount}</span>
        </div>
      `);
    }
  
    // Manual/auto info
    if (this.manual) {
      lines.push(`<em>Can be gathered manually.</em>`);
    }
  
    if (this.isAuto) {
      lines.push(`<em>Auto-produces <strong>${this.increment}</strong>/s</em>`);
    }
  
    // Unlock requirement
    if (this.unlockConditions) {
      lines.push(`<div style="color: goldenrod;">Unlocks at ${this.unlockConditions.amount} ${this.unlockConditions.resource}</div>`);
    }
  
    // Resource bar
    lines.push(`
      <div style="display: flex; justify-content: space-between; margin-top: 8px;">
        <span>Current:</span>
        <span>${this.amount.toFixed(1)} / ${this.storage}</span>
      </div>
    `);
  
    // Optional italic flavor label
    if (this.tooltip?.label) {
      lines.push(`<div style="font-style: italic; font-size: 0.75rem; text-align: right; margin-top: 4px;">${this.tooltip.label}</div>`);
    }
  
    return `<div style="font-size: 0.9rem; line-height: 1.4; min-width: 200px;">${lines.join('')}</div>`;
  }
  

}