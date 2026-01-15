import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface PreloaderProps {
  onComplete: () => void;
}

export function Preloader({ onComplete }: PreloaderProps) {
  const [progress, setProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    // Simulate loading process
    const duration = 3500; // 3.5 seconds total load time
    const intervalTime = 30;
    const steps = duration / intervalTime;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      const nextProgress = Math.min(Math.round((currentStep / steps) * 100), 100);
      
      setProgress(nextProgress);

      if (currentStep >= steps) {
        clearInterval(timer);
        setTimeout(() => {
          setIsExiting(true);
          setTimeout(onComplete, 800); // Wait for exit animation
        }, 500);
      }
    }, intervalTime);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!isExiting && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.8, ease: "easeInOut" } }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-2xl overflow-hidden"
        >
          {/* Noise Texture Overlay */}
          <div className="absolute inset-0 noise-bg z-[51] opacity-30 mix-blend-overlay pointer-events-none" />

          {/* Top Line & Text - Left to Right */}
          <motion.div 
            animate={{ opacity: progress >= 100 ? 0 : 1 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
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
              animate={{ 
                scale: progress >= 90 ? 1 + ((progress - 90) / 10) * 0.1 : 1 
              }}
              transition={{ duration: 0.3, ease: "linear" }}
              className={cn(
                "text-6xl sm:text-7xl md:text-8xl lg:text-9xl xl:text-[12rem]",
                "transition-all duration-300 leading-none",
                "text-transparent text-stroke-1 md:text-stroke-2"
              )}
              style={{
                backgroundImage: `linear-gradient(to top, white ${progress}%, transparent ${progress}%)`,
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                backgroundSize: "100% 100%",
                WebkitTextFillColor: "transparent", 
              }}
            >
              {progress}%
            </motion.div>
            
            {/* Elegant Underline */}
            <div className="w-full max-w-[12rem] sm:max-w-xs md:max-w-md lg:max-w-lg xl:max-w-xl px-4">
              <motion.div
                initial={{ scaleX: 0, opacity: 0 }}
                animate={{ 
                  scaleX: progress >= 90 ? (progress - 90) / 10 : 0, 
                  opacity: progress >= 90 ? 1 : 0 
                }}
                transition={{ duration: 0.3, ease: "linear" }}
                className="h-[2px] bg-white mt-4 shadow-[0_0_20px_rgba(255,255,255,0.5)] origin-center"
              />
            </div>
          </div>

          {/* Bottom Line & Text - Left to Right */}
          <motion.div 
            animate={{ opacity: progress >= 100 ? 0 : 1 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="absolute bottom-4 left-0 w-full z-[52] flex flex-col-reverse gap-2"
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
                  delay: 1 // Offset timing slightly from top
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
