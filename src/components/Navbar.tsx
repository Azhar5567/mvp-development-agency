import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useState } from 'react';
import Logo from './Logo';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { scrollY } = useScroll();
  const backdropBlur = useTransform(scrollY, [0, 100], ['blur(0px)', 'blur(20px)']);

  return (
    <>
      {/* Ultra-premium background with noise texture */}
      <motion.div
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          background: 'transparent',
        }}
      />
      
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 left-0 right-0 z-50"
      >
        <motion.div
          style={{
            backdropFilter: backdropBlur,
          }}
          className="border-b border-gray-200 bg-white/95 backdrop-blur-sm"
        >
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="flex items-center justify-between h-24">
              {/* Logo with magnetic hover effect */}
              <motion.a
                href="/"
                className="flex items-center cursor-pointer group"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
                aria-label="MVP Catalyst - Home"
              >
                <div className="mr-4">
                  <Logo size="md" animated={true} />
                </div>
                <span className="text-2xl font-bold text-navy-900">
                  MVP Catalyst
                </span>
              </motion.a>

              {/* Desktop Navigation with magnetic effects */}
              <div className="hidden md:flex items-center space-x-1">
                {[
                  { name: 'Services', href: '#services' },
                  { name: 'Process', href: '#process' },
                  { name: 'Contact', href: '#contact' }
                ].map((item) => (
                  <motion.a
                    key={item.name}
                    href={item.href}
                    className="relative px-6 py-3 text-neutral-600 hover:text-neutral-900 font-medium transition-colors group text-lg"
                    whileHover={{ y: -2 }}
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    onClick={(e) => {
                      const target = document.querySelector(item.href);
                      if (target) {
                        e.preventDefault();
                        const navbarHeight = 96; // Account for fixed navbar height
                        const targetPosition = target.offsetTop - navbarHeight;
                        window.scrollTo({
                          top: targetPosition,
                          behavior: 'smooth'
                        });
                      }
                    }}
                  >
                    <span className="relative z-10">{item.name}</span>
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-accent-50 to-accent-100 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      layoutId={`nav-${item.name}`}
                    />
                    <motion.div
                      className="absolute bottom-0 left-4 right-4 h-0.5 bg-gradient-to-r from-accent-500 to-accent-600 rounded-full origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300"
                    />
                  </motion.a>
                ))}
              </div>

              {/* Ultra-premium CTA Button */}
              <div className="hidden md:flex">
                <motion.a
                  href="https://cal.com/mvpcatalyst"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ 
                    scale: 1.05, 
                    y: -2,
                  }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  className="group relative bg-navy-800 text-white px-10 py-4 rounded-xl font-semibold text-lg overflow-hidden shadow-lg hover:bg-navy-900 transition-colors inline-block"
                >
                  {/* Animated background */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-electric-500 via-premium-600 to-electric-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    animate={{
                      x: [-100, 100],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "linear"
                    }}
                  />
                  
                  {/* Shimmer effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"
                    initial={false}
                  />
                  
                  <span className="relative z-10 flex items-center">
                    Get Started
                    <motion.div
                      animate={{ x: [0, 4, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </motion.div>
                  </span>
                </motion.a>
              </div>

              {/* Mobile Menu Button with morphing animation */}
              <motion.button
                className="md:hidden relative w-12 h-12 flex items-center justify-center bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors touch-manipulation"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                whileTap={{ scale: 0.9 }}
                aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
                aria-expanded={isMenuOpen}
                aria-controls="mobile-menu"
              >
                <motion.div
                  animate={isMenuOpen ? "open" : "closed"}
                  className="relative"
                >
                  <motion.span
                    variants={{
                      closed: { rotate: 0, y: 0 },
                      open: { rotate: 45, y: 0 }
                    }}
                    className="absolute w-5 h-0.5 bg-neutral-600 rounded-full"
                  />
                  <motion.span
                    variants={{
                      closed: { opacity: 1 },
                      open: { opacity: 0 }
                    }}
                    className="absolute w-5 h-0.5 bg-neutral-600 rounded-full"
                    style={{ y: 6 }}
                  />
                  <motion.span
                    variants={{
                      closed: { rotate: 0, y: 12 },
                      open: { rotate: -45, y: 0 }
                    }}
                    className="absolute w-5 h-0.5 bg-neutral-600 rounded-full"
                  />
                </motion.div>
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Mobile Menu with premium animations */}
        <motion.div
          id="mobile-menu"
          initial={false}
          animate={isMenuOpen ? "open" : "closed"}
          variants={{
            open: {
              opacity: 1,
              height: "auto",
              transition: {
                duration: 0.4,
                ease: [0.16, 1, 0.3, 1],
                staggerChildren: 0.05
              }
            },
            closed: {
              opacity: 0,
              height: 0,
              transition: {
                duration: 0.4,
                ease: [0.16, 1, 0.3, 1]
              }
            }
          }}
          className={`md:hidden overflow-hidden bg-white/95 backdrop-blur-xl border-b border-neutral-200/50 ${isMenuOpen ? 'pointer-events-auto' : 'pointer-events-none'}`}
          role="navigation"
          aria-label="Mobile navigation menu"
        >
          <div className="max-w-7xl mx-auto px-6 py-6">
            <div className="flex flex-col space-y-4">
              {['Services', 'Process', 'Contact'].map((item, index) => (
                <motion.a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  variants={{
                    open: { 
                      opacity: 1, 
                      x: 0,
                      transition: { delay: index * 0.1 }
                    },
                    closed: { 
                      opacity: 0, 
                      x: -20 
                    }
                  }}
                  className="text-neutral-600 hover:text-neutral-900 font-medium py-4 text-lg border-b border-gray-100 last:border-b-0 -mx-6 px-6 hover:bg-gray-50 transition-colors touch-manipulation"
                  onClick={(e) => {
                    setIsMenuOpen(false);
                    // Smooth scroll to section
                    const target = document.querySelector(`#${item.toLowerCase()}`);
                    if (target) {
                      e.preventDefault();
                      const navbarHeight = 96; // Account for fixed navbar height
                      const targetPosition = target.offsetTop - navbarHeight;
                      window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                      });
                    }
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  {item}
                </motion.a>
              ))}
              <motion.a
                href="https://cal.com/mvpcatalyst"
                target="_blank"
                rel="noopener noreferrer"
                variants={{
                  open: { opacity: 1, y: 0 },
                  closed: { opacity: 0, y: 20 }
                }}
                className="bg-gradient-to-r from-navy-800 to-navy-900 text-white px-6 py-4 rounded-xl font-medium mt-4 text-center shadow-lg block hover:from-navy-900 hover:to-navy-950 transition-colors touch-manipulation"
                whileTap={{ scale: 0.95 }}
              >
                Get Started
              </motion.a>
            </div>
          </div>
        </motion.div>
      </motion.nav>
    </>
  );
};

export default Navbar;