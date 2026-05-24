import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import quotes from '@/data/quotes.json';

import { Butterfly } from '@/components/ui/Butterfly';

export default function Home() {
  const [quote, setQuote] = useState('');
  const [scale, setScale] = useState(1);
  const [showButterflies, setShowButterflies] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Randomly select a quote on mount
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    setQuote(randomQuote);
  }, []);

  useEffect(() => {
    const calculateScale = () => {
      if (!containerRef.current) return;
      
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;
      const contentWidth = 1200; // 设计稿宽度
      const contentHeight = 900; // 设计稿高度
      
      // 计算宽高比缩放
      const scaleX = viewportWidth / contentWidth;
      const scaleY = viewportHeight / contentHeight;
      
      // 取较小值，确保内容完全可见
      const newScale = Math.min(scaleX, scaleY, 1);
      setScale(newScale);
    };

    calculateScale();
    window.addEventListener('resize', calculateScale);
    return () => window.removeEventListener('resize', calculateScale);
  }, []);

  return (
    <div 
      className="w-screen h-screen overflow-hidden"
      style={{
        backgroundImage: 'url(/images/shanshui-bg.svg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed'
      }}
    >
      <div 
        ref={containerRef}
        className="relative flex flex-col items-center justify-center origin-top-center"
        style={{
          width: '100vw',
          height: '100vh',
          transform: `scale(${scale})`,
          transformOrigin: 'center center'
        }}
      >
        
        {/* Content Overlay for Readability */}
        <div className="absolute inset-0 bg-white/40 z-0 pointer-events-none" />

        {/* Ink Background Animation */}
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1.2, opacity: 0.1 }}
          transition={{ duration: 3, ease: "easeOut" }}
          className="absolute inset-0 bg-gradient-radial from-ink-950 via-transparent to-transparent z-0 pointer-events-none rounded-full blur-3xl"
          style={{ width: '150vw', height: '150vw', top: '-25%', left: '-25%' }}
        />

        {/* Dream of Butterfly Pattern */}
        {showButterflies && (
          <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
            {/* Main Butterfly (Zhuang Zhou) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ 
                opacity: 0.15, 
                scale: 1,
                x: [0, 30, -20, 0],
                y: [0, -40, 20, 0],
                rotate: [0, 10, -5, 0]
              }}
              transition={{ 
                duration: 20, 
                ease: "easeInOut",
                repeat: Infinity,
                repeatType: "mirror"
              }}
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
            >
              <Butterfly 
                size={500}
                veinColor="#1a1a1a"
                wingColor="url(#wing-gradient)"
                bodyColor="#1a1a1a"
                animated={true}
                flapSpeed={0.8}
                style={{
                  filter: 'contrast(1.1) saturate(1.05) brightness(0.95)',
                  mixBlendMode: 'multiply',
                  opacity: 0.9
                }}
              />
            </motion.div>

            {/* Dream Butterflies */}
            {[...Array(5)].map((_, i) => {
              const randomX = Math.random() * 400 - 200;
              const randomY = Math.random() * -300 - 50;
              const randomRotate = Math.random() * 60 - 30;
              const randomDuration = 15 + Math.random() * 10;
              const randomDelay = Math.random() * 5;
              const randomFlapSpeed = 0.6 + Math.random() * 0.4;
              
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: Math.random() * 100 - 50, y: Math.random() * 100 }}
                  animate={{ 
                    opacity: [0, 0.25, 0],
                    x: randomX,
                    y: randomY,
                    rotate: randomRotate,
                    scale: [0.8, 1.2, 0.8]
                  }}
                  transition={{ 
                    duration: randomDuration, 
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: randomDelay
                  }}
                  className="absolute top-1/2 left-1/2"
                  style={{
                    marginLeft: `${Math.random() * 800 - 400}px`,
                    marginTop: `${Math.random() * 400 - 200}px`,
                    filter: 'blur(1px) contrast(1.05) saturate(1.02)'
                  }}
                >
                  <Butterfly 
                    size={80}
                    veinColor="#2d3748"
                    wingColor="url(#wing-gradient)"
                    bodyColor="#2d3748"
                    animated={true}
                    flapSpeed={randomFlapSpeed}
                    style={{
                      mixBlendMode: 'overlay',
                      opacity: 0.8
                    }}
                  />
                </motion.div>
              );
            })}
          </div>
        )}

        {/* Main Content */}
        <div className="relative z-10 flex flex-col items-center text-center p-4" style={{ maxWidth: '100vw', maxHeight: '100vh' }}>
          
          {/* Title */}
          <motion.h1 
            initial={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            transition={{ duration: 1.5 }}
            className="text-6xl md:text-7xl lg:text-8xl font-serif font-bold text-ink-950 mb-4 tracking-widest select-none"
          >
            庄子
          </motion.h1>

          {/* Content Wrapper (Slogan + Portrait) */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16 my-4">
            {/* Slogan - Left on Desktop */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5, duration: 1.5 }}
              className="writing-vertical-rl text-2xl md:text-3xl font-serif text-ink-800 tracking-widest leading-loose order-2 md:order-1 py-2"
            >
              独与天地精神往来
            </motion.div>

            {/* Zhuangzi Portrait - Right on Desktop */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, filter: "blur(5px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              transition={{ delay: 1.0, duration: 1.2 }}
              className="flex justify-center order-1 md:order-2"
            >
              <img 
                src="/images/zhuangzi.png" 
                alt="庄子像"
                onError={(e) => {
                  e.currentTarget.onerror = null; 
                  e.currentTarget.src = "https://placehold.co/300x400/f1f5f9/475569?text=请放入图片";
                  e.currentTarget.style.padding = "20px";
                  e.currentTarget.style.backgroundColor = "#f1f5f9";
                }}
                className="w-full max-w-[200px] md:max-w-[260px] lg:max-w-[300px] h-auto rounded-xl shadow-lg sepia-[0.1] opacity-95 hover:opacity-100 transition-all duration-700 object-contain"
              />
            </motion.div>
          </div>

          {/* Daily Quote */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 1 }}
            className="mb-8 max-w-md px-4"
          >
            <p className="text-base md:text-lg font-serif text-ink-600 italic">
              "{quote}"
            </p>
          </motion.div>

          {/* Navigation */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2, duration: 1 }}
            className="flex gap-6 font-serif"
          >
            <Link to="/biography" className="group relative px-6 py-2 overflow-hidden rounded-full bg-transparent text-ink-900 border border-ink-900 transition-all hover:text-paper text-sm md:text-base">
              <span className="relative z-10">知人论世</span>
              <div className="absolute inset-0 h-full w-full scale-0 rounded-full transition-all duration-300 group-hover:scale-100 group-hover:bg-ink-900/90"></div>
            </Link>
            <Link to="/works" className="group relative px-6 py-2 overflow-hidden rounded-full bg-transparent text-ink-900 border border-ink-900 transition-all hover:text-paper text-sm md:text-base">
              <span className="relative z-10">品读经典</span>
              <div className="absolute inset-0 h-full w-full scale-0 rounded-full transition-all duration-300 group-hover:scale-100 group-hover:bg-ink-900/90"></div>
            </Link>
            <button 
              onClick={() => setShowButterflies(!showButterflies)}
              className="group relative px-6 py-2 overflow-hidden rounded-full bg-transparent text-ink-900 border border-ink-900 transition-all hover:text-paper text-sm md:text-base"
            >
              <span className="relative z-10">{showButterflies ? '隐藏蝴蝶' : '显示蝴蝶'}</span>
              <div className="absolute inset-0 h-full w-full scale-0 rounded-full transition-all duration-300 group-hover:scale-100 group-hover:bg-ink-900/90"></div>
            </button>
          </motion.div>
        </div>

        {/* Footer */}
        {/* Footer removed as per design requirement */}
      </div>
    </div>
  );
}
