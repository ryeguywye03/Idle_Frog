<script lang="ts">
    import { onMount } from 'svelte';
    import { get } from 'svelte/store';
    import { frogJobs } from '$lib/state';
    import FrogButton from '$lib/ui/FrogButton.svelte';
    import { engine } from '$lib/core/EngineStore';
    import Card from '$lib/ui/Card.svelte'
    import CardTitle from '$lib/ui/CardTitle.svelte';


</script>


<Card>
    <CardTitle>
        Camp
    </CardTitle>
    <div class="grid grid-cols-2 md:grid-cols-2 gap-4">


            {#each $frogJobs as frogJob (frogJob.id)}
                {#if frogJob.unlocked}
                    <FrogButton
                    label={'test'}
                    tooltipContent={'test'}
                    onClick={() => console.log('test')}

                    />
                {/if}
            {/each}

            <!-- <button class="btn btn-outline flex-1 ">Woodcutter (1)</button>
            <button class="btn btn-outline" >[+]</button>
            <button class="btn btn-outline" >[-]</button> -->


    </div>
    
</Card>