import ImageWithText from "@/src/components/ImageWithText";
import AnimalsList from "@/src/components/AnimalsList";
import { getAllAnimals } from "@/src/lib/dal/animals";
import Newsletter from "@/src/components/Newsletter";
import { Suspense } from "react";

export default async function FrivilligPage() {
	const data = await getAllAnimals()

	return (<>
		<ImageWithText imageSource="adopt.jpg"
			title="Adoptér et dyr"
			description="Overvejer du et nyt medlem af familien? Måske er det det perfekte match til et af vores mange søde internatdyr, som venter på nye kærlige hjem." />
		<article className="p-10 pl-37.5 pr-37.5 flex flex-col phone-padding">
			<h1 className="text-5xl oswald mb-5 text-(--title-color) font-bold phone-text">
				Dyr hos os
				<span className="text-black block mt-3 md:mt-0 md:inline-block text-[16px] md:ml-8">
					i øjeblikket har vi {(data.length > 0 && data.length || "ingen")} dyr
				</span>
			</h1>
			<Suspense fallback={<p>Finder vores dyr....</p>}>
				<AnimalsList data={data} />
			</Suspense>
		</article>
		<Newsletter />
		<ImageWithText imageSource="save.jpg"
			title="STÅR DU MED ET DYR I NØD?"
			description="Ring til Dyrenes Vagtcentral på 1812 og få råd og hjælp og håndtering af dyr." />
	</>)
}