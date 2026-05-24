import React, { ReactNode } from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

interface ScrollFadeProps {
    children: ReactNode;
    delay?: number;
    className?: string;
}

export const ScrollFade: React.FC<ScrollFadeProps> = ({ children, delay = 0, className = '' }) => {
    const { ref, isVisible } = useScrollAnimation();

    return (
        <div
            ref={ref}
            className={`scroll-fade-up ${isVisible ? 'is-visible' : ''} ${className}`}
            style={{ transitionDelay: `${delay}ms` }}
        >
            {children}
        </div>
    );
};
