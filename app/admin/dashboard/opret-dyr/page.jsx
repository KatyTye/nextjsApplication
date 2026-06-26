"use client"

import Link from "next/link";
import Form from "next/form";
import { useActionState } from "react";
import { BsArrowLeft } from "react-icons/bs";
import { CreateAnimal } from "@/src/lib/dal/animals";

const initialState = {
	values: {
		name: "",
		description: "",
		age: 0,
		file: null
	},
	errors: undefined
}

export default function OpretDyrPage() {
	const [state, formAction, isPending] = useActionState(CreateAnimal, initialState)

	return (<main className="p-5 pl-75 pr-75 phone-padding flex flex-col items-center md:mt-auto md:mb-auto">
		<h1 className="oswald text-center text-5xl mb-5 text-(--title-color) font-bold">
			Opret Dyr
		</h1>
		<Link href={"/admin/dashboard"} className="w-full m-auto mb-5 items-center gap-2 flex hover:text-(--title-color)
						font-bold transition-all">
			<BsArrowLeft />
			<span>
				Gå tilbage
			</span>
		</Link>
		<Form action={formAction} className="flex flex-col mb-15 gap-5 w-full">
			<label htmlFor="name">
				<span className="oswald text-2xl">Navn:</span>
				<input type="text" name="name" id="name" defaultValue={state.values.name}
					placeholder="Navn på dyret"
					className="p-3 rounded-lg bg-gray-100 block mt-2 outline-0 w-full" />
				<p className="text-red-600
				mt-2 inter h-6">{state?.errors?.name || ""}</p>
			</label>

			<label htmlFor="description">
				<span className="oswald text-2xl">Beskrivelse:</span>
				<textarea name="description" id="description" defaultValue={state.values.description}
					placeholder="Beskrivelse"
					className="p-3 rounded-lg bg-gray-100 inter h-60 block mt-2 outline-0 w-full resize-none" />
				<p className="text-red-600
				mt-2 inter h-6">{state?.errors?.description || ""}</p>
			</label>

			<label htmlFor="age">
				<span className="oswald text-2xl">Alder:</span>
				<input type="number" name="age" id="age" defaultValue={state.values.age}
					placeholder="Alderen på dyret" min={0}
					className="p-3 rounded-lg bg-gray-100 block mt-2 outline-0 w-full" />
				<p className="text-red-600
				mt-2 inter h-6">{state?.errors?.age || ""}</p>
			</label>

			<label htmlFor="file">
				<span className="oswald text-2xl">Upload din fil her:</span>
				<input type="file" name="file" id="file" defaultValue={state.values.file}
					className="p-3 rounded-lg bg-gray-100 block mt-2 outline-0 w-full" />
				<p className="text-red-600
				mt-2 inter h-6">{state?.errors?.file || ""}</p>
			</label>

			<p className="text-red-600
				mt-2 inter h-6">{state?.errors?.primary || ""}</p>

			<button type="submit" className="cursor-pointer p-3 rounded-lg mt-5 text-white bg-(--title-color)">
				{isPending && "Opretter dit nye dyr" || "Opret dyr"}
			</button>
		</Form>
	</main>)
}