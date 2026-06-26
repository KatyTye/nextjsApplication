export default function Footer() {

	return (<footer className="bottom-content text-black p-5 pl-37.5 pr-37.5 bg-[#B8C9E0] oswald 
	phone-padding">
		<div className="flex justify-between mb-10 phone-menu">
			<section>
				<h2 className="font-bold text-2xl">
					KONTAKT
				</h2>
				<p>Torvesøbej 22, 1.</p>
				<p>1131 København K</p>
				<p>CVR: 22446187</p>
				<p>Husk at du kan få fradrag for donationer på op til 16.600 kr.</p>
			</section>

			<section className="flex flex-col">
				<h2 className="font-bold text-2xl">
					PARTNERE
				</h2>
				<a href="/" target="_blank" className="text-[#0088CC]">Anima</a>
				<a href="/" target="_blank" className="text-[#0088CC]">World Animal Protection</a>
				<a href="/" target="_blank" className="text-[#0088CC]">Fødevarestyrelsen</a>
				<a href="/" target="_blank" className="text-[#0088CC]">Faktalink</a>
			</section>
		</div>

		<p className="text-center">© 2024 - Foreningen for Dyrevelfærd</p>
	</footer>)
}