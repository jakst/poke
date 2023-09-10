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
			<main className={container({ maxWidth: "6xl", pt: "2", px: "24" })}>
				<Image
					src={getImageUrlFromId(pokemon.id)}
					alt={`${pokemon.name} pictured from the front`}
					width="400"
					height="400"
					priority
					className={css({ float: "right" })}
				/>

				<h1
					className={css({
						textStyle: "pageHeading",
						color: "yellow.200",
						textTransform: "capitalize",
					})}
				>
					<span
						className={css({
							color: "red.200",
							opacity: "0.6",
							fontSize: "2.5rem",
						})}
					>
						#{pokemon.id}
					</span>{" "}
					{pokemon.name}
				</h1>

				<div className={hstack({})}>
					{pokemon.types.map((type) => (
						<span
							key={type.type.name}
							className={css({
								bgColor: "red.200",
								borderRadius: "sm",
								boxShadow: "md",
								px: "2",
								py: "0.5",
								fontWeight: "600",
								color: "red.500",
							})}
						>
							{type.type.name}
						</span>
					))}
				</div>

				<h2 className={styles.category}>STATS</h2>
				<div className={wrap()}>
					{pokemon.stats.map((stat) => (
						<div
							key={stat.stat.name}
							className={hstack({
								gap: "2",
								px: "4",
								py: "1",
								borderRadius: "xl",
								alignItems: "flex-end",

								bgGradient: "to-br",
								gradientFrom: "red.100",
								gradientTo: "red.300",

								color: "red.400",
							})}
						>
							<span
								className={css({
									fontSize: "4xl",
									fontWeight: "900",
									letterSpacing: "tighter",
									lineHeight: "100%",
								})}
							>
								{stat.base_stat}
							</span>

							<span
								className={css({
									fontSize: "xs",
									textTransform: "uppercase",
									letterSpacing: "widest",
									color: "red.600",
								})}
							>
								{stat.stat.name}
							</span>
						</div>
					))}
				</div>

				{pokemon.moves.length > 0 && (
					<>
						<h2 className={styles.category}>MOVES</h2>
						<div className={wrap({ textTransform: "capitalize" })}>
							{pokemon.moves.map((move) => (
								<span key={move.move.name} className={styles.badge}>
									{move.move.name}
								</span>
							))}
						</div>
					</>
				)}
			</main>

			<Link
				href="/"
				className={hstack({
					color: "red.50",
					position: "fixed",
					fontWeight: "600",
					left: "3",
					top: "1",
				})}
			>
				<span className={css({ fontSize: "2xl" })}>⇦</span> Back
			</Link>
		</>
	)
}

const styles = {
	badge: css({
		bgColor: "red.200",
		borderRadius: "sm",
		boxShadow: "md",
		px: "2",
		py: "0.5",
		fontWeight: "600",
		color: "red.500",
	}),
	category: css({
		color: "yellow.200",
		fontWeight: "900",
		fontSize: "2xl",
		mb: "1",
		mt: "12",
	}),
}
