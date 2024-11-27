import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, ArrowRight, MessageSquare, Users, Headphones } from 'lucide-react';

function ContactSection() {
  return (
    <section className="relative py-24 overflow-hidden">
      {/* Background with gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-indigo-900 via-blue-900 to-blue-800"></div>

      {/* Animated background shapes */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute -top-10 -right-10 w-40 h-40 bg-blue-400 rounded-full opacity-10"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-20 -left-10 w-60 h-60 bg-indigo-400 rounded-full opacity-10"
          animate={{
            scale: [1, 1.3, 1],
            rotate: [0, -90, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
              Ready to Transform Your HR Operations?
            </h2>
            <p className="mt-4 text-xl text-gray-300">
              Join thousands of companies that trust our HR system
            </p>
          </motion.div>

          {/* Stats Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-3"
          >
            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-8">
              <Users className="h-8 w-8 text-blue-400 mx-auto" />
              <div className="mt-4 text-4xl font-bold text-white">10K+</div>
              <div className="mt-2 text-gray-300">Active Users</div>
            </div>
            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-8">
              <MessageSquare className="h-8 w-8 text-blue-400 mx-auto" />
              <div className="mt-4 text-4xl font-bold text-white">98%</div>
              <div className="mt-2 text-gray-300">Customer Satisfaction</div>
            </div>
            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-8">
              <Headphones className="h-8 w-8 text-blue-400 mx-auto" />
              <div className="mt-4 text-4xl font-bold text-white">24/7</div>
              <div className="mt-2 text-gray-300">Support Available</div>
            </div>
          </motion.div>

          <motion.form
            className="mt-12 max-w-xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label htmlFor="name" className="sr-only">Name</label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  className="block w-full shadow-sm py-3 px-4 placeholder-gray-500 focus:ring-blue-500 focus:border-blue-500 border-gray-300 rounded-md bg-white/10 backdrop-blur-lg text-white"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label htmlFor="email" className="sr-only">Email</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="block w-full shadow-sm py-3 px-4 placeholder-gray-500 focus:ring-blue-500 focus:border-blue-500 border-gray-300 rounded-md bg-white/10 backdrop-blur-lg text-white"
                  placeholder="Your email"
                />
              </div>
            </div>
            <div className="mt-4">
              <textarea
                id="message"
                name="message"
                rows={4}
                className="block w-full shadow-sm py-3 px-4 placeholder-gray-500 focus:ring-blue-500 focus:border-blue-500 border-gray-300 rounded-md bg-white/10 backdrop-blur-lg text-white"
                placeholder="Your message"
              ></textarea>
            </div>
            <div className="mt-4">
              <button
                type="submit"
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
              >
                Get Started
                <ArrowRight className="ml-2 h-5 w-5" />
              </button>
            </div>
          </motion.form>

          <motion.div
            className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-3"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <div className="flex flex-col items-center">
              <Mail className="h-8 w-8 text-blue-400" />
              <h3 className="mt-4 text-lg font-medium text-white">Email</h3>
              <p className="mt-2 text-base text-gray-300">
                contact@hrapp.com
              </p>
            </div>
            <div className="flex flex-col items-center">
              <Phone className="h-8 w-8 text-blue-400" />
              <h3 className="mt-4 text-lg font-medium text-white">Phone</h3>
              <p className="mt-2 text-base text-gray-300">
                +1 (555) 123-4567
              </p>
            </div>
            <div className="flex flex-col items-center">
              <MapPin className="h-8 w-8 text-blue-400" />
              <h3 className="mt-4 text-lg font-medium text-white">Office</h3>
              <p className="mt-2 text-base text-gray-300">
                123 Business Ave, Suite 100
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default ContactSection;