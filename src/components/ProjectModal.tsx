import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Github, ExternalLink, Calendar, Tag } from 'lucide-react';
import { Button } from './ui/Button';
interface Project {
  title: string;
  category: string;
  description: string;
  image: string;
  tags: string[];
  // Add more fields as needed for the detailed view
  fullDescription?: string;
  gallery?: string[];
  year?: string;
  client?: string;
  liveUrl?: string;
}
interface ProjectModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}
export function ProjectModal({
  project,
  isOpen,
  onClose
}: ProjectModalProps) {
  if (!project) return null;
  // Mock data for extended details since the original project object is simple
  const extendedDetails = {
    fullDescription: project.fullDescription || 'This project represents a significant milestone in modern web development, combining cutting-edge technologies with intuitive design principles. The architecture was built with scalability in mind, utilizing microservices and serverless functions to handle high traffic loads efficiently. The user interface underwent multiple iterations based on user testing feedback to ensure optimal usability.',
    gallery: project.gallery || [],
    year: '2023',
    client: 'Confidential Client',
    liveUrl: project.liveUrl || '#'
  };
  return <AnimatePresence>
      {isOpen && <>
          {/* Backdrop */}
          <motion.div initial={{
        opacity: 0
      }} animate={{
        opacity: 1
      }} exit={{
        opacity: 0
      }} onClick={onClose} className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[60] cursor-pointer" />

          {/* Modal */}
          <motion.div initial={{
        opacity: 0,
        y: 100,
        scale: 0.95
      }} animate={{
        opacity: 1,
        y: 0,
        scale: 1
      }} exit={{
        opacity: 0,
        y: 100,
        scale: 0.95
      }} className="fixed inset-0 z-[70] flex items-center justify-center p-4 pointer-events-none">
            <div className="bg-[#0a0e27] w-full max-w-5xl max-h-[90vh] rounded-3xl overflow-hidden border border-white/10 shadow-2xl pointer-events-auto flex flex-col">
              {/* Header Image */}
              <div className="relative h-64 md:h-80 shrink-0">
                <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0e27] to-transparent" />

                <button onClick={onClose} className="absolute top-4 right-4 p-2 bg-black/50 hover:bg-black/70 rounded-full text-white transition-colors backdrop-blur-md">
                  <X className="w-6 h-6" />
                </button>

                <div className="absolute bottom-6 left-6 md:left-10">
                  <span className="px-3 py-1 bg-cyan-400/20 text-cyan-400 text-xs font-bold uppercase tracking-wider rounded-full border border-cyan-400/20 mb-3 inline-block">
                    {project.category}
                  </span>
                  <h2 className="text-4xl md:text-5xl font-bold text-white">
                    {project.title}
                  </h2>
                </div>
              </div>

              {/* Content Scrollable Area */}
              <div className="overflow-y-auto p-6 md:p-10 custom-scrollbar">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                  {/* Main Content */}
                  <div className="lg:col-span-2 space-y-8">
                    <div>
                      <h3 className="text-xl font-bold text-white mb-4">
                        Project Overview
                      </h3>
                      <p className="text-gray-300 leading-relaxed text-lg">
                        {project.description}
                      </p>
                      <p className="text-gray-400 leading-relaxed mt-4">
                        {extendedDetails.fullDescription}
                      </p>
                    </div>

                    <div>
                      <h3 className="text-xl font-bold text-white mb-4">
                        Project Gallery
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {extendedDetails.gallery.map((img, idx) => <div key={idx} className="rounded-xl overflow-hidden aspect-video border border-white/5 group">
                            <img src={img} alt={`Gallery ${idx + 1}`} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                          </div>)}
                      </div>
                    </div>
                  </div>

                  {/* Sidebar Info */}
                  <div className="space-y-8">
                    <div className="bg-[#050810] p-6 rounded-2xl border border-white/5">
                      <h3 className="text-lg font-bold text-white mb-6">
                        Project Details
                      </h3>

                      <div className="space-y-4">
                        <div className="flex items-center justify-between py-2 border-b border-white/5">
                          <span className="text-gray-400 flex items-center gap-2">
                            <Calendar className="w-4 h-4" /> Year
                          </span>
                          <span className="text-white font-medium">
                            {extendedDetails.year}
                          </span>
                        </div>
                        <div className="flex items-center justify-between py-2 border-b border-white/5">
                          <span className="text-gray-400 flex items-center gap-2">
                            <Tag className="w-4 h-4" /> Client
                          </span>
                          <span className="text-white font-medium">
                            {extendedDetails.client}
                          </span>
                        </div>
                      </div>

                      <div className="mt-8">
                        <h4 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">
                          Technologies
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {project.tags.map(tag => <span key={tag} className="px-3 py-1 bg-white/5 text-cyan-400 text-xs rounded-full border border-cyan-400/10">
                              {tag}
                            </span>)}
                        </div>
                      </div>

                      <div className="mt-8 space-y-3">
                        <Button className="w-full justify-center" href={project.liveUrl} icon>
                          Live Demo
                        </Button>
                        {/* <Button variant="outline" className="w-full justify-center">
                          <Github className="w-4 h-4 mr-2" /> Source Code
                        </Button> */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </>}
    </AnimatePresence>;
}