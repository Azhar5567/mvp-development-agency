import { motion } from 'framer-motion';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  animated?: boolean;
}

const Logo = ({ className = '', size = 'md', animated = true }: LogoProps) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16'
  };

  const LogoSvg = () => (
    <svg 
      viewBox="0 0 100 100" 
      className={`${sizeClasses[size]} ${className}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Outer ring - represents growth and completeness */}
      <circle
        cx="50"
        cy="50"
        r="45"
        stroke="url(#gradient1)"
        strokeWidth="3"
        fill="none"
        opacity="0.8"
      />
      
      {/* Inner geometric shape - modern and tech-focused */}
      <motion.path
        d="M25 40 L50 20 L75 40 L75 60 L50 80 L25 60 Z"
        fill="url(#gradient2)"
        stroke="url(#gradient1)"
        strokeWidth="2"
        strokeLinejoin="round"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      />
      
      {/* Central spark/catalyst symbol */}
      <motion.g
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ duration: 0.8, delay: 0.4, type: "spring" }}
      >
        <path
          d="M45 45 L55 35 L52 50 L60 50 L50 65 L53 50 L45 50 Z"
          fill="url(#gradient3)"
        />
      </motion.g>
      
      {/* Orbital elements - representing innovation and movement */}
      {animated && (
        <>
          <motion.circle
            cx="35"
            cy="30"
            r="2"
            fill="#B08D57"
            animate={{
              x: [0, 10, 0, -10, 0],
              y: [0, -5, 0, 5, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.circle
            cx="65"
            cy="70"
            r="1.5"
            fill="#A67C47"
            animate={{
              x: [0, -8, 0, 8, 0],
              y: [0, 3, 0, -3, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1
            }}
          />
        </>
      )}
      
      {/* Gradient definitions */}
      <defs>
        <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#1e293b" />
          <stop offset="100%" stopColor="#0f172a" />
        </linearGradient>
        
        <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#1e293b" />
          <stop offset="50%" stopColor="#334155" />
          <stop offset="100%" stopColor="#0f172a" />
        </linearGradient>
        
        <linearGradient id="gradient3" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#B08D57" />
          <stop offset="100%" stopColor="#A67C47" />
        </linearGradient>
      </defs>
    </svg>
  );

  if (!animated) {
    return <LogoSvg />;
  }

  return (
    <motion.div
      whileHover={{ 
        scale: 1.05,
        rotate: 5,
        transition: { duration: 0.3 }
      }}
      whileTap={{ scale: 0.95 }}
      className="cursor-pointer"
    >
      <LogoSvg />
    </motion.div>
  );
};

export default Logo;