import { Inter, Oswald } from "next/font/google";
import Header from "@/src/components/Header";
import Footer from "@/src/components/Footer";
import type { Metadata } from "next";
import "./globals.css";
import { Suspense } from "react";
import Loading from "@/src/components/Loading";

const fontOswald = Oswald({
	variable: "--font-oswald-normal",
	subsets: ["latin"],
});

const fontInter = Inter({
	variable: "--font-inter-normal",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "Dyrevelfærd",
	description: "Produceret af david fra en opgave.",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="da">
			<body className={"min-h-screen flex flex-col w-screen"}>
				<Header />
				<Suspense fallback={<Loading />}>
					{children}
				</Suspense>
				<Footer />
			</body>
		</html>
	)
}
