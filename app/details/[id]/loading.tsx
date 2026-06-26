import Link from "next/link";
import { BsArrowLeft } from "react-icons/bs";

export default function Loading() {

	return (<article className="p-5 gap-2 pl-37.5 pr-37.5 flex items-center flex-col phone-menu">
		<Link href={"/adopter"} className="w-full items-center gap-2 flex hover:text-(--title-color)
		hover:font-bold transition-all">
			<BsArrowLeft />
			<span>
				Gå tilbage
			</span>
		</Link>
		<img src={"/"} className="rounded-2xl text-transparent mb-6 w-88.5 h-47 md:w-2/3 md:h-80 bg-gray-500"
			alt={`Billde af et dyr med navnet`} />
		<h2 className="w-fit md:mr-auto text-3xl oswald text-transparent rounded-2xl bg-gray-500">
			Detajler om
		</h2>
		<ul className="md:w-full flex items-center md:items-start flex-col gap-2 mb-6">
			<li className="bg-gray-500 w-fit text-transparent rounded-2xl">
				Registered online 00/00/0000
			</li>
			<li className="bg-gray-500 w-fit text-transparent rounded-2xl">
				Ole er 999 år gammel.
			</li>
		</ul>
		<p className="w-fit bg-gray-500 text-2xl oswald text-transparent rounded-2xl mr-auto">
			Beskrivelse
		</p>
		<p className="mb-6 bg-gray-500 text-transparent rounded-2xl">
			Doggo ipsum length boy long water shoob length boy what a nice floof shoober, shooberino smol borking doggo with a long snoot for pats. Fluffer snoot doggorino you are doin me a concern you are doing me a frighten, shooberino very good spot floofs.
		</p>
	</article>)
}