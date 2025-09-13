import { motion, useSpring, useMotionValue, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { MessageCircle, Zap, Star, ArrowUp } from 'lucide-react';

// Floating Action Button with physics
export const FloatingActionButton = ({ 
  icon: Icon, 
  label, 
  onClick,
  className = '',
  delay = 0 
}: {
  icon: React.ComponentType<any>;
  label: string;
  onClick?: () => void;
  className?: string;
  delay?: number;
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const x = useSpring(mouseX, { stiffness: 300, damping: 30 });
  const y = useSpring(mouseY, { stiffness: 300, damping: 30 });

  return (
    <motion.div
      className={`fixed z-40 ${className}`}
      initial={{ scale: 0, rotate: -180 }}
      animate={{ 
        scale: 1, 
        rotate: 0,
        y: [0, -10, 0]
      }}
      transition={{ 
        type: "spring", 
        stiffness: 260, 
        damping: 20,
        delay,
        y: {
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
          delay: delay + 1
        }
      }}
      style={{ x, y }}
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        mouseX.set((e.clientX - centerX) * 0.1);
        mouseY.set((e.clientY - centerY) * 0.1);
      }}
      onMouseLeave={() => {
        mouseX.set(0);
        mouseY.set(0);
        setIsHovered(false);
      }}
      onMouseEnter={() => setIsHovered(true)}
    >
      <motion.button
        onClick={onClick}
        className="relative group"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        data-cursor="pointer"
      >
        {/* Main button */}
        <motion.div
          className="w-14 h-14 bg-gradient-to-r from-accent-500 to-accent-600 rounded-2xl shadow-lg flex items-center justify-center overflow-hidden"
          animate={{
            boxShadow: isHovered 
              ? "0 20px 40px -12px rgba(14, 165, 233, 0.4)" 
              : "0 8px 25px -8px rgba(14, 165, 233, 0.3)"
          }}
        >
          {/* Animated background */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-accent-400 to-purple-500 opacity-0 group-hover:opacity-100"
            animate={{
              scale: isHovered ? [1, 1.2, 1] : 1,
              rotate: isHovered ? [0, 180, 360] : 0
            }}
            transition={{ duration: 0.6 }}
          />
          
          {/* Icon */}
          <motion.div
            animate={{
              rotate: isHovered ? 360 : 0,
              scale: isHovered ? 1.1 : 1
            }}
            transition={{ duration: 0.3 }}
            className="relative z-10"
          >
            <Icon className="w-6 h-6 text-white" />
          </motion.div>
        </motion.div>
        
        {/* Label */}
        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8, x: -20 }}
              animate={{ opacity: 1, scale: 1, x: -10 }}
              exit={{ opacity: 0, scale: 0.8, x: -20 }}
              transition={{ duration: 0.2 }}
              className="absolute right-full top-1/2 -translate-y-1/2 mr-3"
            >
              <div className="bg-neutral-900 text-white px-3 py-2 rounded-xl text-sm font-medium whitespace-nowrap shadow-lg border border-neutral-700">
                {label}
                <div className="absolute left-full top-1/2 -translate-y-1/2 w-0 h-0 border-l-4 border-l-neutral-900 border-t-4 border-t-transparent border-b-4 border-b-transparent" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </motion.div>
  );
};

// Floating particles system
export const FloatingParticles = ({ count = 15 }: { count?: number }) => {
  const particles = Array.from({ length: count }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: 2 + Math.random() * 4,
    duration: 10 + Math.random() * 20,
    delay: Math.random() * 5,
  }));

  return (
    <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden hidden sm:block">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full bg-gradient-to-r from-accent-400/20 to-purple-400/20 blur-sm"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: particle.size,
            height: particle.size,
          }}
          animate={{
            y: [0, -100, 0],
            x: [0, Math.random() > 0.5 ? 50 : -50, 0],
            opacity: [0, 0.6, 0],
            scale: [0, 1, 0],
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};

// Scroll to top button with physics
export const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.pageYOffset > 300);
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    setIsClicked(true);
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
    setTimeout(() => setIsClicked(false), 1000);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0, rotate: -90 }}
          animate={{ 
            opacity: 1, 
            scale: 1, 
            rotate: 0,
            y: isClicked ? -20 : [0, -5, 0]
          }}
          exit={{ opacity: 0, scale: 0, rotate: 90 }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 30,
            y: {
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }
          }}
          className="fixed bottom-8 left-8 z-40"
        >
          <motion.button
            onClick={scrollToTop}
            className="w-12 h-12 bg-gradient-to-r from-neutral-800 to-neutral-900 hover:from-accent-500 hover:to-accent-600 rounded-2xl shadow-lg flex items-center justify-center group transition-all duration-300"
            whileHover={{ scale: 1.1, rotate: -360 }}
            whileTap={{ scale: 0.9 }}
            data-cursor="pointer"
          >
            <ArrowUp className="w-5 h-5 text-white group-hover:text-white transition-colors" />
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// Interactive orbs that follow mouse
export const InteractiveOrbs = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  useEffect(() => {
    let rafId: number;
    const handleMouseMove = (e: MouseEvent) => {
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        setMousePosition({ x: e.clientX, y: e.clientY });
      });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const orbs = Array.from({ length: 3 }, (_, i) => ({
    id: i,
    delay: i * 0.1,
    scale: 0.8 + i * 0.1,
    opacity: 0.4 - i * 0.1,
  }));

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden hidden lg:block">
      {orbs.map((orb) => (
        <motion.div
          key={orb.id}
          className="absolute w-64 h-64 rounded-full blur-3xl"
          style={{
            background: `radial-gradient(circle, rgba(14, 165, 233, ${orb.opacity}) 0%, transparent 70%)`,
          }}
          animate={{
            x: mousePosition.x - 128,
            y: mousePosition.y - 128,
            scale: [orb.scale, orb.scale * 1.2, orb.scale],
          }}
          transition={{
            x: { type: "spring", stiffness: 100 - orb.id * 20, damping: 30 },
            y: { type: "spring", stiffness: 100 - orb.id * 20, damping: 30 },
            scale: { 
              duration: 4 + orb.id, 
              repeat: Infinity, 
              ease: "easeInOut",
              delay: orb.delay
            }
          }}
        />
      ))}
    </div>
  );
};

// Notification toast with physics
export const FloatingNotification = ({ 
  message, 
  type = 'info',
  isVisible,
  onClose
}: {
  message: string;
  type?: 'success' | 'error' | 'info' | 'warning';
  isVisible: boolean;
  onClose?: () => void;
}) => {
  const colors = {
    success: 'from-green-500 to-emerald-600',
    error: 'from-red-500 to-rose-600',
    info: 'from-accent-500 to-accent-600',
    warning: 'from-orange-500 to-yellow-600',
  };

  const icons = {
    success: <Star className="w-5 h-5" />,
    error: <Zap className="w-5 h-5" />,
    info: <MessageCircle className="w-5 h-5" />,
    warning: <Zap className="w-5 h-5" />,
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ 
            opacity: 0, 
            y: -100, 
            scale: 0.8,
            rotateX: -90 
          }}
          animate={{ 
            opacity: 1, 
            y: 0, 
            scale: 1,
            rotateX: 0 
          }}
          exit={{ 
            opacity: 0, 
            y: -100, 
            scale: 0.8,
            rotateX: 90 
          }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 30,
          }}
          className="fixed top-8 right-8 z-45"
          style={{ perspective: 1000 }}
        >
          <motion.div
            className={`bg-gradient-to-r ${colors[type]} text-white px-6 py-4 rounded-2xl shadow-lg border border-white/20 max-w-sm`}
            whileHover={{ scale: 1.02 }}
            animate={{
              boxShadow: [
                "0 10px 30px -5px rgba(0, 0, 0, 0.3)",
                "0 20px 40px -5px rgba(0, 0, 0, 0.4)",
                "0 10px 30px -5px rgba(0, 0, 0, 0.3)"
              ]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <div className="flex items-center">
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              >
                {icons[type]}
              </motion.div>
              <span className="ml-3 font-medium">{message}</span>
              {onClose && (
                <motion.button
                  onClick={onClose}
                  className="ml-4 text-white/70 hover:text-white"
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.8 }}
                >
                  ×
                </motion.button>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};