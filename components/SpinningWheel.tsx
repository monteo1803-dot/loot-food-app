
import React, { useState, useRef, useEffect } from 'react';

interface WheelItem {
    label: string;
    color: string;
    value?: unknown;
}

interface Props {
    items: WheelItem[];
    onSpinEnd?: (item: WheelItem) => void;
    size?: number;
}

const SpinningWheel: React.FC<Props> = ({ items, onSpinEnd, size = 300 }) => {
    const [isSpinning, setIsSpinning] = useState(false);
    const [rotation, setRotation] = useState(0);
    const [winner, setWinner] = useState<string | null>(null);
    const wheelRef = useRef<HTMLDivElement>(null);

    const spinWheel = () => {
        if (isSpinning) return;

        setIsSpinning(true);
        setWinner(null);

        // Random number of complete rotations (5-10) + random final position
        const spins = 5 + Math.random() * 5;
        const extraDegrees = Math.random() * 360;
        const totalRotation = spins * 360 + extraDegrees;

        setRotation(prev => prev + totalRotation);

        // Reset after animation
        setTimeout(() => {
            setIsSpinning(false);

            // Calculate which segment won (accounting for pointer at top)
            const normalizedRotation = (rotation + totalRotation) % 360;
            const segmentAngle = 360 / items.length;
            const winningIndex = Math.floor((360 - normalizedRotation + segmentAngle / 2) % 360 / segmentAngle);
            const winningItem = items[winningIndex % items.length];

            setWinner(winningItem.label);
            if (onSpinEnd) {
                onSpinEnd(winningItem);
            }
        }, 5000);
    };

    const segmentAngle = 360 / items.length;

    return (
        <div className="relative inline-flex flex-col items-center">
            {/* Wheel Container */}
            <div
                className="relative"
                style={{ width: size, height: size }}
            >
                {/* Pointer */}
                <div
                    className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1 z-20"
                    style={{
                        width: 0,
                        height: 0,
                        borderLeft: '15px solid transparent',
                        borderRight: '15px solid transparent',
                        borderTop: '25px solid #D32F2F',
                        filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))'
                    }}
                />

                {/* Wheel */}
                <div
                    ref={wheelRef}
                    className="w-full h-full rounded-full overflow-hidden shadow-2xl"
                    style={{
                        transform: `rotate(${rotation}deg)`,
                        transition: isSpinning ? 'transform 5s cubic-bezier(0.17, 0.67, 0.12, 0.99)' : 'none',
                    }}
                >
                    <svg viewBox="0 0 100 100" className="w-full h-full">
                        {/* Outer ring */}
                        <circle cx="50" cy="50" r="49" fill="none" stroke="#D32F2F" strokeWidth="2" />

                        {/* Segments */}
                        {items.map((item, index) => {
                            const startAngle = index * segmentAngle - 90;
                            const endAngle = startAngle + segmentAngle;

                            const startRad = (startAngle * Math.PI) / 180;
                            const endRad = (endAngle * Math.PI) / 180;

                            const x1 = 50 + 48 * Math.cos(startRad);
                            const y1 = 50 + 48 * Math.sin(startRad);
                            const x2 = 50 + 48 * Math.cos(endRad);
                            const y2 = 50 + 48 * Math.sin(endRad);

                            const largeArcFlag = segmentAngle > 180 ? 1 : 0;

                            const pathData = `
                M 50 50
                L ${x1} ${y1}
                A 48 48 0 ${largeArcFlag} 1 ${x2} ${y2}
                Z
              `;

                            // Text position
                            const textAngle = startAngle + segmentAngle / 2;
                            const textRad = (textAngle * Math.PI) / 180;
                            const textX = 50 + 30 * Math.cos(textRad);
                            const textY = 50 + 30 * Math.sin(textRad);

                            return (
                                <g key={index}>
                                    <path
                                        d={pathData}
                                        fill={item.color}
                                        stroke="#fff"
                                        strokeWidth="0.5"
                                    />
                                    <text
                                        x={textX}
                                        y={textY}
                                        fill="#fff"
                                        fontSize="4"
                                        fontWeight="bold"
                                        textAnchor="middle"
                                        dominantBaseline="middle"
                                        transform={`rotate(${textAngle + 90}, ${textX}, ${textY})`}
                                        style={{ textShadow: '0 1px 2px rgba(0,0,0,0.5)' }}
                                    >
                                        {item.label.length > 10 ? item.label.slice(0, 10) + '...' : item.label}
                                    </text>
                                </g>
                            );
                        })}

                        {/* Center circle */}
                        <circle cx="50" cy="50" r="8" fill="#fff" stroke="#D32F2F" strokeWidth="2" />
                        <circle cx="50" cy="50" r="4" fill="#D32F2F" />
                    </svg>
                </div>

                {/* Glow effect when spinning */}
                {isSpinning && (
                    <div
                        className="absolute inset-0 rounded-full animate-pulse"
                        style={{
                            boxShadow: '0 0 40px 10px rgba(211, 47, 47, 0.4)'
                        }}
                    />
                )}
            </div>

            {/* Spin Button */}
            <button
                onClick={spinWheel}
                disabled={isSpinning}
                className={`
          mt-6 px-8 py-4 rounded-full font-black uppercase tracking-wider text-lg
          transition-all transform
          ${isSpinning
                        ? 'bg-gray-400 cursor-not-allowed scale-95'
                        : 'bg-loot-red text-white hover:scale-105 hover:shadow-xl'
                    }
        `}
            >
                {isSpinning ? 'Spinning...' : '🎰 SPIN!'}
            </button>

            {/* Winner announcement */}
            {winner && !isSpinning && (
                <div className="mt-6 text-center animate-in zoom-in-95 duration-300">
                    <div className="text-sm uppercase tracking-wider text-gray-500 mb-1">Vous avez gagné :</div>
                    <div className="text-2xl font-black text-loot-red">{winner}</div>
                </div>
            )}
        </div>
    );
};

export default SpinningWheel;
