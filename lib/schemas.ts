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
