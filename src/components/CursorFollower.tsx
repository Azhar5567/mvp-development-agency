import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useEffect, useState } from 'react';

const CursorFollower = () => {
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  const springConfig = { damping: 25, stiffness: 700 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    let rafId: number;
    const moveCursor = (e: MouseEvent) => {
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        cursorX.set(e.clientX - 16);
        cursorY.set(e.clientY - 16);
      });
    };

    const handleMouseEnter = () => setIsHovering(true);
    const handleMouseLeave = () => setIsHovering(false);
    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    // Add event listeners for interactive elements
    const interactiveElements = document.querySelectorAll('a, button, [data-cursor="pointer"], [data-cursor="text"]');
    
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', handleMouseEnter);
      el.addEventListener('mouseleave', handleMouseLeave);
    });

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      interactiveElements.forEach(el => {
        el.removeEventListener('mouseenter', handleMouseEnter);
        el.removeEventListener('mouseleave', handleMouseLeave);
      });
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [cursorX, cursorY]);

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999] hidden lg:block">
      {/* Main cursor dot */}
      <motion.div
        className="absolute w-8 h-8 rounded-full mix-blend-difference"
        style={{
          left: cursorXSpring,
          top: cursorYSpring,
          background: 'radial-gradient(circle, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.6) 100%)'
        }}
        animate={{
          scale: isClicking ? 0.8 : isHovering ? 1.5 : 1,
          opacity: isHovering ? 0.9 : 0.7,
        }}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 28
        }}
      />
      
      {/* Trailing blur effect */}
      <motion.div
        className="absolute w-12 h-12 rounded-full bg-gradient-to-r from-accent-400/30 to-purple-400/30 blur-md"
        style={{
          left: cursorXSpring,
          top: cursorYSpring,
          x: -6,
          y: -6,
        }}
        animate={{
          scale: isHovering ? 2 : 1.2,
          opacity: isHovering ? 0.4 : 0.2,
        }}
        transition={{
          type: "spring",
          stiffness: 200,
          damping: 30
        }}
      />
      
      {/* Outer ring */}
      <motion.div
        className="absolute w-16 h-16 rounded-full border border-accent-500/20"
        style={{
          left: cursorXSpring,
          top: cursorYSpring,
          x: -16,
          y: -16,
        }}
        animate={{
          scale: isHovering ? 0.5 : 1,
          opacity: isHovering ? 0 : 0.3,
        }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 25
        }}
      />
    </div>
  );
};

export default CursorFollower;