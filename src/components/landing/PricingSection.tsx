import React from 'react';
import { motion } from 'framer-motion';
import { Check, X } from 'lucide-react';

function PricingSection({ regionData }) {
  const plans = [
    {
      name: 'Starter',
      price: regionData.pricing.starter,
      users: '1-50',
      features: [
        'Core HR Management',
        'Employee Self-Service',
        'Attendance Management',
        'Leave Management',
        'Basic Reports',
        'Email Support',
        'Mobile App Access',
      ],
      notIncluded: [
        'Performance Management',
        'Training & Development',
        'Recruitment Portal',
        'Custom Workflows',
        'API Access',
        'Dedicated Support',
      ],
    },
    {
      name: 'Business',
      price: regionData.pricing.business,
      users: '51-200',
      popular: true,
      features: [
        'Everything in Starter, plus:',
        'Performance Management',
        'Training & Development',
        'Recruitment Portal',
        'Advanced Reports',
        'Priority Support',
        'Custom Branding',
        'Data Import/Export',
        'Multi-location Support',
      ],
      notIncluded: [
        'Custom Workflows',
        'API Access',
        'Dedicated Support',
      ],
    },
    {
      name: 'Enterprise',
      price: regionData.pricing.enterprise,
      users: '201+',
      features: [
        'Everything in Business, plus:',
        'Custom Workflows',
        'API Access',
        'Dedicated Support',
        'Custom Integrations',
        'White-label Options',
        'SLA Guarantees',
        'Onboarding Manager',
        'Security Audit Logs',
        'Advanced Analytics',
      ],
      notIncluded: [],
    },
  ];

  return (
    <section id="pricing" className="py-24 bg-gradient-to-b from-indigo-900 to-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
            Simple, Transparent Pricing
          </h2>
          <p className="mt-4 text-xl text-gray-300">
            Choose the plan that best fits your needs
          </p>
        </motion.div>

        <div className="mt-20 grid grid-cols-1 gap-8 lg:grid-cols-3">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`relative p-8 bg-white/10 backdrop-blur-lg rounded-xl ${
                plan.popular ? 'ring-2 ring-blue-400' : ''
              }`}
            >
              {plan.popular && (
                <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-400 text-white">
                    Most Popular
                  </span>
                </div>
              )}
              <div className="text-center">
                <h3 className="text-2xl font-bold text-white">
                  {plan.name}
                </h3>
                <p className="mt-4 text-sm text-gray-300">
                  For teams with {plan.users} employees
                </p>
                <p className="mt-8">
                  <span className="text-4xl font-extrabold text-white">
                    {plan.price}
                  </span>
                  <span className="text-base font-medium text-gray-300">
                    {regionData.pricing.period}
                  </span>
                </p>
                <a
                  href="#contact"
                  className={`mt-8 block w-full py-3 px-6 rounded-md text-center font-medium ${
                    plan.popular
                      ? 'bg-blue-500 text-white hover:bg-blue-600'
                      : 'bg-blue-900/50 text-blue-100 hover:bg-blue-800/50'
                  } transition-colors duration-200`}
                >
                  Get Started
                </a>
              </div>
              <div className="mt-8 space-y-4">
                {plan.features.map((feature) => (
                  <div key={feature} className="flex items-center">
                    <Check className="h-5 w-5 text-green-400" />
                    <span className="ml-3 text-sm text-gray-300">
                      {feature}
                    </span>
                  </div>
                ))}
                {plan.notIncluded.map((feature) => (
                  <div key={feature} className="flex items-center opacity-50">
                    <X className="h-5 w-5 text-gray-400" />
                    <span className="ml-3 text-sm text-gray-400 line-through">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default PricingSection;