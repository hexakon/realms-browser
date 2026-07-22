<script lang="ts">
    import Map from '$lib/Map.svelte';
    let {title, maplist} = $props();
</script>

<h1 class="my-8 text-white text-5xl text-center">{title.toUpperCase()}</h1>
<div class="gap-3 grid grid-cols-3 mx-auto w-full max-w-300">
    {#each maplist as map}
        <Map {...map} />
    {/each}
</div>