"use client"

import { deleteAnimal } from "@/src/lib/dal/animals"

export default function DialogContent({ animal, targetRef }) {

	const handleCancel = () => {
		targetRef.current.close()
	}

	const handleDelete = () => {
		targetRef.current.close()
		deleteAnimal(animal.id)
	}

	return (
		<div className="bg-white fixed translate--1/2 top-1/2 left-1/2 w-100">
			<h2>
				Du er ved at slette {animal.name}
			</h2>
			<p>Denne handling kan ikke fortrydes.</p>
			<div>
				<button onClick={handleCancel}
					className="cursor-pointer p-3 pr-4.5 pl-4.5 oswald rounded-lg text-white bg-[#676767]">
					Fortryd
				</button>
				<button onClick={handleDelete}
					className="cursor-pointer p-3 pr-4.5 pl-4.5 oswald rounded-lg text-white bg-[#8F3D3F]">
					Slet
				</button>
			</div>
		</div>
	)
}