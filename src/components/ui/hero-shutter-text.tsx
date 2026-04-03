"use client";
import { cn } from "../../lib/utils";
import React, { useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";

interface HeroShutterTextProps {
  text?: string;
  className?: string;
  accentColor?: string;
}

export default function HeroShutterText({
  text = "SYSTEMPROS",
  className = "",
  accentColor = "text-blue-500",
}: HeroShutterTextProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const characters = text.split("");

  return (
    <div
      ref={ref}
      className={cn(
        "relative flex flex-col items-center justify-center w-full py-16 md:py-24 overflow-hidden",
        className
      )}
    >
      {/* Background Grid */}
      <div
        className="absolute inset-0 opacity-[0.08] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(to right, #3B82F6 1px, transparent 1px), linear-gradient(to bottom, #3B82F6 1px, transparent 1px)`,
          backgroundSize: "clamp(20px, 5vw, 60px) clamp(20px, 5vw, 60px)",
        }}
      />

      {/* Main Text Container */}
      <div className="relative z-10 w-full px-4 flex flex-col items-center">
        <AnimatePresence>
          {isInView && (
            <motion.div className="flex flex-wrap justify-center items-center w-full">
              {characters.map((char, i) => (
                <div
                  key={i}
                  className="relative px-[0.1vw] overflow-hidden"
                >
                  {/* Main Character */}
                  <motion.span
                    initial={{ opacity: 0, filter: "blur(10px)" }}
                    animate={{ opacity: 1, filter: "blur(0px)" }}
                    transition={{ delay: i * 0.04 + 0.3, duration: 0.8 }}
                    className="text-[10vw] md:text-[8vw] leading-none font-black text-white tracking-tighter"
                  >
                    {char === " " ? "\u00A0" : char}
                  </motion.span>

                  {/* Top Slice Layer */}
                  <motion.span
                    initial={{ x: "-100%", opacity: 0 }}
                    animate={{ x: "100%", opacity: [0, 1, 0] }}
                    transition={{
                      duration: 0.7,
                      delay: i * 0.04,
                      ease: "easeInOut",
                    }}
                    className={cn(
                      "absolute inset-0 text-[10vw] md:text-[8vw] leading-none font-black z-10 pointer-events-none",
                      accentColor
                    )}
                    style={{ clipPath: "polygon(0 0, 100% 0, 100% 35%, 0 35%)" }}
                  >
                    {char}
                  </motion.span>

                  {/* Middle Slice Layer */}
                  <motion.span
                    initial={{ x: "100%", opacity: 0 }}
                    animate={{ x: "-100%", opacity: [0, 1, 0] }}
                    transition={{
                      duration: 0.7,
                      delay: i * 0.04 + 0.1,
                      ease: "easeInOut",
                    }}
                    className="absolute inset-0 text-[10vw] md:text-[8vw] leading-none font-black text-zinc-200 z-10 pointer-events-none"
                    style={{
                      clipPath: "polygon(0 35%, 100% 35%, 100% 65%, 0 65%)",
                    }}
                  >
                    {char}
                  </motion.span>

                  {/* Bottom Slice Layer */}
                  <motion.span
                    initial={{ x: "-100%", opacity: 0 }}
                    animate={{ x: "100%", opacity: [0, 1, 0] }}
                    transition={{
                      duration: 0.7,
                      delay: i * 0.04 + 0.2,
                      ease: "easeInOut",
                    }}
                    className={cn(
                      "absolute inset-0 text-[10vw] md:text-[8vw] leading-none font-black z-10 pointer-events-none",
                      accentColor
                    )}
                    style={{
                      clipPath: "polygon(0 65%, 100% 65%, 100% 100%, 0 100%)",
                    }}
                  >
                    {char}
                  </motion.span>
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Corner Accents */}
      <div className="absolute top-4 left-4 border-l border-t border-blue-500/20 w-8 h-8" />
      <div className="absolute bottom-4 right-4 border-r border-b border-blue-500/20 w-8 h-8" />
    </div>
  );
}
