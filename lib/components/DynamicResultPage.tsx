"use client"

import { useState } from "react"
import useSWR from "swr"
import { api } from "../api"
import { ListItem } from "./ListItem"

interface Props {
	url: string
}

export function DynamicResultPage({ url }: Props) {
	const { data } = useSWR(url, api.getPokemonList)

	const [showNextPage, setShowNextPage] = useState(false)

	if (!data) return null

	return (
		<>
			{data.results.map((pokemon) => (
				<ListItem
					key={pokemon.name}
					name={pokemon.name}
					detailsUrl={pokemon.url}
				/>
			))}

			{showNextPage ? (
				<DynamicResultPage url={data.next!} />
			) : (
				data.next && (
					<button onClick={() => setShowNextPage(true)}>Load more</button>
				)
			)}
		</>
	)
}
