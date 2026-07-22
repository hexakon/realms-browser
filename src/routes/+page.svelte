<script lang="ts">
    import Map from '$lib/Map.svelte';
    import MapList from '$lib/MapList.svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>


<MapList title="minigames" maplist={data.minigame} />
<MapList title="adventures" maplist={data.adventure} />
<MapList title="experiences" maplist={data.experience} />
<MapList title="world templates" maplist={data.worldtemp} />
<MapList title="inspiration" maplist={data.inspiration} />