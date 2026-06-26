"use server"

import { updateAnimalSchema } from "@/src/lib/schema/animal"
import { cacheLife, cacheTag, updateTag } from "next/cache"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { z } from "zod"

export async function CreateAnimal(ids, previousState, formData) {
	const dataObject = Object.fromEntries(formData)
	const cookieStore = await cookies()

	const token = cookieStore.get("token")?.value

	const validatedAnimal = createAnimalSchema.safeParse(dataObject)

	if (!validatedAnimal.success) {
		console.error("Validation failed:", validatedAnimal.error)
		return {
			values: { ...dataObject, success: false },
			errors: z.flattenError(validatedAnimal.error).fieldErrors
		}
	}

	let res

	try {
		const assetResponse = await fetch("https://nextdyrapi.onrender.com/api/v1/assets", {
			method: "POST",
			headers: {
				Authorization: `Bearer ${token}`
			},
			body: formData
		})

		const asset = await assetResponse.json()

		const response = await fetch("https://nextdyrapi.onrender.com/api/v1/animals", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`
			},
			body: JSON.stringify({ ...validatedAnimal.data, assetId: asset.id })
		})

		res = await response.json()
	} catch (error) {
		console.error("An error occurred during animal creation:", error)
	}

	if (!res?.id) {

		console.error("Failed to create animal:", res)

		return {
			values: { ...dataObject, success: false },
			errors: { primary: ["Dyret kunne ikke oprettes. Prøv igen."] }
		}
	}

	updateTag("animals")
	redirect("/admin/dashboard")
}

export async function updateAnimal(ids, previousState, formData) {
	const dataObject = Object.fromEntries(formData)
	const cookieStore = await cookies()
	const token = cookieStore.get("token")?.value
	const { id, assetId } = ids

	const validatedAnimal = updateAnimalSchema.safeParse({
		...dataObject,
		id,
		assetId
	})

	if (!validatedAnimal.success) {
		console.error("Validation failed:", validatedAnimal.error)
		return {
			values: { ...dataObject },
			errors: z.flattenError(validatedAnimal.error).fieldErrors
		}
	}

	if (dataObject.name === previousState.values.name
		&& dataObject.age == previousState.values.age
		&& dataObject.description === previousState.values.description
		&& validatedAnimal.data.file === undefined
	) {
		return {
			values: { ...dataObject },
			errors: { primary: ["Ingen ændringer blev fundet."] }
		}
	}

	let assetRes

	if (validatedAnimal.data.file !== undefined) {
		const assetFormData = new FormData()
		assetFormData.append("file", validatedAnimal.data.file)

		try {
			const assetResponse = await fetch("https://nextdyrapi.onrender.com/api/v1/assets", {
				method: "POST",
				headers: {
					Authorization: `Bearer ${token}`
				},
				body: assetFormData
			})

			switch (assetResponse.status) {
				case 401:
					throw new Error("Unauthorized: Please log in again.")
				case 403:
					throw new Error("Forbidden: You do not have permission to upload assets.")
				default:
					const asset = await assetResponse.json()
					assetRes = asset.id
					break;
			}
		} catch (error) {
			return {
				values: { ...dataObject, success: false },
				errors: { file: [error.message || "An error occurred during asset upload. Please try again."] }
			}
		}

	}

	try {
		const response = await fetch(`https://nextdyrapi.onrender.com/api/v1/animals/${validatedAnimal.data.id}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`
			},
			body: JSON.stringify({
				...validatedAnimal.data,
				assetId: assetRes || validatedAnimal.data.assetId
			})
		})

		switch (response.status) {
			case 401:
				throw new Error("Unauthorized: Please log in again.")
			case 403:
				throw new Error("Forbidden: You do not have permission to update animal information.")
			default:
				updateTag("animals")
				return {
					success: true,
					values: { ...validatedAnimal.data },
					errors: undefined
				}
		}
	} catch (error) {
		return {
			values: { ...dataObject, success: false },
			errors: { primary: [error.message || "An error occurred during animal update. Please try again."] }
		}
	}
}

export async function getAllAnimals(options = {}) {
	"use cache"
	const { asAdminPage = false } = options

	cacheLife("hours")
	cacheTag("animals")

	let response;

	try {
		response = await fetch("https://nextdyrapi.onrender.com/api/v1/animals")
	} catch (error) {
		if (asAdminPage) {
			return (<main className="p-5 pl-75 pr-75 phone-padding flex flex-col items-center">
				<h1 className="text-5xl oswald mb-5 text-(--title-color) font-bold phone-text w-full">
					Admin
				</h1>
				<p className="text-red-700 inter">Could not find any animals</p>
				<Link href={"/admin/dashboard/opret-dyr"}
					className="cursor-pointer oswald p-3 block rounded-lg text-white bg-(--title-color)">
					Tilføj dyr
				</Link>
			</main>)
		} else {
			return <>
				<ImageWithText imageSource="adopt.jpg"
					title="Adoptér et dyr"
					description="Overvejer du et nyt medlem af familien? Måske er det det perfekte match til et af vores mange søde internatdyr, som venter på nye kærlige hjem." />
				<p className="text-3xl text-center oswald text-(--title-color)">
					Kunne ikke vise nogle dyr lige nu prøv igen senere.
				</p>
				<Newsletter />
				<ImageWithText imageSource="save.jpg"
					title="STÅR DU MED ET DYR I NØD?"
					description="Ring til Dyrenes Vagtcentral på 1812 og få råd og hjælp og håndtering af dyr." />
			</>
		}
	}

	const data = await response.json()

	return data
}

export async function getAnimalById(id) {

	let data;

	try {
		const response = await fetch(`https://nextdyrapi.onrender.com/api/v1/animals/${id}`);
		data = await response.json();
	} catch (error) {
		console.error('Error fetching animal:', error);
	}
	return data;
}

export async function deleteAnimal(id) {
	const cookieStore = await cookies()
	const token = cookieStore.get("token")?.value

	const response = await fetch(
		`https://nextdyrapi.onrender.com/api/v1/animals/${id}`,
		{
			method: "DELETE",
			headers: {
				Authorization: `Bearer ${token}`,
			},
		}
	)

	const text = await response.text()
	const res = text ? JSON.parse(text) : null

	if (!response.ok) {
		console.error("Failed to delete animal:", res)
	}

	updateTag("animals")
}