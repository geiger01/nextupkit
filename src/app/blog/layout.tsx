import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

export default function BlogLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<>
			<Header />
			<main className="container max-w-5xl py-8">
				{children}
			</main>
			<Footer />
		</>
	);
}
