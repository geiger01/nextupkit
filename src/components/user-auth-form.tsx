"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";
import { toast } from "./ui/use-toast";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { signIn, useSession } from "next-auth/react";
import { Github, Loader2 } from "lucide-react";
import axios, { AxiosError } from "axios";

interface UserAuthFormProps {
    
}

export function UserAuthForm({ }: UserAuthFormProps) {
    const [isLoading, setIsLoading] = useState(false);
    const [isGitHubLoading, setIsGitHubLoading] = useState(false);
    const [isGoogleLoading, setIsGoogleLoading] = useState(false);
    const router = useRouter();
    const { status: sessionStatus } = useSession();

    useEffect(() => {
        if (sessionStatus === "authenticated") {
            router.replace("/");
        }
    }, [sessionStatus, router]);

    const [user, setUser] = useState({
        email: '',
        password: ''
    });

    async function onSubmit(e: React.FormEvent) {
        e.preventDefault();
        // setIsLoading(true);

        try {
            // await axios.post("/api/login", {
            //     email: user.email,
            //     password: user.password,
            // });

            // const signInResult = await signIn("credentials", {
            //     email: user.email,
            //     password: user.password,
            //     redirect: false,
            // });
            const signInResult = await signIn("email", {
                email: user.email,
                redirect: false,
            });

            if (!signInResult?.ok) {
                return toast({
                    title: "Something went wrong.",
                    description: "Your sign in request failed. Please try again.",
                    variant: "destructive",
                });
            }

            return toast({
                title: "Check your email",
                description: "We sent you a login link. Be sure to check your spam too.",
            });
        } catch (e) {
            if ((e instanceof AxiosError)) {
                if (e.response?.status === 403) {
                    return toast({
                        title: "Check your email",
                        description: "We sent you a login link. Be sure to check your spam too.",
                    });
                } else {
                    return toast({
                        title: "Could not login",
                        description: e.response?.data?.message,
                        variant: 'destructive'
                    });
                }
            }
        }

        // setIsLoading(false);
    }

    return (
        <div className={cn("grid gap-6")}>
            <form onSubmit={onSubmit}>
                <div className="grid gap-2">
                    <div className="grid gap-1">
                        <Input
                            id="email"
                            value={user.email}
                            onChange={(e) => setUser({ ...user, email: e.target.value })}
                            placeholder="name@example.com"
                            type="email"
                            autoCapitalize="none"
                            autoComplete="email"
                            autoCorrect="off"
                            disabled={isLoading || isGitHubLoading}
                        />
                    </div>
                    <Button
                        disabled={isLoading}
                    >
                        {isLoading && (
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        )}
                        Sign In
                    </Button>
                </div>
            </form>
            <div className="relative">
                <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background px-2 text-muted-foreground">
                        Or continue with
                    </span>
                </div>
            </div>
            <div className="flex flex-col gap-2">
                <Button
                    type="button"
                    variant={'outline'}
                    onClick={() => {
                        setIsGitHubLoading(true);
                        signIn("github");
                    }}
                    disabled={isLoading || isGoogleLoading || isGitHubLoading}
                >
                    {isGitHubLoading ? (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                        <Github className="mr-2 h-4 w-4" />
                    )}{" "}
                    Github
                </Button>
                <Button
                    type="button"
                    variant={'outline'}
                    onClick={() => {
                        setIsGoogleLoading(true);
                        signIn("google");
                    }}
                    disabled={isLoading || isGoogleLoading || isGitHubLoading}
                >
                    {isGoogleLoading ? (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                        // <Loader2 className="mr-2 h-4 w-4" />
                        <></>
                    )}{" "}
                    Google
                </Button>
            </div>

        </div>
    );
}