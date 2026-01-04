import React, { Component } from 'react';
import { motion } from 'framer-motion';
import { Code2, Database, Layout, Terminal } from 'lucide-react';
const skillCategories = [{
  title: 'Frontend Framework',
  icon: Layout,
  skills: ['Angular 15+', 'TypeScript', 'RxJS', 'NgRx', 'Angular Material', 'Tailwind CSS', 'HTML5/CSS3', 'Responsive Design']
}, {
  title: 'State & Data Management',
  icon: Database,
  skills: ['RxJS Observables', 'NgRx Store', 'Angular Services', 'RESTful APIs', 'Firebase', 'LocalStorage', 'Session Management', 'HTTP Interceptors']
}, {
  title: 'Tools & DevOps',
  icon: Terminal,
  skills: ['Git & GitHub', 'VS Code', 'Angular CLI', 'npm/yarn', 'Webpack', 'Chrome DevTools', 'Postman', 'Figma']
}, {
  title: 'Best Practices',
  icon: Code2,
  skills: ['Clean Code', 'SOLID Principles', 'Component Architecture', 'Performance Optimization', 'Unit Testing', 'Code Reviews', 'Agile/Scrum', 'Mentoring']
}];
export function Skills() {
  return <section id="skills" className="py-32 bg-[#050810] relative overflow-hidden">
      {/* Decorative Gradients */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-cyan-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div initial={{
        opacity: 0,
        y: 20
      }} whileInView={{
        opacity: 1,
        y: 0
      }} viewport={{
        once: true
      }} className="mb-20 text-center">
          <h2 className="text-5xl md:text-7xl font-bold mb-6 text-white">
            Technical <span className="text-cyan-400">Arsenal</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            A comprehensive toolkit for building modern, scalable web
            applications with Angular.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {skillCategories.map((category, idx) => <motion.div key={category.title} initial={{
          opacity: 0,
          y: 30
        }} whileInView={{
          opacity: 1,
          y: 0
        }} viewport={{
          once: true
        }} transition={{
          delay: idx * 0.1
        }} className="bg-[#0a0e27]/50 backdrop-blur-sm border border-white/5 rounded-2xl p-8 hover:border-cyan-400/30 transition-all duration-300">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 bg-cyan-400/10 rounded-lg flex items-center justify-center">
                  <category.icon className="w-6 h-6 text-cyan-400" />
                </div>
                <h3 className="text-2xl font-bold text-white">
                  {category.title}
                </h3>
              </div>

              <div className="flex flex-wrap gap-3">
                {category.skills.map((skill, sIdx) => <motion.div key={skill} initial={{
              opacity: 0,
              scale: 0.8
            }} whileInView={{
              opacity: 1,
              scale: 1
            }} viewport={{
              once: true
            }} transition={{
              delay: 0.2 + sIdx * 0.05
            }} whileHover={{
              scale: 1.05,
              y: -2
            }} className="px-4 py-2 bg-[#050810] border border-white/10 rounded-lg text-gray-300 text-sm font-medium hover:border-cyan-400/50 hover:text-cyan-400 hover:shadow-[0_0_15px_rgba(34,211,238,0.15)] transition-all duration-300 cursor-default">
                    {skill}
                  </motion.div>)}
              </div>
            </motion.div>)}
        </div>
      </div>
    </section>;
}