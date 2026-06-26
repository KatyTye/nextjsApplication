import Loading from "@/src/components/Loading";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { Suspense } from "react";

export default async function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<Suspense fallback={<Loading />}>
			{children}
		</Suspense>
	);
}