import { motion } from 'framer-motion';
import { Clock, DollarSign, Users, Zap, Shield, Rocket } from 'lucide-react';

const benefits = [
  {
    icon: Clock,
    title: 'Launch in 4 Weeks',
    description: 'Get your MVP to market faster than traditional development approaches. Speed is crucial for validating ideas and capturing market opportunities.',
    highlight: '4x Faster',
    color: 'from-blue-500 to-blue-600'
  },
  {
    icon: DollarSign,
    title: 'Cost-Effective Solution',
    description: 'Build only what you need to validate your concept. Save 60-80% compared to full product development while maintaining quality.',
    highlight: 'Save 60-80%',
    color: 'from-green-500 to-green-600'
  },
  {
    icon: Users,
    title: 'User-Centered Design',
    description: 'Every feature we build is designed with your users in mind. We focus on core functionality that delivers real value.',
    highlight: 'User-First',
    color: 'from-purple-500 to-purple-600'
  },
  {
    icon: Zap,
    title: 'Modern Tech Stack',
    description: 'Built with the latest technologies including React, Node.js, TypeScript, and cloud services for scalability and performance.',
    highlight: 'Future-Ready',
    color: 'from-yellow-500 to-orange-500'
  },
  {
    icon: Shield,
    title: 'Risk-Free Development',
    description: 'Test your business idea with minimal investment. Our MVP approach helps you validate market demand before committing to full development.',
    highlight: 'Validated',
    color: 'from-red-500 to-pink-500'
  },
  {
    icon: Rocket,
    title: 'Ready to Scale',
    description: 'Your MVP is built with scalability in mind. When you\'re ready to grow, your foundation is already solid and extensible.',
    highlight: 'Scalable',
    color: 'from-indigo-500 to-indigo-600'
  }
];

const stats = [
  { number: "4", label: "Weeks to Launch", sublabel: "Average delivery time" },
  { number: "100%", label: "Client Success", sublabel: "MVPs delivered on time" },
  { number: "14", label: "Days Support", sublabel: "Free post-launch support" },
  { number: "24/7", label: "Availability", sublabel: "Always here when you need us" }
];

const WhyChooseUs = () => {
  return (
    <section className="py-32 bg-gradient-to-br from-stone-50 via-white to-stone-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl lg:text-6xl font-bold text-navy-900 mb-6 tracking-tight">
            Why Choose MVP Catalyst?
          </h2>
          <p className="text-xl text-stone-600 max-w-3xl mx-auto font-light leading-relaxed">
            We specialize in turning your ideas into market-ready products that users love. 
            Here's what makes us different from traditional development agencies.
          </p>
        </motion.div>
        
        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -8 }}
                className="group relative"
              >
                <div className="relative bg-white rounded-2xl p-8 border border-stone-200 hover:border-copper-300 shadow-lg hover:shadow-2xl transition-all duration-500 h-full">
                  {/* Icon */}
                  <div className="mb-6">
                    <div className={`w-16 h-16 bg-gradient-to-br ${benefit.color} rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-2xl font-bold text-navy-900">
                        {benefit.title}
                      </h3>
                      <span className={`px-3 py-1 bg-gradient-to-r ${benefit.color} text-white text-xs font-bold rounded-full`}>
                        {benefit.highlight}
                      </span>
                    </div>
                    
                    <p className="text-stone-600 leading-relaxed">
                      {benefit.description}
                    </p>
                  </div>
                  
                  {/* Hover effect */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${benefit.color} opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity duration-500`} />
                </div>
              </motion.div>
            );
          })}
        </div>
        
        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="bg-navy-800 rounded-3xl p-12 shadow-2xl"
        >
          <div className="text-center mb-12">
            <h3 className="text-3xl lg:text-4xl font-bold text-white mb-4">
              Our Track Record
            </h3>
            <p className="text-stone-300 text-lg max-w-2xl mx-auto">
              Numbers don't lie. Here's what we've accomplished for startups like yours.
            </p>
          </div>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center group cursor-pointer"
                whileHover={{ scale: 1.05 }}
              >
                <div className="relative p-6 rounded-2xl bg-white/5 hover:bg-white/10 transition-all duration-300 border border-white/10">
                  <div className="text-4xl lg:text-5xl font-black text-copper-300 mb-3 group-hover:text-copper-200 transition-colors">
                    {stat.number}
                  </div>
                  <div className="text-white font-semibold mb-1">
                    {stat.label}
                  </div>
                  <div className="text-stone-400 text-sm">
                    {stat.sublabel}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
        
        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center mt-16"
        >
          <div className="inline-flex items-center px-8 py-4 rounded-full bg-gradient-to-r from-copper-50 to-copper-100 border border-copper-200">
            <div className="w-3 h-3 bg-copper-500 rounded-full mr-4 animate-pulse" />
            <span className="font-semibold text-copper-700 text-lg">
              Ready to build your MVP? Let's get started today.
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default WhyChooseUs;