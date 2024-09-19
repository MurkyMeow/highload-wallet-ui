import "./globals.scss";

import clsx from "clsx";
import localFont from "next/font/local";
import { Suspense, type ReactNode } from "react";

import { ProgressBar } from "./components/ProgressBar";
import { Providers } from "./providers/Providers";

const montserrat = localFont({
	variable: "--font-montserrat",
	src: [
		{
			path: "../../../public/fonts/Montserrat-Regular.ttf",
			weight: "400",
		},
		{
			path: "../../../public/fonts/Montserrat-Medium.ttf",
			weight: "500",
		},
		{
			path: "../../../public/fonts/Montserrat-Bold.ttf",
			weight: "700",
		},
		{
			path: "../../../public/fonts/Montserrat-ExtraBold.ttf",
			weight: "800",
		},
		{
			path: "../../../public/fonts/Montserrat-Black.ttf",
			weight: "900",
		},
	],
});

export default function RootLayout({ children }: { children?: ReactNode }) {
	return (
		<Providers>
			<html lang="ru">
				<body className={clsx(montserrat.variable)}>
					<Suspense>
						<ProgressBar />
					</Suspense>

					<main>{children}</main>
				</body>
			</html>
		</Providers>
	);
}
