<script lang="ts">
    import { onMount } from 'svelte';
    import { get } from 'svelte/store';
    import { resources, buildings, gameLoaded } from '$lib/state';
    import { engine } from '$lib/core/EngineStore';
    import { GameSaveManager } from '$lib/managers/GameSaveManager';
    import { currentPanel } from '$lib/stores/panel';

    import Layout from '$lib/ui/layout/Layout.svelte';
    import ResourcePanel from '$lib/ui/main-page/ResourcePanel.svelte';
    import MainPanel from '$lib/ui/main-page/MainPanel.svelte';
    import CampPanel from '$lib/ui/main-page/CampPanel.svelte';




    let tickInterval: ReturnType<typeof setInterval>;

    onMount(() => {
        const unsubscribe = engine.subscribe($engine => {
            if ($engine && typeof $engine.tick === 'function') {
            console.log('Engine ready, starting tick loop...');
            clearInterval(tickInterval);
            tickInterval = setInterval(() => {
                $engine.tick();
            }, 1000);
            }
        });

        return () => {
            unsubscribe();
            clearInterval(tickInterval);
        };
    });
    

</script>


<Layout>
    <div class="container">
        <div class="grid grid-cols-2 gap-4">
            <ResourcePanel />

            {#if $currentPanel === 'main'}
                <MainPanel />
            {:else if $currentPanel === 'camp'}
                <CampPanel />
            {/if}
        </div>
    </div>
</Layout>


<!-- <div class="grid grid-cols-2 gap-4">
    <div class="bg-base-200 p-4 rounded">Panel 1</div>
    <div class="bg-base-200 p-4 rounded">Panel 2</div>
</div> -->

    

<style>
    .container {
        height: 100%;
        /* overflow-y: auto; */
    }
</style>
