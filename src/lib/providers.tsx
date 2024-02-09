'use client';

import React, { ReactNode } from "react";
import Script from "next/script";
import { SessionProvider } from "next-auth/react";

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

const AuthProvider = ({ children }: { children: ReactNode; }) => {
    return <SessionProvider>{children}</SessionProvider>;
};

export const Providers = ({ children }: { children: ReactNode; }) => {
    return (
        <>
            <GoogleAnalyticsProvider />
            <CrispChatProvider />
            <AuthProvider>
                {children}
            </AuthProvider>
        </>
    );
};