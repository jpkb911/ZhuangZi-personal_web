import React from 'react';

interface ButterflyProps extends React.HTMLAttributes<HTMLDivElement> {
  animated?: boolean;
  flapSpeed?: number;
  size?: number;
  veinColor?: string;
  wingColor?: string;
  bodyColor?: string;
}

export const Butterfly = ({ 
  className, 
  animated = true,
  flapSpeed = 0.8,
  size = 200,
  style,
  veinColor,
  wingColor,
  bodyColor,
  ...props 
}: ButterflyProps) => {
  
  return (
    <div 
      className={`relative ${className || ''}`}
      style={{ width: size, height: size, ...style }}
      {...props}
    >
      <img 
        src="/images/custom-butterfly.svg" 
        alt="蝴蝶" 
        width="100%" 
        height="100%"
        style={{
          animation: animated ? `butterfly-float 4s ease-in-out infinite` : 'none',
          transformOrigin: 'center center',
        }}
      />
      
      <style>
        {`
          @keyframes butterfly-float {
            0%, 100% { transform: translateY(0) rotate(0deg); }
            25% { transform: translateY(-8px) rotate(1deg); }
            50% { transform: translateY(-5px) rotate(0deg); }
            75% { transform: translateY(-8px) rotate(-1deg); }
          }
        `}
      </style>
    </div>
  );
};
