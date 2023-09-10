import Image from "next/image"
import Link from "next/link"
import { getIdFromPokemonDetailsUrl, getImageUrlFromId } from "../url-utils"

interface Props {
	name: string
	detailsUrl: string
	priority?: boolean
}

export function ListItem({ name, detailsUrl, priority = false }: Props) {
	const id = getIdFromPokemonDetailsUrl(detailsUrl)

	return (
		<Link href={`/${id}`}>
			<div>
				{name}

				<Image
					src={getImageUrlFromId(id)}
					alt={`${name} pictured from the front`}
					width="192"
					height="192"
					priority={priority}
				/>
			</div>
		</Link>
	)
}
