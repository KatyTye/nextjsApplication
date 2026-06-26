"use server"

import { redirect } from "next/navigation"

export async function LoginAction(formData) {
	const username = formData.get("username")
	const password = formData.get("password")

	const repsonse = await fetch("/auth/token", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			username,
			password,
		}),
	})

	const data = await repsonse.json()

	if (data.ok) {
		cookieStore.set("token", data.token)
		cookieStore.set("valid", data.validUntil)

		redirect("/admin/dashboard")
	}
}