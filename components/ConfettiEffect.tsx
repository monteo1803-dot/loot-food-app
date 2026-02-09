
import React, { useEffect, useState } from 'react';

interface Confetti {
    id: number;
    x: number;
    color: string;
    delay: number;
    duration: number;
    size: number;
}

interface Props {
    isActive: boolean;
    duration?: number;
}

const ConfettiEffect: React.FC<Props> = ({ isActive, duration = 3000 }) => {
    const [confetti, setConfetti] = useState<Confetti[]>([]);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        if (isActive) {
            setIsVisible(true);

            // Generate confetti pieces
            const colors = ['#D32F2F', '#FFD700', '#4CAF50', '#2196F3', '#9C27B0', '#FF5722', '#00BCD4'];
            const pieces: Confetti[] = [];

            for (let i = 0; i < 100; i++) {
                pieces.push({
                    id: i,
                    x: Math.random() * 100,
                    color: colors[Math.floor(Math.random() * colors.length)],
                    delay: Math.random() * 500,
                    duration: 2000 + Math.random() * 2000,
                    size: 6 + Math.random() * 8,
                });
            }

            setConfetti(pieces);

            // Hide after duration
            const timer = setTimeout(() => {
                setIsVisible(false);
                setConfetti([]);
            }, duration);

            return () => clearTimeout(timer);
        }
    }, [isActive, duration]);

    if (!isVisible) return null;

    return (
        <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
            {confetti.map((piece) => (
                <div
                    key={piece.id}
                    className="absolute animate-confetti-fall"
                    style={{
                        left: `${piece.x}%`,
                        top: '-20px',
                        width: piece.size,
                        height: piece.size * 0.6,
                        backgroundColor: piece.color,
                        animationDuration: `${piece.duration}ms`,
                        animationDelay: `${piece.delay}ms`,
                        transform: `rotate(${Math.random() * 360}deg)`,
                    }}
                />
            ))}

            <style>{`
        @keyframes confetti-fall {
          0% {
            transform: translateY(0) rotateZ(0deg) rotateX(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(100vh) rotateZ(720deg) rotateX(180deg);
            opacity: 0;
          }
        }
        .animate-confetti-fall {
          animation: confetti-fall linear forwards;
        }
      `}</style>
        </div>
    );
};

export default ConfettiEffect;
