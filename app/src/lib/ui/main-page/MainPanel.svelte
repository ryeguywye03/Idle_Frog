<script lang="ts">
    import { onMount } from 'svelte';
    import { get, derived } from 'svelte/store';
    import { resources, buildings } from '$lib/stores';
    import { gameLoaded } from '$lib/stores/engine';
    import { engine } from '$lib/stores/engine';
    import { getResourceTooltip, getBuildingTooltip } from '$lib/utils/tooltips';
    import { createGameObject } from '$lib/utils/createGameObjects';

    import GameButton from '$lib/ui/GameButton.svelte';
    import Card from '$lib/ui/Card.svelte'
    import CardTitle from '$lib/ui/CardTitle.svelte';

    // Rehydrate for UI
    const hydratedResources = derived(resources, $resources => $resources.map(r => createGameObject('resource', r)));
    const hydratedBuildings = derived(buildings, $buildings => $buildings.map(b => createGameObject('building', b)));

    function collect(id: string) {
        const e = get(engine);
        if (!e) return;
        e.collect(id);
        resources.set(Array.from(e.resources.values()));
    }

    function craft(id: string) {
        const e = get(engine);
        if (!e) return;
        e.craft(id);
        resources.set(Array.from(e.resources.values()));
    }

    function build(id: string) {
        const e = get(engine);
        if (!e) return;
        e.build(id);
        resources.set(Array.from(e.resources.values()));
    }

    // Helper to get cost and production for tooltips
    function getResourceCost(resource) {
        // Example: return resource.craftRequirement?.[0]?.amount or similar logic
        return resource.craftRequirement?.[0]?.amount;
    }
    function getResourceProduction(resource) {
        // Example: return resource.autoRate or similar logic
        return resource.autoRate;
    }
    function getBuildingCost(building) {
        // Use the instance method to get the current cost
        if (typeof building.getCurrentCost === 'function') {
            return building.getCurrentCost().map(c => `${c.amount} ${c.resource}`).join(', ');
        }
        return building.base_cost?.map(c => `${c.amount} ${c.resource}`).join(', ');
    }
    function getBuildingProduction(building) {
        // Example: use effects or your own logic
        return building.effects?.find(e => e.type === 'autoRateAdd')?.value;
    }
</script>


<Card>
    <CardTitle>

    </CardTitle>
    <div class="grid grid-cols-2 md:grid-cols-2 gap-4">
        {#each $hydratedResources as resource (resource.id)}
            {#if resource.unlocked}
                {#if resource.manual}
                    <GameButton
                    label={resource.btn_label}
                    tooltipContent={getResourceTooltip(resource, { cost: getResourceCost(resource), production: getResourceProduction(resource) })}
                    onClick={() => collect(resource.id)}
                    disabled={resource.amount >= resource.max}
                    />
                {:else if resource.isCraftable}
                    <GameButton
                    label={resource.btn_label}
                    tooltipContent={getResourceTooltip(resource, { cost: getResourceCost(resource), production: getResourceProduction(resource) })}
                    onClick={() => craft(resource.id)}
                    disabled={resource.amount >= resource.max}
                    />
                {/if}
            {/if}
        {/each}
        {#each $hydratedBuildings as building (building.id)}
            {#if building.unlocked}
            <GameButton
                label={`${building.btn_label} (${building.count})`}
                tooltipContent={getBuildingTooltip(building, { cost: getBuildingCost(building), production: getBuildingProduction(building) })}
                onClick={() => build(building.id)}
                disabled={
                  building.count >= building.maxCount ||
                  !building.getCurrentCost().every(c => $hydratedResources.find(r => r.id === c.resource)?.amount >= c.amount)
                }
            />
            {/if}
        {/each}
    </div>
</Card>