import React from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}
export function Pagination({
  currentPage,
  totalPages,
  onPageChange
}: PaginationProps) {
  return <div className="flex justify-center items-center gap-4 mt-12">
      <motion.button whileHover={{
      scale: 1.1
    }} whileTap={{
      scale: 0.9
    }} onClick={() => onPageChange(Math.max(1, currentPage - 1))} disabled={currentPage === 1} className={`p-3 rounded-full border ${currentPage === 1 ? 'border-white/10 text-gray-600 cursor-not-allowed' : 'border-cyan-400/50 text-cyan-400 hover:bg-cyan-400/10 hover:shadow-[0_0_15px_rgba(34,211,238,0.3)]'} transition-all duration-300`}>
        <ChevronLeft className="w-5 h-5" />
      </motion.button>

      <div className="flex gap-2">
        {Array.from({
        length: totalPages
      }, (_, i) => i + 1).map(page => <motion.button key={page} whileHover={{
        scale: 1.1
      }} whileTap={{
        scale: 0.9
      }} onClick={() => onPageChange(page)} className={`w-10 h-10 rounded-full font-bold transition-all duration-300 ${currentPage === page ? 'bg-cyan-400 text-black shadow-[0_0_15px_rgba(34,211,238,0.5)]' : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'}`}>
            {page}
          </motion.button>)}
      </div>

      <motion.button whileHover={{
      scale: 1.1
    }} whileTap={{
      scale: 0.9
    }} onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))} disabled={currentPage === totalPages} className={`p-3 rounded-full border ${currentPage === totalPages ? 'border-white/10 text-gray-600 cursor-not-allowed' : 'border-cyan-400/50 text-cyan-400 hover:bg-cyan-400/10 hover:shadow-[0_0_15px_rgba(34,211,238,0.3)]'} transition-all duration-300`}>
        <ChevronRight className="w-5 h-5" />
      </motion.button>
    </div>;
}