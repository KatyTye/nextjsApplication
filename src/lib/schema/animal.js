import { z } from "zod"

export const animalSchema = z.object({
	id: z.coerce.number().positive("ID skal være et positivt tal."),
	name: z.string().min(2, "Navnet skal være mindst 2 tegn langt."),
	description: z.string().min(20, "Beskrivelsen skal være på mindst 20 tegn lang."),
	age: z.coerce.number().positive("Alderen skal være et positivt tal.").min(0, "Alderen skal være et positivt tal."),
	assetId: z.coerce.number().positive("Asset ID skal være et positivt tal."),
	createdAt: z.string(),
	updatedAt: z.string(),
})

export const createAnimalSchema = animalSchema.omit({
	id: true,
	assetId: true,
	createdAt: true,
	updatedAt: true
}).extend({
	file: z.file().max(5_000_000, "Filen må ikke være større end 5MB.")
		.mime(["image/jpeg"], "Filen skal være i jpg format.")
})

export const updateAnimalSchema = animalSchema.omit({
	createdAt: true,
	updatedAt: true
}).extend({
	file: z.preprocess(
		value => {
			if (value && value.size === 0) return undefined
			return value
		},
		z.file()
			.max(5_000_000, "Filen må ikke være større end 5MB.")
			.mime(["image/jpeg"], "Filen skal være i jpg format")
			.optional())
})