import React from 'react';
import { motion } from 'framer-motion';
import { fadeInUp } from '../hooks/useScrollAnimation';
export function About() {
  return <section id="about" className="py-32 bg-[#050810] relative">
      <div className="container mx-auto px-4">
        <motion.div initial="hidden" whileInView="visible" viewport={{
        once: true
      }} variants={fadeInUp} className="max-w-4xl mx-auto">
          <h2 className="text-5xl md:text-7xl font-bold mb-12 text-white">
            About <span className="text-cyan-400">Me</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <p className="text-gray-300 text-lg leading-relaxed mb-6">
                Passionate and detail-oriented Angular Developer with nearly 4
                years of professional experience designing and building
                scalable, high-performance web applications.
              </p>
              <p className="text-gray-300 text-lg leading-relaxed">
                I specialize in creating dynamic, responsive user interfaces
                using modern technologies and delivering clean, maintainable
                code that drives business impact.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold text-white mb-6">
                Core Competencies
              </h3>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-start">
                  <span className="text-cyan-400 mr-3">▹</span>
                  <span>Expert in Angular & TypeScript architecture</span>
                </li>
                <li className="flex items-start">
                  <span className="text-cyan-400 mr-3">▹</span>
                  <span>RxJS state management & async patterns</span>
                </li>
                <li className="flex items-start">
                  <span className="text-cyan-400 mr-3">▹</span>
                  <span>Mentoring juniors & code quality leadership</span>
                </li>
                <li className="flex items-start">
                  <span className="text-cyan-400 mr-3">▹</span>
                  <span>RESTful API integration & optimization</span>
                </li>
                <li className="flex items-start">
                  <span className="text-cyan-400 mr-3">▹</span>
                  <span>Performance optimization & best practices</span>
                </li>
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </section>;
}