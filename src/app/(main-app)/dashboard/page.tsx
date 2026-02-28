import { connectDB } from '@/lib/connect-db';
import { getSession } from "@/lib/auth";

export const dynamic = 'force-dynamic';

export const metadata = {
    title: "Dashboard",
};

export default async function DashboardPage() {
    await connectDB();
    const session = await getSession();

    return (
        <>
            {/* Your code goes here! */}
        </>
    );
}
