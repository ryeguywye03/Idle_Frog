<script lang="ts">
    import Header from './Header.svelte';
    let currentPanel: 'main' | 'camp' = 'main';


    
</script>

<main>
    <Header bind:currentPanel/>
    <slot />
</main>