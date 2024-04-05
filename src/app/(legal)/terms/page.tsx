// import { DashboardHeader } from '@/components/dashboard-header';
import { Footer } from '@/components/footer';
import Link from 'next/link';

export const metadata = {
    title: "Terms & Conditions",
};

export default async function Terms() {
    return (
        <>
            {/* <DashboardHeader /> */}
            <section className='prose dark:prose-invert lg:prose-lg container max-w-5xl py-[50px]'>
            </section>
            <Footer />
        </>
    );
}
