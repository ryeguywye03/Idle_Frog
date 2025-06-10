<script lang="ts">
  import { GameSaveManager } from '$lib/managers/GameSaveManager';
  import { currentPanel } from '$lib/stores/panel';
  import { initGame } from '$lib/initGame';
</script>


<div class="navbar bg-base-100 shadow-sm">
  <div class="navbar-start">
    <a class="btn btn-ghost text-xl">Idlefrog</a>
  </div>
  <div class="navbar-center hidden lg:flex">
  </div>
  <div class="navbar-end">
    <button class="btn btn-ghost" on:click={() => currentPanel.set('main')}>
      Main
    </button>
    <button class="btn btn-ghost" on:click={() => currentPanel.set('camp')}>
      Camp
    </button>
    
    <button class="btn" on:click={async () => {
      GameSaveManager.clear();
      await initGame();
    }}>Clear Save</button>
    <a class="btn">Button</a>
  </div>
</div> 