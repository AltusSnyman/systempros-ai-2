"use client";
import React from 'react';
import { motion } from 'motion/react';
import { cn } from '../../lib/utils';

export const TimelineContent = ({
    children,
    className,
    customVariants,
    animationNum = 0,
    as = "div",
    viewport = { once: true, margin: "-100px" },
    ...props
}) => {
    const defaultVariants = {
        hidden: {
            opacity: 0,
            y: 20,
        },
        visible: (i) => ({
            opacity: 1,
            y: 0,
            transition: {
                delay: i * 0.2,
                duration: 0.5,
                ease: [0.16, 1, 0.3, 1],
            }
        }),
    };

    // Animate the requested tag directly instead of wrapping it in a <motion.div>.
    // Wrapping (e.g. a <div> inside a <p>) produces invalid HTML nesting; browsers
    // repair that on initial parse of the server-rendered markup, which then no
    // longer matches React's expected tree and throws a hydration mismatch.
    const MotionComponent = motion[as] || motion.div;

    return (
        <MotionComponent
            className={cn(className)}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            custom={animationNum}
            variants={customVariants || defaultVariants}
            {...props}
        >
            {children}
        </MotionComponent>
    );
};
