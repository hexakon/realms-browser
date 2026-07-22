export default function shadow(texthex: string) {
    const h = texthex.toLowerCase()
    return '#'+
        [h.matchAll(/[0-9a-f]/g)]
        .map(
            c=>Math.round(parseInt(c,16)*0.247)
            .toString(16)
            .padStart(2,'0')
        )
        .join('');
}