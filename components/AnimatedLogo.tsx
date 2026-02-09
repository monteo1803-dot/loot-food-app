
import React, { useState } from 'react';

interface Props {
    onClick?: () => void;
    className?: string;
}

const AnimatedLogo: React.FC<Props> = ({ onClick, className = '' }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div
            className={`cursor-pointer hover:scale-105 transition-transform select-none ${className}`}
            onClick={onClick}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className="flex flex-col leading-[0.85]">
                {/* LOOT */}
                <div className="flex items-center text-3xl font-black text-loot-red tracking-tighter">
                    <span>L</span>
                    <LetterO isRoulette={isHovered} size={26} />
                    <LetterO isRoulette={isHovered} size={26} delay={0.15} />
                    <span>T</span>
                </div>
                {/* FOOD */}
                <div className="flex items-center text-3xl font-black text-loot-red tracking-tighter">
                    <span>F</span>
                    <LetterO isRoulette={isHovered} size={26} delay={0.1} />
                    <LetterO isRoulette={isHovered} size={26} delay={0.25} />
                    <span>D</span>
                </div>
            </div>
        </div>
    );
};

// Component that transitions from O letter to roulette
const LetterO: React.FC<{ isRoulette: boolean; size: number; delay?: number }> = ({
    isRoulette,
    size,
    delay = 0
}) => {
    return (
        <div
            className="relative flex items-center justify-center transition-all duration-300"
            style={{
                width: size,
                height: size,
                marginLeft: '-2px',
                marginRight: '-2px'
            }}
        >
            {/* Normal O letter - visible when not hovered */}
            <span
                className={`absolute text-3xl font-black text-loot-red transition-all duration-300 ${isRoulette ? 'opacity-0 scale-50' : 'opacity-100 scale-100'
                    }`}
                style={{ lineHeight: 1 }}
            >
                O
            </span>

            {/* Roulette - visible when hovered */}
            <div
                className={`absolute transition-all duration-300 ${isRoulette ? 'opacity-100 scale-100' : 'opacity-0 scale-50'
                    }`}
                style={{ width: size, height: size }}
            >
                <MiniRoulette size={size} isSpinning={isRoulette} delay={delay} />
            </div>
        </div>
    );
};

// Mini roulette wheel component - Red, Black, White theme
const MiniRoulette: React.FC<{ size: number; isSpinning: boolean; delay?: number }> = ({
    size,
    isSpinning,
    delay = 0
}) => {
    const segments = 8;
    const colors = ['#D32F2F', '#1a1a1a', '#ffffff', '#D32F2F', '#1a1a1a', '#ffffff', '#D32F2F', '#1a1a1a'];

    return (
        <svg
            viewBox="0 0 100 100"
            className="w-full h-full"
            style={{
                animation: isSpinning ? `spin-slow 1.5s linear infinite` : 'none',
                animationDelay: `${delay}s`
            }}
        >
            {/* Outer ring */}
            <circle cx="50" cy="50" r="48" fill="none" stroke="#D32F2F" strokeWidth="4" />

            {/* Segments */}
            {Array.from({ length: segments }).map((_, i) => {
                const angle = (360 / segments) * i;
                const startAngle = angle - 90;
                const endAngle = startAngle + 360 / segments;

                const startRad = (startAngle * Math.PI) / 180;
                const endRad = (endAngle * Math.PI) / 180;

                const x1 = 50 + 44 * Math.cos(startRad);
                const y1 = 50 + 44 * Math.sin(startRad);
                const x2 = 50 + 44 * Math.cos(endRad);
                const y2 = 50 + 44 * Math.sin(endRad);

                const pathData = `
          M 50 50
          L ${x1} ${y1}
          A 44 44 0 0 1 ${x2} ${y2}
          Z
        `;

                return (
                    <path
                        key={i}
                        d={pathData}
                        fill={colors[i]}
                        stroke="#D32F2F"
                        strokeWidth="0.5"
                    />
                );
            })}

            {/* Center circle */}
            <circle cx="50" cy="50" r="10" fill="#D32F2F" />
            <circle cx="50" cy="50" r="5" fill="#fff" />
        </svg>
    );
};

export default AnimatedLogo;
