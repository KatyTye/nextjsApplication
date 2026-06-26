import EditForm from "@/src/components/edit-form/index"
import { getAnimalById } from "@/src/lib/dal/animals"
import { BsArrowLeft } from "react-icons/bs"
import Link from "next/link"

export default async function EditPage({ params }: { params: Promise<{ id: string }> }) {
	const { id } = await params

	const animalData = await getAnimalById(id)

	return (<main className="p-5 pl-75 pr-75 phone-padding flex flex-col items-center md:mt-auto md:mb-auto">
		<h1 className="oswald text-center mb-5 text-5xl text-(--title-color) font-bold">
			Redigèr Dyr
		</h1>
		<Link href={"/admin/dashboard"} className="w-full m-auto mb-5 items-center gap-2 flex hover:text-(--title-color)
				font-bold transition-all">
			<BsArrowLeft />
			<span>
				Gå tilbage
			</span>
		</Link>
		<EditForm animal={animalData} />
	</main>)
}