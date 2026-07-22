<script lang="ts">
    import MapList from '$lib/MapList.svelte';
	import { onMount } from 'svelte';

	import minigame from '$lib/api/minigame.json'
	import adventure from '$lib/api/adventure.json'
	import experience from '$lib/api/experience.json'
	import worldtemp from '$lib/api/worldtemp.json'
	import inspiration from '$lib/api/inspiration.json'
    import { fly, slide } from 'svelte/transition';


	// toggle header dropdown
	let show_header_options = $state(false);
	// sorting mode
	let sorting_mode = $state("update_desc");
	// show id
	let show_id = $state(true);


	// navbar highlight
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

<header class="top-0 left-0 z-2 sticky flex flex-col">
	<nav class="flex md:justify-center items-stretch bg-orange-900 w-full overflow-x-scroll text-white text-sm md:text-base text-center">

		<button class="flex items-center hover:bg-orange-600 px-4 py-2 transition-colors cursor-pointer" onclick={() => show_header_options = !show_header_options}>
			≡
		</button>

		{#each sections as id}
			<a class="flex items-center hover:bg-orange-600 px-4 py-2 transition-colors" class:bg-orange-600={active === id} href="#{id}">
				{id.toUpperCase().replace('-', ' ')}
			</a>
		{/each}

	</nav>
	<div class:h-0={!show_header_options} class="w-full overflow-hidden">
		<div class="flex md:flex-row flex-col justify-center items-center gap-2 bg-orange-950 p-2 text-white text-sm md:text-base">
			<span class="md:mr-4">
				Sort by 
				<select bind:value={sorting_mode} class="bg-[#1a1a17] mx-auto p-2 border border-black rounded-md text-yellow">
					<option value="update_desc">newest updated first</option>
					<option value="update_asc">newest updated last</option>
					<option value="publish_desc">newest maps first</option>
					<option value="publish_asc">newest maps last</option>
				</select>
			</span>
			<button type="button" class="md:mr-4 hover:text-orange-100 transition-colors cursor-pointer" onclick={() => show_id = !show_id} aria-pressed={show_id}>
				Show publish ID: {show_id ? '☑' : '☐'}
			</button>
		</div>
	</div>
</header>

<MapList {sorting_mode} {show_id} title="minigames" maplist={minigame} />
<MapList {sorting_mode} {show_id} title="adventures" maplist={adventure} />
<MapList {sorting_mode} {show_id} title="experiences" maplist={experience} />
<MapList {sorting_mode} {show_id} title="world templates" maplist={worldtemp} />
<MapList {sorting_mode} {show_id} title="inspiration" maplist={inspiration} />

<div class="flex flex-col items-center gap-2 my-10 text-gray text-sm">
	<span>Site updates every weekday 15:00 UTC</span>
	<span>Powered by <a href="https://realmshub.com/" target="_blank" class="text-blue decoration-2 underline underline-offset-2">RealmsHub</a> API, created by <a href="https://plagiatus.net" target="_blank" class="text-blue decoration-2 underline underline-offset-2">Plagiatus</a></span>
	<span>Website by <a href="https://hexakon.net" target="_blank" class="text-blue decoration-2 underline underline-offset-2">hexakon</a></span>
</div>