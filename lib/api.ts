import { z } from "zod"
import { pokemonListResultSchema } from "./schemas"

/**
 * Fetches a request and validates the result again the passed in resultSchema.
 */
async function get<ResultSchema extends z.ZodSchema>(
	url: string,
	resultSchema: ResultSchema,
	init?: RequestInit | undefined,
): Promise<ResultSchema["_output"]> {
	const response = await fetch(url, init)

	if (!response.ok) throw new Error("Failed to fetch data")

	return resultSchema.parse(await response.json())
}

const getPokemonList = () =>
	get("https://pokeapi.co/api/v2/pokemon", pokemonListResultSchema)

export const api = {
	getPokemonList,
}
