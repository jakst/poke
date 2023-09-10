import { css, cx } from "@/pokestyle/css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { PropsWithChildren } from "react"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
	title: "Pokedex",
	description: "The complete Pokemon collection, all in one place.",
}

export default function RootLayout({ children }: PropsWithChildren) {
	return (
		<html lang="en">
			<head>
				<link rel="icon" type="image/png" href="/favicon.png" />
			</head>

			<body className={cx(inter.className, css({ bg: "red.400" }))}>
				{children}
			</body>
		</html>
	)
}
