import { useScroll, useTransform, useSpring, MotionValue } from 'framer-motion';
import { useRef } from 'react';

export const useScrollAnimations = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const springConfig = { stiffness: 100, damping: 30, mass: 0.8 };
  
  // Smooth spring animations
  const y = useSpring(useTransform(scrollYProgress, [0, 1], [100, -100]), springConfig);
  const opacity = useSpring(useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]), springConfig);
  const scale = useSpring(useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.8, 1, 1, 0.9]), springConfig);
  const rotateX = useSpring(useTransform(scrollYProgress, [0, 0.5, 1], [15, 0, -15]), springConfig);

  return {
    ref,
    scrollYProgress,
    y,
    opacity,
    scale,
    rotateX,
  };
};

export const useParallaxScroll = (offset: number = 50) => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 1000], [0, -offset]);
  
  return { y };
};

export const useSectionReveal = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.8", "start 0.2"]
  });

  const springConfig = { stiffness: 400, damping: 40, mass: 0.8 };
  
  const y = useSpring(useTransform(scrollYProgress, [0, 1], [60, 0]), springConfig);
  const opacity = useSpring(useTransform(scrollYProgress, [0, 1], [0, 1]), springConfig);
  const scale = useSpring(useTransform(scrollYProgress, [0, 1], [0.95, 1]), springConfig);

  return {
    ref,
    y,
    opacity,
    scale,
    scrollYProgress
  };
};

export const useStaggeredReveal = (itemCount: number) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.8", "start 0.3"]
  });

  const items: Array<{ y: MotionValue<number>; opacity: MotionValue<number> }> = [];
  
  for (let i = 0; i < itemCount; i++) {
    const delay = i * 0.1;
    const startProgress = delay;
    const endProgress = Math.min(startProgress + 0.3, 1);
    
    const springConfig = { stiffness: 300, damping: 30, mass: 0.8 };
    const y = useSpring(useTransform(scrollYProgress, [startProgress, endProgress], [40, 0]), springConfig);
    const opacity = useSpring(useTransform(scrollYProgress, [startProgress, endProgress], [0, 1]), springConfig);
    
    items.push({ y, opacity });
  }

  return {
    ref,
    items,
    scrollYProgress
  };
};