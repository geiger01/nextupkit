import { Footer } from '@/components/footer';
import { Header } from '@/components/header';

export const metadata = {
    title: "Terms & Conditions",
};

export default async function TermsPage() {
    return (
        <>
            <Header />
            <section className='prose dark:prose-invert lg:prose-lg container max-w-5xl py-[50px]'>
                <h1>Terms & Conditions</h1>
                <p>Last updated: January 1, 2025</p>
                <p>
                    Terms & Conditions Example: <a className='text-primary' href="https://www.lecturekit.io/terms-and-conditions" rel="external nofollow noopener" target="_blank">https://www.lecturekit.io/terms-and-conditions</a>
                </p>
            </section>
            <Footer />
        </>
    );
}
