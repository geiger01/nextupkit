"use client";

import React, { useState } from "react";
import { useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";
import { toast } from "./ui/use-toast";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { signIn } from "next-auth/react";
import { Github, Loader2 } from "lucide-react";
import { LOGIN_REDIRECT } from "@/lib/consts";

export function UserAuthForm() {
    const [isLoading, setIsLoading] = useState(false);
    const [loadingPlatform, setLoadingPlatform] = useState<null | 'github' | 'google' | 'facebook'>();
    const [email, setEmail] = useState('');

    const searchParams = useSearchParams();
    const callbackUrl = searchParams.get("callbackUrl");
    const urlError = searchParams.get("error") === "OAuthAccountNotLinked"
        ? "Email already in use with different provider"
        : "";

    async function onSubmit(e: React.FormEvent) {
        e.preventDefault();
        setIsLoading(true);

        const signInResult = await signIn("email", {
            email,
            callbackUrl: callbackUrl || LOGIN_REDIRECT,
            redirect: false
        });

        setIsLoading(false);
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
    }

    const isDisabled = isLoading || Boolean(loadingPlatform);
    return (
        <div className={cn("grid gap-6")}>
            <form onSubmit={onSubmit}>
                <div className="grid gap-2">
                    <div className="grid gap-1">
                        <Input
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="name@example.com"
                            type="email"
                            autoCapitalize="none"
                            autoComplete="email"
                            autoCorrect="off"
                            disabled={isDisabled}
                        />
                    </div>
                    <Button
                        disabled={isLoading || !email.trim()}
                    >
                        {isLoading && (
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        )}
                        Send Magic Link
                    </Button>
                </div>
                {urlError &&
                    <small className="text-red-400">
                        {urlError}
                    </small>
                }
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
                        setLoadingPlatform('google');
                        signIn("google", {
                            callbackUrl: callbackUrl || LOGIN_REDIRECT
                        });
                    }}
                    disabled={isDisabled}
                >
                    {loadingPlatform === 'google' ? (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                        <svg className="mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 48 48">
                            <path fill="#fbc02d" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12	s5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24s8.955,20,20,20	s20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path><path fill="#e53935" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039	l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path><path fill="#4caf50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36	c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path><path fill="#1565c0" d="M43.611,20.083L43.595,20L42,20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571	c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path>
                        </svg>
                    )}{" "}
                    Google
                </Button>
                <Button
                    type="button"
                    variant={'outline'}
                    onClick={() => {
                        setLoadingPlatform('facebook');
                        signIn("facebook", {
                            callbackUrl: callbackUrl || LOGIN_REDIRECT
                        });
                    }}
                    disabled={isDisabled}
                >
                    {loadingPlatform === 'facebook' ? (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                        <svg className="mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50" width="50px" height="50px">
                            <path
                                fill="#1877F2"
                                d="M25,3C12.85,3,3,12.85,3,25c0,11.03,8.125,20.137,18.712,21.728V30.831h-5.443v-5.783h5.443v-3.848 c0-6.371,3.104-9.168,8.399-9.168c2.536,0,3.877,0.188,4.512,0.274v5.048h-3.612c-2.248,0-3.033,2.131-3.033,4.533v3.161h6.588 l-0.894,5.783h-5.694v15.944C38.716,45.318,47,36.137,47,25C47,12.85,37.15,3,25,3z" />
                        </svg>
                    )}{" "}
                    Facebook
                </Button>
                <Button
                    type="button"
                    variant={'outline'}
                    onClick={() => {
                        setLoadingPlatform('github');
                        signIn("github", {
                            callbackUrl: callbackUrl || LOGIN_REDIRECT
                        });
                    }}
                    disabled={isDisabled}
                >
                    {loadingPlatform === 'github' ? (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                        <Github className="mr-2 h-4 w-4" />
                    )}{" "}
                    Github
                </Button>
            </div>
        </div>
    );
}