<!-- New +page.svelte file -->
<script lang="ts">
  import { goto } from '$app/navigation';
  import { onMount } from 'svelte';
  import { initGame } from '$lib/initGame';

  // onMount(async () => {
  //   try {
  //     await initGame();
  //     goto('/main');
  //   } catch (err) {
  //     console.error('Game test initialization failed:', err);
  //   }
  // });

</script>
<!-- end of new -->