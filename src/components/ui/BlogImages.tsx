import React from 'react';

export const ProgrammaticAdSvg: React.FC = () => (
  <div className="absolute inset-0 w-full h-full">
    <svg 
      viewBox="0 0 400 300" 
      className="w-full h-full"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <linearGradient id="prog-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#4338ca" stopOpacity="1"/>
          <stop offset="100%" stopColor="#3b82f6" stopOpacity="1"/>
        </linearGradient>
        
        <pattern id="circuit-dots" x="0" y="0" width="50" height="50" patternUnits="userSpaceOnUse">
          <circle cx="25" cy="25" r="1" fill="white" opacity="0.1"/>
        </pattern>
      </defs>
      
      {/* Background with pattern */}
      <rect width="400" height="300" fill="url(#prog-gradient)" />
      <rect width="400" height="300" fill="url(#circuit-dots)" />
      
      {/* Circuit Board Pattern - Simplified and Cleaner */}
      <g stroke="white" strokeWidth="1.5" opacity="0.12">
        <path d="M150,100 L250,100 L250,200" fill="none" />
        <path d="M150,200 L250,200" fill="none" />
        <circle cx="150" cy="100" r="3" fill="white" />
        <circle cx="250" cy="100" r="3" fill="white" />
        <circle cx="150" cy="200" r="3" fill="white" />
        <circle cx="250" cy="200" r="3" fill="white" />
      </g>
      
      {/* Central Feature */}
      <g transform="translate(200, 150)">
        <circle r="20" fill="white" opacity="0.1" />
        <circle r="15" fill="white" opacity="0.1" />
        <circle r="3" fill="white" opacity="0.8">
          <animate 
            attributeName="r"
            values="3;5;3"
            dur="3s"
            repeatCount="indefinite"
          />
          <animate 
            attributeName="opacity"
            values="0.8;0.3;0.8"
            dur="3s"
            repeatCount="indefinite"
          />
        </circle>
      </g>
      
      {/* Data Flow Points */}
      <g>
        <circle cx="200" cy="100" r="2" fill="white" opacity="0.6">
          <animate 
            attributeName="opacity"
            values="0.6;0.2;0.6"
            dur="2s"
            repeatCount="indefinite"
          />
        </circle>
        <circle cx="200" cy="200" r="2" fill="white" opacity="0.6">
          <animate 
            attributeName="opacity"
            values="0.6;0.2;0.6"
            dur="2s"
            repeatCount="indefinite"
            begin="1s"
          />
        </circle>
      </g>
    </svg>
  </div>
);

export const SocialMediaSvg: React.FC = () => (
  <div className="absolute inset-0 w-full h-full">
    <svg 
      viewBox="0 0 400 300" 
      className="w-full h-full"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <linearGradient id="social-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#7e22ce" stopOpacity="1"/>
          <stop offset="100%" stopColor="#ec4899" stopOpacity="1"/>
        </linearGradient>
      </defs>
      <rect width="400" height="300" fill="url(#social-gradient)" />
      
      {/* Network Nodes */}
      <g fill="white" opacity="0.15">
        <circle cx="200" cy="100" r="25" />
        <circle cx="120" cy="180" r="20" />
        <circle cx="280" cy="180" r="20" />
        <circle cx="160" cy="240" r="15" />
        <circle cx="240" cy="240" r="15" />
      </g>
      
      {/* Connection Lines */}
      <g stroke="white" strokeWidth="1.5" opacity="0.1">
        <line x1="200" y1="100" x2="120" y2="180" />
        <line x1="200" y1="100" x2="280" y2="180" />
        <line x1="120" y1="180" x2="160" y2="240" />
        <line x1="280" y1="180" x2="240" y2="240" />
      </g>
      
      {/* Central Node Animation */}
      <circle cx="200" cy="100" r="6" fill="white" opacity="0.8">
        <animate
          attributeName="r"
          values="6;10;6"
          dur="3s"
          repeatCount="indefinite"
        />
        <animate
          attributeName="opacity"
          values="0.8;0.3;0.8"
          dur="3s"
          repeatCount="indefinite"
        />
      </circle>
    </svg>
  </div>
);

export const PrivacySvg: React.FC = () => (
  <div className="absolute inset-0 w-full h-full">
    <svg 
      viewBox="0 0 400 300" 
      className="w-full h-full"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <linearGradient id="privacy-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#0f766e" stopOpacity="1"/>
          <stop offset="100%" stopColor="#0369a1" stopOpacity="1"/>
        </linearGradient>
      </defs>
      <rect width="400" height="300" fill="url(#privacy-gradient)" />
      
      {/* Shield Design */}
      <g transform="translate(150, 60) scale(0.8)">
        <path
          d="M70,0 L140,0 L140,80 Q140,160 70,180 Q0,160 0,80 L0,0 Z"
          fill="none"
          stroke="white"
          strokeWidth="3"
          opacity="0.15"
        />
        
        {/* Lock Design */}
        <rect
          x="45"
          y="70"
          width="50"
          height="40"
          rx="5"
          fill="white"
          opacity="0.15"
        />
        <circle
          cx="70"
          cy="90"
          r="6"
          fill="white"
          opacity="0.8"
        >
          <animate
            attributeName="opacity"
            values="0.8;0.4;0.8"
            dur="3s"
            repeatCount="indefinite"
          />
        </circle>
        <path
          d="M55,70 L85,70 Q85,50 70,50 Q55,50 55,70"
          fill="none"
          stroke="white"
          strokeWidth="3"
          opacity="0.15"
        />
      </g>
      
      {/* Background Pattern */}
      <g opacity="0.1">
        <circle cx="50" cy="50" r="2" fill="white" />
        <circle cx="350" cy="50" r="2" fill="white" />
        <circle cx="50" cy="250" r="2" fill="white" />
        <circle cx="350" cy="250" r="2" fill="white" />
      </g>
    </svg>
  </div>
); 