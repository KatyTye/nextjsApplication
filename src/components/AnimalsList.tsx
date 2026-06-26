"use client"

import { useState } from "react"
import { adopterInterface } from "../assets/Interfaces"
import Link from "next/link"
import { fixSourceURL } from "../lib/Utils"

const regex = /([^/\d]+)$/

export default function AnimalsList({ data }: { data: [adopterInterface] }) {

	const [show, setShow] = useState(false)

	return ((!data || data.length <= 0) &&
		<p className="text-2xl oswald mb-5 text-red-700">
			Der er ingen dyr der er klar til adoptering lige nu.
		</p>
		|| <>
			<div className={"flex gap-5 mb-0 flex-wrap justify-between phone-list overflow-hidden " +
				(show == false && "h-196" || "h-full")}>
				{(data.map((object: adopterInterface, index: Number) => {

					const specificDate: any = new Date("" + object?.createdAt)
					const currentDate: any = new Date()

					const elapsedTime = currentDate - specificDate

					return (<section key={"frivillig-" + index} className="max-w-135 h-62 border flex phone-height">
						<div className="overflow-hidden w-1/3 h-full transform-[scale(1.01)] relative">
							<img src={fixSourceURL(object.asset.url).toString()}
								alt="image for section" className="z-10 w-full h-full top-0 left-0 absolute object-cover" />
						</div>

						<div className="p-3 w-2/3">
							<h2 className="oswald text-2xl">
								<Link href={`/details/${object.id}`}>
									{object.name}
								</Link>
							</h2>
							<p className="pt-1 font-inter">
								{object.description}
							</p>
							<p className="oswald font-medium text-[14px] text-[#808080] mt-3">
								Været på internetted i {(elapsedTime / 1000 / 60 / 60 / 24).toFixed()} dage.
							</p>
						</div>
					</section>)
				})).reverse()}
			</div>
			<button className="cursor-pointer bg-[#3D5F8F] text-white rounded-lg oswald 
		text-[18px] p-3 self-center mt-10" onClick={() => setShow(!show)}>
				{(
					show == false && "Vis flere dyr" || "Vis mindre dyr"
				)}
			</button>
		</>)
}