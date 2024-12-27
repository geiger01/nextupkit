import { Logo } from '@/components/logo';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function NotFound() {
    return (
        <main>
            <div className="max-w-screen-xl mx-auto px-4 flex mt-20 md:mt-0 md:items-center justify-start h-screen md:px-8">
                <div className="max-w-lg mx-auto text-center">
                    <div className="pb-6 flex items-center justify-center">
                        <Logo mini />
                    </div>
                    <h3 className="text-foreground text-4xl font-semibold sm:text-5xl">
                        Page not found
                    </h3>
                    <p className="text-muted-foreground mt-3 max-w-[450px]">
                        Sorry, the page you are looking for could not be found or has been removed.
                    </p>
                    <Button variant={'outline'} className="mt-5 text-md gap-1">
                        <Link href="/">
                            Home Page
                        </Link>
                    </Button>
                </div>
            </div>
        </main>
    );
}