import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, VolumeX, Smartphone, SmartphoneNfc } from 'lucide-react';
import { useState, createContext, useContext } from 'react';
import type { ReactNode } from 'react';

interface SoundContextType {
  soundEnabled: boolean;
  hapticEnabled: boolean;
  setSoundEnabled: (enabled: boolean) => void;
  setHapticEnabled: (enabled: boolean) => void;
}

const SoundContext = createContext<SoundContextType | undefined>(undefined);

export const useSoundContext = () => {
  const context = useContext(SoundContext);
  if (!context) {
    throw new Error('useSoundContext must be used within a SoundProvider');
  }
  return context;
};

export const SoundProvider = ({ children }: { children: ReactNode }) => {
  const [soundEnabled, setSoundEnabled] = useState(false); // Default off for better UX
  const [hapticEnabled, setHapticEnabled] = useState(false);

  return (
    <SoundContext.Provider value={{
      soundEnabled,
      hapticEnabled,
      setSoundEnabled,
      setHapticEnabled
    }}>
      {children}
    </SoundContext.Provider>
  );
};

export const SoundControls = ({ className = '' }: { className?: string }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const { soundEnabled, hapticEnabled, setSoundEnabled, setHapticEnabled } = useSoundContext();

  return (
    <motion.div 
      className={`fixed bottom-4 left-4 z-50 ${className}`}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 1, duration: 0.5 }}
    >
      <motion.div
        className="relative"
        onMouseEnter={() => setIsExpanded(true)}
        onMouseLeave={() => setIsExpanded(false)}
      >
        {/* Main control button */}
        <motion.button
          className="w-12 h-12 bg-neutral-900 hover:bg-neutral-800 rounded-2xl shadow-lg flex items-center justify-center text-white transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {soundEnabled ? (
            <Volume2 className="w-5 h-5" />
          ) : (
            <VolumeX className="w-5 h-5" />
          )}
        </motion.button>

        {/* Expanded controls */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 20 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="absolute bottom-full left-0 mb-2 bg-white rounded-2xl shadow-xl border border-neutral-200 p-4 min-w-[200px]"
            >
              <div className="space-y-3">
                <div className="text-sm font-semibold text-neutral-900 mb-3">
                  Audio & Haptics
                </div>
                
                {/* Sound toggle */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    {soundEnabled ? (
                      <Volume2 className="w-4 h-4 text-accent-500" />
                    ) : (
                      <VolumeX className="w-4 h-4 text-neutral-400" />
                    )}
                    <span className="text-sm text-neutral-700">Sound Effects</span>
                  </div>
                  
                  <motion.button
                    onClick={() => setSoundEnabled(!soundEnabled)}
                    className={`w-10 h-6 rounded-full relative transition-colors ${
                      soundEnabled ? 'bg-accent-500' : 'bg-neutral-300'
                    }`}
                    whileTap={{ scale: 0.95 }}
                  >
                    <motion.div
                      className="w-4 h-4 bg-white rounded-full shadow-sm absolute top-1"
                      animate={{
                        x: soundEnabled ? 18 : 2
                      }}
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  </motion.button>
                </div>
                
                {/* Haptic toggle */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    {hapticEnabled ? (
                      <SmartphoneNfc className="w-4 h-4 text-accent-500" />
                    ) : (
                      <Smartphone className="w-4 h-4 text-neutral-400" />
                    )}
                    <span className="text-sm text-neutral-700">Haptic Feedback</span>
                  </div>
                  
                  <motion.button
                    onClick={() => setHapticEnabled(!hapticEnabled)}
                    className={`w-10 h-6 rounded-full relative transition-colors ${
                      hapticEnabled ? 'bg-accent-500' : 'bg-neutral-300'
                    }`}
                    whileTap={{ scale: 0.95 }}
                  >
                    <motion.div
                      className="w-4 h-4 bg-white rounded-full shadow-sm absolute top-1"
                      animate={{
                        x: hapticEnabled ? 18 : 2
                      }}
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  </motion.button>
                </div>
                
                {/* Status indicator */}
                <div className="pt-2 border-t border-neutral-100">
                  <div className="flex items-center space-x-2 text-xs text-neutral-500">
                    <div className={`w-2 h-2 rounded-full ${
                      soundEnabled || hapticEnabled ? 'bg-green-400' : 'bg-neutral-300'
                    }`} />
                    <span>
                      {soundEnabled || hapticEnabled ? 'Enhanced experience active' : 'Standard experience'}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
};