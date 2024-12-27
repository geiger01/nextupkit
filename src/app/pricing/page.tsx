import { connectDB } from '@/lib/connect-db';
import { getSession } from "@/lib/auth";
import { getUserSubscriptionPlan } from '@/lib/subscriptions';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { IUserPlan } from '@/types/types';
import { UserPlan } from '@/models/user-plan.model';
import { Pricing } from '@/components/pricing';

export const metadata = {
    title: "NextUpKit | Pricing",
};

export default async function PricingPage() {
    await connectDB();
    const session = await getSession();

    const userSubscription: IUserPlan | null = await UserPlan.findOne({
        userId: session?.user.id,
    });

    const plan = getUserSubscriptionPlan(userSubscription);

    return (
        <>
            <Header />
            <Pricing userPlan={plan}/>
            <Footer />
        </>
    );
}
