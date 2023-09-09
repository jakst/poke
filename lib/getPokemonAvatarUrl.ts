/**
 * Parses the ID of the pokemon from the URL and returns an URL to an image of that pokemon.
 * This let's us show images of the pokemon in lists without having to fetch the details of each pokemon.
 */
export function getImageUrlFromPokemonDetailsUrl(url: string) {
	const regexMatch = url.match("https://pokeapi.co/api/v2/pokemon/([0-9]+)/")
	if (!regexMatch || !regexMatch[1])
		throw new Error("Failed to parse pokemon id from url")

	return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${regexMatch[1]}.png`
}
