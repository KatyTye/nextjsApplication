"use client"

import { deleteAnimal } from "@/src/lib/dal/animals"
import { useRef } from "react"

export default function DeleteButton({ animal }) {

	const dialogRef = useRef(null)

	const handleClick = () => {
		dialogRef.current.showModal()
	}

	const handleCancel = () => {
		dialogRef.current.close()
	}

	const handleDelete = async () => {
		await deleteAnimal(animal.id)
		dialogRef.current.close()
	}

	return (<>
		<button onClick={handleClick}
			className="cursor-pointer p-3 pr-4.5 pl-4.5 oswald rounded-lg text-white bg-[#8F3D3F]">
			Slet
		</button>
		<dialog className="m-auto p-9 dialog-backdrop" ref={dialogRef} closedby="any">
			<h2 className="oswald text-2xl mb-4 font-bold">
				Du er ved at slette {animal.name}
			</h2>
			<p className="oswald text-[16px] mb-6">Denne handling kan ikke fortrydes.</p>
			<div className="flex gap-5">
				<button onClick={handleCancel}
					className="cursor-pointer p-3 pr-4.5 pl-4.5 oswald rounded-lg text-white bg-[#676767]">
					Fortryd
				</button>
				<button onClick={handleDelete}
					className="cursor-pointer p-3 pr-4.5 pl-4.5 oswald rounded-lg text-white bg-[#8F3D3F]">
					Slet
				</button>
			</div>
		</dialog>
	</>)
}