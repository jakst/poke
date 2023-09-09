import Image from "next/image"
import { getImageUrlFromPokemonDetailsUrl } from "../getPokemonAvatarUrl"

interface Props {
	name: string
	detailsUrl: string
	priority: boolean
}

export function ListItem({ name, detailsUrl, priority }: Props) {
	return (
		<div>
			{name}

			<Image
				src={getImageUrlFromPokemonDetailsUrl(detailsUrl)}
				alt={`${name} pictured from the front`}
				width="192"
				height="192"
				priority={priority}
			/>
		</div>
	)
}
