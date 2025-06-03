// tooltip.ts

export function formatTooltipHTML(
    label: string,
    baseCost: number,
    rateGrowth: number,
    owned: number,
    baseProduction: number,
    multiplier: number = 1
  ): string {
    const costNext = (baseCost * Math.pow(rateGrowth, owned)).toFixed(2);
    const production = (baseProduction * owned * multiplier).toFixed(2);
  
    return `
      <div>
        <strong>${label}</strong><br/>
        Cost (next): <span>${costNext}</span><br/>
        Production: <span>${production}/sec</span><br/>
        <em>Rate growth: ${rateGrowth}, owned: ${owned}</em>
      </div>
    `;
  }
  