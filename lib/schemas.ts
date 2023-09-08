import { z } from "zod"

/**
 * A util for creating paged schemas. The schema you pass in is
 * slotted into an array on the results property, while other metadata
 * about the paging is included as well.
 */
function createPagedResultSchema<DataSchema extends z.ZodSchema>(
	dataSchema: DataSchema,
) {
	return z.object({
		count: z.number().positive(),
		next: z.string().url().nullable(),
		previous: z.string().url().nullable(),
		results: z.array(dataSchema),
	})
}

export const pokemonListResultSchema = createPagedResultSchema(
	z.object({
		name: z.string(),
		url: z.string().url(),
	}),
)

export const pokemonDetailsResultSchema = z.object({
	id: z.number().int(),
	name: z.string(),
	order: z.number().int(),
	weight: z.number().int(),
	height: z.number().int(),
	is_default: z.boolean(),
	location_area_encounters: z.string().url(),
	base_experience: z.number().int(),
	species: z.object({
		name: z.string(),
		url: z.string().url(),
	}),
	stats: z.array(
		z.object({
			base_stat: z.number().int(),
			effort: z.number().int(),
			stat: z.object({
				name: z.string(),
				url: z.string().url(),
			}),
		}),
	),
	types: z.array(
		z.object({
			slot: z.number().int(),
			type: z.object({
				name: z.string(),
				url: z.string().url(),
			}),
		}),
	),
	moves: z.array(
		z.object({
			move: z.object({
				name: z.string(),
				url: z.string().url(),
			}),
			version_group_details: z.array(
				z.object({
					level_learned_at: z.number().int().nullable(),
					move_learn_method: z.object({
						name: z.string(),
						url: z.string().url(),
					}),
					version_group: z.object({
						name: z.string(),
						url: z.string().url(),
					}),
				}),
			),
		}),
	),
	game_indices: z.array(
		z.object({
			game_index: z.number().int(),
			version: z.object({
				name: z.string(),
				url: z.string().url(),
			}),
		}),
	),
	sprites: z.object({
		back_default: z.string().nullable(),
		back_female: z.string().nullable(),
		back_shiny: z.string().nullable(),
		back_shiny_female: z.string().nullable(),
		front_default: z.string().nullable(),
		front_female: z.string().nullable(),
		front_shiny: z.string().nullable(),
		front_shiny_female: z.string().nullable(),

		// This schema contains a low more sprite types, but we don't use
		// them so we get no value from making them all explicit in our app.
	}),
})
