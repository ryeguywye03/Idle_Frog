<script>
    export let error;
    export let status;
</script>

<div class="content">
<h2>{status}</h2>
<span>{error.message}</span>
</div>

<style>
.content {
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}
</style>
  