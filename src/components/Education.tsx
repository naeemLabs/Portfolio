import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Award } from 'lucide-react';
const education = [{
  id: 1,
  degree: 'Bachelor of Science in Information Technology',
  school: 'Minhaj University Lahore',
  year: '2017 - 2021',
  description: 'CGPA: 2.97/4.00. Final Year Project: Join Hand To Serve Society - A web application built with HTML, CSS, AngularJS, and Laravel designed to connect needy people with donors for money, blood, and other necessities.'
}, {
  id: 2,
  degree: 'Intermediate (FSc Pre-Engineering)',
  school: 'Punjab Group of Colleges, Sargodha',
  year: '2015 - 2017',
  description: 'Completed intermediate education in Pre-Engineering with strong foundation in mathematics and sciences. Obtained Marks: 711/1100.'
}, {
  id: 3,
  degree: 'Matriculation',
  school: 'Government High School No.2 Piplan',
  year: '2013 - 2015',
  description: 'Completed secondary school education with solid academic performance. Obtained Marks: 728/1100.'
}];
export function Education() {
  return <section id="education" className="py-32 bg-[#0a0e27] relative">
      <div className="container mx-auto px-4">
        <motion.div initial={{
        opacity: 0,
        y: 20
      }} whileInView={{
        opacity: 1,
        y: 0
      }} viewport={{
        once: true
      }} className="mb-20">
          <h2 className="text-5xl md:text-7xl font-bold mb-6 text-white">
            Academic <span className="text-cyan-400">Background</span>
          </h2>
          <div className="h-1 w-24 bg-cyan-400" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {education.map((edu, index) => <motion.div key={edu.id} initial={{
          opacity: 0,
          y: 30
        }} whileInView={{
          opacity: 1,
          y: 0
        }} viewport={{
          once: true
        }} transition={{
          delay: index * 0.2
        }} className="group relative bg-[#050810] p-8 rounded-2xl border border-white/5 hover:border-cyan-400/50 transition-all duration-300 hover:-translate-y-2">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <GraduationCap className="w-24 h-24 text-cyan-400" />
              </div>

              <div className="relative z-10">
                <div className="w-12 h-12 bg-cyan-400/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-cyan-400/20 transition-colors">
                  <Award className="w-6 h-6 text-cyan-400" />
                </div>

                <span className="inline-block px-3 py-1 text-xs font-bold tracking-wider text-cyan-400 border border-cyan-400/20 rounded-full mb-4">
                  {edu.year}
                </span>

                <h3 className="text-2xl font-bold text-white mb-2">
                  {edu.degree}
                </h3>
                <h4 className="text-lg text-gray-400 mb-4">{edu.school}</h4>

                <p className="text-gray-500 leading-relaxed group-hover:text-gray-400 transition-colors">
                  {edu.description}
                </p>
              </div>
            </motion.div>)}
        </div>
      </div>
    </section>;
}