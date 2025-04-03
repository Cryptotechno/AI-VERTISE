import React from 'react';
import { motion } from 'framer-motion';
import { useMediaQuery } from '../../hooks/useMediaQuery';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  pattern?: boolean;
  hover?: boolean;
  patternColor?: string;
  onClick?: () => void;
}

export const Card: React.FC<CardProps> = ({ 
  children, 
  className = '', 
  pattern = false,
  hover = true,
  patternColor = 'from-indigo-600 to-purple-600',
  onClick
}) => {
  const isMobile = useMediaQuery('(max-width: 767px)');
  
  const hoverAnimation = isMobile 
    ? { scale: 1.01 } 
    : { y: -5, boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' };

  return (
    <motion.div
      whileHover={hover ? hoverAnimation : undefined}
      transition={{ duration: isMobile ? 0.2 : 0.3 }}
      onClick={onClick}
      className={`
        relative bg-white 
        rounded-[20px] overflow-hidden
        shadow-[0_2px_8px_-3px_rgba(0,0,0,0.05)]
        hover:shadow-[0_8px_20px_-4px_rgba(0,0,0,0.1)]
        border border-gray-100/60 hover:border-indigo-100
        transition-all duration-300
        ${className}
      `}
      style={{ 
        transform: 'translateZ(0)',
        backfaceVisibility: 'hidden',
        willChange: 'transform, box-shadow',
        isolation: 'isolate'
      }}
    >
      {pattern && (
        <div 
          className="absolute top-0 right-0 w-96 h-96 opacity-[0.03] transition-transform group-hover:scale-110 pointer-events-none"
          style={{
            transform: 'translate(30%, -30%) rotate(45deg)',
            transformOrigin: 'center',
            borderRadius: 'inherit'
          }}
        >
          <div 
            className={`w-full h-full bg-gradient-to-r ${patternColor} rounded-[inherit]`}
          />
        </div>
      )}
      <div className="relative z-[1]">
        {children}
      </div>
    </motion.div>
  );
}; 