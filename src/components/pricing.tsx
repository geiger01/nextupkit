'use client';

import { useState } from "react";
// import { ISubscriptionPlan, IUserPaymentData } from "@/types/types";
import { subscriptions } from "@/lib/subscriptions";
import { toast } from "./ui/use-toast";
import { ToastAction } from "./ui/toast";
import { Button } from "./ui/button";
import axios from "axios";
import { useRouter } from "next/navigation";
import { CornerRightDown, HelpCircle, Loader2, X } from "lucide-react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { cn } from "@/lib/utils";
import { Badge } from "./ui/badge";
import { Switch } from "./ui/switch";

// export const Pricing = ({ currentPlan, userPaymentData }: { currentPlan: ISubscriptionPlan, userPaymentData: IUserPaymentData | null; }) => {
export const Pricing = () => {
    const { data: session, status: sessionStatus } = useSession();
    const [openSwitchPlanPopup, setOpenSwitchPlanPopup] = useState(false);
    const [loading, setLoading] = useState(false);
    const [isYearly, setIsYearly] = useState(true);
    // const [activeNewPlan, setActiveNewPlan] = useState<ISubscriptionPlan | null>(null);

    const router = useRouter();

    const pricing: { [type: string]: {[key: string]: number}; } = {
        year: {
            free: 0,
            basic: 9,
            pro: 15,
        },
        month: {
            free: 0,
            basic: 15,
            pro: 25,
        },
    };

    return (
        <>
            <section className="container p-[80px_16px_80px] md:p-[80px_16px_100px] flex flex-col items-center">
                <h2 className="text-center text-[28px] sm:text-3xl md:text-5xl font-bold max-w-[700px] lg:leading-tight leading-tight  mb-5">Plans & Pricing</h2>
                <p className="text-lg md:text-xl font-light text-center max-w-[500px] text-muted-foreground">Enjoy a 5-day risk-free trial and hassle-free cancellation anytime.</p>
                <div className="switch-wrapper mt-10 flex gap-3 relative">
                    <p
                        className={cn("cursor-pointer", isYearly ? 'text-muted-foreground' : '')}
                        onClick={() => setIsYearly(false)}
                    >
                        Monthly
                    </p>
                    <div className="text-xs font-medium flex gap-1 items-center absolute top-[-23px] w-[100px] text-primary left-[50%] translate-x-[calc(-50%_+_23px)]">
                        <p>
                            Save 40%
                        </p>
                        <CornerRightDown className="translate-y-1" size={14} />
                    </div>
                    <Switch checked={isYearly} onCheckedChange={() => setIsYearly(!isYearly)} />
                    <p
                        className={cn("cursor-pointer", isYearly ? '' : 'text-muted-foreground')}
                        onClick={() => setIsYearly(true)}
                    >
                        Yearly
                    </p>
                </div>
                <div className="mt-[50px] grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-7">
                    {subscriptions.map((s) => {
                        const amount = pricing[isYearly ? 'year' : 'month'][s.type];
                        const isDecimal = (amount - Math.floor(amount)) !== 0;
                        return (
                            <div
                                key={s.type}
                                className={
                                    cn("flex relative flex-col p-6 mx-auto max-w-lg rounded-lg border shadow xl:p-8",
                                        s.type === 'pro' ? 'border-primary border-2' : ''
                                    )
                                }
                            >
                                {s.type === 'pro' &&
                                    <Badge variant={'blue'} className="w-fit absolute right-[15px] top-[-10px]">Popular</Badge>
                                }
                                <h3 className="text-lg font-medium">{s.name}</h3>
                                <div className="flex items-baseline mt-2">
                                    <span className="mr-2 text-3xl font-bold">${amount.toFixed(isDecimal ? 2 : 0)}</span>
                                    {s.type !== 'free' &&
                                        <span className="text-muted-foreground ">/month</span>
                                    }
                                </div>
                                <span className={cn("transition-all h-0 translate-y-[-3px] text-muted-foreground text-xs mt-1 opacity-0", isYearly ? 'opacity-100 h-fit translate-y-0' : '')}>
                                    {s.type === 'free' ?
                                        <>No charge</>
                                        :
                                        <>
                                            Billed ${(amount * 12).toFixed(isDecimal ? 2 : 0)} annually
                                        </>
                                    }
                                </span>
                                <ul role="list" className="mb-8 mt-4 space-y-2 text-left text-sm font-light">
                                    <li className="flex items-center space-x-3  ">
                                        <svg className="flex-shrink-0 w-5 h-5 text-blue-500 dark:text-blue-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                                        <span><span className="font-semibold">20</span> Courses</span>
                                    </li>
                                    <li className="flex items-center space-x-3  ">
                                        <svg className="flex-shrink-0 w-5 h-5 text-blue-500 dark:text-blue-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                                        <span><span className="font-semibold">20</span> Courses</span>
                                    </li>
                                </ul>
                                {/* {currentPlan.type === 'free' ? */}
                                {true?
                                    <Button
                                        // onClick={() => onUpgradeClick(s)}
                                    >
                                        {s.type === 'free' ? 'Get Started for Free' : 'Start Free Trial'}
                                    </Button>
                                    :
                                    <Button
                                        // disabled={currentPlan.type === s.type || loading || s.type === 'free'}
                                        onClick={() => {
                                            // setActiveNewPlan(s);
                                            setOpenSwitchPlanPopup(true);
                                        }}
                                    >
                                        {s.type === 'free' ?
                                            <>Get Started for Free</>
                                            :
                                            <>
                                                {/* {(currentPlan.type === s.type) ? 'Current Plan' : 'Select Plan'} */}
                                                {(true) ? 'Current Plan' : 'Select Plan'}
                                            </>
                                        }
                                    </Button>
                                }
                            </div>
                        );
                    })}
                </div>
                <div className="mt-[50px] text-center">
                    Need a Custom Plan? <a
                        href="mailto:tantangeiger@gmail.com?subject=Custom%20Plan"
                        className="text-primary font-semibold"
                    >
                        Contact us
                    </a>
                    {" "}for a personalized plan that fits just right.
                </div>
            </section>
        </>
    );
};

