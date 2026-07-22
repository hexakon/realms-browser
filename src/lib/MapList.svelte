<script lang="ts">
    import Map from '$lib/Map.svelte';
    let {title, maplist} = $props();
</script>

<div class="my-8 text-white text-center">
    <h1 class="mb-2 font-bold text-5xl">{title.toUpperCase()}</h1>
    <p><span class="text-lightpurple">{maplist.length}</span> maps live in this category</p>
</div>
<div class="gap-3 grid grid-cols-3 mx-auto w-full max-w-300">
    {#each maplist as map}
        <Map {...map} />
    {/each}
</div>