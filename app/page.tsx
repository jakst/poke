import { api } from "@/lib/api"
import { DynamicResultPage } from "@/lib/components/DynamicResultPage"
import { ListItem } from "@/lib/components/ListItem"
import { css } from "@/pokestyle/css"
import { flex } from "@/pokestyle/patterns"

export default async function Home() {
	const pokemonList = await api.getPokemonList()

	return (
		<main className={flex({ direction: "column", align: "center", gap: "12" })}>
			<h1 className={css({ textStyle: "pageHeading", color: "yellow.200" })}>
				Pokedex
			</h1>

			<div
				className={flex({
					wrap: "wrap",
					justify: "flex-start",
					maxWidth: "64rem",
					gap: "1rem",
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

				{pokemonList.next && <DynamicResultPage url={pokemonList.next} />}
			</div>
		</main>
	)
}
