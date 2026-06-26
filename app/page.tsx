import ImageWithText from "@/src/components/ImageWithText";
import Newsletter from "@/src/components/Newsletter";

export default function Home() {
	return (<>
		<ImageWithText imageSource="/kittens.jpg"
			title="Foreningen for Dyrevelfærd"
			description="Vi specialiserer os i dyrevelfærd" />
		<article className="flex flex-wrap gap-7 p-6 md:p-10 pl-37.5 pr-37.5 justify-between phone-list">
			<section className="font-inter w-87.5">
				<h2 className="text-(--title-color) flex gap-3 text-3xl oswald mb-5">
					Om os
				</h2>
				<p>
					Vi kæmper for at nedbringe antallet af dyr i nød og sikre, at  alle nødstedte dyr får den rette hjælp. vi arbejder med et landsdækkende netværk af frivillige, internater og plejestationer, der hver dag hjælper dyr.
				</p>
			</section>
			<section className="font-inter w-87.5">
				<h2 className="text-(--title-color) text-3xl oswald mb-5">
					Dyr & Mennesker
				</h2>
				<p className="mb-5">
					Dyr er en vigtig del af vores liv og samfundet og styrker deres unikke værdi for mennesker. Dyr skaber tryghed, styrker sociale relationer og øger vores livskvalitet.
				</p>
				<p>
					Med dyr følger ansvar, derfor arbejder vi proaktivt med oplysning om ansvarligt ejerskab, så hverken dyr eller mennesker kommer i klemme i dagligdagen. Bag hver eneste sag står en ulykkelig menneskeskæbne, som med den rette hjælp heldigvis næsten finde varige løsninger.
				</p>
			</section>
			<section className="font-inter w-87.5">
				<h2 className="text-(--title-color) text-3xl oswald mb-5">
					Mad & Forbrug
				</h2>
				<p className="mb-5">
					Vi kæmper for et mere naturligt fødevareforbrug og en bæredygtig produktion med fokus på kvalitet, omtanke og respekt for dyr og natur. Det er vores mål, at hele Danmarks fødevareproduktion bliver omlagt til enten frihold eller økologisk drift med forbedret dyrevelfærd.
				</p>
				<p>
					Dansk fødevareproduktion er drevet af et ensidigt fokus på vækst, økonomi og lave omkostninger. I dag ejes 99 % af landbruget af store virksomheder, hvor mange dyr holdes under industrilignende forhold. De lever under produktionsforhold – ikke levende væsener. Det betyder, at millioner af dyr i Danmark lever under stærkt kritisable forhold.
				</p>
			</section>
		</article>
		<Newsletter />
		<ImageWithText imageSource="/save.jpg"
			title="STÅR DU MED ET DYR I NØD?"
			description="Ring til Dyrenes Vagtcentral på 1812 og få råd og hjælp og håndtering af dyr." />
	</>)
}
