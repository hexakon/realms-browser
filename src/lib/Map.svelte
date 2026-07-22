<script lang="ts">
    let { id, name, version, author, link, image, trailer, recommendedPlayers } = $props();
</script>

<div class="flex flex-col gap-4 bg-stone-800 p-4 text-white">
    <div class="flex flex-row">
        <img src={`data:image/png;base64,${image}`} alt="icon" width=160 height=160 class="drop-shadow-lg pr-4 w-26 h-24">
        <div class="flex flex-col justify-between wrap-break-word">
            <p class="text-white">{name}</p>
            <p class="text-gray">{author}</p>
            <p class="text-darkgray">{recommendedPlayers}</p>
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
        </div>
    </div>
</div>