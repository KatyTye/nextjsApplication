"use client"

import { LoginAction } from "./action";

export default function AdminPage() {

	return (<form action={LoginAction}>

		<input type="text" name="username" id="username" required />
		<input type="password" name="password" id="password" required />

		<button type="submit">Login</button>
	</form>)
}