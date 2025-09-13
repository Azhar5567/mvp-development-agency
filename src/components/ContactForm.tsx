import { motion } from 'framer-motion';
import { Send, Mail, Phone, MapPin, CheckCircle, AlertCircle } from 'lucide-react';
import { useState } from 'react';

interface FormData {
  name: string;
  email: string;
  company: string;
  projectType: string;
  budget: string;
  timeline: string;
  message: string;
}

interface FormErrors {
  [key: string]: string;
}

const projectTypes = [
  'AI-Powered MVP',
  'Android App MVP',
  'SaaS Platform MVP',
  'Web Application MVP',
  'Custom Solution'
];

const budgetRanges = [
  'Under $10,000',
  '$10,000 - $20,000',
  '$20,000 - $50,000',
  '$50,000+',
  'Let\'s discuss'
];

const timelineOptions = [
  'ASAP (Rush project)',
  '2-4 weeks',
  '1-2 months',
  '2-3 months',
  'Flexible'
];

const ContactForm = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    company: '',
    projectType: '',
    budget: '',
    timeline: '',
    message: ''
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const validateForm = (): FormErrors => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.projectType) {
      newErrors.projectType = 'Please select a project type';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Please tell us about your project';
    } else if (formData.message.trim().length < 20) {
      newErrors.message = 'Please provide more details about your project (at least 20 characters)';
    }

    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError('');

    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    setIsSubmitting(true);
    setErrors({});

    try {
      // Simulate API call - replace with actual submission logic
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Here you would typically send the data to your backend
      console.log('Form submitted:', formData);
      
      setIsSubmitted(true);
    } catch {
      setSubmitError('Something went wrong. Please try again or contact us directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  if (isSubmitted) {
    return (
      <section id="contact" className="py-24 bg-navy-900" aria-label="Contact form confirmation">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-8">
              <CheckCircle className="w-10 h-10 text-green-600" />
            </div>
            <h2 className="text-4xl font-bold text-white mb-6">
              Thank You!
            </h2>
            <p className="text-xl text-stone-300 mb-8">
              We've received your message and will get back to you within 24 hours.
            </p>
            <motion.a
              href="https://cal.com/mvpcatalyst"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="inline-block bg-copper-500 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-copper-600 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-copper-400 focus:ring-offset-2 focus:ring-offset-navy-900"
            >
              Schedule a Call
            </motion.a>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section id="contact" className="py-24 bg-navy-900" aria-label="Contact form">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-white"
          >
            <h2 className="text-4xl lg:text-6xl font-bold mb-8">
              Let's Build Your MVP Together
            </h2>
            <p className="text-xl text-stone-300 mb-12 leading-relaxed">
              Ready to turn your idea into reality? Fill out the form and we'll get back to you within 24 hours with a detailed project proposal.
            </p>

            <div className="space-y-8">
              <div className="flex items-center">
                <div className="bg-copper-500 w-12 h-12 rounded-xl flex items-center justify-center mr-6">
                  <Mail className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-stone-300 text-sm mb-1">Email us</p>
                  <a href="mailto:hello@mvpcatalyst.com" className="text-white font-semibold hover:text-copper-400 transition-colors">
                    hello@mvpcatalyst.com
                  </a>
                </div>
              </div>

              <div className="flex items-center">
                <div className="bg-copper-500 w-12 h-12 rounded-xl flex items-center justify-center mr-6">
                  <Phone className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-stone-300 text-sm mb-1">Schedule a call</p>
                  <a 
                    href="https://cal.com/mvpcatalyst" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-white font-semibold hover:text-copper-400 transition-colors"
                  >
                    Book free consultation
                  </a>
                </div>
              </div>

              <div className="flex items-center">
                <div className="bg-copper-500 w-12 h-12 rounded-xl flex items-center justify-center mr-6">
                  <MapPin className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-stone-300 text-sm mb-1">Based in</p>
                  <p className="text-white font-semibold">United States</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-white rounded-2xl p-8 shadow-xl"
          >
            <form onSubmit={handleSubmit} noValidate>
              {/* Name and Email */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-semibold text-navy-900 mb-2">
                    Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-copper-500 transition-colors ${
                      errors.name ? 'border-red-500' : 'border-stone-300'
                    }`}
                    placeholder="Your full name"
                    aria-describedby={errors.name ? 'name-error' : undefined}
                  />
                  {errors.name && (
                    <p id="name-error" className="text-red-500 text-sm mt-1" role="alert">
                      {errors.name}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-navy-900 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-copper-500 transition-colors ${
                      errors.email ? 'border-red-500' : 'border-stone-300'
                    }`}
                    placeholder="your@email.com"
                    aria-describedby={errors.email ? 'email-error' : undefined}
                  />
                  {errors.email && (
                    <p id="email-error" className="text-red-500 text-sm mt-1" role="alert">
                      {errors.email}
                    </p>
                  )}
                </div>
              </div>

              {/* Company */}
              <div className="mb-6">
                <label htmlFor="company" className="block text-sm font-semibold text-navy-900 mb-2">
                  Company
                </label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-stone-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-copper-500 transition-colors"
                  placeholder="Your company name"
                />
              </div>

              {/* Project Type */}
              <div className="mb-6">
                <label htmlFor="projectType" className="block text-sm font-semibold text-navy-900 mb-2">
                  Project Type *
                </label>
                <select
                  id="projectType"
                  name="projectType"
                  value={formData.projectType}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-copper-500 transition-colors ${
                    errors.projectType ? 'border-red-500' : 'border-stone-300'
                  }`}
                  aria-describedby={errors.projectType ? 'projectType-error' : undefined}
                >
                  <option value="">Select project type</option>
                  {projectTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
                {errors.projectType && (
                  <p id="projectType-error" className="text-red-500 text-sm mt-1" role="alert">
                    {errors.projectType}
                  </p>
                )}
              </div>

              {/* Budget and Timeline */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label htmlFor="budget" className="block text-sm font-semibold text-navy-900 mb-2">
                    Budget Range
                  </label>
                  <select
                    id="budget"
                    name="budget"
                    value={formData.budget}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-stone-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-copper-500 transition-colors"
                  >
                    <option value="">Select budget range</option>
                    {budgetRanges.map(range => (
                      <option key={range} value={range}>{range}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="timeline" className="block text-sm font-semibold text-navy-900 mb-2">
                    Timeline
                  </label>
                  <select
                    id="timeline"
                    name="timeline"
                    value={formData.timeline}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-stone-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-copper-500 transition-colors"
                  >
                    <option value="">Select timeline</option>
                    {timelineOptions.map(option => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Message */}
              <div className="mb-8">
                <label htmlFor="message" className="block text-sm font-semibold text-navy-900 mb-2">
                  Project Details *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={5}
                  className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-copper-500 transition-colors resize-vertical ${
                    errors.message ? 'border-red-500' : 'border-stone-300'
                  }`}
                  placeholder="Tell us about your project idea, key features, target audience, and any specific requirements..."
                  aria-describedby={errors.message ? 'message-error' : undefined}
                />
                {errors.message && (
                  <p id="message-error" className="text-red-500 text-sm mt-1" role="alert">
                    {errors.message}
                  </p>
                )}
              </div>

              {/* Submit Error */}
              {submitError && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-center">
                  <AlertCircle className="w-5 h-5 text-red-500 mr-3" />
                  <p className="text-red-700 text-sm">{submitError}</p>
                </div>
              )}

              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={!isSubmitting ? { scale: 1.02, y: -2 } : {}}
                whileTap={!isSubmitting ? { scale: 0.98 } : {}}
                className={`w-full py-4 px-6 rounded-xl font-semibold text-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-copper-500 focus:ring-offset-2 ${
                  isSubmitting
                    ? 'bg-stone-400 text-stone-600 cursor-not-allowed'
                    : 'bg-navy-800 text-white hover:bg-navy-900 shadow-lg'
                }`}
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-stone-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Sending...
                  </span>
                ) : (
                  <span className="flex items-center justify-center">
                    Send Message
                    <Send className="w-5 h-5 ml-2" />
                  </span>
                )}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;