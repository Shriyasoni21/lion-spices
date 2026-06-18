import React from 'react';
import { motion } from 'framer-motion';
import { Leaf, Sparkles, Shield, Package, Truck } from 'lucide-react';
import { sourcingSteps } from '../../data/productData';

const SourceJourneySection = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };

  const iconMap = [Leaf, Sparkles, Shield, Package, Truck];

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.6 }
    }
  };

  return (
    <section className="py-20 md:py-28 bg-gradient-to-b from-cream to-white relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-20 right-0 w-96 h-96 bg-primary-red/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: '-100px' }}
        >
          <p className="text-primary-red font-semibold text-sm uppercase tracking-wider mb-3">
            Our Process
          </p>
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6">
            How We Source <span className="text-primary-red">Your Spices</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            From farm selection to your doorstep, we ensure every step maintains premium quality
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Timeline Line */}
          <motion.div
            className="hidden lg:block absolute left-0 right-0 top-32 h-1 bg-gradient-to-r from-primary-red via-turmeric to-primary-red"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ duration: 1.2 }}
            viewport={{ once: true }}
            style={{ originX: 0 }}
          />

          {/* Timeline Items */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 md:gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
          >
            {sourcingSteps.map((step, idx) => (
              <motion.div
                key={step.id}
                className="relative"
                variants={itemVariants}
              >
                {/* Icon Connector */}
                <motion.div
                  className="flex justify-center mb-6"
                  whileHover={{ scale: 1.06, rotate: -2 }}
                >
                  <div className="relative flex h-24 w-24 items-center justify-center rounded-full border border-red-100 bg-gradient-spice shadow-premium">
                    {React.createElement(iconMap[idx] || Shield, { className: 'h-9 w-9 text-white' })}

                    {/* Rotating Border */}
                    <motion.div
                      className="absolute inset-0 rounded-full border-2 border-transparent border-t-white border-r-white"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                    />
                  </div>
                </motion.div>

                {/* Content Card */}
                <motion.div
                  className="card-premium flex h-full flex-col p-6 text-center"
                  whileHover={{ y: -8, boxShadow: '0 18px 40px -18px rgba(220, 38, 38, 0.35)' }}
                  transition={{ duration: 0.3 }}
                >
                  <h3 className="mb-3 text-xl font-bold text-gray-900">
                    {step.title}
                  </h3>
                  <p className="mt-auto text-sm leading-relaxed text-gray-600">
                    {step.description}
                  </p>
                </motion.div>

                {/* Arrow Connector (hidden on mobile) */}
                {idx < sourcingSteps.length - 1 && (
                  <motion.div
                    className="hidden lg:block absolute -right-4 top-24 w-8 h-8"
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <span className="text-2xl text-primary-red">›</span>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          className="mt-20 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <p className="text-gray-600 mb-6 text-lg">
            ✓ Quality assured at every step
          </p>
          <motion.button
            className="inline-flex items-center gap-2 bg-turmeric text-dark-brown px-8 py-4 rounded-2xl font-bold shadow-lg hover:shadow-xl transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            Learn More About Our Quality
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default SourceJourneySection;
