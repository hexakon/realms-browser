<script lang="ts">
    import Map from '$lib/Map.svelte';
    let { map, show_id, categorize=true } = $props();

    // toggle for showing the map as a modal or not
    let show_map = $state(false);
</script>


<button class="flex flex-1 justify-center" onclick={() => show_map = true}>
    <img src={`data:image/png;base64,${map.image}`} alt="icon" width=160 height=160 class="drop-shadow-lg" />
</button>

{#if show_map}
    <button class="top-0 left-0 z-2 fixed flex flex-col justify-center items-center bg-stone-950/50 w-dvw h-dvh" onclick={() => show_map = false}>
        <Map {...map} {show_id} {categorize} />
    </button>
{/if}