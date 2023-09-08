import { api } from "@/lib/api"
import { flex } from "@/pokestyle/patterns"
import Image from "next/image"

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
					<div key={pokemon.name}>
						{pokemon.name}

						{pokemon.sprites.front_default && (
							<Image
								src={pokemon.sprites.front_default}
								alt={`${pokemon.name} pictured from the front`}
								width="192"
								height="192"
								// Make the browser prioritize the first ten images
								// as they are likely to be above the fold
								priority={index < 10}
							/>
						)}
					</div>
				))}
			</div>
		</main>
	)
}
