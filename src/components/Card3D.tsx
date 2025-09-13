import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useRef } from 'react';
import type { ReactNode, MouseEvent } from 'react';

interface Card3DProps {
  children: ReactNode;
  className?: string;
  intensity?: number;
  glowColor?: string;
}

const Card3D = ({ 
  children, 
  className = '', 
  intensity = 20,
  glowColor = 'rgba(14, 165, 233, 0.15)'
}: Card3DProps) => {
  const ref = useRef<HTMLDivElement>(null);
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);
  
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], [`${intensity}deg`, `-${intensity}deg`]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], [`-${intensity}deg`, `${intensity}deg`]);
  
  const handleMouseMove = (event: MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;
    
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    
    x.set(xPct);
    y.set(yPct);
  };
  
  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };
  
  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
        perspective: 1000,
      }}
      whileHover={{
        scale: 1.05,
        transition: { duration: 0.3, ease: "easeOut" }
      }}
      className={`relative transform-gpu ${className}`}
    >
      {/* Main card */}
      <motion.div
        className="relative w-full h-full"
        style={{
          transformStyle: "preserve-3d",
        }}
      >
        {children}
        
        {/* 3D depth layers */}
        <motion.div
          className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/10 to-white/5 blur-sm -z-10"
          style={{
            transform: "translateZ(-8px)",
            background: glowColor
          }}
        />
        <motion.div
          className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/5 to-white/2 blur-md -z-20"
          style={{
            transform: "translateZ(-16px)",
            background: glowColor
          }}
        />
        
        {/* Highlight overlay */}
        <motion.div
          className="absolute inset-0 rounded-3xl opacity-0 pointer-events-none"
          style={{
            background: `linear-gradient(
              135deg,
              rgba(255, 255, 255, 0.1) 0%,
              rgba(255, 255, 255, 0.05) 50%,
              rgba(255, 255, 255, 0.1) 100%
            )`,
            transform: useTransform(
              [mouseXSpring, mouseYSpring],
              (latest: number[]) => `translateX(${latest[0] * 10}px) translateY(${latest[1] * 10}px)`
            ),
          }}
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        />
        
        {/* Reflection effect */}
        <motion.div
          className="absolute inset-0 rounded-3xl pointer-events-none overflow-hidden"
          style={{
            background: `linear-gradient(
              ${useTransform(
                [mouseXSpring, mouseYSpring],
                (latest: number[]) => 45 + latest[0] * 30 + latest[1] * 30
              )}deg,
              transparent 30%,
              rgba(255, 255, 255, 0.1) 50%,
              transparent 70%
            )`,
          }}
        />
      </motion.div>
    </motion.div>
  );
};

export default Card3D;