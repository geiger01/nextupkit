import { CheckCircle, Clapperboard, CreditCard, Lock, PlayCircle, TabletSmartphone } from "lucide-react";

export const Features = () => {
    return (
        <section className="dark:bg-slate-900 bg-gray-50">
            <div className="container p-[80px_16px_80px] md:p-[100px_16px_100px] flex flex-col sm:items-center">
                <h2 className="text-left sm:text-center text-[24px] sm:text-2xl md:text-4xl font-bold max-w-[800px] lg:max-w-[1000px] lg:leading-tight leading-tight ">Lorem ipsum dolor sit amet.</h2>
                <div className="mx-auto mt-12 grid max-w-5xl grid-cols-1 gap-10 sm:mt-16 sm:grid-cols-2 md:gap-12 xl:gap-16">
                    <div className="flex items-start gap-5">
                        <div className="bg-gray-50 dark:bg-gray-950 rounded-md flex items-center justify-center border w-fit p-2">
                            <CreditCard className="text-muted-foreground" size={20} />
                        </div>
                        <div className="flex flex-col text-left">
                            <h3 className="text-lg font-bold">Lorem, ipsum dolor.</h3>
                            <h4 className="font-light text-muted-foreground">Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt, consectetur?</h4>
                        </div>
                    </div>
                    <div className="flex items-start gap-5">
                        <div className="bg-gray-50 dark:bg-gray-950 rounded-md flex items-center justify-center border w-fit p-2">
                            <Lock className="text-muted-foreground" size={20} />
                        </div>
                        <div className="flex flex-col text-left">
                            <h3 className="text-lg font-bold">Lorem, ipsum dolor.</h3>
                            <h4 className="font-light text-muted-foreground">Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt, consectetur?</h4>
                        </div>
                    </div>
                    <div className="flex items-start gap-5">
                        <div className="bg-gray-50 dark:bg-gray-950 rounded-md flex items-center justify-center border w-fit p-2">
                            <CheckCircle className="text-muted-foreground" size={20} />
                        </div>
                        <div className="flex flex-col text-left">
                            <h3 className="text-lg font-bold">Lorem, ipsum dolor.</h3>
                            <h4 className="font-light text-muted-foreground">Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt, consectetur?</h4>
                        </div>
                    </div>
                    <div className="flex items-start gap-5">
                        <div className="bg-gray-50 dark:bg-gray-950 rounded-md flex items-center justify-center border w-fit p-2">
                            <Clapperboard className="text-muted-foreground" size={20} />
                        </div>
                        <div className="flex flex-col text-left">
                            <h3 className="text-lg font-bold">Lorem, ipsum dolor.</h3>
                            <h4 className="font-light text-muted-foreground">Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt, consectetur?</h4>
                        </div>
                    </div>
                    <div className="flex items-start gap-5">
                        <div className="bg-gray-50 dark:bg-gray-950 rounded-md flex items-center justify-center border w-fit p-2">
                            <PlayCircle className="text-muted-foreground" size={20} />
                        </div>
                        <div className="flex flex-col text-left">
                            <h3 className="text-lg font-bold">Lorem, ipsum dolor.</h3>
                            <h4 className="font-light text-muted-foreground">Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt, consectetur?</h4>
                        </div>
                    </div>
                    <div className="flex items-start gap-5">
                        <div className="bg-gray-50 dark:bg-gray-950 rounded-md flex items-center justify-center border w-fit p-2">
                            <TabletSmartphone className="text-muted-foreground" size={20} />
                        </div>
                        <div className="flex flex-col text-left">
                            <h3 className="text-lg font-bold">Lorem, ipsum dolor.</h3>
                            <h4 className="font-light text-muted-foreground">Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt, consectetur?</h4>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};