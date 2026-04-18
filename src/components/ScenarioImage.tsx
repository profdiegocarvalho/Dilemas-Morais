import React from 'react';
import { Scenario } from '../types';

interface ScenarioImageProps {
  scenario: Scenario;
}

export const ScenarioImage: React.FC<ScenarioImageProps> = ({ scenario }) => {
  // Simple SVG representation based on the user's provided images
  // Car is a blue rectangle
  // People are red icons
  // Skull indicates who will be hit
  
  const isLeft = scenario.lane === 'left';
  const willHit = scenario.willHit;

  return (
    <svg viewBox="0 0 400 600" className="w-full h-full bg-white">
      {/* Road/Background (Implicitly white) */}
      
      {/* Car (Blue rounded rectangle) */}
      {/* If willHit is true for this lane, the car is aligned with it */}
      <rect
        x={willHit ? (isLeft ? 80 : 240) : (isLeft ? 240 : 80)}
        y="480"
        width="80"
        height="100"
        rx="15"
        fill="#60A5FA"
        stroke="black"
        strokeWidth="4"
      />
      
      {/* Entities (Stylized icons) */}
      {/* Left Group */}
      <g transform="translate(80, 300)">
        <PersonIcon color="#F87171" />
        {willHit && isLeft && <SkullIcon x="15" y="-60" />}
      </g>

      {/* Right Group */}
      <g transform="translate(240, 300)">
        <PersonIcon color="#4ADE80" />
        {willHit && !isLeft && <SkullIcon x="15" y="-60" />}
      </g>
      
      {/* Lane Indicators */}
      <line x1="200" y1="0" x2="200" y2="600" stroke="black" strokeWidth="4" strokeDasharray="15,15" opacity="0.1" />
    </svg>
  );
};

const PersonIcon = ({ color }: { color: string }) => (
  <g>
    {/* Head */}
    <circle cx="40" cy="20" r="12" fill={color} stroke="black" strokeWidth="3" />
    {/* Body */}
    <path
      d="M20,40 Q20,35 25,35 L55,35 Q60,35 60,40 L60,80 Q60,85 55,85 L25,85 Q20,85 20,80 Z"
      fill={color}
      stroke="black"
      strokeWidth="3"
    />
    {/* Legs */}
    <rect x="25" y="85" width="12" height="25" fill={color} stroke="black" strokeWidth="3" />
    <rect x="43" y="85" width="12" height="25" fill={color} stroke="black" strokeWidth="3" />
    {/* Arms */}
    <rect x="12" y="40" width="8" height="30" rx="4" fill={color} stroke="black" strokeWidth="3" />
    <rect x="60" y="40" width="8" height="30" rx="4" fill={color} stroke="black" strokeWidth="3" />
  </g>
);

const SkullIcon = ({ x, y }: { x: string; y: string }) => (
  <g transform={`translate(${x}, ${y})`}>
    <rect x="0" y="0" width="50" height="50" rx="5" fill="black" stroke="black" strokeWidth="2" />
    <path
      d="M25,10 C18,10 12,16 12,23 C12,28 15,32 19,34 L19,38 L31,38 L31,34 C35,32 38,28 38,23 C38,16 32,10 25,10 Z M20,20 A3,3 0 1,1 20,26 A3,3 0 1,1 20,20 Z M30,20 A3,3 0 1,1 30,26 A3,3 0 1,1 30,20 Z M22,32 L28,32 L28,35 L22,35 Z"
      fill="#FBBF24"
    />
  </g>
);
