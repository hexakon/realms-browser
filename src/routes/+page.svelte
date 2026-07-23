<script lang="ts">
    import MapList from '$lib/MapList.svelte';

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
	// show category headers and organize maps by category first
	let categorize = $state(true);
	// sorting mode cannot be update_* when categorize is off
	$effect(() => {
		if (!categorize) {
			if (sorting_mode === 'update_desc') sorting_mode = 'publish_desc';
			if (sorting_mode === 'update_asc') sorting_mode = 'publish_asc';
		}
	})
	// icons only
	let icons_only = $state(false);


	// navbar highlight
	const sections = ['minigames', 'adventures', 'experiences', 'world-templates', 'inspiration'];
	let active = $state('minigames');

	$effect(() => {
		categorize; // re-observe when sections remount after categorize toggles

		if (!categorize) {
			active = '';
			return;
		}

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

		<button class="flex items-center hover:bg-orange-700 px-4 py-2 transition-colors cursor-pointer" class:bg-orange-950={show_header_options} onclick={() => show_header_options = !show_header_options}>
			{!show_header_options ? '≡' : '↓'}
		</button>

		{#each sections as id}
			<a class="flex items-center px-4 py-2 decoration-2 -underline-offset-8 transition-colors" class:hover:bg-orange-700={categorize} class:bg-orange-600={active === id && categorize} class:line-through={!categorize} href="#{id}">
				{id.toUpperCase().replace('-', ' ')}
			</a>
		{/each}

	</nav>
	<div class:h-0={!show_header_options} class:p-0={!show_header_options} class:p-2={show_header_options} class="bg-orange-950 w-full overflow-hidden">
		<div class="flex md:flex-row flex-col flex-wrap justify-center items-center gap-2 text-white text-sm md:text-base">
			<span class="md:mr-4">
				Sort by 
				<select bind:value={sorting_mode} class="bg-[#1a1a17] mx-auto p-2 border border-black rounded-md text-yellow">
					{#if categorize}
						<option value="update_desc">latest updated first</option>
						<option value="update_asc">latest updated last</option>
					{/if}
					<option value="publish_desc">newest published first</option>
					<option value="publish_asc">newest published last</option>
				</select>
			</span>
			<button type="button" class="md:mr-4 hover:text-orange-100 transition-colors cursor-pointer" onclick={() => show_id = !show_id} aria-pressed={show_id}>
				Show publish ID: {show_id ? '☑' : '☐'}
			</button>
			<button type="button" class="md:mr-4 hover:text-orange-100 transition-colors cursor-pointer" onclick={() => categorize = !categorize} aria-pressed={categorize}>
				Categorize: {categorize ? '☑' : '☐'}
			</button>
			<button type="button" class="md:mr-4 hover:text-orange-100 transition-colors cursor-pointer" onclick={() => icons_only = !icons_only} aria-pressed={icons_only}>
				Icons only: {icons_only ? '☑' : '☐'}
			</button>
		</div>
		{#if !categorize}
		<div class="mt-2 text-gray text-xs text-center">
			Unfortunately Mojang's API doesn't include update timestamps, so I can't compare update order across categories
		</div>
		{/if}
	</div>
</header>

<div class="flex flex-col justify-center items-center gap-2 my-8 px-2 text-white text-center">
	<p class="mb-2">
		<span class="text-lightpurple">{minigame.total+adventure.total+experience.total+worldtemp.total+inspiration.total}</span> total maps available on Realms right now:
	</p>
	<p>
		<span class="text-red">{minigame.total}</span> minigames,
		<span class="text-blue">{adventure.total}</span> adventures,
		<span class="text-green">{experience.total}</span> experiences,
		<span class="text-darkaqua">{worldtemp.total}</span> world templates, and
		<span class="text-gold">{inspiration.total}</span> inspirations
	</p>
</div>

{#if categorize}
	<MapList {sorting_mode} {show_id} {icons_only} title="minigames" maplist={minigame.templates} />
	<MapList {sorting_mode} {show_id} {icons_only} title="adventures" maplist={adventure.templates} />
	<MapList {sorting_mode} {show_id} {icons_only} title="experiences" maplist={experience.templates} />
	<MapList {sorting_mode} {show_id} {icons_only} title="world templates" maplist={worldtemp.templates} />
	<MapList {sorting_mode} {show_id} {icons_only} title="inspiration" maplist={inspiration.templates} />
{:else}
	<MapList {sorting_mode} {show_id} {icons_only} categorize={false} maplist={[...minigame.templates, ...adventure.templates, ...experience.templates, ...worldtemp.templates, ...inspiration.templates]} />
{/if}

<div class="flex flex-col items-center gap-2 my-10 text-gray text-sm">
	<span>Site updates every weekday <i>approximately</i> 15:00 UTC</span>
	<span>Powered by <a href="https://realmshub.com/" target="_blank" class="text-blue decoration-2 underline underline-offset-2">RealmsHub</a> API, created by <a href="https://plagiatus.net" target="_blank" class="text-blue decoration-2 underline underline-offset-2">Plagiatus</a></span>
	<span>Website by <a href="https://hexakon.net" target="_blank" class="text-blue decoration-2 underline underline-offset-2">hexakon</a></span>
</div>