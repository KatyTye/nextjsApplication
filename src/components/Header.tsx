import Link from "next/link";

export default function Header() {

	return (<header className="top-content flex justify-between p-5 pl-37.5 pr-37.5 items-center
	font oswald phone-menu">
		<Link href={"/"} className="flex items-center gap-4 text-2xl">
			<img src="/logo.png" alt="logo" className="max-w-12 lazy" />
			<span>
				Foreningen for Dyrevelfærd
			</span>
		</Link>
		<nav className="top-content__nav flex gap-5">
			<Link href={"/"}>
				Hjem
			</Link>
			<Link href={"/frivillig"}>
				Bliv frivillig
			</Link>
			<Link href={"/adopter"}>
				Adopter et dyr
			</Link>
		</nav>
	</header>)
}