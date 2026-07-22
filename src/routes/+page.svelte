<script lang="ts">
    import MapList from '$lib/MapList.svelte';
	import { onMount } from 'svelte';

	import minigame from '$lib/api/minigame.json'
	import adventure from '$lib/api/adventure.json'
	import experience from '$lib/api/experience.json'
	import worldtemp from '$lib/api/worldtemp.json'
	import inspiration from '$lib/api/inspiration.json'

	const sections = ['minigames', 'adventures', 'experiences', 'world-templates', 'inspiration'];
	let active = $state('minigames');

	onMount(() => {
		// set of all elements that are visible
		const visible = new Set();

		const observer = new IntersectionObserver(entries => {
			for (const entry of entries) {
				// minigames_observer -> minigames
				const id = entry.target.id.slice(0, entry.target.id.indexOf('_'));
				// mark visibility in the set
				if (entry.isIntersecting) visible.add(id); else visible.delete(id);
			}

			const last = sections.filter(id => visible.has(id)).at(-1);
			if (last) active = last;
		})

		for (const section of sections) {
			const el = document.getElementById(section+'_observer');
			if (el) observer.observe(el);
		}

		return () => observer.disconnect();
	});
</script>

<nav class="top-0 left-0 z-2 fixed flex md:justify-center items-stretch bg-orange-900 w-full overflow-x-scroll text-white text-sm md:text-base text-center">
	{#each sections as id}
		<a class="flex items-center hover:bg-orange-600 px-4 py-2 transition-colors" class:bg-orange-600={active === id} href="#{id}">
			{id.toUpperCase().replace('-', ' ')}
		</a>
	{/each}
</nav>

<div class="h-10"></div>

<MapList title="minigames" maplist={minigame} />
<MapList title="adventures" maplist={adventure} />
<MapList title="experiences" maplist={experience} />
<MapList title="world templates" maplist={worldtemp} />
<MapList title="inspiration" maplist={inspiration} />