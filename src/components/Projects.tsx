import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { staggerContainer, scaleIn } from '../hooks/useScrollAnimation';
import { ExternalLink, Github, Eye } from 'lucide-react';
import { Pagination } from './Pagination';
import { ProjectModal } from './ProjectModal';
import fitinpartImg from '../assets/images/fitin-logo.jpg';
import skyworldImg from '../assets/images/sky-logo.png';
import clubhouseImg from '../assets/images/club-logo.png';
import w3duImg from '../assets/images/w3du-logo.png';
import cityImg from '../assets/images/city-logo.jpg';

const projects = [
  {
    title: 'FITINPART',
    category: 'E-Commerce Platform',
    description:
      'Auto parts e-commerce platform with advanced product catalog, smart search, admin management, and global shipping API integrations.',
    image: fitinpartImg,
    tags: ['Angular', 'RxJS', 'E-Commerce', 'API Integration'],
    liveUrl: 'https://www.fitinpart.sg/v2/en',
    githubUrl: '#',
  },
  {
    title: 'SkyWorld',
    category: 'Admin Dashboard',
    description:
      'Role-based admin dashboard featuring dynamic permissions, real-time data updates, analytics tables, and Firebase-powered workflows.',
    image: skyworldImg,
    tags: ['Angular', 'Firebase', 'Admin Panel', 'Real-time'],
    liveUrl: '#',
    githubUrl: '#',
  },
  {
    title: 'Clubhouse Journeys',
    category: 'Golf Management Platform',
    description:
      'A transparent golf travel planning platform offering real course and hotel rates with no hidden markups, making group trip planning simple and fair.',
    image: clubhouseImg,
    tags: ['Angular', 'Travel', 'Web App', 'Booking System'],
    liveUrl: 'https://clubhouse-journey.web.app/',
    githubUrl: '#',
  },
  {
    title: 'w3Du',
    category: '3D Printing Marketplace',
    description:
      'End-to-end 3D printing platform connecting buyers with verified vendors, instant bids, live tracking, secure escrow payments, and reviews.',
    image: w3duImg,
    tags: ['Angular', 'Marketplace', '3D Tech', 'Payment Integration'],
    liveUrl: 'https://w3du-75f0d.web.app/home',
    githubUrl: '#',
  },
  {
    title: 'City Explorer',
    category: 'Live Streaming Platform',
    description:
      'A global live-streaming platform enabling real-time cultural exploration through trusted creators, guided commerce, and immersive experiences.',
    image: cityImg,
    tags: ['Angular', 'Live Streaming', 'WebRTC', 'Global Platform'],
    liveUrl: 'https://city-explorer-staging.web.app/',
    githubUrl: '#',
  },
  {
    title: 'Enterprise CRM',
    category: 'Business Management',
    description:
      'Comprehensive CRM solution with customer tracking, sales pipeline management, automated workflows, and detailed analytics dashboards.',
    image:
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop', // external link is fine
    tags: ['Angular', 'CRM', 'Enterprise', 'Analytics'],
    liveUrl: '#',
    githubUrl: '#',
  },
];

const ITEMS_PER_PAGE = 6;
export function Projects() {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedProject, setSelectedProject] = useState<(typeof projects)[0] | null>(null);
  const totalPages = Math.ceil(projects.length / ITEMS_PER_PAGE);
  const currentProjects = projects.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    const element = document.getElementById('projects');
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth'
      });
    }
  };
  return <section id="projects" className="py-32 bg-[#0a0e27] relative">
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
            Selected <span className="text-cyan-400">Projects</span>
          </h2>
          <div className="h-1 w-24 bg-cyan-400" />
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div key={currentPage} variants={staggerContainer} initial="hidden" animate="visible" exit={{
          opacity: 0,
          y: -20
        }} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {currentProjects.map((project, index) => <motion.div key={project.title} variants={scaleIn} className="group relative bg-[#050810] rounded-2xl overflow-hidden border border-white/5 hover:border-cyan-400/50 transition-colors duration-500 cursor-pointer" onClick={() => setSelectedProject(project)}>
                <div className="aspect-[4/3] overflow-hidden relative">
                  <div className="absolute inset-0 bg-cyan-900/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 flex items-center justify-center">
                    <div className="bg-black/50 backdrop-blur-sm p-3 rounded-full text-white transform translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                      <Eye className="w-6 h-6" />
                    </div>
                  </div>
                  <motion.img whileHover={{
                scale: 1.1
              }} transition={{
                duration: 0.6
              }} src={project.image} alt={project.title} className="w-1/2 h-full object-contain m-auto" />
                </div>

                <div className="p-8">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <span className="text-cyan-400 text-sm font-medium tracking-wider uppercase mb-2 block">
                        {project.category}
                      </span>
                      <h3 className="text-2xl font-bold text-white group-hover:text-cyan-400 transition-colors">
                        {project.title}
                      </h3>
                    </div>
                    <div className="flex gap-3 relative z-20">
                      {/* {project.githubUrl !== '#' && <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" onClick={e => e.stopPropagation()} className="text-gray-400 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-full">
                          <Github className="w-5 h-5" />
                        </a>} */}
                      {project.liveUrl !== '#' && <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" onClick={e => e.stopPropagation()} className="text-gray-400 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-full">
                          <ExternalLink className="w-5 h-5" />
                        </a>}
                    </div>
                  </div>

                  <p className="text-gray-400 mb-6 line-clamp-2">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {project.tags.map(tag => <span key={tag} className="px-3 py-1 text-xs font-medium text-gray-300 bg-white/5 rounded-full border border-white/5">
                        {tag}
                      </span>)}
                  </div>
                </div>
              </motion.div>)}
          </motion.div>
        </AnimatePresence>

        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />

        <ProjectModal project={selectedProject} isOpen={!!selectedProject} onClose={() => setSelectedProject(null)} />
      </div>
    </section>;
}