import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { User2 } from "lucide-react";

interface IUserAvatarProps {
    imageUrl?: string;
    className?: string;
    userIconClassName?: string;
}

export const UserAvatar = ({ imageUrl, className = '', userIconClassName = '' }: IUserAvatarProps) => {
    return (
        <Avatar className={cn("w-9 h-9 border dark:border-slate-950", className)}>
            <AvatarImage alt="User Picture" src={imageUrl} />
            <AvatarFallback>
                <User2 className={cn("h-5 w-5", userIconClassName)} />
            </AvatarFallback>
        </Avatar>
    );
};
