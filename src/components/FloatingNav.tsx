import React from 'react';
import { motion } from 'framer-motion';
import { Home, User, Briefcase, Mail, Cpu, GraduationCap, Layers } from 'lucide-react';
const navItems = [{
  icon: Home,
  label: 'Home',
  href: '#'
}, {
  icon: User,
  label: 'About',
  href: '#about'
}, {
  icon: Briefcase,
  label: 'Experience',
  href: '#experience'
}, {
  icon: GraduationCap,
  label: 'Education',
  href: '#education'
}, {
  icon: Cpu,
  label: 'Skills',
  href: '#skills'
}, {
  icon: Layers,
  label: 'Projects',
  href: '#projects'
}, {
  icon: Mail,
  label: 'Contact',
  href: '#contact'
}];
export function FloatingNav() {
  return <motion.div initial={{
    y: 100,
    opacity: 0
  }} animate={{
    y: 0,
    opacity: 1
  }} transition={{
    delay: 1,
    duration: 0.8
  }} className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50">
      <nav className="flex items-center gap-2 px-6 py-3 bg-[#0a0e27]/80 backdrop-blur-lg border border-white/10 rounded-full shadow-[0_0_30px_rgba(0,0,0,0.5)]">
        {navItems.map(item => <a key={item.label} href={item.href} className="group relative p-3 rounded-full hover:bg-white/10 transition-colors" title={item.label}>
            <item.icon className="w-5 h-5 text-gray-400 group-hover:text-cyan-400 transition-colors" />

            {/* Tooltip */}
            <span className="absolute -top-10 left-1/2 -translate-x-1/2 px-2 py-1 bg-black text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none border border-white/10">
              {item.label}
            </span>
          </a>)}
      </nav>
    </motion.div>;
}