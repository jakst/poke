"use client"

import { css } from "@/pokestyle/css"
import { flex } from "@/pokestyle/patterns"
import { useEffect, useRef, useState } from "react"
import useSWR from "swr"
import { api } from "../api"
import { ListItem } from "./ListItem"

interface Props {
	url: string
}

export function DynamicResultPage({ url }: Props) {
	const { data, isLoading } = useSWR(url, api.getPokemonList)

	const [showNextPage, setShowNextPage] = useState(false)

	const loadMoreTriggerRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		if (!loadMoreTriggerRef.current || !data) return

		const observer = new IntersectionObserver((entries) => {
			if (entries[0].isIntersecting) {
				setShowNextPage(true)
			}
		})

		observer.observe(loadMoreTriggerRef.current)

		return () => {
			observer.disconnect()
		}
	}, [data])

	if (isLoading) return <LoadingIndicator />
	if (!data) return null

	return (
		<>
			{/* When this element is scrolled into the viewport, we start loading the next page */}
			<div ref={loadMoreTriggerRef} className={css({ visibility: "hidden" })} />

			{data.results.map((pokemon) => (
				<ListItem
					key={pokemon.name}
					name={pokemon.name}
					detailsUrl={pokemon.url}
				/>
			))}

			{showNextPage && data.next && <DynamicResultPage url={data.next} />}
		</>
	)
}

function LoadingIndicator() {
	return (
		<div
			className={flex({
				w: "12rem",
				align: "center",
				justify: "center",
				flex: 1,
				padding: "2rem 1rem 4rem",
			})}
		>
			Loading more...
		</div>
	)
}
