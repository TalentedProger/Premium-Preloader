import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

import startBg from "@images/image_start.png";
import endBg from "@images/image_end.png";

interface PreloaderProps {
  onComplete: () => void;
}

export function Preloader({ onComplete }: PreloaderProps) {
  const [progress, setProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const startTimeRef = useRef(Date.now());

  useEffect(() => {
    // Mark as ready when component mounts (simulating page load)
    const readyTimer = setTimeout(() => {
      setIsReady(true);
    }, 100);

    // Minimum duration: 3 seconds
    const minDuration = 3000;
    const intervalTime = 30;
    const minSteps = minDuration / intervalTime;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      const elapsed = Date.now() - startTimeRef.current;
      
      // Progress based on minimum time OR actual loading time, whichever is longer
      const timeBasedProgress = Math.min((elapsed / minDuration) * 100, 100);
      const nextProgress = Math.round(timeBasedProgress);
      
      setProgress(nextProgress);

      // Only complete when both conditions are met:
      // 1. Minimum time has passed (3 seconds)
      // 2. Page is ready
      if (elapsed >= minDuration && isReady && nextProgress >= 100) {
        clearInterval(timer);
        setTimeout(() => {
          setIsExiting(true);
          setTimeout(onComplete, 800);
        }, 500);
      }
    }, intervalTime);

    return () => {
      clearInterval(timer);
      clearTimeout(readyTimer);
    };
  }, [onComplete, isReady]);

  return (
    <AnimatePresence>
      {!isExiting && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.8, ease: "easeInOut" } }}
          className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden"
        >
          {/* Background Layer 1: Start Image */}
          <div 
            className="absolute inset-0 z-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${startBg})` }}
          />

          {/* Background Layer 2: End Image (Fades in from 80%) */}
          <motion.div 
            className="absolute inset-0 z-1 bg-cover bg-center"
            style={{ backgroundImage: `url(${endBg})` }}
            animate={{ 
              opacity: progress >= 80 ? (progress - 80) / 20 : 0 
            }}
            transition={{ duration: 0.2, ease: "linear" }}
          />

          {/* Glass Overlay (Backdrop Blur stays constant) */}
          <div className="absolute inset-0 z-[10] bg-black/40 backdrop-blur-2xl" />

          {/* Noise Texture Overlay */}
          <div className="absolute inset-0 noise-bg z-[51] opacity-30 mix-blend-overlay pointer-events-none" />

          {/* Top Line & Text - Left to Right */}
          <motion.div 
            animate={{ 
              opacity: progress >= 80 ? Math.max(0, 1 - (progress - 80) / 20) : 1 
            }}
            transition={{ duration: 0.2, ease: "linear" }}
            className="absolute top-4 left-0 w-full z-[52] flex flex-col gap-2"
          >
            <div className="w-full overflow-hidden whitespace-nowrap py-1">
              <motion.div 
                className="inline-block text-white/40 font-mono text-2xl sm:text-3xl md:text-4xl tracking-[0.3em] uppercase"
                animate={{ x: [0, -1000] }}
                transition={{ 
                  repeat: Infinity, 
                  duration: 20, 
                  ease: "linear",
                }}
              >
                {Array(10).fill("LOADING").join("    ")}
                {"    "}
                {Array(10).fill("LOADING").join("    ")}
              </motion.div>
            </div>
            <div className="w-full h-[1px] bg-white/10 overflow-hidden relative">
              <motion.div 
                className="absolute inset-0 bg-white shadow-[0_0_15px_rgba(255,255,255,0.8)]"
                initial={{ x: "-100%" }}
                animate={{ x: "100%" }}
                transition={{ 
                  repeat: Infinity, 
                  duration: 2, 
                  ease: "linear",
                }}
                style={{ width: "50%" }}
              />
            </div>
          </motion.div>

          {/* Center Dynamic Text */}
          <div className="relative z-[55] font-mono font-bold tracking-tighter select-none flex flex-col items-center">
            <motion.div 
              style={{
                scale: progress >= 80 ? 1 + ((progress - 80) / 20) * 0.15 : 1,
                backgroundImage: `linear-gradient(to top, white ${progress}%, transparent ${progress}%)`,
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                backgroundSize: "100% 100%",
                WebkitTextFillColor: "transparent", 
              }}
              animate={{ 
                filter: progress >= 100 
                  ? "drop-shadow(0 4px 12px rgba(0,0,0,0.5))" 
                  : "drop-shadow(0 0px 0px rgba(0,0,0,0))"
              }}
              transition={{ duration: 0.2, ease: "linear" }}
              className={cn(
                "text-6xl sm:text-7xl md:text-8xl lg:text-9xl xl:text-[12rem]",
                "transition-all duration-300 leading-none",
                "text-transparent text-stroke-1 md:text-stroke-2"
              )}
            >
              {progress}%
            </motion.div>
          </div>

          {/* Bottom Line & Text - Left to Right */}
          <motion.div 
            animate={{ 
              opacity: progress >= 80 ? Math.max(0, 1 - (progress - 80) / 20) : 1 
            }}
            transition={{ duration: 0.2, ease: "linear" }}
            className="absolute bottom-4 left-0 w-full z-[52] flex flex-col-reverse gap-2"
          >
            <div className="w-full overflow-hidden whitespace-nowrap py-1">
              <motion.div 
                className="inline-block text-white/40 font-mono text-2xl sm:text-3xl md:text-4xl tracking-[0.3em] uppercase"
                animate={{ x: [0, -1000] }}
                transition={{ 
                  repeat: Infinity, 
                  duration: 2, 
                  ease: "linear",
                }}
              >
                {Array(10).fill("LOADING").join("    ")}
                {"    "}
                {Array(10).fill("LOADING").join("    ")}
              </motion.div>
            </div>
            <div className="w-full h-[1px] bg-white/10 overflow-hidden relative">
              <motion.div 
                className="absolute inset-0 bg-white shadow-[0_0_15px_rgba(255,255,255,0.8)]"
                initial={{ x: "-100%" }}
                animate={{ x: "100%" }}
                transition={{ 
                  repeat: Infinity, 
                  duration: 2, 
                  ease: "linear",
                  delay: 1
                }}
                style={{ width: "50%" }}
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
