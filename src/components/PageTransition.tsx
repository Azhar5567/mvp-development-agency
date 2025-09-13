import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

interface PageTransitionProps {
  children: ReactNode;
  className?: string;
}

const PageTransition = ({ children, className = '' }: PageTransitionProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export const SectionTransition = ({ children, className = '', delay = 0 }: PageTransitionProps & { delay?: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 60, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{
        duration: 1.2,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export const SlideInTransition = ({ 
  children, 
  className = '', 
  direction = 'up',
  delay = 0,
  duration = 0.8
}: PageTransitionProps & { 
  direction?: 'up' | 'down' | 'left' | 'right';
  delay?: number;
  duration?: number;
}) => {
  const directions = {
    up: { y: 40 },
    down: { y: -40 },
    left: { x: 40 },
    right: { x: -40 }
  };

  return (
    <motion.div
      initial={{ 
        opacity: 0, 
        ...directions[direction]
      }}
      whileInView={{ 
        opacity: 1, 
        x: 0, 
        y: 0 
      }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export const StaggeredTransition = ({ 
  children, 
  className = '',
  staggerDelay = 0.1 
}: PageTransitionProps & { staggerDelay?: number }) => {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: staggerDelay,
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export const StaggeredItem = ({ children, className = '' }: PageTransitionProps) => {
  return (
    <motion.div
      variants={{
        hidden: { 
          opacity: 0, 
          y: 30,
          scale: 0.95
        },
        visible: { 
          opacity: 1, 
          y: 0,
          scale: 1,
          transition: {
            duration: 0.8,
            ease: [0.16, 1, 0.3, 1],
          }
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export const ScaleTransition = ({ 
  children, 
  className = '', 
  delay = 0 
}: PageTransitionProps & { delay?: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, rotateX: 15 }}
      whileInView={{ opacity: 1, scale: 1, rotateX: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{
        duration: 1.0,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={className}
      style={{ perspective: 1000 }}
    >
      {children}
    </motion.div>
  );
};

export default PageTransition;