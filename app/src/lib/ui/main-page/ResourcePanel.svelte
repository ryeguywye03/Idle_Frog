<script lang="ts">
    import { onMount } from 'svelte';
    import { get } from 'svelte/store';
    import { resources, buildings, gameLoaded } from '$lib/state';
    import { engine } from '$lib/core/EngineStore';

    import Card from '$lib/ui/Card.svelte'
    import CardTitle from '$lib/ui/CardTitle.svelte';
    import ResourceTable from '../ResourceTable.svelte';
    

</script>




<Card>
    <CardTitle>

    </CardTitle>


    <ResourceTable />
</Card>

