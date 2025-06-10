import type { Resource } from '../core/Resources';
import type { Building } from '../core/Buildings';

export type EffectHandler = (target: any, effect: any, context: any) => void;

export class EffectsManager {
  static handlers: Record<string, EffectHandler> = {
    autoRateAdd: (target, effect, { count }) => {
      target.autoRate += effect.value * count;
    },
    isAuto: (target, effect) => {
      target.isAuto = Boolean(effect.value);
    },
    percentBonus: (target, effect, { count }) => {
      target.autoRate *= 1 + (effect.value * count);
    },
    // Add more handlers here!
  };

  static applyEffects(resources: Resource[], buildings: Building[], frogs?: any[], upgrades?: any[], context: any = {}) {
    // Reset all modifiers
    for (const res of resources) res.resetModifiers?.();

    // Apply building effects
    for (const b of buildings) {
      const count = b.count;
      if (!b.effects || count === 0) continue;
      for (const effect of b.effects) {
        const target = resources.find(r => r.id === effect.target);
        if (!target) continue;
        const handler = EffectsManager.handlers[effect.type];
        if (handler) handler(target, effect, { ...context, count, building: b });
        else console.warn('Unknown effect type:', effect.type);
      }
    }

    // TODO: Apply frog effects, upgrades, etc. in a similar way
    // ...
  }
} 