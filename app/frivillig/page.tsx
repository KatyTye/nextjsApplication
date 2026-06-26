import { frivilligInterface } from "@/src/assets/Interfaces";
import ImageWithText from "@/src/components/ImageWithText";
import Newsletter from "@/src/components/Newsletter";
import { imageRegex } from "@/src/lib/Utils";
import { cacheLife } from "next/cache"

export default async function FrivilligPage() {
	"use cache"

	cacheLife("days")


	let response;

	try {
		response = await fetch("https://nextdyrapi.onrender.com/api/v1/volunteers")
	} catch (error) {
		return (<>
			<ImageWithText imageSource="/save.jpg"
				title="STÅR DU MED ET DYR I NØD?"
				description="Ring til Dyrenes Vagtcentral på 1812 og få råd og hjælp og håndtering af dyr." />
			<p className="text-3xl text-center oswald text-(--title-color)">
				Kunne ikke vise indholdet prøv igen senere.
			</p>
			<Newsletter />
			<ImageWithText imageSource="/adopt.jpg"
				title="Adoptér et dyr"
				description="Overvejer du et nyt medlem af familien? Måske er det det perfekte match til et af vores mange søde internatdyr, som venter på nye kærlige hjem." />
		</>)
	}

	const data = await response.json()

	return (<>
		<ImageWithText imageSource="/save.jpg"
			title="STÅR DU MED ET DYR I NØD?"
			description="Ring til Dyrenes Vagtcentral på 1812 og få råd og hjælp og håndtering af dyr." />
		<article className="p md:p-10 pb-37.5 pt-37.5">
			<h1 className="text-5xl oswald font-bold mb-5 text-(--title-color) phone-text">Bliv frivillig</h1>
			{(data.length > 0 && <div className="flex gap-5 min-h-150 flex-wrap justify-between phone-list">
				{(data.map((object: frivilligInterface, index: Number) => {

					return (<section key={"frivillig-" + index} className="max-w-88.75 border relative pb-16">
						<h2 className="pl-3 pb-2 pt-2 border-b bg-[#E6E6E6]
						oswald text-2xl">
							{object.title}
						</h2>

						<img src={("/" + object.asset.url.match(imageRegex)).split(",")[0]}
							alt="image for section" className="p-3 min-h-50" />

						<p className="p-3 pt-1 font-inter">{object.content}</p>

						{(object.extra != "" && <div className="oswald bg-[#E6E6E6]
						absolute bottom-0 pl-3 pb-2 pt-2 border-t text-[#4D4D4D]">
							<p>{object.extra}</p>
						</div>)}
					</section>)
				})).reverse()}
			</div> || <p className="text-2xl oswald mb-5 text-red-700">
					Der er ingen artikler lige nu prøv igen senere.
				</p>)}
		</article>
		<Newsletter />
		<ImageWithText imageSource="/adopt.jpg"
			title="Adoptér et dyr"
			description="Overvejer du et nyt medlem af familien? Måske er det det perfekte match til et af vores mange søde internatdyr, som venter på nye kærlige hjem." />
	</>)
}