/**
 * Parses the ID of the pokemon from the URL
 */
export function getIdFromPokemonDetailsUrl(url: string) {
	const regexMatch = url.match("https://pokeapi.co/api/v2/pokemon/([0-9]+)/")
	if (!regexMatch || !regexMatch[1])
		throw new Error("Failed to parse pokemon id from url")

	return regexMatch[1]
}

/**
 * Returns an URL to an image of the pokemon with that ID.
 * This let's us show images of the pokemon in lists without having to fetch the details of each pokemon.
 */
export function getImageUrlFromId(id: string) {
	return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`
}
