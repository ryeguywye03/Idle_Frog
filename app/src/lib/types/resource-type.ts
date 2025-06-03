export interface ResourceData {
    id: string;
    name: string;
    amount: number;
    storage: number;
    increment: number;
    isAuto: boolean;
    autoRate: number;
    unlocked: boolean;
    manual?: boolean;
    isCraftable?: boolean;
    tooltip?: {
      label: string;
      html?: string;
    };
    btn_label?: string;
    unlockConditions?: {
      resource: string;
      amount: number;
    };
    craftRequirement?: {
      resource: string;
      amount: number;
    }
  }