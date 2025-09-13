import { motion, useAnimation, useInView } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

// Magnetic button effect
export const MagneticButton = ({ 
  children, 
  className = '', 
  intensity = 0.3,
  ...props 
}: { 
  children: React.ReactNode; 
  className?: string; 
  intensity?: number;
  [key: string]: any;
}) => {
  const ref = useRef<HTMLButtonElement>(null);
  const controls = useAnimation();

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!ref.current) return;
    
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    
    controls.start({
      x: x * intensity,
      y: y * intensity,
      transition: { type: "spring", stiffness: 150, damping: 15, mass: 0.1 }
    });
  };

  const handleMouseLeave = () => {
    controls.start({
      x: 0,
      y: 0,
      transition: { type: "spring", stiffness: 300, damping: 30 }
    });
  };

  return (
    <motion.button
      ref={ref}
      animate={controls}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileTap={{ scale: 0.95 }}
      className={className}
      {...props}
    >
      {children}
    </motion.button>
  );
};

// Floating animation
export const FloatingElement = ({ 
  children, 
  className = '',
  duration = 4,
  delay = 0
}: { 
  children: React.ReactNode; 
  className?: string;
  duration?: number;
  delay?: number;
}) => (
  <motion.div
    animate={{
      y: [-5, 5, -5],
      x: [-2, 2, -2],
      rotate: [-1, 1, -1]
    }}
    transition={{
      duration,
      delay,
      repeat: Infinity,
      ease: "easeInOut"
    }}
    className={className}
  >
    {children}
  </motion.div>
);

// Text reveal animation
export const TextReveal = ({ 
  children, 
  className = '', 
  delay = 0 
}: { 
  children: string; 
  className?: string;
  delay?: number;
}) => {
  const words = children.split(' ');
  
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className={className}
    >
      {words.map((word, index) => (
        <motion.span
          key={index}
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { 
              opacity: 1, 
              y: 0,
              transition: { 
                duration: 0.6, 
                delay: delay + index * 0.1,
                ease: [0.16, 1, 0.3, 1]
              }
            }
          }}
          className="inline-block mr-1"
        >
          {word}
        </motion.span>
      ))}
    </motion.div>
  );
};

// Counter animation
export const AnimatedCounter = ({ 
  target, 
  duration = 2,
  className = '',
  suffix = ''
}: { 
  target: number; 
  duration?: number;
  className?: string;
  suffix?: string;
}) => {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      let startTime: number;
      const animate = (currentTime: number) => {
        if (!startTime) startTime = currentTime;
        const progress = Math.min((currentTime - startTime) / (duration * 1000), 1);
        
        const easeOut = 1 - Math.pow(1 - progress, 3);
        const currentValue = Math.floor(easeOut * target);
        
        if (ref.current) {
          ref.current.textContent = `${currentValue}${suffix}`;
        }
        
        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };
      
      requestAnimationFrame(animate);
    }
  }, [isInView, target, duration, suffix]);

  return <span ref={ref} className={className}>0{suffix}</span>;
};

// Morphing icon animation
export const MorphingIcon = ({ 
  icons, 
  className = '',
  interval = 2000 
}: { 
  icons: React.ComponentType<any>[];
  className?: string;
  interval?: number;
}) => {
  const [currentIcon, setCurrentIcon] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIcon((prev) => (prev + 1) % icons.length);
    }, interval);

    return () => clearInterval(timer);
  }, [icons.length, interval]);

  const CurrentIcon = icons[currentIcon];

  return (
    <motion.div
      key={currentIcon}
      initial={{ scale: 0, rotate: -180 }}
      animate={{ scale: 1, rotate: 0 }}
      transition={{ 
        type: "spring", 
        stiffness: 300, 
        damping: 25 
      }}
      className={className}
    >
      <CurrentIcon />
    </motion.div>
  );
};

// Staggered list animation
export const StaggeredList = ({ 
  children, 
  className = '',
  staggerDelay = 0.1
}: { 
  children: React.ReactNode; 
  className?: string;
  staggerDelay?: number;
}) => (
  <motion.div
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true }}
    variants={{
      hidden: {},
      visible: {
        transition: {
          staggerChildren: staggerDelay
        }
      }
    }}
    className={className}
  >
    {children}
  </motion.div>
);

export const StaggeredListItem = ({ 
  children, 
  className = '' 
}: { 
  children: React.ReactNode; 
  className?: string 
}) => (
  <motion.div
    variants={{
      hidden: { opacity: 0, x: -20 },
      visible: { 
        opacity: 1, 
        x: 0,
        transition: { 
          duration: 0.5, 
          ease: [0.16, 1, 0.3, 1] 
        }
      }
    }}
    className={className}
  >
    {children}
  </motion.div>
);

// Breathing animation
export const BreathingEffect = ({ 
  children, 
  className = '',
  scale = 1.05,
  duration = 3
}: { 
  children: React.ReactNode; 
  className?: string;
  scale?: number;
  duration?: number;
}) => (
  <motion.div
    animate={{
      scale: [1, scale, 1],
    }}
    transition={{
      duration,
      repeat: Infinity,
      ease: "easeInOut"
    }}
    className={className}
  >
    {children}
  </motion.div>
);

// Shake animation for errors
export const ShakeAnimation = ({ 
  children, 
  trigger,
  className = '' 
}: { 
  children: React.ReactNode; 
  trigger: boolean;
  className?: string;
}) => {
  const controls = useAnimation();

  useEffect(() => {
    if (trigger) {
      controls.start({
        x: [-10, 10, -10, 10, 0],
        transition: { duration: 0.4 }
      });
    }
  }, [trigger, controls]);

  return (
    <motion.div animate={controls} className={className}>
      {children}
    </motion.div>
  );
};