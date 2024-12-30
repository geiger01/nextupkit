import Image from "next/image";
import heroLight from '../../public/assets/hero-light.png';
import heroDark from '../../public/assets/hero-dark.png';
import Link from "next/link";
import { SocialProof } from "./social-proof";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";

export const Banner = () => {
    return (
        <section className="container text-center p-[50px_16px_80px] md:p-[80px_16px_100px] flex flex-col sm:items-center">
            <div className="relative flex overflow-hidden justify-between flex-wrap gap-5 border bg-[#f6faff] dark:bg-slate-900 text-left max-w-full w-[1024px] p-10 md:p-[100px_60px] rounded-2xl">
                <div className="z-30 relative max-w-[520px]">
                    <Badge variant="blue" className="mb-4 w-fit">Building Made Easy</Badge>
                    <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl max-w-[430px]">The faster, easier way to build startups.</h2>
                    <p className="mt-3 font-light text-lg text-muted-foreground">Build Your Next.js App Without Going Bankrupt.</p>
                    <div className="flex flex-col">
                        <Button asChild className="mt-8 mb-[-10px] text-md w-fit">
                            <Link
                                href={'/dashboard'}
                            >
                                Get Started
                            </Link>
                        </Button>
                        <SocialProof />
                    </div>
                </div>
                <Image
                    src={heroLight}
                    className="opacity-10 md:opacity-50 lg:opacity-100 absolute right-[-200px] md:right-[-400px] bottom-[-80px] md:bottom-[-100px] lg:bottom-[-160px] max-w-[500px] md:max-w-[700px] lg:max-w-[900px]  hidden dark:block"
                    alt="Drag and drop course builder"
                />
                <Image
                    src={heroDark}
                    className="opacity-10 md:opacity-50 lg:opacity-100 absolute right-[-200px] md:right-[-400px] bottom-[-80px] md:bottom-[-100px] lg:bottom-[-160px] max-w-[500px] md:max-w-[700px] lg:max-w-[900px]  dark:hidden"
                    alt="Drag and drop course builder"
                />
            </div>
        </section>
    );
};
