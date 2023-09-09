import Image from "next/image"

interface Props {
	name: string
	imageUrl?: string | null
	priority: boolean
}

export function ListItem({ name, imageUrl, priority }: Props) {
	return (
		<div>
			{name}

			{imageUrl && (
				<Image
					src={imageUrl}
					alt={`${name} pictured from the front`}
					width="192"
					height="192"
					priority={priority}
				/>
			)}
		</div>
	)
}
