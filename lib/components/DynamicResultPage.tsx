"use client"

import { css } from "@/pokestyle/css"
import { flex } from "@/pokestyle/patterns"
import { useRouter, useSearchParams } from "next/navigation"
import { useEffect, useRef, useState } from "react"
import useSWR from "swr"
import { api } from "../api"
import { ListItem } from "./ListItem"

interface Props {
	url: string
	page: number
}

export function DynamicResultPage({ url, page }: Props) {
	const router = useRouter()
	const searchParams = useSearchParams()
	const { data, isLoading } = useSWR(url, api.getPokemonList)

	const currentPage = parseInt(searchParams.get("page") ?? "0")

	const [showNextPage, setShowNextPage] = useState(currentPage >= page)

	const loadMoreTriggerRef = useRef<HTMLAnchorElement>(null)

	useEffect(() => {
		if (!loadMoreTriggerRef.current || !data) return

		const observer = new IntersectionObserver((entries) => {
			if (entries[0].isIntersecting) {
				setShowNextPage(true)

				// Update the URL to reflect the current page, so that the user can navigate back to this page
				// through history and still have all list items loaded and rendered that were there before.
				// Refreshing the page will still blow the whole data cache away. We'd need to add some server-side
				// preloading of subsequent pages to fix that.
				const url = new URL(window.location.href)
				url.searchParams.set("page", page.toString())
				router.replace(url.toString(), { scroll: false })
			}
		})

		observer.observe(loadMoreTriggerRef.current)

		return () => {
			observer.disconnect()
		}
	}, [page, data, router])

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

			{showNextPage && data.next && (
				<DynamicResultPage url={data.next} page={page + 1} />
			)}
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
