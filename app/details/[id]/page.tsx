import { adopterInterface } from "@/src/assets/Interfaces"
import { BsArrowLeft } from "react-icons/bs"
import { notFound } from "next/navigation"
import Link from "next/link"

export default async function DetailsPage({ params }: { params: Promise<{ id: string }> }) {
	const { id } = await params
	let response

	try {
		response = await fetch(`https://nextdyrapi.onrender.com/api/v1/animals/${id}`)
	} catch (error) {
		return (<p className="text-3xl text-center oswald text-(--title-color)">
			Kunne ikke vise indholdet prøv igen senere.
		</p>)
	}

	const data: adopterInterface = await response.json()
	const specificDate: any = new Date(data?.createdAt)


	return ((data != null) && <article className="p-5 gap-2 pl-37.5 pr-37.5 flex items-center flex-col phone-menu">
		<Link href={"/adopter"} className="w-full items-center gap-2 flex hover:text-(--title-color)
			font-bold transition-all">
			<BsArrowLeft />
			<span>
				Gå tilbage
			</span>
		</Link>
		<img src={data?.asset?.url.replace("http://localhost:4000",
			"https://nextdyrapi.onrender.com")} className="rounded-2xl mb-6"
			alt={`Billde af et dyr med navnet ${data?.name}`} />
		<h2 className="w-full text-3xl oswald text-(--title-color)">
			Detajler om {data?.name}
		</h2>
		<ul className="w-full flex flex-col gap-2 mb-6">
			<li>
				Registered online {specificDate.getDate()}/{specificDate.getMonth()}/{specificDate.getFullYear()}
			</li>
			<li>
				{data?.name} er {data?.age} år gammel.
			</li>
		</ul>

		<p className="w-full text-2xl oswald text-(--title-color)">
			Beskrivelse
		</p>
		<p className="mb-6">
			{data?.description}
		</p>
	</article> || notFound())
}