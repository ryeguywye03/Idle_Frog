<script lang="ts">
    import { onMount } from 'svelte';
    import { get } from 'svelte/store';
    import { resources, buildings, gameLoaded } from '$lib/state';
    import { engine } from '$lib/core/EngineStore';

    import GameButton from '$lib/ui/GameButton.svelte';
    import Card from '$lib/ui/Card.svelte'
    import CardTitle from '$lib/ui/CardTitle.svelte';

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

</script>


<Card>
    <CardTitle>

    </CardTitle>
    <div class="grid grid-cols-2 md:grid-cols-2 gap-4">
        {#each $resources as resource (resource.id)}
            {#if resource.unlocked}
                {#if resource.manual}
                    <GameButton
                    label={resource.btn_label}
                    tooltipContent={resource.getTooltipHTML()}
                    onClick={() => collect(resource.id)}
                    disabled={resource.amount >= resource.max}
                    />
                {:else if resource.isCraftable}
                    <GameButton
                    label={resource.btn_label}
                    tooltipContent={resource.getTooltipHTML()}
                    onClick={() => craft(resource.id)}
                    disabled={resource.amount >= resource.max}
                    />
                {/if}
            {/if}
        {/each}
        {#each $buildings as building (building.id)}
            {#if building.unlocked}
            <GameButton
                label={`${building.btn_label} (${building.count})`}
                tooltipContent={building.getTooltipHTML()}
                onClick={() => build(building.id)}
                disabled={building.count >= building.maxCount}
            />
            {/if}
        {/each}
    </div>
</Card>