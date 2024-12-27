
import React from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion';

interface IFAQProps {
    faqs: { q: string, a: string; }[];
}

export const FAQ = ({ faqs }: IFAQProps) => {
    return (
        <section id='faq-section' className="container p-[80px_16px_80px] md:p-[100px_16px_100px] flex flex-col sm:items-center">
            <h2 className="text-left sm:text-center text-[24px] sm:text-2xl md:text-4xl font-bold max-w-[800px] lg:max-w-[1000px] lg:leading-tight leading-tight ">Frequently Asked Questions</h2>
            <Accordion type="single" collapsible className="w-full text-left max-w-[800px] mt-12 sm:mt-16">
                {faqs.map((i, idx) => (
                    <AccordionItem
                        key={idx}
                        value={`item-${idx + 1}`}
                    >
                        <AccordionTrigger
                            className='text-left'
                        >
                            {i.q}
                        </AccordionTrigger>
                        <AccordionContent>
                            {i.a}
                        </AccordionContent>
                    </AccordionItem>
                ))}
            </Accordion>
        </section>
    );
};
