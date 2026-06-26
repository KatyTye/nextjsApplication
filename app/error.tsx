"use client"

import { useEffect } from "react"

export default function Error({
	error, unstable_retry, }: {
		error: Error & { digest?: string }
		unstable_retry: () => void
	}) {

	useEffect(() => {
		console.error(error)
	}, [error])

	return (<div className="m-auto p-5 text-center">
		<h2 className="text-3xl">
			Something went really wrong!
		</h2>
		<button onClick={() => unstable_retry()}>
			Try again
		</button>
	</div>)
}