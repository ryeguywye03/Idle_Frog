<script lang="ts">
    import { resources, buildings , frogs, frogJobs } from '$lib/state';
    import { derived } from 'svelte/store';
  
    // Create a derived store so the table auto-updates
    const resList = derived(resources, $resources => $resources);

    const frogList = derived(frogs, $frogs => $frogs);

    const lilyPadUnlocked = derived(buildings, $buildings => {
      const pad = $buildings.find(b => b.id === 'lily_pad');
      return pad?.unlocked ?? false;
    });

    const frogCount = derived(frogs, $frogs =>
      $frogs.filter(f => f).length
    );

    console.log(lilyPadUnlocked)

  </script>
  
  <table class="table">
    <thead>
      <tr>
        <th>Resource</th>
        <th class="right">Amount</th>
        <th class="right">Max</th>
        <th class="right">Rate</th>
        <th class="right">Bonus</th>
      </tr>
    </thead>
    <tbody>
      {#each $resList as res (res.id)}
        {#if res.unlocked}
        <tr>
          <td>{res.name}</td>
          <td class="amount right text-primary">{res.display_amount.toFixed(2)}</td>
          <td class="max right text-secondary">{res.storage.toFixed(2) ?? 100}</td>
          <td class="rate right text-accent">{res.productionRate?.toFixed(2) ?? '0.00'}/s</td>
          <td class="bonus right text-neutral">+{res.bonusRate?.toFixed(2) ?? 0}%</td>
        </tr>
        {/if}
      {/each}
      {#if $lilyPadUnlocked}
            <tr>
              <td>{'Frogs'}</td>
              <td class="amount right text-primary">{$frogCount}</td>
            </tr>
      {/if}

    </tbody>
  </table>
  
  <style>
    .right {
      text-align: right;
    }
  
    .bonus {
      color: green;
    }
  
    tr:hover {
      background-color: #f8f8f8;
    }
  </style>
  