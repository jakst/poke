import { api } from "@/lib/api"

export default async function Home() {
	const pokemonList = await api.getPokemonList()

	return (
		<main>
			<h1>Pokedex</h1>

			{pokemonList.results.map((pokemon) => (
				<div key={pokemon.name}>{pokemon.name}</div>
			))}
		</main>
	)
}
