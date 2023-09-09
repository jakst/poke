import { api } from "@/lib/api"
import { ListItem } from "@/lib/components/ListItem"
import { flex } from "@/pokestyle/patterns"

export default async function Home() {
	const pokemonList = await api.getPokemonList()

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
				{pokemonList.results.map((pokemon, index) => (
					<ListItem
						key={pokemon.name}
						name={pokemon.name}
						detailsUrl={pokemon.url}
						// Make the browser prioritize the first ten images
						// as they are likely to be above the fold
						priority={index < 10}
					/>
				))}
			</div>
		</main>
	)
}
