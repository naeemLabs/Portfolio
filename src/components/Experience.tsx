import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Calendar } from 'lucide-react';
const experiences = [{
  id: 1,
  role: 'Angular Developer',
  company: 'Codexia Technologies',
  period: '2024 - Present',
  description: 'Lead Angular developer responsible for architecture and scalability of complex applications. Mentor junior developers in Angular best practices and coding standards. Coordinate with backend developers to integrate frontend and backend systems seamlessly. Optimize frontend performance through code reviews and enhancements. Manage version control, CI/CD pipelines, and deployment strategies for efficient project delivery.',
  skills: ['Angular', 'TypeScript', 'CI/CD', 'Mentoring']
}, {
  id: 2,
  role: 'Front-End Developer',
  company: 'Beyond Logics',
  period: '2020 - 2024',
  description: 'Developed robust Angular applications utilizing TypeScript, HTML5, Tailwind CSS, Angular Material, and CSS3 for responsive design. Implemented RxJS for asynchronous operations and integrated RESTful APIs to deliver high-quality, scalable web solutions.',
  skills: ['Angular', 'TypeScript', 'RxJS', 'Tailwind CSS', 'Angular Material', 'RESTful APIs']
}];
export function Experience() {
  return <section id="experience" className="py-32 bg-[#050810] relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-64 w-96 h-96 bg-cyan-500/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-1/4 -right-64 w-96 h-96 bg-blue-600/10 rounded-full blur-[100px]" />
      </div>

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
            Professional <span className="text-cyan-400">Journey</span>
          </h2>
          <div className="h-1 w-24 bg-cyan-400 mx-auto" />
        </motion.div>

        <div className="relative max-w-4xl mx-auto">
          {/* Vertical Line */}
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-cyan-400/50 to-transparent transform md:-translate-x-1/2" />

          {experiences.map((exp, index) => <motion.div key={exp.id} initial={{
          opacity: 0,
          x: index % 2 === 0 ? -50 : 50
        }} whileInView={{
          opacity: 1,
          x: 0
        }} viewport={{
          once: true,
          margin: '-100px'
        }} transition={{
          duration: 0.6,
          delay: index * 0.2
        }} className={`relative flex flex-col md:flex-row gap-8 mb-16 ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
              {/* Timeline Dot */}
              <div className="absolute left-[-5px] md:left-1/2 top-0 w-3 h-3 bg-cyan-400 rounded-full shadow-[0_0_10px_rgba(34,211,238,0.8)] transform md:-translate-x-1/2 z-20 mt-1.5" />

              {/* Content Card */}
              <div className="flex-1 md:w-1/2 ml-8 md:ml-0">
                <div className={`p-6 bg-[#0a0e27]/80 backdrop-blur-sm border border-white/5 rounded-2xl hover:border-cyan-400/30 transition-colors duration-300 group ${index % 2 === 0 ? 'md:mr-12' : 'md:ml-12'}`}>
                  <div className="flex items-center gap-3 mb-2 text-cyan-400">
                    <Briefcase className="w-5 h-5" />
                    <span className="font-bold tracking-wider uppercase text-sm">
                      {exp.company}
                    </span>
                  </div>

                  <h3 className="text-2xl font-bold text-white mb-2">
                    {exp.role}
                  </h3>

                  <div className="flex items-center gap-2 text-gray-400 text-sm mb-4">
                    <Calendar className="w-4 h-4" />
                    <span>{exp.period}</span>
                  </div>

                  <p className="text-gray-300 mb-6 leading-relaxed">
                    {exp.description}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {exp.skills.map(skill => <span key={skill} className="px-3 py-1 text-xs font-medium text-cyan-200 bg-cyan-900/20 border border-cyan-500/20 rounded-full">
                        {skill}
                      </span>)}
                  </div>
                </div>
              </div>

              {/* Spacer for the other side */}
              <div className="hidden md:block flex-1" />
            </motion.div>)}
        </div>
      </div>
    </section>;
}