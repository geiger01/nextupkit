import { Badge } from "./ui/badge";
import { AppWindow, Blocks, GraduationCap, KeyRound } from "lucide-react";

export const Steps = () => {
    return (
        <section className="container p-[80px_16px_80px] md:p-[100px_16px_100px] flex flex-col sm:items-center">
            <h2 className="text-left sm:text-center text-[28px] sm:text-3xl md:text-5xl font-bold max-w-[800px] lg:leading-tight leading-tight mb-5">3 Easy Steps</h2>
            <p className="text-lg md:text-xl font-light text-left sm:text-center max-w-[500px] text-muted-foreground">Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab, quisquam.</p>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mt-12 sm:mt-16 max-w-[1000px]">
                <div
                    className="
                    before:w-[1px]  before:h-[calc(100%_-_65px)] before:absolute before:border-l before:left-[17px] before:top-[60px] dark:before:border-muted
                    lg:before:h-[1px]  lg:before:w-[calc(100%_-_75px)]  lg:before:border-t lg:before:left-[65px] lg:before:top-[17px]
                 relative flex flex-start lg:flex-col mx-auto items-start  gap-5 max-w-[400px] lg:w-full"
                >
                    <div className="bg-gray-50 dark:bg-gray-950 rounded-md flex items-center justify-center border w-fit p-2">
                        <Blocks className="text-muted-foreground" size={20} />
                    </div>
                    <div>
                        <p className="text-muted-foreground font-mono">01</p>
                        <h3 className="text-lg font-bold my-1">Lorem, ipsum dolor.</h3>
                        <h4 className="font-light text-muted-foreground">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nostrum.</h4>
                    </div>
                </div>
                <div
                    className="
                    before:w-[1px]  before:h-[calc(100%_-_65px)] before:absolute before:border-l before:left-[17px] before:top-[60px] dark:before:border-muted
                    lg:before:h-[1px]  lg:before:w-[calc(100%_-_75px)]  lg:before:border-t lg:before:left-[65px] lg:before:top-[17px] 
                 relative flex flex-start lg:flex-col mx-auto items-start  gap-5 max-w-[400px] lg:w-full"
                >
                    <div className="bg-gray-50 dark:bg-gray-950 rounded-md flex items-center justify-center border w-fit p-2">
                        <AppWindow className="text-muted-foreground" size={20} />
                    </div>
                    <div>
                        <p className="text-muted-foreground font-mono">02</p>
                        <h3 className="text-lg font-bold my-1">Lorem ipsum dolor sit.</h3>
                        <h4 className="font-light text-muted-foreground">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nihil, impedit?</h4>
                    </div>
                </div>
                <div className="relative flex flex-start lg:flex-col mx-auto items-start gap-5 max-w-[400px] lg:w-full" >
                    <div className="bg-gray-50 dark:bg-gray-950 rounded-md flex items-center justify-center border w-fit p-2">
                        <GraduationCap className="text-muted-foreground" size={20} />
                    </div>
                    <div>
                        <p className="text-muted-foreground font-mono">03</p>
                        <h3 className="text-lg font-bold my-1">Lorem, ipsum dolor.</h3>
                        <h4 className="font-light text-muted-foreground">Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore?</h4>
                    </div>
                </div>
            </div>
        </section>
    );
};
