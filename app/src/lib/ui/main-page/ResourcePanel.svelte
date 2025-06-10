<script lang="ts">
    import { onMount } from 'svelte';
    import { get } from 'svelte/store';
    import { resources, buildings } from '$lib/stores';
    import { gameLoaded } from '$lib/stores/engine';
    import { engine } from '$lib/stores/engine';

    import Card from '$lib/ui/Card.svelte'
    import CardTitle from '$lib/ui/CardTitle.svelte';
    import ResourceTable from '../ResourceTable.svelte';
    

</script>




<Card>
    <CardTitle>

    </CardTitle>


    <ResourceTable />
</Card>

