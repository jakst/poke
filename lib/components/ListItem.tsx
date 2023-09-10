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
					gradientFrom: "#fff5",
					gradientTo: "#fff2",
					borderRadius: "2xl",
				})}
			>
				<span className={css({})}>{name}</span>

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
