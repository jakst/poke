"use client"

import { cx } from "@/pokestyle/css"
import { hstack } from "@/pokestyle/patterns"
import Link from "next/link"
import { useRouter } from "next/navigation"

interface Props {
	className?: string
}

export function NavigateBack({ className }: Props) {
	const router = useRouter()

	return (
		<Link
			href="/"
			className={cx(styles.backLink, className)}
			onClick={(e) => {
				e.preventDefault()

				// Using `router.back()` instead a regular link to `/` gives us the same
				// scroll restoration behaviour as when navigating back with the browser.
				router.back()
			}}
		>
			<span className="back-arrow">⇦</span> Back
		</Link>
	)
}

const styles = {
	backLink: hstack({
		color: "red.50",
		fontWeight: "600",

		"& > .back-arrow": {
			fontSize: "2xl",
		},
	}),
}
