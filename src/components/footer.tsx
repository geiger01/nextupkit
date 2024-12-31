import Link from "next/link";
import { Logo } from "./logo";

export const Footer = () => {
    return (
        <footer className="py-20">
            <div className="flex flex-col items-center max-w-[1200px] mx-auto px-4">
                <Link aria-label="Logo" href="/" className="items-center md:flex">
                    <Logo />
                </Link>
                <p className="mt-2 text-center text-muted-foreground">Ship Startups Fast, Without Spending Much</p>
                <div className="border-b w-full my-5"></div>

                <div className="flex justify-between w-full flex-wrap-reverse gap-5 items-center">
                    <div className="flex flex-col gap-2">
                        <Link
                            href="https://www.nextupkit.com/"
                            target="_blank"
                            className='w-fit text-xs border rounded-md py-1 px-2 text-muted-foreground flex items-center gap-2'
                        >
                            Built with <Logo className='h-[20px] w-[90px]' />
                        </Link>
                        <p className="text-xs font-light text-muted-foreground">
                            &copy; {new Date().getFullYear()} All rights reserved.
                        </p>
                    </div>

                    <div className="flex items-center gap-5 flex-wrap">
                        <Link href="/terms" className="text-muted-foreground items-center md:flex">
                            Terms & Conditions
                        </Link>
                        <Link href="/privacy" className="text-muted-foreground items-center md:flex">
                            Privacy Policy
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};
