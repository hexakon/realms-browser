<script lang="ts">
    const MAPPING = {
        MINIGAME: 'minigame',
        ADVENTUREMAP: 'adventure',
        EXPERIENCE: 'experience',
        WORLD_TEMPLATE: 'world template',
        INSPIRATION: 'inspiration'
    }
    let { id, name, type, version, author, link, image, trailer, recommendedPlayers, show_id, categorize=true } = $props();
</script>


<div class="relative flex flex-col bg-stone-900 p-4 text-white">
    {#if !categorize}
        <span class="top-0.5 left-1 absolute text-[.5rem]"
            class:text-red={type==='MINIGAME'}
            class:text-blue={type==='ADVENTUREMAP'}
            class:text-green={type==='EXPERIENCE'}
            class:text-darkaqua={type==='WORLD_TEMPLATE'}
            class:text-gold={type==='INSPIRATION'}
        >{MAPPING[type]}
        </span><br>
    {/if}
    <div class="flex flex-row mb-4">
        <img src={`data:image/png;base64,${image}`} alt="icon" width=160 height=160 class="drop-shadow-lg mr-4 w-24 h-24">
        <div class="flex flex-col justify-between min-w-0 wrap-break-word">
            <p class="text-white">
                {name}
            </p>
            <p class="text-gray text-sm">{author}</p>
            <p class="text-darkgray text-sm">{recommendedPlayers}</p>
        </div>
    </div>
    <div class="flex gap-2">
        {#if trailer!==""}
        <a href={trailer} target="_blank" class="flex flex-1 justify-center items-center bg-stone-600 hover:bg-stone-500 p-1 text-aqua transition-colors">
            Trailer
        </a>
        {:else}
            <div class="flex flex-1 justify-center items-center"></div>
        {/if}
        {#if link!==""}
            <a href={link} target="_blank" class="flex flex-1 justify-center items-center bg-stone-600 hover:bg-stone-500 p-1 text-yellow transition-colors">
                Website
            </a>
        {:else}
            <div class="flex flex-1 justify-center items-center"></div>
        {/if}
        <div class="flex flex-1 justify-center items-center p-1 text-gray">
            {version}
            {#if show_id}<span class="ml-2 text-darkgray text-xs">#{id}</span>{/if}
        </div>
    </div>
</div>