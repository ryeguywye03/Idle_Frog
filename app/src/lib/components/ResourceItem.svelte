<script>
    export let name;
    export let amount;
    export let rate;
  </script>
  
  <div class="flex justify-between text-sm">
    <span class="text-gray-300">{name}:</span>
    <span class="text-white">{amount}</span>
    <span class="text-green-500">(+{rate}/s)</span>
  </div>
  