import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, CheckCircle, AlertCircle } from 'lucide-react';
import { Button } from './ui/Button';
export function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const {
      name,
      value
    } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    // Simulate API call
    setTimeout(() => {
      // In a real app, you would send this to your backend
      console.log('Form submitted:', formData);
      setStatus('success');
      setFormData({
        name: '',
        email: '',
        message: ''
      });
      // Reset status after 3 seconds
      setTimeout(() => setStatus('idle'), 3000);
    }, 1500);
  };
  return <form onSubmit={handleSubmit} className="space-y-6 w-full max-w-lg mx-auto text-left">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-400 mb-2">
          Your Name
        </label>
        <input type="text" id="name" name="name" required value={formData.name} onChange={handleChange} className="w-full bg-[#0a0e27] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all" placeholder="John Doe" />
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-400 mb-2">
          Email Address
        </label>
        <input type="email" id="email" name="email" required value={formData.email} onChange={handleChange} className="w-full bg-[#0a0e27] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all" placeholder="john@example.com" />
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-gray-400 mb-2">
          Message
        </label>
        <textarea id="message" name="message" required rows={4} value={formData.message} onChange={handleChange} className="w-full bg-[#0a0e27] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all resize-none" placeholder="Tell me about your project..." />
      </div>

      <Button type="submit" disabled={status === 'submitting'} className="w-full justify-center">
        {status === 'submitting' ? <span className="flex items-center">
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Sending...
          </span> : status === 'success' ? <span className="flex items-center">
            <CheckCircle className="w-5 h-5 mr-2" /> Message Sent
          </span> : <span className="flex items-center">
            Send Message <Send className="w-4 h-4 ml-2" />
          </span>}
      </Button>

      {status === 'success' && <motion.p initial={{
      opacity: 0,
      y: 10
    }} animate={{
      opacity: 1,
      y: 0
    }} className="text-green-400 text-sm text-center mt-2">
          Thanks for reaching out! I'll get back to you soon.
        </motion.p>}
    </form>;
}