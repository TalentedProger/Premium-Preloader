import { useState } from "react";
import { Preloader } from "@/components/Preloader";
import bgImage from "@images/image_end.png";
import { motion } from "framer-motion";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="relative min-h-screen w-full bg-black overflow-hidden font-body text-white">
      {/* Main Background Image - Always present */}
      <div 
        className="fixed inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-90 scale-105"
        style={{ backgroundImage: `url(${bgImage})` }}
      />
      
      {/* Dark Gradient Overlay for readability */}
      <div className="fixed inset-0 z-0 bg-gradient-to-t from-black via-black/40 to-black/60 pointer-events-none" />

      {/* Preloader Overlay */}
      {isLoading && <Preloader onComplete={() => setIsLoading(false)} />}

      {/* Main Content */}
      {!isLoading && (
        <main className="relative z-10 container mx-auto px-4 min-h-screen flex items-center justify-center">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.3, ease: "easeOut" }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-light leading-tight font-display">
              <span className="block text-transparent bg-clip-text bg-gradient-to-b from-white via-white/90 to-white/60 drop-shadow-2xl">
                Designed by
              </span>
              <span className="block mt-2 text-white/95 font-normal italic drop-shadow-2xl">
                Salim Sokurov
              </span>
            </h1>
          </motion.div>
        </main>
      )}
    </div>
  );
}
