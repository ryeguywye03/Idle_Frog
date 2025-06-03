<script>
    import "../app.css";
    import { goto } from '$app/navigation';
    import { onMount } from 'svelte';
    import { initGame } from '$lib/initGame';
    import { gameLoaded } from "$lib";

    onMount(async () => {
        try {
        await initGame();
        goto('/main');
        } catch (err) {
        console.error('Game initialization failed:', err);
        }
    });



</script>



<slot />