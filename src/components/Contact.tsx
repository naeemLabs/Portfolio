import React from 'react';
import { motion } from 'framer-motion';
import { Twitter, Linkedin, Instagram, Github, Mail, MapPin } from 'lucide-react';
import { fadeInUp } from '../hooks/useScrollAnimation';
import { ContactForm } from './ContactForm';
const socialLinks = [{
  icon: Linkedin,
  href: 'https://www.linkedin.com/in/naeem-ullah',
  label: 'LinkedIn',
  color: 'hover:text-blue-600'
}, {
  icon: Github,
  href: '#',
  label: 'GitHub',
  color: 'hover:text-white'
}, {
  icon: Twitter,
  href: '#',
  label: 'Twitter',
  color: 'hover:text-blue-400'
}, {
  icon: Instagram,
  href: '#',
  label: 'Instagram',
  color: 'hover:text-pink-500'
}];
export function Contact() {
  return <section id="contact" className="py-32 relative overflow-hidden bg-[#050810]">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-t from-cyan-900/20 to-transparent pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center max-w-6xl mx-auto">
          {/* Left Column: Text & Info */}
          <motion.div initial="hidden" whileInView="visible" viewport={{
          once: true
        }} variants={fadeInUp}>
            <h2 className="text-5xl md:text-7xl font-black mb-8 tracking-tight text-white">
              LET'S BUILD <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">
                SOMETHING GREAT
              </span>
            </h2>

            <p className="text-xl text-gray-400 mb-12 max-w-lg leading-relaxed">
              I'm available for freelance, consulting, and full-time roles.
              Let's discuss your project and how I can help bring your vision to
              life with Angular.
            </p>

            <div className="space-y-8">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center text-cyan-400">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-gray-500 uppercase text-xs tracking-widest mb-1">
                    Email
                  </h4>
                  <a href="mailto:naeemdev.667@gmail.com" className="text-xl font-bold text-white hover:text-cyan-400 transition-colors">
                    naeemdev.667@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center text-cyan-400">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-gray-500 uppercase text-xs tracking-widest mb-1">
                    Location
                  </h4>
                  <p className="text-xl font-bold text-white">
                    Lahore, Pakistan
                  </p>
                </div>
              </div>

              <div className="pt-8 border-t border-white/10">
                <h4 className="text-gray-500 uppercase text-xs tracking-widest mb-6">
                  Connect With Me
                </h4>
                <div className="flex gap-4">
                  {socialLinks.map(social => <motion.a key={social.label} href={social.href} target="_blank" rel="noopener noreferrer" whileHover={{
                  scale: 1.1,
                  y: -5
                }} whileTap={{
                  scale: 0.9
                }} className={`w-12 h-12 bg-white/5 rounded-full flex items-center justify-center text-gray-400 transition-colors ${social.color}`} aria-label={social.label}>
                      <social.icon className="w-5 h-5" />
                    </motion.a>)}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Form */}
          <motion.div initial={{
          opacity: 0,
          x: 50
        }} whileInView={{
          opacity: 1,
          x: 0
        }} viewport={{
          once: true
        }} transition={{
          duration: 0.8
        }} className="bg-[#0a0e27] p-8 md:p-10 rounded-3xl border border-white/5 shadow-2xl">
            <h3 className="text-2xl font-bold text-white mb-6">
              Send a Message
            </h3>
            <ContactForm />
          </motion.div>
        </div>
      </div>
    </section>;
}