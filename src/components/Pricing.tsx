import { motion } from 'framer-motion';
import { Check, Star, Zap, Crown } from 'lucide-react';

const packages = [
  {
    id: 'starter',
    name: 'Starter MVP',
    description: 'Perfect for validating your core idea',
    price: '$8,000',
    originalPrice: '$12,000',
    duration: '2-3 weeks',
    icon: Zap,
    popular: false,
    badge: 'Best Value',
    features: [
      'Single platform (Web or Mobile)',
      'Core feature development (3-5 features)',
      'Modern UI/UX design',
      'User authentication & profiles',
      'Database setup & management',
      'Basic analytics dashboard',
      'Mobile responsive design',
      '2 weeks post-launch support',
      'Source code + basic documentation',
      'Free deployment assistance'
    ],
    idealFor: 'Solo entrepreneurs, First-time founders',
    deliverables: ['Working MVP', 'Source Code', 'Basic Documentation']
  },
  {
    id: 'professional',
    name: 'Professional MVP',
    description: 'Comprehensive solution for serious startups',
    price: '$15,000',
    originalPrice: '$22,000',
    duration: '4-6 weeks',
    icon: Star,
    popular: true,
    badge: 'Most Popular',
    features: [
      'Web + Mobile platforms',
      'Advanced feature set (8-12 features)',
      'Professional UI/UX + branding',
      'User authentication & role management',
      'Payment integration (Stripe/PayPal)',
      'Admin dashboard & controls',
      'Advanced analytics & reporting',
      'REST API development',
      'Email notifications & automation',
      '4 weeks post-launch support',
      'Complete documentation',
      'Free deployment + monitoring setup'
    ],
    idealFor: 'Growing startups, Technical founders',
    deliverables: ['Full MVP', 'API Documentation', 'Admin Panel', 'Deployment']
  },
  {
    id: 'enterprise',
    name: 'Enterprise MVP',
    description: 'Full-scale solution with AI/ML capabilities',
    price: '$25,000',
    originalPrice: '$35,000',
    duration: '6-8 weeks',
    icon: Crown,
    popular: false,
    badge: 'Premium',
    features: [
      'Multi-platform development',
      'AI/ML integration & custom models',
      'Premium UI/UX + complete branding',
      'Multi-tenant architecture',
      'Advanced payment processing',
      'Real-time features (chat, notifications)',
      'Comprehensive analytics & insights',
      'API + Third-party integrations',
      'DevOps pipeline & auto-deployment',
      'Security audit & compliance',
      '8 weeks post-launch support',
      'Complete delivery package + training'
    ],
    idealFor: 'Funded startups, Enterprise clients',
    deliverables: ['Enterprise MVP', 'Full Documentation', 'DevOps Setup', 'Training']
  }
];

const Pricing = () => {
  return (
    <section id="pricing" className="py-24 bg-white" aria-label="MVP development pricing packages">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl lg:text-6xl font-bold text-navy-900 mb-6">
            Transparent Pricing
          </h2>
          <p className="text-xl text-stone-600 max-w-3xl mx-auto leading-relaxed">
            Choose the package that fits your needs. All packages include free consultation, project roadmap, and post-launch support.
          </p>
        </motion.div>

        {/* Pricing Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {packages.map((pkg, index) => (
            <motion.div
              key={pkg.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className={`relative rounded-3xl p-8 border-2 transition-all duration-300 flex flex-col h-full ${
                pkg.popular
                  ? 'border-copper-500 bg-gradient-to-br from-copper-50 via-white to-copper-50 shadow-2xl scale-105 ring-4 ring-copper-100'
                  : 'border-stone-200 bg-white shadow-lg hover:shadow-2xl hover:border-copper-300 hover:scale-102'
              }`}
            >
              {/* Badge */}
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <div className={`px-6 py-2 rounded-full text-sm font-semibold ${
                  pkg.popular 
                    ? 'bg-copper-500 text-white shadow-lg' 
                    : pkg.badge === 'Best Value'
                    ? 'bg-green-500 text-white shadow-lg'
                    : 'bg-navy-800 text-white shadow-lg'
                }`}>
                  {pkg.badge}
                </div>
              </div>

              {/* Icon */}
              <div className={`w-20 h-20 rounded-2xl flex items-center justify-center mb-8 shadow-lg ${
                pkg.popular ? 'bg-gradient-to-br from-copper-500 to-copper-600' : 'bg-gradient-to-br from-navy-800 to-navy-900'
              }`}>
                <pkg.icon className="w-10 h-10 text-white" />
              </div>

              {/* Package info - grows to fill space */}
              <div className="flex-grow mb-8">
                <h3 className="text-3xl font-bold text-navy-900 mb-3">
                  {pkg.name}
                </h3>
                <p className="text-stone-600 mb-6 text-lg leading-relaxed">
                  {pkg.description}
                </p>
                
                {/* Pricing */}
                <div className="mb-4">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-5xl font-bold text-navy-900">
                      {pkg.price}
                    </span>
                    <div className="flex flex-col">
                      <span className="text-lg text-stone-400 line-through">
                        {pkg.originalPrice}
                      </span>
                      <span className="text-sm text-green-600 font-semibold">
                        Save {((parseInt(pkg.originalPrice.replace('$', '').replace(',', '')) - parseInt(pkg.price.replace('$', '').replace(',', ''))) / parseInt(pkg.originalPrice.replace('$', '').replace(',', '')) * 100).toFixed(0)}%
                      </span>
                    </div>
                  </div>
                  <p className="text-stone-500 font-medium">
                    Delivery in {pkg.duration}
                  </p>
                </div>

                {/* Deliverables */}
                <div className="bg-stone-50 rounded-xl p-4 mb-6">
                  <p className="text-sm font-semibold text-stone-700 mb-2">What you get:</p>
                  <div className="flex flex-wrap gap-2">
                    {pkg.deliverables.map((item, i) => (
                      <span key={i} className="bg-white px-3 py-1 rounded-full text-xs font-medium text-stone-600 border">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Ideal for */}
                <div className="mb-6">
                  <p className="text-sm font-semibold text-copper-600 mb-2">
                    Perfect for:
                  </p>
                  <p className="text-stone-600 font-medium">
                    {pkg.idealFor}
                  </p>
                </div>

                {/* Features */}
                <ul className="space-y-3">
                  {pkg.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start">
                      <Check className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-stone-700 text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* CTA Button - Fixed at bottom */}
              <div className="space-y-3 mt-auto">
                <motion.a
                  href="https://cal.com/mvpcatalyst"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className={`block w-full text-center py-4 px-6 rounded-xl font-semibold text-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-copper-500 focus:ring-offset-2 shadow-xl ${
                    pkg.popular
                      ? 'bg-gradient-to-r from-copper-500 to-copper-600 text-white hover:from-copper-600 hover:to-copper-700'
                      : 'bg-gradient-to-r from-navy-800 to-navy-900 text-white hover:from-navy-900 hover:to-navy-950'
                  }`}
                  aria-label={`Get started with ${pkg.name} package`}
                >
                  Get Started - {pkg.price}
                </motion.a>
                
                <div className="text-center">
                  <p className="text-xs text-stone-500 mb-2">or</p>
                  <motion.a
                    href="https://cal.com/mvpcatalyst"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.02 }}
                    className="text-copper-600 hover:text-copper-700 font-semibold text-sm underline"
                  >
                    Schedule free consultation
                  </motion.a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Additional info */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center mt-16"
        >
          <div className="bg-stone-50 rounded-2xl p-8 border border-stone-200">
            <h3 className="text-2xl font-bold text-navy-900 mb-4">
              Need something custom?
            </h3>
            <p className="text-stone-600 mb-6">
              Every project is unique. Let's discuss your specific requirements and create a tailored solution for your startup.
            </p>
            <motion.a
              href="https://cal.com/mvpcatalyst"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="inline-block bg-white text-navy-800 border-2 border-navy-800 px-8 py-3 rounded-xl font-semibold hover:bg-navy-800 hover:text-white transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-copper-500 focus:ring-offset-2"
              aria-label="Schedule custom consultation"
            >
              Schedule Custom Consultation
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Pricing;