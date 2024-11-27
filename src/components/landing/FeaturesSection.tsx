import React from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  Clock, 
  Calendar, 
  DollarSign,
  FileText,
  Settings,
  Shield,
  TrendingUp
} from 'lucide-react';

function FeaturesSection() {
  const features = [
    {
      icon: Users,
      title: 'Employee Management',
      description: 'Complete employee lifecycle management with compliance to labor laws',
      color: 'blue',
    },
    {
      icon: Clock,
      title: 'Time & Attendance',
      description: 'Automated time tracking with flexible work hours support',
      color: 'green',
    },
    {
      icon: Calendar,
      title: 'Leave Management',
      description: 'Streamlined leave requests and approvals with calendar integration',
      color: 'purple',
    },
    {
      icon: DollarSign,
      title: 'Payroll Processing',
      description: 'Automated salary calculations with tax compliance',
      color: 'yellow',
    },
    {
      icon: FileText,
      title: 'Document Management',
      description: 'Secure storage and management of employee documents',
      color: 'pink',
    },
    {
      icon: TrendingUp,
      title: 'Performance Tracking',
      description: 'Goal setting and performance review management',
      color: 'indigo',
    },
    {
      icon: Shield,
      title: 'Compliance',
      description: 'Stay compliant with labor laws and regulations',
      color: 'red',
    },
    {
      icon: Settings,
      title: 'Custom Workflows',
      description: 'Create custom approval workflows for your organization',
      color: 'teal',
    },
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-gray-900 to-blue-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
              Everything You Need
            </h2>
            <p className="mt-4 text-xl text-gray-300">
              Comprehensive HR solutions for modern businesses
            </p>
          </motion.div>
        </div>

        <div className="mt-20 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="relative group"
            >
              <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 h-full hover:bg-white/20 transition-colors duration-300">
                <div className={`text-${feature.color}-400 mb-4`}>
                  <feature.icon className="h-8 w-8" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-300">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default FeaturesSection;