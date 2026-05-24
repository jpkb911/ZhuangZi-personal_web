import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, Moon, Sun, Type } from 'lucide-react';
import worksData from '@/data/works.json';
import { motion, AnimatePresence } from 'framer-motion';

// Annotation Component
const Annotation = ({ term, definition }: { term: string, definition: string }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <span className="relative inline-block">
      <span 
        className="cursor-pointer border-b-2 border-ink-300 hover:border-ink-600 hover:bg-ink-100 transition-colors mx-1 px-0.5 rounded"
        onClick={() => setIsOpen(!isOpen)}
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
      >
        {term}
      </span>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-48 bg-ink-900 text-paper text-sm p-3 rounded shadow-lg z-50 text-center font-sans"
          >
            {definition}
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-8 border-transparent border-t-ink-900" />
          </motion.div>
        )}
      </AnimatePresence>
    </span>
  );
};

// Paragraph Component
const AnnotatedParagraph = ({ text, annotations }: { text: string, annotations: Record<string, string> }) => {
  if (!annotations || Object.keys(annotations).length === 0) {
    return <div className="mb-6 leading-loose text-justify indent-8">{text}</div>;
  }

  // Escape special regex characters in keys
  const keys = Object.keys(annotations).sort((a, b) => b.length - a.length); // Match longest first
  
  // Check if keys array is empty
  if (keys.length === 0) {
    return <div className="mb-6 leading-loose text-justify indent-8">{text}</div>;
  }
  
  const regex = new RegExp(`(${keys.map(k => k.replace(/[.*+?^${}()|[\\]/g, '\\$&')).join('|')})`, 'g');

  try {
    const parts = text.split(regex);

    return (
      <div className="mb-6 leading-loose text-justify indent-8">
        {parts.map((part, index) => {
          if (annotations[part]) {
            return <Annotation key={index} term={part} definition={annotations[part]} />;
          }
          return <span key={index}>{part}</span>;
        })}
      </div>
    );
  } catch (error) {
    console.error('Error processing annotations:', error);
    return <div className="mb-6 leading-loose text-justify indent-8">{text}</div>;
  }
};

export default function Reader() {
  const { chapterId } = useParams();
  const work = worksData.find(w => w.id === chapterId);
  
  const [isDark, setIsDark] = useState(false);
  const [fontSize, setFontSize] = useState<'normal' | 'large'>('normal');

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  if (!work) {
    return <div className="min-h-screen flex items-center justify-center">篇章未找到</div>;
  }

  return (
    <div className={`min-h-screen transition-colors duration-500 ${isDark ? 'bg-ink-950 text-paper-dark' : 'bg-paper text-ink-950'}`}>
      
      {/* Header / Toolbar */}
      <header className={`sticky top-0 z-40 px-6 py-4 flex justify-between items-center backdrop-blur-md border-b ${isDark ? 'border-ink-800 bg-ink-950/80' : 'border-ink-200 bg-paper/80'}`}>
        <Link to="/works" className={`flex items-center gap-2 font-serif hover:opacity-70 transition-opacity ${isDark ? 'text-paper' : 'text-ink-900'}`}>
          <ArrowLeft size={20} />
          <span className="hidden md:inline">返回目录</span>
        </Link>
        
        <h1 className="text-xl font-serif font-bold truncate px-4">{work.title}</h1>
        
        <div className="flex gap-4">
          <button 
            onClick={() => setFontSize(fontSize === 'normal' ? 'large' : 'normal')}
            className={`p-2 rounded-full hover:bg-black/5 transition-colors ${isDark ? 'hover:bg-white/10' : ''}`}
            title="调整字体"
          >
            <Type size={20} />
          </button>
          <button 
            onClick={() => setIsDark(!isDark)}
            className={`p-2 rounded-full hover:bg-black/5 transition-colors ${isDark ? 'hover:bg-white/10' : ''}`}
            title="切换模式"
          >
            {isDark ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>
      </header>

      {/* Content */}
      <main className={`max-w-3xl mx-auto px-6 py-12 font-serif ${fontSize === 'large' ? 'text-2xl' : 'text-xl'}`}>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="space-y-6"
        >
          {/* Check if content exists and is an array */}
          {work.content && Array.isArray(work.content) ? (
            work.content.map((paragraph, idx) => (
              <AnnotatedParagraph key={idx} text={paragraph} annotations={work.annotations || {}} />
            ))
          ) : (
            <div className="text-center py-12 text-ink-500">
              暂无内容
            </div>
          )}
        </motion.div>

        {/* Insight Card */}
        {work.insight && (
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={`mt-24 p-8 rounded-xl border ${isDark ? 'bg-ink-900 border-ink-800' : 'bg-white border-ink-200 shadow-sm'}`}
          >
            <div className="flex items-center gap-3 mb-4">
              <span className="text-2xl">💡</span>
              <h3 className="text-xl font-bold">哲思共鸣：{work.insight.title}</h3>
            </div>
            <p className={`leading-relaxed ${isDark ? 'text-ink-300' : 'text-ink-600'}`}>
              {work.insight.text}
            </p>
          </motion.div>
        )}
      </main>

      {/* Footer Nav */}
      <footer className="py-12 text-center">
        <Link to="/works" className={`inline-block border-b border-transparent hover:border-current transition-all pb-1 ${isDark ? 'text-ink-400' : 'text-ink-500'}`}>
          阅读更多篇章
        </Link>
      </footer>
    </div>
  );
}
