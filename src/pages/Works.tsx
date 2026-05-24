import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Book, ChevronDown, ChevronUp } from 'lucide-react';
import worksData from '@/data/works.json';

export default function Works() {
  const [filter, setFilter] = useState<'all' | 'inner' | 'outer' | 'misc'>('all');
  const [expandedWorks, setExpandedWorks] = useState<Record<string, boolean>>({});

  const toggleExpand = (workId: string) => {
    setExpandedWorks(prev => ({
      ...prev,
      [workId]: !prev[workId]
    }));
  };

  const categories = [
    { id: 'all', label: '全部' },
    { id: 'inner', label: '内篇' },
    { id: 'outer', label: '外篇' },
    { id: 'misc', label: '杂篇' },
  ];

  const filteredWorks = filter === 'all' 
    ? worksData 
    : worksData.filter(work => work.category === filter);

  return (
    <div className="min-h-screen bg-paper p-8">
      <Link to="/" className="inline-flex items-center gap-2 text-ink-600 hover:text-ink-950 transition-colors mb-12 font-serif group">
        <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
        <span className="text-lg">返回首页</span>
      </Link>

      <div className="max-w-6xl mx-auto">
        <header className="mb-16 text-center">
          <h1 className="text-5xl font-serif font-bold text-ink-950 mb-6">作品全集</h1>
          <div className="flex justify-center gap-4 mt-8 font-serif">
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setFilter(cat.id as 'all' | 'inner' | 'outer' | 'misc')}
                className={`px-6 py-2 rounded-full border transition-all duration-300 ${
                  filter === cat.id 
                    ? 'bg-ink-900 text-paper border-ink-900' 
                    : 'bg-transparent text-ink-600 border-ink-200 hover:border-ink-900'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredWorks.map((work, index) => (
            <motion.div
              key={work.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
                <div className="bg-white border border-ink-100 rounded-lg h-full shadow-sm hover:shadow-xl hover:border-ink-300 transition-all duration-300 transform hover:-translate-y-1 relative overflow-hidden flex flex-col cursor-pointer group">
                  {/* Cover Image or Placeholder */}
                  <div className="h-48 overflow-hidden bg-ink-50 relative">
                    <Link to={`/reader/${work.id}`} className="block w-full h-full">
                      {work.cover ? (
                        <img 
                          src={work.cover} 
                          alt={`${work.title} - ${work.category === 'inner' ? '内篇' : work.category === 'outer' ? '外篇' : '杂篇'}`} 
                          className="w-full h-full object-cover opacity-85 group-hover:scale-105 transition-transform duration-700 filter sepia-[0.3] contrast-[1.1] brightness-[0.95] grayscale-[0.1]"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center opacity-10">
                          <Book size={80} />
                        </div>
                      )}
                    </Link>
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-serif text-ink-600 shadow-sm">
                      {work.category === 'inner' ? '内篇' : work.category === 'outer' ? '外篇' : '杂篇'}
                    </div>
                  </div>

                  <div className="p-8 flex-1 flex flex-col relative z-10">
                    <div className="flex justify-between items-baseline mb-4">
                      <Link to={`/reader/${work.id}`} className="text-3xl font-bold text-ink-950 font-serif group-hover:text-ink-700 transition-colors">
                        {work.title}
                      </Link>
                      {work.time && (
                        <span className="text-sm text-ink-400 font-serif">{work.time}</span>
                      )}
                    </div>
                    
                    <div className="mb-6 flex-1">
                      <AnimatePresence>
                        {expandedWorks[work.id] ? (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                            className="text-ink-500 font-serif leading-relaxed overflow-hidden"
                          >
                            {work.content.map((paragraph, idx) => (
                              <p key={idx} className="mb-4">{paragraph}</p>
                            ))}
                          </motion.div>
                        ) : (
                          <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-ink-500 font-serif line-clamp-3 leading-relaxed"
                          >
                            {work.content[0]}
                          </motion.p>
                        )}
                      </AnimatePresence>
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          toggleExpand(work.id);
                        }}
                        className="flex items-center text-sm text-ink-400 group-hover:text-ink-800 transition-colors font-serif mt-2"
                      >
                        {expandedWorks[work.id] ? (
                          <>
                            <span>收起内容</span>
                            <ChevronUp size={16} className="ml-1 group-hover:translate-y-[-2px] transition-transform" />
                          </>
                        ) : (
                          <>
                            <span>查看更多</span>
                            <ChevronDown size={16} className="ml-1 group-hover:translate-y-[2px] transition-transform" />
                          </>
                        )}
                      </button>
                    </div>
                    
                    <Link to={`/reader/${work.id}`} className="flex items-center text-ink-400 group-hover:text-ink-800 transition-colors font-serif mt-auto">
                      <span>开始阅读</span>
                      <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
                    </Link>
                  </div>
                </div>
            </motion.div>
          ))}
        </div>
        
        {filteredWorks.length === 0 && (
          <div className="text-center py-20 text-ink-400 font-serif">
            暂无相关篇章...
          </div>
        )}
      </div>
    </div>
  );
}
