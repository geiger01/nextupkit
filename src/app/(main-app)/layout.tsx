import { Footer } from "@/components/footer";
import { Header } from "@/components/header";

export default async function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <Header />
            <main className="flex flex-col flex-1 container py-4">
                {children}
            </main>
            <Footer />
        </>
    );
}