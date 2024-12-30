import Image from "next/image";
import heroDark from '../../public/assets/hero-dark.png';
import heroLight from '../../public/assets/hero-light.png';
import Link from "next/link";
import { SocialProof } from "./social-proof";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Star } from "lucide-react";

export const Hero = () => {
    return (
        <section className="container text-center p-[50px_16px_80px] md:p-[80px_16px_100px] flex flex-col sm:items-center">
            <Badge variant="blue" className="mb-2 w-fit">Made for Creators</Badge>
            <h1 className="text-left sm:text-center text-[28px] sm:text-3xl md:text-4xl lg:text-6xl font-bold max-w-[800px] lg:max-w-[1000px] lg:leading-tight leading-tight  mb-5">
                Ship
                <span className="text-primary"> Startups</span> Fast,<br className="hidden sm:block" /> <span className="underline decoration-2 md:decoration-4 decoration-wavy decoration-primary underline-offset-4">Without</span> Spending Much
            </h1>
            <h2 className="text-lg md:text-xl text-left sm:text-center max-w-[600px] text-muted-foreground">
                The Next.js starter kit that will help you transform your ideas into reality without breaking the bank.
            </h2>
            <div className="mt-12 text-md flex items-center gap-2 flex-wrap">
                <Button asChild size={'lg'} >
                    <Link href="/dashboard">
                        Get Started for Free
                    </Link>
                </Button>
                <Button variant={'ghost'} className="px-2" asChild size={'lg'} >
                    <Link
                        href={'https://www.lecturekit.io'}
                        target="_blank"
                        className={'flex gap-2'}
                    >
                        <Star size={16} />
                        Demo Startup
                    </Link>
                </Button>
            </div>
            <SocialProof />
            <Image
                className="rounded-lg w-[1030px] max-w-full mt-12 hidden dark:block"
                alt="Course Editor Preview"
                src={heroDark}
                quality={85}
                priority
            />
            <Image
                className="rounded-lg w-[1030px] max-w-full mt-12 dark:hidden"
                alt="Course Editor Preview"
                src={heroLight}
                quality={85}
                priority
            />
        </section>
    );
};

