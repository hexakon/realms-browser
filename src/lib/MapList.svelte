<script lang="ts">
    import Map from '$lib/Map.svelte';
    let {title, maplist} = $props();
</script>

<div class="relative my-8 text-white text-center">
    <div id={title.replaceAll(" ","-")} class="-top-18 left-0 absolute"></div>
    <h1 class="mb-2 font-bold text-2xl md:text-5xl">{title.toUpperCase()}</h1>
    <p><span class="text-lightpurple">{maplist.templates.length}</span> maps available in this category</p>
</div>
<div class="relative gap-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mx-auto px-2 w-full max-w-300">
    <div id={title.replaceAll(" ","-")+"_observer"} class="top-[50vh] right-0 bottom-0 left-0 -z-1 absolute"></div>
    {#each maplist.templates as map}
        <Map {...map} />
    {/each}
</div>