import React from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Experience } from './components/Experience';
import { Education } from './components/Education';
import { Skills } from './components/Skills';
import { Projects } from './components/Projects';
import { Contact } from './components/Contact';
export function App() {
  return <div className="bg-[#050810] min-h-screen text-white selection:bg-cyan-400 selection:text-black">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Experience />
        <Education />
        <Skills />
        <Projects />
        <Contact />
      </main>

      <footer className="py-8 text-center text-gray-600 text-sm bg-[#050810] border-t border-white/5">
        <p>
          © {new Date().getFullYear()} Muhammad Naeemullah — Crafted with
          passion. Built with React & TypeScript.
        </p>
      </footer>
    </div>;
}