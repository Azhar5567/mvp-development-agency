import { motion } from 'framer-motion';

// Premium skeleton loader
export const SkeletonLoader = ({ className = '', rows = 3 }: { className?: string; rows?: number }) => (
  <div className={`animate-pulse space-y-3 ${className}`}>
    {Array.from({ length: rows }).map((_, i) => (
      <motion.div
        key={i}
        className="h-4 bg-gradient-to-r from-neutral-200 via-neutral-100 to-neutral-200 rounded-lg"
        style={{
          width: `${100 - Math.random() * 30}%`,
        }}
        animate={{
          backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "linear",
        }}
        initial={{
          backgroundSize: '200% 100%',
        }}
      />
    ))}
  </div>
);

// Spinning loader with premium effects
export const SpinnerLoader = ({ size = 'md', color = 'accent' }: { size?: 'sm' | 'md' | 'lg'; color?: string }) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  };

  return (
    <div className="flex items-center justify-center">
      <motion.div
        className={`${sizeClasses[size]} border-2 border-neutral-200 border-t-${color}-500 rounded-full`}
        animate={{ rotate: 360 }}
        transition={{
          duration: 1,
          repeat: Infinity,
          ease: "linear",
        }}
      />
    </div>
  );
};

// Dot pulse loader
export const DotLoader = ({ color = 'accent-500' }: { color?: string }) => (
  <div className="flex space-x-2">
    {[0, 1, 2].map((i) => (
      <motion.div
        key={i}
        className={`w-2 h-2 bg-${color} rounded-full`}
        animate={{
          scale: [1, 1.5, 1],
          opacity: [0.5, 1, 0.5],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          delay: i * 0.2,
          ease: "easeInOut",
        }}
      />
    ))}
  </div>
);

// Premium progress bar
export const ProgressBar = ({ 
  progress, 
  className = '', 
  showPercentage = true 
}: { 
  progress: number; 
  className?: string; 
  showPercentage?: boolean; 
}) => (
  <div className={`w-full ${className}`}>
    <div className="flex justify-between items-center mb-2">
      {showPercentage && (
        <motion.span
          className="text-sm font-semibold text-neutral-600"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {Math.round(progress)}%
        </motion.span>
      )}
    </div>
    <div className="w-full bg-neutral-200 rounded-full h-2 overflow-hidden">
      <motion.div
        className="h-full bg-gradient-to-r from-accent-500 to-accent-600 rounded-full"
        initial={{ width: 0 }}
        animate={{ width: `${progress}%` }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        {/* Shimmer effect */}
        <motion.div
          className="h-full bg-gradient-to-r from-transparent via-white/30 to-transparent"
          animate={{
            x: [-100, 200],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </motion.div>
    </div>
  </div>
);

// Pulse effect for loading states
export const PulseEffect = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
  <motion.div
    className={className}
    animate={{
      scale: [1, 1.05, 1],
      opacity: [0.8, 1, 0.8],
    }}
    transition={{
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut",
    }}
  >
    {children}
  </motion.div>
);

// Card loading state
export const CardSkeleton = ({ className = '' }: { className?: string }) => (
  <div className={`bg-white rounded-3xl p-8 border border-neutral-150 ${className}`}>
    <div className="animate-pulse space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <div className="w-12 h-12 bg-gradient-to-r from-neutral-200 via-neutral-100 to-neutral-200 rounded-2xl" />
        <div className="flex-1 space-y-2">
          <div className="h-4 bg-gradient-to-r from-neutral-200 via-neutral-100 to-neutral-200 rounded w-3/4" />
          <div className="h-3 bg-gradient-to-r from-neutral-200 via-neutral-100 to-neutral-200 rounded w-1/2" />
        </div>
      </div>
      
      {/* Content */}
      <div className="space-y-3">
        <div className="h-3 bg-gradient-to-r from-neutral-200 via-neutral-100 to-neutral-200 rounded" />
        <div className="h-3 bg-gradient-to-r from-neutral-200 via-neutral-100 to-neutral-200 rounded w-5/6" />
        <div className="h-3 bg-gradient-to-r from-neutral-200 via-neutral-100 to-neutral-200 rounded w-4/5" />
      </div>
      
      {/* Footer */}
      <div className="flex justify-between items-center">
        <div className="h-8 bg-gradient-to-r from-neutral-200 via-neutral-100 to-neutral-200 rounded-full w-20" />
        <div className="h-6 bg-gradient-to-r from-neutral-200 via-neutral-100 to-neutral-200 rounded w-16" />
      </div>
    </div>
  </div>
);

// Button loading state
export const ButtonLoader = ({ 
  loading = false, 
  children, 
  className = ''
}: { 
  loading?: boolean; 
  children: React.ReactNode; 
  className?: string;
}) => (
  <div className={`relative overflow-hidden ${className}`}>
    <div className="flex items-center justify-center">
      {loading && (
        <div className="mr-2">
          <SpinnerLoader size="sm" />
        </div>
      )}
      {children}
    </div>
  </div>
);