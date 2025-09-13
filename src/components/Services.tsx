import { motion } from 'framer-motion';
import { Brain, Smartphone, Layers } from 'lucide-react';

const services = [
  {
    icon: Brain,
    title: 'AI-Powered MVPs',
    description: 'Build intelligent applications with AI capabilities to solve real-world problems for your users.',
    features: ['ChatGPT & OpenAI Integration', 'Machine Learning Models', 'Natural Language Processing', 'Computer Vision Solutions']
  },
  {
    icon: Smartphone,
    title: 'Android MVPs',
    description: 'Native Android applications that deliver exceptional user experience and performance.',
    features: ['Native Android Development', 'Material Design UI/UX', 'Firebase Integration', 'Play Store Deployment']
  },
  {
    icon: Layers,
    title: 'SaaS MVPs',
    description: 'Scalable web applications with subscription models and user management systems.',
    features: ['Multi-tenant Architecture', 'Payment Integration (Stripe)', 'User Authentication & Roles', 'Analytics & Dashboards']
  }
];

const Services = () => {
  return (
    <section id="services" className="py-24 bg-white" aria-label="Our MVP development services">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-6xl font-bold text-navy-900 mb-4 sm:mb-6">
            MVP Development Services
          </h2>
          <p className="text-lg sm:text-xl text-stone-600 max-w-3xl mx-auto leading-relaxed px-4 sm:px-0">
            Comprehensive MVP development services to help startups launch faster and validate ideas effectively
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 lg:gap-10">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="bg-stone-50 rounded-xl p-6 sm:p-8 shadow-md hover:shadow-lg transition-all duration-300 border border-stone-200"
            >
              {/* Icon */}
              <div className="w-20 h-20 bg-navy-800 rounded-xl flex items-center justify-center mb-8 shadow-lg">
                <service.icon className="w-10 h-10 text-copper-300" />
              </div>

              {/* Title */}
              <h3 className="text-3xl font-bold text-navy-900 mb-6">
                {service.title}
              </h3>

              {/* Description */}
              <p className="text-stone-600 mb-8 leading-relaxed text-xl">
                {service.description}
              </p>

              {/* Features */}
              <ul className="space-y-4">
                {service.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start space-x-4">
                    <div className="w-3 h-3 bg-copper-600 rounded-full mt-2 flex-shrink-0" />
                    <span className="text-stone-700 text-lg">{feature}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;