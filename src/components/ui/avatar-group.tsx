import React from 'react';
import { UserAvatar } from '../user-avatar';
import { Tooltip } from './tooltip';
import { cn } from '@/lib/utils';

interface IAvatarGroupProps {
    max?: number;
    users: { thumbnail?: string; name?: string; }[];
    avatarClassname?: string;
    iconClassname?: string;
    extraAvatarClassname?: string;
}

export const AvatarGroup = ({ users, max = 4, avatarClassname, iconClassname, extraAvatarClassname }: IAvatarGroupProps) => {
    return (
        <div className="flex">
            {(users || [])?.slice(0, max).map((u, idx) => (
                <Tooltip
                    key={`${u.name || ''}-${idx}`}
                    side='top' content={u.name || `user ${idx + 1}`}
                >
                    <UserAvatar
                        className={cn('mr-[-10px] w-7 h-7', avatarClassname)}
                        userIconClassName={cn('w-4 h-4', iconClassname)}
                        imageUrl={u.thumbnail || ""}
                    />
                </Tooltip>
            ))}
            {(users || [])?.length > max && (
                <Tooltip side='top' content={`+${users.length - max} users`}>
                    <div
                        className={cn("relative text-xs flex items-center justify-center rounded-full w-7 h-7 border bg-white dark:bg-slate-950", avatarClassname, extraAvatarClassname)}
                    >
                        +{users.length - max}
                    </div>
                </Tooltip>
            )}
        </div>
    );
};
