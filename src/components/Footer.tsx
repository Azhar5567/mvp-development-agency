import { motion } from 'framer-motion';
import { Mail, Twitter } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 right-20 w-64 h-64 bg-accent-500 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-20 w-48 h-48 bg-accent-400 rounded-full blur-3xl" />
      </div>
      
      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        {/* Main footer content */}
        <div className="py-20">
          <div className="flex justify-center">
            {/* Company info */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center max-w-md"
            >
              {/* Logo */}
              <motion.div 
                className="flex items-center justify-center mb-8"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                <div className="w-10 h-10 bg-gradient-to-br from-accent-400 to-accent-600 rounded-2xl mr-4 flex items-center justify-center shadow-lg">
                  <div className="w-5 h-5 bg-neutral-0 rounded-md" />
                </div>
                <span className="text-2xl font-bold tracking-tight">MVP Catalyst</span>
              </motion.div>
              
              <p className="text-neutral-400 mb-8 leading-relaxed font-light text-lg">
                We help startups design, develop, and launch MVPs in weeks, not months. 
                Turn your ideas into market-ready products.
              </p>
              
              {/* Contact info */}
              <div className="space-y-4">
                <motion.div 
                  className="flex items-center justify-center text-neutral-300 hover:text-accent-400 transition-colors group cursor-pointer"
                  whileHover={{ x: 4 }}
                  transition={{ duration: 0.2 }}
                >
                  <Mail className="w-5 h-5 mr-4 group-hover:scale-110 transition-transform" />
                  <span className="font-medium">hello@mvpcatalyst.com</span>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
        
        {/* Bottom footer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="py-8 border-t border-neutral-800"
        >
          <div className="flex flex-col lg:flex-row justify-between items-center">
            <div className="text-neutral-400 mb-6 lg:mb-0 font-medium">
              © 2024 MVP Catalyst. All rights reserved.
            </div>
            
            {/* Social links */}
            <div className="flex space-x-6">
              {[
                { icon: Twitter, href: 'https://x.com/Azharailab', label: 'Twitter' }
              ].map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  className="w-10 h-10 bg-neutral-800 hover:bg-neutral-700 rounded-2xl flex items-center justify-center text-neutral-400 hover:text-accent-400 transition-all duration-300 group"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5 group-hover:scale-110 transition-transform" />
                </motion.a>
              ))}
            </div>
          </div>
          
          {/* Bottom tagline */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.8 }}
            className="text-center mt-8 pt-8 border-t border-neutral-800"
          >
            <div className="inline-flex items-center px-6 py-3 rounded-full bg-neutral-800/50 border border-neutral-700/50">
              <div className="w-2 h-2 bg-accent-400 rounded-full mr-3 animate-pulse" />
              <span className="text-neutral-300 text-sm font-medium">
                Building the future, one MVP at a time
              </span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;