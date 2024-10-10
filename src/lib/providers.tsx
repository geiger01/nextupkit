'use client';

import React, { ReactNode } from "react";
import Script from "next/script";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { type ThemeProviderProps } from "next-themes/dist/types";

export const CrispChatProvider = () => {
    const crispId = process.env.NEXT_PUBLIC_CRISP_ID;

    if (!crispId) {
        return null;
    }

    return (
        <Script
            id="crisp-widget"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
                __html: `
      window.$crisp=[];
      window.CRISP_WEBSITE_ID="${crispId}";
      (function(){
        const d = document;
        const s = d.createElement("script");
        s.src = "https://client.crisp.chat/l.js";
        s.async = 1;
        d.getElementsByTagName("head")[0].appendChild(s);
      })();`,
            }}
        />
    );
};

export const MicrosoftClarityProvider = () => {
    const clarityTag = process.env.NEXT_PUBLIC_MICROSOFT_CLARITY;
    const isDev = process.env.NEXT_PUBLIC_ENV === 'dev';

    if (!clarityTag || isDev) {
        return null;
    }

    return (
        <Script
            id="microsoft-clarity-init"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
                __html: `
                (function(c,l,a,r,i,t,y){
                    c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                    t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                    y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
                })(window, document, "clarity", "script", "${clarityTag}");
                `,
            }}
        />
    );
};

export const GoogleAnalyticsProvider = () => {
    const gtag = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS;
    const isDev = process.env.NEXT_PUBLIC_ENV === 'dev';

    if (!gtag || isDev) {
        return null;
    }

    return (
        <>
            <Script
                async
                src={`https://www.googletagmanager.com/gtag/js? 
      id=${gtag}`}
            ></Script>
            <Script
                id="google-analytics"
                dangerouslySetInnerHTML={{
                    __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', '${gtag}');
        `,
                }}
            ></Script>
        </>
    );
};

export const ThemeProvider = ({ children, ...props }: ThemeProviderProps) => {
    return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
};

const AuthProvider = ({ children }: { children: ReactNode; }) => {
    return <SessionProvider>{children}</SessionProvider>;
};

export const Providers = ({ children }: { children: ReactNode; }) => {
    return (
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <GoogleAnalyticsProvider />
            <MicrosoftClarityProvider />
            <CrispChatProvider />
            <AuthProvider>
                {children}
                <Toaster />
            </AuthProvider>
        </ThemeProvider>
    );
};