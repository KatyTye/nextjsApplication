"use client"

import { adopterInterface } from "../../assets/Interfaces"
import { toast, ToastContainer } from "react-toastify"
import { updateAnimal } from "../../lib/dal/animals"
import { useActionState, useEffect } from "react"
import { fixSourceURL } from "@/src/lib/Utils"
import { redirect } from "next/navigation"
import Form from "next/form"

export default function EditForm({ animal }: { animal: adopterInterface }) {

	const initialState = {
		success: false,
		values: {
			name: animal.name,
			description: animal.description,
			age: animal.age,
			file: undefined
		},
		errors: undefined
	}

	const updateAnimalWithIds = updateAnimal.bind(null, { id: animal.id, assetId: animal.assetId })

	const [state, formAction, isPending] = useActionState(updateAnimalWithIds, initialState as any)

	useEffect(() => {
		if (state.success) {
			toast("Dyret er nu blevet opdateret.", {
				pauseOnHover: false,
				closeOnClick: true,
				closeButton: false,
				theme: "dark",
				onClose: () => {
					state.success = false
					redirect("/admin/dashboard")
				}
			})
		}
	}, [state])

	return (<>
		<Form action={formAction} className="flex flex-col w-full mb-15 gap-5">
			<label htmlFor="name">
				<span className="oswald text-2xl">Navn:</span>
				<input type="text" name="name" id="name" defaultValue={state.values.name}
					placeholder="Navn på dyret"
					className={`p-3 rounded-lg bg-gray-100 block mt-2 outline-0 w-full${state.errors?.name && " border-red-600" || ""}`} />
				{state?.errors?.name && <p aria-invalid={true} className="text-red-600
						mt-2 inter h-6" aria-errormessage={state?.errors?.name}>{state?.errors?.name}</p>}
			</label>

			<label htmlFor="description">
				<span className="oswald text-2xl">Beskrivelse:</span>
				<textarea name="description" id="description" defaultValue={state.values.description}
					placeholder="Beskrivelse"
					className="p-3 rounded-lg bg-gray-100 inter h-60 block mt-2 outline-0 w-full resize-none" />

				{state?.errors?.description && <p aria-invalid={true} className="text-red-600
						mt-2 inter h-6" aria-errormessage={state?.errors?.description}>{state?.errors?.description}</p>}
			</label>

			<label htmlFor="age">
				<span className="oswald text-2xl">Alder:</span>
				<input type="number" name="age" id="age" defaultValue={state.values.age}
					placeholder="Alderen på dyret" min={0}
					className="p-3 rounded-lg bg-gray-100 block mt-2 outline-0 w-full" />
				{state?.errors?.age && <p aria-invalid={true} className="text-red-600
						mt-2 inter h-6" aria-errormessage={state?.errors?.age}>{state?.errors?.age}</p>}
			</label>

			<img className="w-full rounded-lg"
				src={fixSourceURL(animal.asset.url).toString()} alt="billede af dyret" />

			<label htmlFor="file">
				<span className="oswald text-2xl">Upload det nye billede her:</span>
				<input type="file" name="file" id="file" defaultValue={state.values.file}
					className="p-3 rounded-lg bg-gray-100 block mt-2 outline-0 w-full" />
				{state?.errors?.file && <p aria-invalid={true} className="text-red-600
						mt-2 inter h-6" aria-errormessage={state?.errors?.file}>{state?.errors?.file}</p>}
			</label>

			{state?.errors?.primary && <p aria-invalid={true} className="text-red-600
						mt-2 inter h-6" aria-errormessage={state?.errors?.primary}>{state?.errors?.primary}</p>}

			<button type="submit" className="cursor-pointer p-3 rounded-lg mt-5 text-white bg-(--title-color)">
				{isPending && "Opdatere dit dyr" || "Opdater dyr"}
			</button>
		</Form>
		<ToastContainer />
	</>)
}