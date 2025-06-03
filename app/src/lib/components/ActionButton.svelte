<script>
export let label;
export let onClick;

</script>

<button on:click={onClick} class="bg-gray-700 text-white px-2 py-1 rounded hover:bg-gray-600">
{label}
</button>
  