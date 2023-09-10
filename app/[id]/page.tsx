import { api } from "@/lib/api"
import { getImageUrlFromId } from "@/lib/url-utils"
import { css } from "@/pokestyle/css"
import { container, hstack, wrap } from "@/pokestyle/patterns"
import Image from "next/image"
import Link from "next/link"

interface Props {
	params: {
		id: string
	}
}

export default async function Details({ params }: Props) {
	const pokemon = await api.getPokemonDetails(params.id)

	return (
		<>
			<main className={styles.container}>
				<Image
					src={getImageUrlFromId(pokemon.id)}
					alt={`${pokemon.name} pictured from the front`}
					width="400"
					height="400"
					priority
					className={styles.image}
				/>

				<h1 className={styles.pageHeading}>
					<span>#{pokemon.id}</span> {pokemon.name}
				</h1>

				<div className={hstack()}>
					{pokemon.types.map((type) => (
						<span key={type.type.name} className={styles.badge}>
							{type.type.name}
						</span>
					))}
				</div>

				<h2 className={styles.category}>STATS</h2>
				<div className={wrap()}>
					{pokemon.stats.map((stat) => (
						<div key={stat.stat.name} className={styles.stat}>
							<span className="value">{stat.base_stat}</span>
							<span className="label">{stat.stat.name}</span>
						</div>
					))}
				</div>

				{pokemon.moves.length > 0 && (
					<>
						<h2 className={styles.category}>MOVES</h2>
						<div className={wrap()}>
							{pokemon.moves.map((move) => (
								<span key={move.move.name} className={styles.badge}>
									{move.move.name}
								</span>
							))}
						</div>
					</>
				)}
			</main>

			<Link href="/" className={styles.backLink}>
				<span className={styles.backArrow}>⇦</span> Back
			</Link>
		</>
	)
}

const styles = {
	backArrow: css({
		fontSize: "2xl",
	}),

	backLink: hstack({
		position: "fixed",
		left: "3",
		top: "1",

		color: "red.50",
		fontWeight: "600",
	}),

	badge: css({
		px: "2",
		py: "0.5",

		bgColor: "red.200",
		borderRadius: "sm",
		boxShadow: "md",

		color: "red.500",
		fontWeight: "600",
		textTransform: "capitalize",
	}),

	category: css({
		mb: "1",
		mt: "12",

		color: "yellow.200",
		fontWeight: "900",
		fontSize: "2xl",
	}),

	container: container({
		maxWidth: "6xl",
		pb: "8",
		px: "24",
	}),

	image: css({
		float: "right",
	}),

	pageHeading: css({
		textStyle: "pageHeading",
		color: "yellow.200",
		textTransform: "capitalize",

		"& > span": {
			color: "red.200",
			opacity: "0.6",
			fontSize: "2.5rem",
		},
	}),

	stat: hstack({
		gap: "2",
		px: "4",
		py: "1",
		alignItems: "flex-end",

		borderRadius: "xl",
		bgGradient: "to-br",
		gradientFrom: "red.100",
		gradientTo: "red.300",
		color: "red.400",

		"& .value": {
			fontSize: "4xl",
			fontWeight: "900",
			letterSpacing: "tighter",
			lineHeight: "100%",
		},

		"& .label": {
			fontSize: "xs",
			textTransform: "uppercase",
			letterSpacing: "widest",
			color: "red.600",
		},
	}),
}
