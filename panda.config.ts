import { defineConfig } from "@pandacss/dev"

export default defineConfig({
	// Whether to use css reset
	preflight: true,

	// Where to look for your css declarations
	include: ["./lib/**/*.{js,jsx,ts,tsx}", "./app/**/*.{js,jsx,ts,tsx}"],

	// Files to exclude
	exclude: [],

	// Useful for theme customization
	theme: {
		extend: {
			keyframes: {
				rotation: {
					"0%": {
						transform: "rotate(0deg)",
					},
					"100%": {
						transform: "rotate(360deg)",
					},
				},
				animloader: {
					"50%": {
						transform: "scale(1) translate(-50%, -50%)",
					},
				},
			},
		},
		textStyles: {
			pageHeading: {
				description: "The main heading for the page",
				value: {
					fontSize: "4rem",
					fontWeight: "900",
				},
			},
		},
	},

	// The output directory for your css system
	outdir: "pokestyle",
})
