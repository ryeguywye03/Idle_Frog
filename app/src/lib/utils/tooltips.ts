export function getTooltipHTML(data: { tooltip?: { label?: string; html?: string } }): string {
  if (!data.tooltip) return '';
  let html = '';
  if (data.tooltip.label) html += `<strong>${data.tooltip.label}</strong><br/>`;
  if (data.tooltip.html) html += `<span>${data.tooltip.html}</span>`;
  return html;
}

export function getResourceTooltip(resource: any, opts: { cost?: number|string, production?: number|string } = {}) {
  let html = '';
  if (resource.tooltip?.label) html += `<strong>${resource.tooltip.label}</strong><br/>`;
  if (resource.tooltip?.html) html += `<span>${resource.tooltip.html}</span><br/>`;
  if (opts.cost !== undefined) html += `<div>Cost: <span>${opts.cost}</span></div>`;
  if (opts.production !== undefined) html += `<div>Production: <span>${opts.production}/sec</span></div>`;
  return html;
}

export function getBuildingTooltip(building: any, opts: { cost?: string, production?: string } = {}) {
  let html = '';
  if (building.tooltip?.label) html += `<strong>${building.tooltip.label}</strong><br/>`;
  if (building.tooltip?.html) html += `<span>${building.tooltip.html}</span><br/>`;
  if (opts.cost) html += `<div>Cost: <span>${opts.cost}</span></div>`;
  if (opts.production) html += `<div>Production: <span>${opts.production}/sec</span></div>`;
  return html;
} 