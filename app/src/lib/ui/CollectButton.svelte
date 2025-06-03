<script lang="ts">
  import { resources, stats } from '$lib/state';

  export let resourceId: string;
  export let label: string;

  function handleClick() {
    resources.update(rs => {
      const r = rs.find(r => r.id === resourceId);
      if (r) {
        r.collect(true); // manual collection
        stats.update(s => {
          s.total_clicks += 1;
          if (resourceId === 'flies') s.flies_collected += r.increment;
          return s;
        });
      }
      return rs;
    });
  }
</script>

<button on:click={handleClick}>
  {label}
</button>
