import { api } from "@/lib/api"
import { ListItem } from "@/lib/components/ListItem"
import { flex } from "@/pokestyle/patterns"

export default async function Home() {
	const pokemonList = await api.getPokemonList()

	// NOTE: Using Promise.all here only works well in the happy path
	// and will not handle individual request errors gracefully. However,
	// since the pokemon API is statically hosted we can expect the error
	// rate to be extremely low, so this will not be a problem in reality
	// for this specific case.
	const pokemonListWithDetails = await Promise.all(
		pokemonList.results.map((item) => api.getPokemonDetails(item.url)),
	)

	return (
		<main className={flex({ direction: "column", align: "center" })}>
			<h1>Pokedex</h1>

			<div
				className={flex({
					wrap: "wrap",
					justify: "flex-start",
					maxWidth: "60rem",
				})}
			>
				{pokemonListWithDetails.map((pokemon, index) => (
					<ListItem
						key={pokemon.name}
						name={pokemon.name}
						imageUrl={pokemon.sprites.front_default}
						// Make the browser prioritize the first ten images
						// as they are likely to be above the fold
						priority={index < 10}
					/>
				))}
			</div>
		</main>
	)
}
