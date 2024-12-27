"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "./logo";
import { buttonVariants } from "./ui/button";
import { useSession } from "next-auth/react";
import { ModeToggle } from "./mode-toggle";
import { cn } from "@/lib/utils";
import { HamburgerMenu } from "./hamburger-menu";
import { UserAccountNav } from "./user-account-nav";
import { IUser } from "@/types/types";
import { ROUTES } from "@/lib/consts";

export const Header = () => {
    const pathname = usePathname();
    const { data: session, status: sessionStatus } = useSession();

    return (
        <header className="sticky top-0 z-40 border-b bg-background">
            <div className="container flex h-16 items-center justify-between py-4">
                <div className="flex gap-6 md:gap-8">
                    <Link aria-label="Logo" href="/" className="items-center space-x-2 md:flex">
                        <Logo />
                    </Link>
                    <nav className="gap-8 hidden md:flex">
                        {ROUTES.map((route) => (
                            <Link
                                key={route.path}
                                href={route.path}
                                className={cn(
                                    "flex relative items-center transition-colors hover:text-foreground/80 text-md",
                                    pathname === route.path
                                        ? "text-foreground after:absolute after:w-full after:border-b-2 after:rounded-lg after:border-primary after:bottom-[-17px]"
                                        : "text-foreground/60",
                                )}
                            >
                                {route.name}
                            </Link>
                        ))}
                    </nav>
                </div>
                <div className="flex items-center gap-2">
                    <ModeToggle className="hidden md:flex" />
                    <HamburgerMenu className="flex md:hidden" />
                    {sessionStatus === 'authenticated' &&
                        <UserAccountNav
                            user={session.user as IUser}
                        />
                    }
                    {sessionStatus !== 'authenticated' &&
                        <Link
                            href={'/login'}
                            className={cn(
                                buttonVariants({ variant: "outline" }),
                            )}
                        >
                            Login
                        </Link>
                    }
                </div>
            </div>
        </header>
    );
};
