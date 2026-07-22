<script lang="ts">
    import MapList from '$lib/MapList.svelte';

	import minigame from '$lib/api/minigame.json'
	import adventure from '$lib/api/adventure.json'
	import experience from '$lib/api/experience.json'
	import worldtemp from '$lib/api/worldtemp.json'
	import inspiration from '$lib/api/inspiration.json'
</script>


<MapList title="minigames" maplist={minigame} />
<MapList title="adventures" maplist={adventure} />
<MapList title="experiences" maplist={experience} />
<MapList title="world templates" maplist={worldtemp} />
<MapList title="inspiration" maplist={inspiration} />