import { useState } from "react";
import { Preloader } from "@/components/Preloader";
import { GlassCard } from "@/components/GlassCard";
import bgImage from "@assets/image_1768497967967.png";
import { motion } from "framer-motion";
import { ArrowRight, Star, Grid, Layout } from "lucide-react";

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
        <main className="relative z-10 container mx-auto px-4 py-20 min-h-screen flex flex-col justify-center">
          
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
            className="max-w-4xl mx-auto text-center mb-20"
          >
            <div className="inline-block mb-4 px-4 py-1.5 rounded-full border border-white/20 bg-white/5 backdrop-blur-md text-sm uppercase tracking-widest font-mono text-white/80">
              Welcome to the future
            </div>
            
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-normal leading-tight mb-8 font-display drop-shadow-2xl">
              <span className="block text-transparent bg-clip-text bg-gradient-to-b from-white to-white/60">
                Digital
              </span>
              <span className="block italic text-white/90">
                Experience
              </span>
            </h1>

            <p className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto leading-relaxed font-light mb-10">
              Immerse yourself in a world of glass and light. We craft digital experiences that transcend the ordinary boundaries of web design.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button 
                onClick={() => console.log("Explore clicked")}
                className="group relative px-8 py-4 bg-white text-black rounded-full font-bold overflow-hidden transition-transform hover:scale-105 active:scale-95"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Start Exploring <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </button>
              
              <button 
                onClick={() => console.log("About clicked")}
                className="px-8 py-4 rounded-full border border-white/20 bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-all hover:border-white/40 active:scale-95"
              >
                Learn More
              </button>
            </div>
          </motion.div>

          {/* Feature Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto w-full">
            <GlassCard delay={0.4}>
              <div className="h-12 w-12 rounded-full bg-white/10 flex items-center justify-center mb-6 border border-white/10">
                <Star className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl mb-3 font-display">Premium Design</h3>
              <p className="text-white/60 leading-relaxed text-sm">
                Every pixel is crafted with intention. Our interface uses modern glassmorphism to create depth and hierarchy.
              </p>
            </GlassCard>

            <GlassCard delay={0.6}>
              <div className="h-12 w-12 rounded-full bg-white/10 flex items-center justify-center mb-6 border border-white/10">
                <Layout className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl mb-3 font-display">Responsive</h3>
              <p className="text-white/60 leading-relaxed text-sm">
                Fluid layouts that adapt gracefully from massive desktop displays down to the smallest mobile devices.
              </p>
            </GlassCard>

            <GlassCard delay={0.8}>
              <div className="h-12 w-12 rounded-full bg-white/10 flex items-center justify-center mb-6 border border-white/10">
                <Grid className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl mb-3 font-display">Modular</h3>
              <p className="text-white/60 leading-relaxed text-sm">
                Built on a robust component architecture ensuring consistency and scalability across the entire platform.
              </p>
            </GlassCard>
          </div>

          <motion.footer 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 1 }}
            className="mt-20 text-center text-white/30 text-xs font-mono uppercase tracking-widest"
          >
            Designed & Developed for Excellence
          </motion.footer>

        </main>
      )}
    </div>
  );
}
