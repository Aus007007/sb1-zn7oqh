import React from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

function TestimonialsSection() {
  const testimonials = [
    {
      name: 'Sarah Johnson',
      position: 'HR Director',
      company: 'TechCorp Inc.',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100&h=100',
      quote: 'This platform has revolutionized how we handle HR processes. The automation features save us countless hours every week.',
    },
    {
      name: 'Michael Chen',
      position: 'CEO',
      company: 'InnovateLabs',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=100&h=100',
      quote: "The best HR solution we've used. The interface is intuitive and the support team is exceptional.",
    },
    {
      name: 'Emily Rodriguez',
      position: 'People Ops Manager',
      company: 'StartupHub',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=100&h=100',
      quote: 'Managing employee data and processes has never been easier. This system has everything we need.',
    },
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-blue-900 to-indigo-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
            Trusted by Industry Leaders
          </h2>
          <p className="mt-4 text-xl text-gray-300">
            See what our customers have to say about us
          </p>
        </motion.div>

        <div className="mt-20 grid grid-cols-1 gap-8 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white/10 backdrop-blur-lg rounded-xl p-8"
            >
              <div className="flex items-center mb-6">
                <img
                  className="h-12 w-12 rounded-full object-cover"
                  src={testimonial.image}
                  alt={testimonial.name}
                />
                <div className="ml-4">
                  <h4 className="text-lg font-semibold text-white">
                    {testimonial.name}
                  </h4>
                  <p className="text-sm text-gray-300">
                    {testimonial.position} at {testimonial.company}
                  </p>
                </div>
              </div>
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <blockquote className="text-gray-300">
                "{testimonial.quote}"
              </blockquote>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default TestimonialsSection;