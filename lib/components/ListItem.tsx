import { css } from "@/pokestyle/css"
import Image from "next/image"
import Link from "next/link"
import { forwardRef } from "react"
import { getIdFromPokemonDetailsUrl, getImageUrlFromId } from "../url-utils"

interface Props {
	name: string
	detailsUrl: string
	priority?: boolean
}

export const ListItem = forwardRef<HTMLAnchorElement, Props>(
	({ name, detailsUrl, priority = false }, ref) => {
		const id = getIdFromPokemonDetailsUrl(detailsUrl)

		return (
			<Link
				ref={ref}
				href={`/${id}`}
				className={css({
					bgGradient: "to-br",
					gradientFrom: "#ffffff3a",
					gradientTo: "#ffffff08",
					borderRadius: "2xl",

					textDecorationThickness: "3px",
					textDecorationColor: "yellow.200",

					"&:hover": {
						textDecorationLine: "underline",
						gradientFrom: "#ffffff44",
						gradientTo: "#ffffff14",
					},
				})}
			>
				<h2
					className={css({
						color: "neutral.100",
						fontWeight: "600",
						textTransform: "capitalize",
						ml: "1rem",
						mt: "0.5rem",
					})}
				>
					{name}
				</h2>

				<Image
					src={getImageUrlFromId(id)}
					alt={`${name} pictured from the front`}
					width="192"
					height="192"
					priority={priority}
				/>
			</Link>
		)
	},
)

ListItem.displayName = "ListItem"
