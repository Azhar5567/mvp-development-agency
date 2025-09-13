import { motion, useScroll, useSpring } from 'framer-motion';

const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <>
      {/* Main scroll progress bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-accent-700 via-electric-500 to-premium-600 transform-gpu z-[9998] origin-left"
        style={{ scaleX }}
      />
      
      {/* Floating scroll indicator */}
      <motion.div
        className="fixed bottom-8 right-8 z-50 hidden lg:block"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 2, duration: 0.5 }}
      >
        <div className="relative w-16 h-16">
          {/* Background circle */}
          <div className="absolute inset-0 rounded-full border-2 border-neutral-200 bg-white/80 backdrop-blur-xl shadow-lg" />
          
          {/* Progress circle */}
          <svg className="absolute inset-0 w-16 h-16 transform -rotate-90" viewBox="0 0 64 64">
            <circle
              cx="32"
              cy="32"
              r="28"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="text-neutral-100"
            />
            <motion.circle
              cx="32"
              cy="32"
              r="28"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              className="text-electric-500"
              style={{
                pathLength: scrollYProgress
              }}
              initial={{ pathLength: 0 }}
            />
          </svg>
          
          {/* Center dot */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-2 h-2 bg-electric-500 rounded-full" />
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default ScrollProgress;