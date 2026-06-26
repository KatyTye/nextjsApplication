export default function Newsletter() {

	return (
		<form action="" className="bg-[#dbe4f0] gap-5 oswald flex p-20 pl-37.5 pr-37.5 items-center justify-between
		phone-padding phone-flex phone-col">
			<div>
				<h2 className="text-(--title-color) text-4xl font-bold">
					Tilmeld dig vores nyhedsbrev
				</h2>
				<p className="text-[18px]">
					Få inspiration og nyheder om dyrevelfærd og vores arbejde, direkte i din indbakke.
				</p>
			</div>
			<div className="flex gap-4 phone-col">
				<input type="text" name="name" id="name" autoComplete="name"
					placeholder="Navn" className="p-3 border-black border-solid border outline-0 rounded-lg"
					required />

				<input type="email" name="email" id="email" autoComplete="email"
					placeholder="Email" className="p-3 border-black border-solid border outline-0 rounded-lg"
					required />

				<button type="submit" className="cursor-pointer p-3 rounded-lg text-white bg-(--title-color)">
					Tilmeld
				</button>
			</div>
		</form>
	)
}