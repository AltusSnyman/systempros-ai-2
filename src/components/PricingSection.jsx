"use client";
import React, { useState, useRef } from "react";
import { motion } from "motion/react";
import { Card, CardHeader, CardContent } from "./ui/card";
import { TimelineContent } from "./ui/timeline-animation";
import { VerticalCutReveal } from "./ui/vertical-cut-reveal";
import { cn } from "../lib/utils";
import NumberFlow from "@number-flow/react";

const plans = [
    {
        name: "Starter",
        description: "Great for small businesses looking to get started with AI automation.",
        price: 997,
        yearlyPrice: 9970, // Example yearly pricing logic
        buttonText: "Book a Free Consultation",
        buttonVariant: "outline",
        includes: [
            "Access to Voice AI Agents",
            "Unlimited CRM Pipeline",
            "Visual Workflow Builder",
            "24/7 Chat Support",
            "Self-Service Configuration"
        ],
    },
    {
        name: "Business",
        description: "Best value for growing businesses that need advanced features.",
        price: 3497,
        yearlyPrice: 34970,
        buttonText: "Book a Free Consultation",
        buttonVariant: "default",
        popular: true,
        includes: [
            "Everything in Starter, plus:",
            "Advanced Checklists & SOPs",
            "Custom Fields & Logic",
            "Serverless Functions",
            "Priority Email Support"
        ],
    },
    {
        name: "Pro",
        description: "Advanced plan with enhanced security and unlimited access for large teams.",
        price: 5997,
        yearlyPrice: 59970,
        buttonText: "Book a Free Consultation",
        buttonVariant: "outline",
        includes: [
            "Everything in Business, plus:",
            "3 AI Agents Included",
            "Staff Training Workshop",
            "Dedicated CRM System Implementation",
            "Multi-Staff Access & Permissions",
            "Dedicated Account Manager"
        ],
    },
];

const PricingSwitch = ({ onSwitch }) => {
    const [selected, setSelected] = useState("0");

    const handleSwitch = (value) => {
        setSelected(value);
        onSwitch(value);
    };

    return (
        <div className="flex justify-center mb-10">
            <div className="relative z-10 mx-auto flex w-fit rounded-[2px] bg-paper border border-line p-1">
                <button
                    onClick={() => handleSwitch("0")}
                    className={cn(
                        "relative z-10 w-fit h-10 rounded-[2px] sm:px-6 px-3 sm:py-2 py-1 font-medium transition-colors focus:outline-none cursor-pointer",
                        selected === "0" ? "text-paper-lit" : "text-muted hover:text-ink"
                    )}
                >
                    {selected === "0" && (
                        <motion.span
                            layoutId="switch"
                            className="absolute inset-0 rounded-[2px] bg-green"
                            transition={{ type: "spring", stiffness: 500, damping: 40 }}
                        />
                    )}
                    <span className="relative z-20">Monthly</span>
                </button>

                <button
                    onClick={() => handleSwitch("1")}
                    className={cn(
                        "relative z-10 w-fit h-10 flex-shrink-0 rounded-[2px] sm:px-6 px-3 sm:py-2 py-1 font-medium transition-colors focus:outline-none cursor-pointer",
                        selected === "1" ? "text-paper-lit" : "text-muted hover:text-ink"
                    )}
                >
                    {selected === "1" && (
                        <motion.span
                            layoutId="switch"
                            className="absolute inset-0 rounded-[2px] bg-green"
                            transition={{ type: "spring", stiffness: 500, damping: 40 }}
                        />
                    )}
                    <span className="relative z-20 flex items-center gap-2">Yearly <span className={cn("font-mono text-[10px] uppercase px-1.5 py-0.5 rounded-[2px] ml-1", selected === "1" ? "bg-paper-lit/20 text-paper-lit" : "bg-green-faint text-copper border border-line")}>Save 20%</span></span>
                </button>
            </div>
        </div>
    );
};

export default function PricingSection() {
    const [isYearly, setIsYearly] = useState(false);
    const pricingRef = useRef(null);

    const revealVariants = {
        visible: (i) => ({
            y: 0,
            opacity: 1,
            transition: {
                delay: i * 0.2,
                duration: 0.5,
                ease: [0.16, 1, 0.3, 1],
            },
        }),
        hidden: {
            y: 20,
            opacity: 0,
        },
    };

    const togglePricingPeriod = (value) =>
        setIsYearly(parseInt(value) === 1);

    return (
        <div
            className="mx-auto relative bg-paper overflow-x-hidden py-24"
            ref={pricingRef}
        >
            <div className="text-center mb-16 pt-10 max-w-4xl mx-auto space-y-4 relative z-10 px-4">
                <h2 className="text-4xl md:text-5xl font-bold text-ink tracking-tight">
                    <VerticalCutReveal
                        splitBy="words"
                        staggerDuration={0.05}
                        staggerFrom="first"
                        reverse={true}
                        containerClassName="justify-center flex-wrap gap-x-2"
                    >
                        Investment Plans for Every Stage
                    </VerticalCutReveal>
                </h2>

                <TimelineContent
                    as="p"
                    animationNum={0}
                    customVariants={revealVariants}
                    className="text-lg text-muted max-w-2xl mx-auto leading-relaxed"
                >
                    Choose the right model for your business velocity. From self-service toolkits to done-for-you enterprise engineering.
                </TimelineContent>

                <TimelineContent
                    as="div"
                    animationNum={1}
                    customVariants={revealVariants}
                >
                    <PricingSwitch onSwitch={togglePricingPeriod} />
                </TimelineContent>
            </div>

            <div className="grid md:grid-cols-3 max-w-7xl gap-6 px-4 mx-auto relative z-10 items-stretch">
                {plans.map((plan, index) => (
                    <TimelineContent
                        key={plan.name}
                        as="div"
                        animationNum={2 + index}
                        customVariants={revealVariants}
                        className="h-full"
                    >
                        <Card
                            className={cn(
                                "relative text-ink h-full flex flex-col overflow-hidden transition-colors duration-300",
                                plan.popular
                                    ? "bg-paper border-green z-20"
                                    : "bg-paper border-line z-10 hover:border-green"
                            )}
                        >
                            {/* Visual Highlight for Popular Plan */}
                            {plan.popular && (
                                <div className="absolute top-0 inset-x-0 h-[2px] bg-copper"></div>
                            )}

                            <CardHeader className="text-left pb-2">
                                <div className="flex justify-between items-center mb-4">
                                    <h3 className="text-2xl font-bold text-ink">
                                        {plan.name}
                                    </h3>
                                    {plan.popular && (
                                        <span className="px-3 py-1 font-mono text-[11px] uppercase tracking-[0.02em] font-bold text-copper bg-paper rounded-[2px] border border-copper">
                                            MOST POPULAR
                                        </span>
                                    )}
                                </div>
                                <div className="flex items-baseline mb-2">
                                    <span className="text-5xl font-bold tracking-tight text-ink font-mono">
                                        $
                                        <NumberFlow
                                            format={{ currency: "USD", style: "decimal", minimumFractionDigits: 0 }}
                                            value={isYearly ? plan.yearlyPrice : plan.price}
                                            className="inline-block"
                                            willChange
                                        />
                                    </span>
                                    <span className="text-muted ml-2 font-mono text-[12px] font-medium uppercase tracking-[0.02em]">
                                        /{isYearly ? "year" : "month"}
                                    </span>
                                </div>
                                <p className="text-sm text-muted min-h-[40px]">{plan.description}</p>
                            </CardHeader>

                            <CardContent className="pt-6 flex-grow flex flex-col">
                                <a href="/contact" className="block w-full">
                                    <button
                                        className={cn(
                                            "w-full py-3 px-4 rounded-[2px] font-semibold transition-colors duration-300 flex items-center justify-center gap-2 group cursor-pointer",
                                            plan.popular
                                                ? "bg-green hover:bg-green-hover text-paper-lit"
                                                : "bg-paper hover:bg-green-faint text-ink border border-ink hover:border-green hover:text-green"
                                        )}
                                    >
                                        {plan.buttonText}
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover:translate-x-1"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
                                    </button>
                                </a>

                                <div className="mt-8 pt-6 border-t border-line space-y-4 flex-grow">
                                    <div className="font-mono text-[11px] font-semibold text-muted uppercase tracking-[0.04em] mb-4">
                                        What's Included
                                    </div>
                                    <ul className="space-y-3">
                                        {plan.includes.map((feature, featureIndex) => (
                                            <li
                                                key={featureIndex}
                                                className="flex items-start gap-3"
                                            >
                                                <div className="mt-1 flex-shrink-0 w-5 h-5 rounded-[2px] bg-green-faint flex items-center justify-center">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--color-green)" strokeWidth="3" strokeLinecap="square" strokeLinejoin="miter"><polyline points="20 6 9 17 4 12" /></svg>
                                                </div>
                                                <span className="text-sm text-ink leading-snug">{feature}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </CardContent>
                        </Card>
                    </TimelineContent>
                ))}
            </div>
        </div>
    );
}
