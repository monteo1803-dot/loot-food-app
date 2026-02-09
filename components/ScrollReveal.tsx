
import React, { useEffect, useRef, useState } from 'react';

interface Props {
  children: React.ReactNode;
  className?: string;
  direction?: 'up' | 'down' | 'left' | 'right';
  delay?: number;
}

const ScrollReveal: React.FC<Props> = ({ children, className = '', direction = 'up', delay = 0 }) => {
  const [isVisible, setIsVisible] = useState(false);
  const domRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    const current = domRef.current;
    if (current) observer.observe(current);

    return () => {
      if (current) observer.unobserve(current);
    };
  }, []);

  const getDirectionClass = () => {
    switch (direction) {
      case 'up': return 'translate-y-20';
      case 'down': return '-translate-y-20';
      case 'left': return 'translate-x-20';
      case 'right': return '-translate-x-20';
      default: return 'translate-y-20';
    }
  };

  return (
    <div
      ref={domRef}
      className={`transition-all duration-1000 ease-out ${className} ${
        isVisible 
          ? 'opacity-100 translate-x-0 translate-y-0' 
          : `opacity-0 ${getDirectionClass()}`
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

export default ScrollReveal;
