"use client"

import { useActionState } from "react";
import { LoginAction } from "./action";

const initialState = {
	values: {
		username: "",
		password: ""
	},
	errors: undefined
}

export default function AdminPage() {
	const [state, formAction, isPending] = useActionState(LoginAction, initialState)

	return (<form action={formAction} className="m-auto border p-10 rounded-[3px] mb-10 mt-10 md:m-auto">

		<h2 className="oswald text-3xl mb-5 text-center">
			Log ind på din konto
		</h2>

		<label htmlFor="username">
			<span className="oswald text-[18px] mb-2 block">
				Brugernavn
			</span>
			<input type="text" name="username" id="username" defaultValue={state?.values?.username}
				placeholder="Brugernavn" className="p-2 border rounded-[3px] min-w-[36dvw] w-full
				outline-none mb-5 oswald " autoComplete="username" required />
			{(state?.errors?.username && <p className="mb-5 text-red-600">{state?.errors?.username || ""}</p>)}
		</label>
		<label htmlFor="password">
			<span className="oswald text-[18px] mb-2 block">
				Adgangskode
			</span>
			<input type="password" name="password" id="password" defaultValue={state?.values?.password}
				placeholder="Adgangskode" className="p-2 border rounded-[3px] min-w-[36dvw] w-full
			outline-none mb-10 oswald " autoComplete="current-password" required />
			{(state?.errors?.password && <p className="mb-5 text-red-600">{state?.errors?.password || ""}</p>)}
		</label>

		{(state?.errors?.primary && <p className="mb-5 text-red-600">{state?.errors?.primary || ""}</p>)}

		<button type="submit" disabled={isPending}
			className="cursor-pointer p-3 block rounded-lg text-white bg-(--title-color)">
			{isPending && "Logger dig ind..." || "Log Ind"}
		</button>
	</form>)
}