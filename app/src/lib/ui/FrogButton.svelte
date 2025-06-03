<!-- GameButton.svelte -->
<script lang="ts">
    import { tooltip } from '$lib/actions/tooltip';
    export let label: string;
    export let onClick: () => void;
    export let disabled: boolean = false;
    export let tooltipContent: string | HTMLElement;
</script>


<button class="btn btn-primary m-4" use:tooltip={tooltipContent} on:click={onClick} disabled={disabled}>
    <span class="btn-title">{label}</span>
</button>

  

  

  
  
<style>
  .btn{
    margin: 8px;
  }

</style>
  