import { api } from "@/lib/api"
import { getImageUrlFromId } from "@/lib/url-utils"
import Image from "next/image"

interface Props {
	params: {
		id: string
	}
}

export default async function Details({ params }: Props) {
	const pokemon = await api.getPokemonDetails(params.id)

	return (
		<>
			<h1>
				#{pokemon.id} {pokemon.name}
			</h1>

			<Image
				src={getImageUrlFromId(pokemon.id)}
				alt={`${pokemon.name} pictured from the front`}
				width="192"
				height="192"
				priority
			/>

			<div>Types: {pokemon.types.map((type) => type.type.name).join(", ")}</div>

			<div>
				Stats:{" "}
				{pokemon.stats
					.map((stat) => `${stat.stat.name}: ${stat.base_stat}`)
					.join(", ")}
			</div>

			<div>Moves: {pokemon.moves.map((move) => move.move.name).join(", ")}</div>
		</>
	)
}
