import { adopterInterface } from "@/src/assets/Interfaces";
import DeleteButton from "@/src/components/delete-button";
import { getAllAnimals } from "@/src/lib/dal/animals";
import { fixSourceURL } from "@/src/lib/Utils";
import Link from "next/link";
import { BsArrowLeft } from "react-icons/bs";

export default async function Dashboard() {

	const data = await getAllAnimals(true)

	return (<>
		<main className="p-5 pl-75 pr-75 phone-padding flex flex-col items-center md:mt-auto md:mb-auto">
			<h1 className="text-5xl oswald mb-5 text-(--title-color) text-center font-bold phone-text w-full">
				Admin
			</h1>
			<Link href={"/"} className="w-full mb-5 items-center gap-2 flex hover:text-(--title-color)
				font-bold transition-all">
				<BsArrowLeft />
				<span>
					Gå tilbage
				</span>
			</Link>
			<ol className="w-full">
				{data.map((object: adopterInterface, index: Number) => {
					return <li key={`admin-animal-${index}`} className="w-full flex border mb-5 gap-3 pr-3 items-center">
						<div className="overflow-hidden w-25 h-20 transform-[scale(1.02)] relative">
							<img src={fixSourceURL(object.asset.url).toString()}
								alt="image for section" className="z-10 w-full h-full top-0 left-0 absolute object-cover" />
						</div>

						<p className="text-2xl oswald font-medium">{object.name}</p>

						<div className="flex ml-auto gap-4">
							<Link href={"/admin/dashboard/rediger-dyr/" + object.id}
								className="cursor-pointer p-3 pr-4.5 pl-4.5 oswald rounded-lg text-white bg-(--title-color)">
								Redigèr
							</Link>
							<DeleteButton animal={object} />
						</div>
					</li>
				})}
			</ol>
			<Link href={"/admin/dashboard/opret-dyr"}
				className="cursor-pointer oswald p-3 block rounded-lg text-white bg-(--title-color)">
				Tilføj dyr
			</Link>
		</main>
	</>)
}