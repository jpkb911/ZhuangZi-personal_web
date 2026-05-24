import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowLeft, BookOpen, Scroll } from 'lucide-react';
import biographyData from '@/data/biography.json';
import Modal from '@/components/ui/Modal';
import { ZhuangziPortrait } from '@/components/ui/ZhuangziPortrait';

interface BiographyEvent {
  year: string;
  title: string;
  description: string;
  type: string;
  detail?: string;
}

export default function Biography() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  
  const [selectedEvent, setSelectedEvent] = useState<BiographyEvent | null>(null);

  const events = biographyData as BiographyEvent[];

  return (
    <div ref={containerRef} className="min-h-screen bg-paper relative overflow-hidden">
      
      {/* Parallax Background */}
      <motion.div 
        style={{ y: backgroundY }}
        className="absolute inset-0 opacity-10 pointer-events-none"
      >
        <div className="w-full h-[200vh] bg-[url('https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-[center_top] grayscale contrast-110 brightness-110 sepia-[0.2]" />
      </motion.div>

      {/* Navigation */}
      <div className="fixed top-8 left-8 z-50">
        <Link to="/" className="flex items-center gap-2 text-ink-600 hover:text-ink-950 transition-colors font-serif group">
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          <span className="text-lg">返回首页</span>
        </Link>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-24 relative z-10">
        <header className="text-center mb-24">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="mb-8 flex justify-center"
          >
            <ZhuangziPortrait className="w-32 h-32 md:w-40 md:h-40 border-ink-900/20" />
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-6xl font-serif font-bold text-ink-950 mb-6"
          >
            生平 · 逍遥游
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-xl text-ink-600 font-serif max-w-2xl mx-auto leading-relaxed"
          >
            庄子，名周，战国中期宋国蒙人。其文汪洋恣肆，其思独与天地精神往来。
          </motion.p>
        </header>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-8 md:left-1/2 transform md:-translate-x-1/2 top-0 bottom-0 w-px bg-ink-200" />

          <div className="space-y-12 md:space-y-24">
            {events.map((event, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`flex flex-col md:flex-row items-center justify-between ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
              >
                {/* Content Side */}
                <div className={`w-full md:w-5/12 pl-8 md:pl-0 ${index % 2 === 0 ? 'md:text-right text-left' : 'text-left'}`}>
                  <div 
                    onClick={() => event.detail && setSelectedEvent(event)}
                    className={`relative inline-block p-6 rounded-lg border border-transparent transition-all duration-300 ${event.detail ? 'cursor-pointer hover:border-ink-200 hover:shadow-lg hover:bg-white/50' : ''}`}
                  >
                    {/* Mobile Dot */}
                    <div className="md:hidden absolute -left-[2.25rem] top-8 w-4 h-4 rounded-full bg-ink-950 border-4 border-paper z-20" />
                    
                    <span className="text-ink-500 font-serif text-lg block mb-2">{event.year}</span>
                    <h3 className={`text-2xl font-bold text-ink-950 font-serif mb-3 flex items-center gap-2 ${index % 2 === 0 ? 'md:justify-end' : 'justify-start'}`}>
                      {index % 2 !== 0 && event.detail && <BookOpen size={16} className="text-ink-400" />}
                      {event.title}
                      {index % 2 === 0 && event.detail && <BookOpen size={16} className="text-ink-400" />}
                    </h3>
                    <p className="text-ink-700 leading-relaxed font-serif">
                      {event.description}
                    </p>
                  </div>
                </div>

                {/* Center Node (Desktop) */}
                <div className="hidden md:block relative z-10 w-4 h-4 rounded-full bg-ink-950 border-4 border-paper shadow-sm transform transition-transform hover:scale-150" />

                {/* Empty Side for Balance */}
                <div className="hidden md:block w-5/12" />
              </motion.div>
            ))}
          </div>
        </div>
        
        <div className="text-center mt-24 text-ink-400 font-serif italic">
          <Scroll className="mx-auto mb-4 w-8 h-8 opacity-50" />
          <p>终</p>
        </div>
      </div>

      {/* Detail Modal */}
      <Modal 
        isOpen={!!selectedEvent} 
        onClose={() => setSelectedEvent(null)}
        title={selectedEvent?.title || ''}
      >
        <div className="space-y-4">
          <p className="text-ink-500 italic">{selectedEvent?.year}</p>
          <div className="whitespace-pre-line">
            {selectedEvent?.detail}
          </div>
        </div>
      </Modal>
    </div>
  );
}
