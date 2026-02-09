
import React from 'react';

interface WheelProps {
  colors: string[];
}

const WheelGraphic: React.FC<WheelProps> = ({ colors }) => {
  return (
    <div className="relative w-40 h-40 group">
      <svg viewBox="0 0 100 100" className="w-full h-full transform group-hover:rotate-45 transition-transform duration-700">
        <circle cx="50" cy="50" r="48" fill="white" stroke="#eee" strokeWidth="2" />
        {/* Simple 8-segment wheel logic */}
        {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => {
          const startAngle = i * 45;
          const endAngle = (i + 1) * 45;
          const x1 = 50 + 40 * Math.cos((startAngle * Math.PI) / 180);
          const y1 = 50 + 40 * Math.sin((startAngle * Math.PI) / 180);
          const x2 = 50 + 40 * Math.cos((endAngle * Math.PI) / 180);
          const y2 = 50 + 40 * Math.sin((endAngle * Math.PI) / 180);
          
          return (
            <path
              key={i}
              d={`M 50 50 L ${x1} ${y1} A 40 40 0 0 1 ${x2} ${y2} Z`}
              fill={colors[i % colors.length]}
              className="hover:opacity-80 transition-opacity"
            />
          );
        })}
        {/* Center overlay */}
        <circle cx="50" cy="50" r="10" fill="white" className="shadow-lg" />
        <circle cx="50" cy="50" r="6" fill="#D32F2F" />
      </svg>
    </div>
  );
};

export default WheelGraphic;
