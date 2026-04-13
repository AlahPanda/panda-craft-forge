import { useRef, MouseEvent, ReactNode } from 'react';

interface GlowCardProps {
  children: ReactNode;
  className?: string;
}

export function GlowCard({ children, className = '' }: GlowCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    cardRef.current.style.setProperty('--glow-x', `${x}px`);
    cardRef.current.style.setProperty('--glow-y', `${y}px`);
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      className={`relative overflow-hidden rounded-xl glass transition-smooth group ${className}`}
      style={{
        background: 'radial-gradient(circle 200px at var(--glow-x, 50%) var(--glow-y, 50%), rgba(6,182,212,0.08), transparent)',
      }}
    >
      <div className="absolute inset-0 rounded-xl glass opacity-100" style={{ zIndex: -1 }} />
      {children}
    </div>
  );
}
