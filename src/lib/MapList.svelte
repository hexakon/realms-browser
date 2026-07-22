<script lang="ts">
    import Map from '$lib/Map.svelte';
    let {title='', maplist, sorting_mode, show_id, categorize=true, sum=[]} = $props();

    let sorted_list = $derived.by(() => {
        switch (sorting_mode) {
            case 'update_desc':
                return structuredClone(maplist);
            case 'update_asc':
                return maplist.toReversed();
            case 'publish_desc':
                return maplist.toSorted((a,b) => b.id - a.id);
            case 'publish_asc':
                return maplist.toSorted((a,b) => a.id - b.id);
        }
    })
</script>

    <div class="relative mt-14 mb-10 text-white text-center">
        <div id={title.replaceAll(" ","-")} class="-top-24 left-0 absolute"></div>
        {#if categorize}
            <h1 class="mb-2 font-bold text-2xl md:text-5xl">{title.toUpperCase()}</h1>
            <p><span class="text-lightpurple">{maplist.length}</span> maps available</p>
        {:else}
            <p class="mb-2">
                <span class="text-lightpurple">{maplist.length}</span> total maps available on Realms right now:
            </p>
            <p>
                <span class="text-red">{sum[0]}</span> minigames,
                <span class="text-blue">{sum[1]}</span> adventures,
                <span class="text-green">{sum[2]}</span> experiences,
                <span class="text-darkaqua">{sum[3]}</span> world templates, and
                <span class="text-gold">{sum[4]}</span> inspirations
            </p>
        {/if}
    </div>

<div class="relative gap-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mx-auto px-2 w-full max-w-300">
    <div id={title.replaceAll(" ","-")+"_observer"} class="top-[50vh] right-0 bottom-0 left-0 -z-1 absolute"></div>
    {#each sorted_list as map}
        <Map {...map} {show_id} {categorize} />
    {/each}
</div>