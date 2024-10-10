"use client";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { UserAvatar } from "@/components/user-avatar";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import { IUser } from "@/types/types";

interface UserAccountNavProps extends React.HTMLAttributes<HTMLDivElement> {
    user?: Partial<IUser> | null;
    linkType?: 'link' | 'a';
}

export const UserAccountNav = ({ user, linkType = 'link', ...props }: UserAccountNavProps) => {
    const router = useRouter();

    return (
        <DropdownMenu>
            <DropdownMenuTrigger className={props.className}>
                <UserAvatar
                    imageUrl={user?.image || ''}
                />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[250px]">
                <div className="flex items-center justify-start gap-2 p-2">
                    <div className="flex flex-col space-y-1 leading-none">
                        {user?.name && <p className="font-medium max-w-[200px] truncate">{user.name}</p>}
                        {(user?.email || []).length > 0 && (
                            <p className="max-w-[200px] truncate text-sm text-muted-foreground">
                                {user?.email}
                            </p>
                        )}
                    </div>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                    title="Sign out"
                    className="cursor-pointer"
                    onClick={() => signOut({ callbackUrl: '/' })}
                >
                    Sign Out
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};
