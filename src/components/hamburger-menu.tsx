"use client";

import Link from "next/link";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Menu } from "lucide-react";
import { Button } from "./ui/button";
import { ModeToggle } from "./mode-toggle";
import { ROUTES } from "@/lib/consts";

interface HamburgerMenuProps extends React.HTMLAttributes<HTMLDivElement> {
}

export const HamburgerMenu = ({ ...props }: HamburgerMenuProps) => {

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild className={props.className}>
                <Button variant="outline" className="w-[2.5rem] h-[2.5rem] p-0">
                    <Menu />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="min-w-[200px]" align="end">
                {ROUTES.map((route) => (
                    <DropdownMenuItem key={route.path} className="cursor-pointer" asChild>
                        <Link href={route.path}>{route.name}</Link>
                    </DropdownMenuItem>
                ))}
                <DropdownMenuSeparator />
                <div className="text-sm flex justify-between items-center p-[0px_0px_0_8px]">
                    Mode
                    <ModeToggle triggerClassName="w-[2rem] h-[2rem]" />
                </div>
            </DropdownMenuContent>
        </DropdownMenu >
    );
};
