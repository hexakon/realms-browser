<script lang="ts">
    import Map from '$lib/Map.svelte';
    let {title='', maplist, sorting_mode, show_id, categorize=true} = $props();

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
            <p>
                <span
                    class:text-red={title==='minigames'}
                    class:text-blue={title==='adventures'}
                    class:text-green={title==='experiences'}
                    class:text-darkaqua={title==='world templates'}
                    class:text-gold={title==='inspiration'}
                >
                    {maplist.length}
                </span>
                maps available
            </p>
        {/if}
    </div>

<div class="relative gap-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mx-auto px-2 w-full max-w-300">
    <div id={title.replaceAll(" ","-")+"_observer"} class="top-[50vh] right-0 bottom-0 left-0 -z-1 absolute"></div>
    {#each sorted_list as map}
        <Map {...map} {show_id} {categorize} />
    {/each}
</div>