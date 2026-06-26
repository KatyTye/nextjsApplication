"use server"

import { z } from "zod"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

const loginSchema = z.object({
	username: z.string().min(4, "Username must be at least 4 characters long."),
	password: z.string().min(4, "Password must be at least 4 characters long.")
})

export async function LoginAction(previousState, formData) {
	const cookieStore = await cookies()
	const username = formData.get("username")
	const password = formData.get("password")

	console.log("LoginAction called with username:", username)
	console.log("LoginAction called with password:", password)

	const result = loginSchema.safeParse({ username, password })

	if (!result.success) {
		return {
			values: {
				username,
				password
			},
			errors: result.error.flatten().fieldErrors
		}
	}

	let loginSuccess = false
	let timeoutId

	try {
		const controller = new AbortController()
		timeoutId = setTimeout(() => controller.abort(), 70000)

		const response = await fetch("https://nextdyrapi.onrender.com/auth/token", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				username,
				password,
			}),
			signal: controller.signal,
		})

		if (!response.ok) {
			console.error("Login request failed with status:", response.status)
			return {
				values: {
					username,
					password
				},
				errors: { primary: ["Invalid username or password."] }
			}
		}

		const data = await response.json()

		if (data.validUntil && data.token && data.userId) {
			cookieStore.set("token", data.token)
			cookieStore.set("valid", data.validUntil)

			loginSuccess = true
			console.log("Login successful. Token and validUntil set in cookies.")
		}
	} catch (error) {
		const isTimeout = error instanceof Error && error.name === "AbortError"
		console.error("An error occurred during login:", isTimeout ? "Request timed out." : error)
	} finally {
		clearTimeout(timeoutId)
	}

	if (loginSuccess) {
		console.log("Redirecting to /admin/dashboard")
		redirect("/admin/dashboard")
	}

	console.log("Login failed. Returning errors to the form.")

	return {
		values: {
			username,
			password
		},
		errors: { primary: ["Invalid username or password."] }
	}
}