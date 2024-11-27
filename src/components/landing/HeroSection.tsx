import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import SplineWrapper from '../SplineWrapper';
import { useInView } from 'react-intersection-observer';

interface HeroSectionProps {
  regionData: any;
}

export default function HeroSection({ regionData }: HeroSectionProps) {
  const [splineLoaded, setSplineLoaded] = React.useState(false);
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const fallbackBackground = (
    <div 
      className="absolute inset-0 bg-gradient-to-br from-gray-900 via-blue-900 to-indigo-900"
      style={{
        backgroundImage: "url('https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&q=80&w=2070&h=1200')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    />
  );

  return (
    <div className="relative min-h-screen flex items-center overflow-hidden">
      {/* 3D Background Animation */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          opacity: splineLoaded ? 1 : 0,
          transition: 'opacity 0.5s ease-in-out',
        }}
      >
        <SplineWrapper
          scene="https://prod.spline.design/6Wq1Q7YGyM-iab9i/scene.splinecode"
          onLoad={() => setSplineLoaded(true)}
          fallback={fallbackBackground}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900/90 via-blue-900/80 to-indigo-900/90" />
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-white/10 backdrop-blur-sm"
            style={{
              width: Math.random() * 100 + 50,
              height: Math.random() * 100 + 50,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, Math.random() * 100 - 50],
              x: [0, Math.random() * 100 - 50],
              scale: [1, Math.random() * 0.5 + 0.5],
              opacity: [0.1, 0.3],
            }}
            transition={{
              duration: Math.random() * 5 + 5,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="lg:grid lg:grid-cols-12 lg:gap-8"
        >
          <motion.div
            className="lg:col-span-7"
            variants={itemVariants}
          >
            <h1 className="text-4xl tracking-tight font-extrabold text-white sm:text-5xl md:text-6xl lg:text-5xl xl:text-6xl">
              <motion.span 
                className="block"
                variants={itemVariants}
              >
                Transform Your
              </motion.span>
              <motion.span 
                className="block text-blue-400"
                variants={itemVariants}
              >
                HR Management
              </motion.span>
            </h1>
            <motion.p 
              className="mt-6 text-xl text-gray-300 max-w-3xl"
              variants={itemVariants}
            >
              Streamline your HR operations with our comprehensive solution. From attendance tracking to payroll management, we've got you covered.
            </motion.p>
            <motion.div 
              className="mt-10 flex flex-col sm:flex-row gap-4"
              variants={itemVariants}
            >
              <motion.a
                href="#pricing"
                className="inline-flex items-center px-8 py-3 text-base font-medium rounded-md text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 shadow-lg hover:shadow-blue-500/25"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Get Started
                <ArrowRight className="ml-2 h-5 w-5" />
              </motion.a>
              <motion.a
                href="#demo"
                className="inline-flex items-center px-8 py-3 text-base font-medium rounded-md text-blue-100 bg-white/10 hover:bg-white/20 transition-colors duration-200 backdrop-blur-sm"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Watch Demo
              </motion.a>
            </motion.div>
          </motion.div>

          <motion.div
            className="mt-12 relative lg:mt-0 lg:col-span-5"
            variants={itemVariants}
          >
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 shadow-xl">
              <div className="space-y-4">
                {[1, 2, 3].map((index) => (
                  <motion.div
                    key={index}
                    className="flex items-center space-x-4 text-white"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.2 }}
                  >
                    <div className="h-12 w-12 rounded-full bg-gradient-to-r from-blue-500/20 to-indigo-500/20 flex items-center justify-center backdrop-blur-sm">
                      <span className="text-2xl">✓</span>
                    </div>
                    <div>
                      <h3 className="font-semibold">
                        {index === 1 ? 'Smart Attendance' : 
                         index === 2 ? 'Leave Management' : 
                         'Payroll Processing'}
                      </h3>
                      <p className="text-sm text-gray-300">
                        {index === 1 ? 'Automated tracking & reporting' :
                         index === 2 ? 'Streamlined approvals' :
                         'Automated calculations'}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        <div className="h-16 w-10 border-2 border-white/30 rounded-full relative flex justify-center">
          <motion.div 
            className="absolute top-2 h-3 w-3 bg-white rounded-full"
            animate={{ y: [0, 20] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        </div>
      </motion.div>
    </div>
  );
}