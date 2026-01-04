import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
const navItems = [{
  label: 'Home',
  href: '#'
}, {
  label: 'About',
  href: '#about'
}, {
  label: 'Experience',
  href: '#experience'
}, {
  label: 'Education',
  href: '#education'
}, {
  label: 'Skills',
  href: '#skills'
}, {
  label: 'Projects',
  href: '#projects'
}, {
  label: 'Contact',
  href: '#contact'
}];
export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  const toggleMenu = () => setIsOpen(!isOpen);
  return <>
      <motion.header initial={{
      y: -100
    }} animate={{
      y: 0
    }} className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-[#050810]/80 backdrop-blur-lg border-b border-white/5 py-4' : 'bg-transparent py-6'}`}>
        <div className="container mx-auto px-4 flex justify-between items-center">
          {/* Signature Logo */}
          <a href="#" className="text-3xl font-bold text-white relative group z-50">
            <span className="font-['Great_Vibes'] text-4xl text-cyan-400">
              Naeemullah
            </span>
            <span className="absolute -bottom-2 left-0 w-0 h-0.5 bg-cyan-400 transition-all duration-300 group-hover:w-full" />
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navItems.map(item => <a key={item.label} href={item.href} className="text-sm font-medium text-gray-300 hover:text-cyan-400 transition-colors uppercase tracking-wider relative group">
                {item.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-cyan-400 transition-all duration-300 group-hover:w-full" />
              </a>)}
          </nav>

          {/* Mobile Menu Button */}
          <button onClick={toggleMenu} className="lg:hidden text-white p-2 hover:bg-white/10 rounded-full transition-colors z-50" aria-label="Toggle menu">
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && <motion.div initial={{
        opacity: 0,
        x: '100%'
      }} animate={{
        opacity: 1,
        x: 0
      }} exit={{
        opacity: 0,
        x: '100%'
      }} transition={{
        type: 'tween',
        duration: 0.3
      }} className="fixed inset-0 z-40 bg-[#050810] lg:hidden flex flex-col items-center justify-center">
            <nav className="flex flex-col items-center gap-8">
              {navItems.map((item, index) => <motion.a key={item.label} href={item.href} initial={{
            opacity: 0,
            y: 20
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            delay: index * 0.1
          }} onClick={() => setIsOpen(false)} className="text-2xl font-bold text-white hover:text-cyan-400 transition-colors uppercase tracking-widest">
                  {item.label}
                </motion.a>)}
            </nav>
          </motion.div>}
      </AnimatePresence>
    </>;
}