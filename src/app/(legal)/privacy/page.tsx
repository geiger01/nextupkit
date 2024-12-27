import { Footer } from '@/components/footer';
import { Header } from '@/components/header';

export const metadata = {
    title: "Privacy Policy",
};

export default async function PrivacyPage() {
    return (
        <>
            <Header />
            <section className='prose dark:prose-invert lg:prose-lg container max-w-5xl py-[50px]'>
                <h1>Privacy Policy</h1>
                <p>Last updated: January 1, 2025</p>
                <p>
                    Privacy Policy Example: <a className='text-primary' href="https://www.lecturekit.io/privacy-policy" rel="external nofollow noopener" target="_blank">https://www.lecturekit.io/privacy-policy</a>
                </p>
            </section>
            <Footer />
        </>
    );
}
