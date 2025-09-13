import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

// Enhanced heading component with display font
export const DisplayHeading = ({ 
  children, 
  level = 1,
  className = '',
  gradient = false,
  gradientType = 'primary',
  ...props 
}: {
  children: ReactNode;
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  className?: string;
  gradient?: boolean;
  gradientType?: 'primary' | 'secondary' | 'luxury';
  [key: string]: any;
}) => {
  const Tag = `h${level}` as keyof React.JSX.IntrinsicElements;
  
  const baseClasses = 'font-display font-bold tracking-tight text-balance';
  const gradientClasses = {
    primary: 'text-gradient-primary',
    secondary: 'text-gradient-secondary', 
    luxury: 'text-gradient-luxury'
  };

  const sizeClasses = {
    1: 'text-6xl sm:text-7xl lg:text-8xl xl:text-9xl leading-[0.85]',
    2: 'text-5xl sm:text-6xl lg:text-7xl leading-[0.9]',
    3: 'text-4xl sm:text-5xl lg:text-6xl leading-[0.95]',
    4: 'text-3xl sm:text-4xl lg:text-5xl leading-tight',
    5: 'text-2xl sm:text-3xl lg:text-4xl leading-tight',
    6: 'text-xl sm:text-2xl lg:text-3xl leading-tight'
  };

  const classes = [
    baseClasses,
    sizeClasses[level],
    gradient ? gradientClasses[gradientType] : '',
    className
  ].filter(Boolean).join(' ');

  return (
    <Tag className={classes} {...props}>
      {children}
    </Tag>
  );
};

// Enhanced body text component
export const BodyText = ({
  children,
  size = 'base',
  weight = 'normal',
  spacing = 'normal',
  className = '',
  ...props
}: {
  children: ReactNode;
  size?: 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl';
  weight?: 'light' | 'normal' | 'medium' | 'semibold' | 'bold';
  spacing?: 'tight' | 'normal' | 'relaxed' | 'loose';
  className?: string;
  [key: string]: any;
}) => {
  const sizeClasses = {
    xs: 'text-xs',
    sm: 'text-sm',
    base: 'text-base',
    lg: 'text-lg',
    xl: 'text-xl',
    '2xl': 'text-2xl'
  };

  const weightClasses = {
    light: 'font-light',
    normal: 'font-normal', 
    medium: 'font-medium',
    semibold: 'font-semibold',
    bold: 'font-bold'
  };

  const spacingClasses = {
    tight: 'text-spacing-tight',
    normal: 'text-spacing-normal',
    relaxed: 'text-spacing-relaxed',
    loose: 'text-spacing-loose'
  };

  const classes = [
    'font-body',
    sizeClasses[size],
    weightClasses[weight],
    spacingClasses[spacing],
    className
  ].filter(Boolean).join(' ');

  return (
    <p className={classes} {...props}>
      {children}
    </p>
  );
};

// Animated counter with typography
export const PremiumCounter = ({
  target,
  suffix = '',
  prefix = '',
  className = ''
}: {
  target: number;
  suffix?: string;
  prefix?: string;
  className?: string;
}) => {
  return (
    <motion.div
      className={`font-display font-bold text-gradient-primary ${className}`}
      initial={{ opacity: 0, scale: 0.5 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ 
        duration: 0.8,
        type: "spring",
        stiffness: 100,
        damping: 15
      }}
    >
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        {prefix}
      </motion.span>
      
      <motion.span
        animate={{ 
          scale: [1, 1.1, 1],
          textShadow: [
            "0 0 10px rgba(14, 165, 233, 0)",
            "0 0 20px rgba(14, 165, 233, 0.5)", 
            "0 0 10px rgba(14, 165, 233, 0)"
          ]
        }}
        transition={{ 
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        {target}
      </motion.span>
      
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        {suffix}
      </motion.span>
    </motion.div>
  );
};

// Code snippet with enhanced monospace font
export const CodeBlock = ({
  children,
  language = 'javascript',
  className = '',
  showLineNumbers = false
}: {
  children: string;
  language?: string;
  className?: string;
  showLineNumbers?: boolean;
}) => {
  const lines = children.split('\n');

  return (
    <motion.div
      className={`relative bg-neutral-900 rounded-2xl p-6 overflow-hidden ${className}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-red-400 rounded-full"></div>
          <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
          <div className="w-3 h-3 bg-green-400 rounded-full"></div>
        </div>
        <div className="text-neutral-400 text-xs font-mono-premium uppercase tracking-wider">
          {language}
        </div>
      </div>

      {/* Code content */}
      <div className="font-mono-premium text-sm text-neutral-200">
        {lines.map((line, index) => (
          <motion.div
            key={index}
            className="flex"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            {showLineNumbers && (
              <span className="text-neutral-500 mr-4 select-none w-8 text-right">
                {index + 1}
              </span>
            )}
            <span className="flex-1">{line || ' '}</span>
          </motion.div>
        ))}
      </div>

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-accent-500/5 to-purple-500/5 pointer-events-none" />
    </motion.div>
  );
};

// Marquee text effect
export const MarqueeText = ({
  children,
  speed = 50,
  className = '',
  reverse = false
}: {
  children: ReactNode;
  speed?: number;
  className?: string;
  reverse?: boolean;
}) => {
  return (
    <div className={`overflow-hidden whitespace-nowrap ${className}`}>
      <motion.div
        animate={{
          x: reverse ? ['0%', '-100%'] : ['-100%', '0%']
        }}
        transition={{
          duration: speed,
          repeat: Infinity,
          ease: "linear"
        }}
        className="inline-block font-display font-bold"
      >
        {children}
      </motion.div>
    </div>
  );
};

// Glitch text effect
export const GlitchText = ({
  children,
  className = '',
  intensity = 'medium'
}: {
  children: ReactNode;
  className?: string;
  intensity?: 'low' | 'medium' | 'high';
}) => {
  const glitchConfig = {
    low: { distance: 2, duration: 3 },
    medium: { distance: 4, duration: 2 },
    high: { distance: 8, duration: 1 }
  };

  const config = glitchConfig[intensity];

  return (
    <motion.div
      className={`relative font-display font-bold ${className}`}
      animate={{
        textShadow: [
          `${config.distance}px 0 0 #ff0000, -${config.distance}px 0 0 #00ffff`,
          `${config.distance * 1.5}px 0 0 #ff0000, -${config.distance * 1.5}px 0 0 #00ffff`,
          `${config.distance}px 0 0 #ff0000, -${config.distance}px 0 0 #00ffff`,
          '0 0 0 transparent'
        ]
      }}
      transition={{
        duration: config.duration,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    >
      {children}
    </motion.div>
  );
};