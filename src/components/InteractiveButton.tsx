import { motion } from 'framer-motion';
import { useState } from 'react';
import type { ReactNode } from 'react';
import type { HTMLMotionProps } from 'framer-motion';
import { useSounds, useHaptics } from '../hooks/useSounds';

interface InteractiveButtonProps extends Omit<HTMLMotionProps<'button'>, 'children'> {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  soundEnabled?: boolean;
  hapticEnabled?: boolean;
  className?: string;
}

export const InteractiveButton = ({
  children,
  variant = 'primary',
  size = 'md',
  soundEnabled = true,
  hapticEnabled = true,
  className = '',
  onMouseEnter,
  onMouseLeave,
  onClick,
  onFocus,
  onBlur,
  ...props
}: InteractiveButtonProps) => {
  const [isPressed, setIsPressed] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const { playSound } = useSounds(soundEnabled);
  const { light, medium } = useHaptics(hapticEnabled);

  const variants = {
    primary: 'bg-gradient-to-r from-electric-500 to-premium-600 hover:from-electric-600 hover:to-premium-700 text-white shadow-lg hover:shadow-xl',
    secondary: 'bg-white text-neutral-700 border-2 border-neutral-200 hover:border-electric-500 hover:text-electric-600 shadow-sm hover:shadow-md',
    ghost: 'bg-transparent text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100'
  };

  const sizes = {
    sm: 'px-4 py-2 text-sm rounded-lg',
    md: 'px-6 py-2.5 text-base rounded-xl',
    lg: 'px-8 py-3 text-lg rounded-xl'
  };

  const baseClasses = 'font-medium transition-all duration-300 transform-gpu relative overflow-hidden';
  const variantClasses = variants[variant];
  const sizeClasses = sizes[size];
  
  const handleMouseEnter = (e: React.MouseEvent<HTMLButtonElement>) => {
    playSound('hover', 0.1);
    light();
    onMouseEnter?.(e);
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
    onMouseLeave?.(e);
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    playSound('click', 0.2);
    medium();
    setIsPressed(true);
    setTimeout(() => setIsPressed(false), 150);
    onClick?.(e);
  };

  const handleFocus = (e: React.FocusEvent<HTMLButtonElement>) => {
    setIsFocused(true);
    playSound('hover', 0.05);
    light();
    onFocus?.(e);
  };

  const handleBlur = (e: React.FocusEvent<HTMLButtonElement>) => {
    setIsFocused(false);
    onBlur?.(e);
  };

  return (
    <motion.button
      className={`${baseClasses} ${variantClasses} ${sizeClasses} ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      onFocus={handleFocus}
      onBlur={handleBlur}
      whileHover={{ 
        scale: 1.02,
        y: -1,
        transition: { duration: 0.2, ease: "easeOut" }
      }}
      whileTap={{ 
        scale: 0.98,
        y: 1,
        transition: { duration: 0.1 }
      }}
      animate={{
        boxShadow: isFocused 
          ? "0 0 0 3px rgba(14, 165, 233, 0.3)"
          : "0 0 0 0px transparent"
      }}
      data-cursor="pointer"
      {...props}
    >
      {/* Ripple effect */}
      <motion.div
        className="absolute inset-0 rounded-inherit"
        initial={{ scale: 0, opacity: 0.5 }}
        animate={{
          scale: isPressed ? 2 : 0,
          opacity: isPressed ? 0 : 0.5
        }}
        transition={{ duration: 0.3 }}
        style={{
          background: variant === 'primary' 
            ? 'rgba(255, 255, 255, 0.3)' 
            : 'rgba(14, 165, 233, 0.2)'
        }}
      />
      
      {/* Shimmer effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full"
        animate={{ translateX: [-100, 300] }}
        transition={{
          duration: 2,
          repeat: Infinity,
          repeatDelay: 3,
          ease: "linear"
        }}
      />
      
      {/* Content */}
      <span className="relative z-10 flex items-center justify-center">
        {children}
      </span>
    </motion.button>
  );
};

// Enhanced floating action button with sound
export const SoundFloatingButton = ({
  children,
  className = '',
  onClick,
  ...props
}: {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  [key: string]: any;
}) => {
  const { playSound, playSequence } = useSounds();
  const { medium, pulse } = useHaptics();

  const handleClick = () => {
    playSequence([800, 1000, 1200], 0.05);
    pulse();
    onClick?.();
  };

  return (
    <motion.button
      className={`w-14 h-14 bg-gradient-to-r from-accent-500 to-accent-600 rounded-2xl shadow-lg flex items-center justify-center text-white ${className}`}
      onClick={handleClick}
      whileHover={{ 
        scale: 1.1,
        rotate: 5,
        boxShadow: "0 20px 40px -12px rgba(14, 165, 233, 0.4)"
      }}
      whileTap={{ scale: 0.9, rotate: -5 }}
      animate={{
        y: [0, -5, 0],
      }}
      transition={{
        y: {
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }
      }}
      onMouseEnter={() => {
        playSound('hover', 0.1);
        medium();
      }}
      data-cursor="pointer"
      {...props}
    >
      <motion.div
        animate={{ rotate: [0, 360] }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "linear"
        }}
      >
        {children}
      </motion.div>
    </motion.button>
  );
};

// Sound-enabled card component
export const SoundCard = ({
  children,
  className = '',
  onHover,
  onClick,
  ...props
}: {
  children: ReactNode;
  className?: string;
  onHover?: () => void;
  onClick?: () => void;
  [key: string]: any;
}) => {
  const { playSound, playAmbient } = useSounds();
  const { light, click } = useHaptics();

  return (
    <motion.div
      className={`bg-white rounded-3xl p-6 border border-neutral-200 cursor-pointer ${className}`}
      onMouseEnter={() => {
        playSound('hover', 0.05);
        playAmbient(60, 0.5);
        light();
        onHover?.();
      }}
      onClick={() => {
        playSound('click', 0.15);
        click();
        onClick?.();
      }}
      whileHover={{
        y: -4,
        scale: 1.02,
        boxShadow: "0 20px 40px -12px rgba(0, 0, 0, 0.1)"
      }}
      whileTap={{ scale: 0.98 }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 30
      }}
      data-cursor="pointer"
      {...props}
    >
      {children}
    </motion.div>
  );
};