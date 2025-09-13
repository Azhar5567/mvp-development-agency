import { motion, useScroll, useTransform } from 'framer-motion';
import { Search, Code, Rocket } from 'lucide-react';
import { SectionTransition, StaggeredTransition, StaggeredItem } from './PageTransition';
import { useRef } from 'react';

const steps = [
  {
    number: '01',
    icon: Search,
    title: 'MVP Roadmap',
    description: 'We analyze your idea, define core features, and create a strategic roadmap for your MVP success.',
    details: ['Market research & validation', 'Feature prioritization', 'Technical architecture planning', 'Timeline & milestone definition'],
    duration: '1-2 weeks'
  },
  {
    number: '02',
    icon: Code,
    title: 'Development',
    description: 'Build your MVP with modern technologies, focusing on core features that matter most.',
    details: ['Full-stack development', 'UI/UX implementation', 'API integration & testing', 'Quality assurance'],
    duration: '3-4 weeks'
  },
  {
    number: '03',
    icon: Rocket,
    title: 'Support After Launch',
    description: 'Continuous support, monitoring, and optimization to ensure your MVP thrives in the market.',
    details: ['Performance monitoring', 'Bug fixes & updates', 'Feature enhancements', '24/7 technical support'],
    duration: '14 Days'
  }
];

const Process = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "-20%"]);

  return (
    <section id="process" ref={containerRef} className="relative py-32 bg-white overflow-hidden">
      {/* Cinematic background */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          y: backgroundY,
          background: `
            radial-gradient(circle at 30% 10%, rgba(14, 165, 233, 0.05) 0%, transparent 50%),
            radial-gradient(circle at 70% 90%, rgba(139, 92, 246, 0.05) 0%, transparent 50%)
          `
        }}
      />
      
      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <SectionTransition className="text-center mb-24">
          <h2 className="text-6xl lg:text-7xl font-bold text-navy-900 mb-8 tracking-tight">
            Our Process
          </h2>
          <p className="text-2xl text-stone-600 max-w-3xl mx-auto font-light leading-relaxed">
            A structured approach to turn your ideas into market-ready products.
          </p>
        </SectionTransition>
        
        {/* Process Steps */}
        <div className="relative">
          {/* Connection line for desktop */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-neutral-200 to-transparent transform -translate-y-1/2" />
          
          <StaggeredTransition staggerDelay={0.2}>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 max-w-6xl mx-auto">
              {steps.map((step, index) => {
                const Icon = step.icon;
                return (
                  <StaggeredItem key={step.number} className="relative group">
                  {/* Mobile connector */}
                  {index < steps.length - 1 && (
                    <div className="lg:hidden absolute left-6 top-20 w-px h-20 bg-gradient-to-b from-neutral-300 to-transparent" />
                  )}
                  
                  {/* Card */}
                  <div className="relative group">
                    <div className="relative bg-gradient-to-br from-stone-50 to-stone-100 rounded-3xl p-12 border border-stone-200 hover:border-copper-300 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
                      {/* Step number background */}
                      <div className="absolute -top-8 -right-8 w-24 h-24 bg-gradient-to-br from-navy-800 to-navy-900 rounded-full flex items-center justify-center shadow-2xl border-4 border-white">
                        <span className="text-2xl font-black text-copper-300">
                          {step.number}
                        </span>
                      </div>
                    
                      {/* Icon */}
                      <div className="relative mb-12">
                        <motion.div
                          whileHover={{ scale: 1.1, rotate: 5 }}
                          className="inline-flex p-6 rounded-3xl bg-gradient-to-br from-copper-500 to-copper-600 shadow-xl group-hover:shadow-2xl transition-all duration-300"
                        >
                          <Icon className="w-10 h-10 text-white" />
                        </motion.div>
                      </div>
                    
                    {/* Content */}
                    <div className="space-y-6">
                      <div>
                        <div className="mb-6">
                          <h3 className="text-3xl font-bold text-navy-900 mb-3">
                            {step.title}
                          </h3>
                          <span className="inline-block text-sm font-semibold text-white bg-gradient-to-r from-copper-600 to-copper-700 px-4 py-2 rounded-full shadow-md">
                            {step.duration}
                          </span>
                        </div>
                        <p className="text-stone-700 leading-relaxed text-lg mb-8">
                          {step.description}
                        </p>
                      </div>
                      
                      {/* Details */}
                      <div className="space-y-4">
                        {step.details.map((detail) => (
                          <motion.div 
                            key={detail} 
                            className="flex items-center text-base text-stone-700"
                            whileHover={{ x: 4 }}
                            transition={{ duration: 0.2 }}
                          >
                            <div className="w-3 h-3 bg-gradient-to-r from-copper-500 to-copper-600 rounded-full mr-4 flex-shrink-0 shadow-sm" />
                            <span className="font-medium">{detail}</span>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                    
                      {/* Hover effect */}
                      <div className="absolute inset-0 bg-gradient-to-br from-copper-500/10 to-copper-600/10 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    </div>
                  </div>
                  
                  {/* Connection arrow for desktop */}
                  {index < steps.length - 1 && (
                    <div className="hidden lg:block absolute top-1/2 -right-8 z-10 transform -translate-y-1/2">
                      <div className="flex items-center">
                        <div className="w-8 h-0.5 bg-gradient-to-r from-copper-500 to-copper-600"></div>
                        <div className="w-3 h-3 bg-copper-500 rounded-full transform rotate-45 -ml-1"></div>
                      </div>
                    </div>
                  )}
                  </StaggeredItem>
                );
              })}
            </div>
          </StaggeredTransition>
        </div>
        
        {/* Timeline summary */}
        <SectionTransition delay={0.6} className="text-center mt-24">
          <div className="bg-gradient-to-r from-navy-800 to-navy-900 rounded-3xl p-8 shadow-2xl max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-4xl font-bold text-copper-300 mb-2">4</div>
                <div className="text-sm font-medium text-stone-300 uppercase tracking-wider">Weeks Total</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-copper-300 mb-2">24/7</div>
                <div className="text-sm font-medium text-stone-300 uppercase tracking-wider">Support</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-copper-300 mb-2">100%</div>
                <div className="text-sm font-medium text-stone-300 uppercase tracking-wider">Success Rate</div>
              </div>
            </div>
          </div>
        </SectionTransition>
      </div>
    </section>
  );
};

export default Process;