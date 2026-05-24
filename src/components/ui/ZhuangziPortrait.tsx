import React from 'react';

export const ZhuangziPortrait = ({ className, ...props }: React.ImgHTMLAttributes<HTMLImageElement>) => {
  return (
    <div className={`relative overflow-hidden rounded-full border-4 border-paper shadow-inner ${className}`}>
      <img 
        src="/images/zhuangzi.png" 
        alt="庄子头像" 
        className="w-full h-full object-cover"
        {...props}
      />
      {/* Texture overlay for ink feel */}
      <div className="absolute inset-0 bg-ink-900/10 mix-blend-overlay pointer-events-none" />
    </div>
  );
};
