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

	const loadMoreTriggerRef = useRef<HTMLAnchorElement>(null)

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
			{data.results.map((pokemon, i) => (
				<ListItem
					// When the first item of the page is scrolled into
					// the viewport, we start loading the next page.
					ref={i === 0 ? loadMoreTriggerRef : undefined}
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
			{/* CSS Loader taken from https://cssloaders.github.io/ */}
			<span
				className={css({
					width: "3rem",
					height: "3rem",
					animation: "rotation 1s linear infinite",
					"&::after, &::before": {
						content: "''",
						position: "absolute",
						width: "1.5rem",
						height: "1.5rem",
						top: "50%",
						left: "50%",
						borderRadius: "50%",
						animation: "animloader 1s infinite ease-in-out",
					},
					"&::before": {
						bg: "yellow.400",
						transform: "scale(0.5) translate(-3rem, -3rem)",
					},
					"&::after": {
						bg: "red.500",
						transform: "scale(0.5) translate(0, 0)",
					},
				})}
			/>
		</div>
	)
}
