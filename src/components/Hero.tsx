import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowDown, Download } from 'lucide-react';
import { Button } from './ui/Button';
export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const {
    scrollYProgress
  } = useScroll({
    target: ref,
    offset: ['start start', 'end start']
  });
  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  return <section ref={ref} className="relative h-screen w-full overflow-hidden flex items-center justify-center">
      {/* Parallax Background */}
      <motion.div style={{
      y: backgroundY
    }} className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-[#050810] to-[#050810]" />
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop')] bg-cover bg-center opacity-20 mix-blend-overlay" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#050810]/50 to-[#050810]" />
      </motion.div>

      {/* Content */}
      <motion.div style={{
      y: textY,
      opacity
    }} className="relative z-10 text-center px-4 max-w-5xl mx-auto">
        <motion.div initial={{
        opacity: 0,
        y: 50
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        duration: 1,
        ease: 'easeOut'
      }}>
          <h2 className="text-cyan-400 font-medium tracking-widest mb-6 uppercase text-sm md:text-base">
            Angular • TypeScript • Front-End Developer
          </h2>
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter text-white mb-8 leading-[0.9]">
            BUILDING <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">
              SCALABLE WEB APPS
            </span>
          </h1>
          <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-12 leading-relaxed">
            Passionate Angular Developer with 4+ years of professional
            experience. Expert in TypeScript, RxJS, Angular Material, and
            Tailwind CSS. I craft dynamic, responsive user interfaces and mentor
            teams to deliver clean, maintainable code.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button href="#projects">View Projects</Button>
            <Button variant="outline" href="/cv.pdf" download>
              <Download className="w-4 h-4 mr-2" /> Download CV
            </Button>
          </div>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div style={{
      opacity
    }} animate={{
      y: [0, 10, 0]
    }} transition={{
      duration: 2,
      repeat: Infinity,
      ease: 'easeInOut'
    }} className="absolute bottom-12 left-1/2 -translate-x-1/2 text-gray-500">
        <ArrowDown className="w-6 h-6" />
      </motion.div>
    </section>;
}