import { motion } from 'framer-motion';

const Hero = () => {
  return (
    <motion.section
      className="relative min-h-screen bg-stone-50 pt-20"
      aria-label="Hero section"
      role="banner"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20 pb-16 sm:pb-24">
        <div className="text-center">
          <div>
            {/* Available badge */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mb-12"
            >
              <div className="inline-flex items-center px-4 py-2 rounded-lg bg-copper-50 border border-copper-200 text-copper-800 text-base font-medium">
                Available for MVP Projects
              </div>
            </motion.div>

            {/* Main heading */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mb-8"
            >
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-navy-900 leading-tight tracking-tight">
                Helping Startups{' '}
                <span className="text-copper-600">
                  Launch Faster
                </span>
                <span className="sr-only">with AI, Android and SaaS MVPs</span>
              </h1>
              <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold text-navy-700 mt-4 sm:mt-6" role="doc-subtitle">
                with AI, Android & SaaS MVPs
              </p>
            </motion.div>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-lg sm:text-xl text-stone-600 mb-8 sm:mb-10 max-w-2xl mx-auto leading-relaxed px-4 sm:px-0"
            >
              We specialize in building Minimum Viable Products that help startups validate ideas quickly and cost-effectively.
            </motion.p>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="flex justify-center"
            >
              <motion.a
                href="https://cal.com/mvpcatalyst"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="bg-navy-800 text-white px-8 sm:px-12 py-3 sm:py-4 rounded-xl font-semibold text-base sm:text-lg hover:bg-navy-900 transition-all duration-300 shadow-lg inline-block focus:outline-none focus:ring-2 focus:ring-copper-500 focus:ring-offset-2"
                aria-label="Schedule a free consultation to build your MVP"
              >
                Build My MVP
              </motion.a>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default Hero;