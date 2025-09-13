import { useCallback, useRef } from 'react';

// Sound URLs - in a real app, these would be actual audio files
const SOUND_URLS = {
  click: 'data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR1/LNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR1/LNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR1/LNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR1/LNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR1/LNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR1/LNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR1/LNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR1/LNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR1/LNeSsFJHfH8N2QQAoUXrTp66hVFA==',
  hover: 'data:audio/wav;base64,UklGRl4AAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YToAAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR1/LNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR1/LNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR1/LNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR1/LNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR1/LNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR1/LNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR1/LNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR1/LNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR1/LNeSsFJHfH8N2QQAoUXrTp66hVFA==',
  success: 'data:audio/wav;base64,UklGRl4AAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YToAAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR1/LNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR1/LNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR1/LNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR1/LNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR1/LNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR1/LNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR1/LNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR1/LNeSsFJHfH8N2QQAoUXrTp66hVFA==',
  error: 'data:audio/wav;base64,UklGRl4AAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YToAAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR1/LNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR1/LNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR1/LNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR1/LNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR1/LNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR1/LNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR1/LNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR1/LNeSsFJHfH8N2QQAoUXrTp66hVFA=='
} as const;

type SoundType = keyof typeof SOUND_URLS;

// Create audio context with premium synthesis
const createTone = (frequency: number, duration: number, type: OscillatorType = 'sine'): AudioBuffer => {
  const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
  const sampleRate = audioContext.sampleRate;
  const numberOfSamples = sampleRate * duration;
  const buffer = audioContext.createBuffer(1, numberOfSamples, sampleRate);
  const data = buffer.getChannelData(0);
  
  for (let i = 0; i < numberOfSamples; i++) {
    const time = i / sampleRate;
    let sample = 0;
    
    switch (type) {
      case 'sine':
        sample = Math.sin(2 * Math.PI * frequency * time);
        break;
      case 'square':
        sample = Math.sign(Math.sin(2 * Math.PI * frequency * time));
        break;
      case 'triangle':
        sample = (2 / Math.PI) * Math.asin(Math.sin(2 * Math.PI * frequency * time));
        break;
      case 'sawtooth':
        sample = 2 * (frequency * time - Math.floor(frequency * time + 0.5));
        break;
    }
    
    // Apply envelope (fade in/out)
    const envelope = Math.sin((Math.PI * i) / numberOfSamples);
    data[i] = sample * envelope * 0.3; // Volume at 30%
  }
  
  return buffer;
};

export const useSounds = (enabled: boolean = true) => {
  const audioContextRef = useRef<AudioContext | null>(null);
  const soundsRef = useRef<Map<string, AudioBuffer>>(new Map());

  const initializeAudioContext = useCallback(() => {
    if (!audioContextRef.current && enabled && typeof window !== 'undefined') {
      try {
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      
      // Preload premium synthetic sounds
      const loadSynthSounds = async () => {
        const sounds = {
          click: createTone(800, 0.1, 'sine'),
          hover: createTone(1200, 0.05, 'sine'),
          success: createTone(600, 0.2, 'triangle'),
          error: createTone(300, 0.3, 'square'),
          notification: createTone(880, 0.15, 'sine'),
          scroll: createTone(440, 0.05, 'sine'),
          transition: createTone(660, 0.1, 'triangle'),
          loading: createTone(1000, 0.08, 'sine')
        };
        
        Object.entries(sounds).forEach(([name, buffer]) => {
          soundsRef.current.set(name, buffer);
        });
      };
      
      loadSynthSounds();
      } catch (error) {
        console.warn('Audio context initialization failed:', error);
        audioContextRef.current = null;
      }
    }
  }, [enabled]);

  const playSound = useCallback((soundType: SoundType | string, volume: number = 0.3) => {
    if (!enabled || !audioContextRef.current) return;
    
    initializeAudioContext();
    
    const buffer = soundsRef.current.get(soundType);
    if (!buffer) return;
    
    try {
      const source = audioContextRef.current.createBufferSource();
      const gainNode = audioContextRef.current.createGain();
      
      source.buffer = buffer;
      source.connect(gainNode);
      gainNode.connect(audioContextRef.current.destination);
      
      // Premium envelope shaping
      gainNode.gain.setValueAtTime(0, audioContextRef.current.currentTime);
      gainNode.gain.linearRampToValueAtTime(volume, audioContextRef.current.currentTime + 0.01);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContextRef.current.currentTime + buffer.duration);
      
      source.start(audioContextRef.current.currentTime);
      source.stop(audioContextRef.current.currentTime + buffer.duration);
    } catch (error) {
      console.warn('Failed to play sound:', error);
    }
  }, [enabled, initializeAudioContext]);

  // Premium multi-tone sequences
  const playSequence = useCallback((frequencies: number[], duration: number = 0.1) => {
    if (!enabled || !audioContextRef.current) return;
    
    frequencies.forEach((_, index) => {
      setTimeout(() => {
        playSound('click', 0.2);
      }, index * (duration * 1000));
    });
  }, [enabled, playSound]);

  // Ambient background tone
  const playAmbient = useCallback((frequency: number = 40, duration: number = 2) => {
    if (!enabled || !audioContextRef.current) return;
    
    const oscillator = audioContextRef.current.createOscillator();
    const gainNode = audioContextRef.current.createGain();
    
    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(frequency, audioContextRef.current.currentTime);
    
    gainNode.gain.setValueAtTime(0, audioContextRef.current.currentTime);
    gainNode.gain.linearRampToValueAtTime(0.05, audioContextRef.current.currentTime + 0.5);
    gainNode.gain.linearRampToValueAtTime(0, audioContextRef.current.currentTime + duration);
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContextRef.current.destination);
    
    oscillator.start(audioContextRef.current.currentTime);
    oscillator.stop(audioContextRef.current.currentTime + duration);
  }, [enabled]);

  return {
    playSound,
    playSequence,
    playAmbient,
    initializeAudioContext,
    enabled
  };
};

// Haptic feedback hook
export const useHaptics = (enabled: boolean = true) => {
  const vibrate = useCallback((pattern: number | number[]) => {
    if (!enabled || !navigator.vibrate) return;
    
    try {
      navigator.vibrate(pattern);
    } catch (error) {
      console.warn('Haptic feedback not supported:', error);
    }
  }, [enabled]);

  const hapticFeedback = {
    light: () => vibrate(10),
    medium: () => vibrate(20),
    heavy: () => vibrate([30, 10, 30]),
    success: () => vibrate([50, 25, 50]),
    error: () => vibrate([100, 50, 100, 50, 100]),
    notification: () => vibrate([200, 100, 200]),
    pulse: () => vibrate([10, 10, 10, 10, 10, 10]),
    heartbeat: () => vibrate([50, 30, 80, 30]),
    click: () => vibrate(5),
    doubleClick: () => vibrate([10, 10, 10])
  };

  return {
    vibrate,
    ...hapticFeedback,
    enabled
  };
};