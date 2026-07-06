import React from 'react';
import { motion } from 'framer-motion';
import { FiCheck, FiSlash, FiShield, FiTrendingUp } from 'react-icons/fi';

const features = [
  {
    id: 1,
    title: '100% Pure',
    description: 'Handpicked spices without any additives, preserving natural flavor and aroma.',
    icon: FiCheck,
    color: 'text-green-600',
    bgColor: 'bg-green-100'
  },
  {
    id: 2,
    title: 'No Artificial Colors',
    description: 'We never use artificial colors or preservatives in any of our products.',
    icon: FiSlash,
    color: 'text-red-600',
    bgColor: 'bg-red-100'
  },
  {
    id: 3,
    title: 'Hygienically Packed',
    description: 'Processed and packed in certified hygienic facilities with quality checks.',
    icon: FiShield,
    color: 'text-blue-600',
    bgColor: 'bg-blue-100'
  },
  {
    id: 4,
    title: 'Farm Fresh Ingredients',
    description: 'Sourced directly from farmers to ensure freshness and complete traceability.',
    icon: FiTrendingUp,
    color: 'text-green-700',
    bgColor: 'bg-green-100'
  }
];

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

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 }
  }
};

const WhyChooseUsSection = () => {
  return (
    <section className="section-padding-lg bg-gradient-to-b from-white to-cream relative overflow-hidden">
      {/* Background decorative elements */}
      <motion.div
        className="absolute top-1/4 right-0 w-80 h-80 bg-gradient-radial from-primary-red/10 to-transparent rounded-full blur-3xl"
        animate={{ y: [0, 50, 0] }}
        transition={{ duration: 8, repeat: Infinity }}
      />
      <div className="absolute bottom-1/4 left-0 w-80 h-80 bg-gradient-radial from-turmeric/10 to-transparent rounded-full blur-3xl" />

      <div className="container-custom relative z-10">
        {/* Section Header */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: '-100px' }}
        >
          <p className="subheading text-primary-red mb-4">Our Promise</p>
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6">
            Why Choose <span className="text-primary-red">Lion Spices</span>
          </h2>
          <p className="text-gray-600 max-w-3xl mx-auto text-lg font-light leading-relaxed">
            Traditional Indian spices made using carefully selected ingredients and modern hygiene standards. Every spice is a promise of authenticity, purity, and quality.
          </p>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          {features.map((feature) => {
            const IconComponent = feature.icon;
            return (
              <motion.div
                key={feature.id}
                className="group relative h-full"
                variants={itemVariants}
                whileHover={{ y: -10 }}
              >
                {/* Hover Background */}
                <motion.div
                  className="absolute inset-0 bg-white rounded-3xl shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  initial={{ opacity: 0 }}
                />

                {/* Card Content */}
                <div className="relative card-premium p-8 rounded-3xl border border-gray-100 h-full flex flex-col group-hover:shadow-xl transition-shadow duration-300">
                  {/* Icon Container */}
                  <motion.div
                    className={`w-16 h-16 mb-6 rounded-3xl ${feature.bgColor} ${feature.color} flex items-center justify-center shadow-lg`}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ duration: 0.3 }}
                  >
                    <IconComponent className="w-8 h-8" />
                  </motion.div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {feature.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-600 leading-relaxed flex-grow">
                    {feature.description}
                  </p>

                  {/* Check Mark */}
                  <motion.div
                    className="mt-6 flex items-center gap-2 text-primary-red font-semibold"
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    <span className="text-2xl">✓</span>
                    <span>Premium Quality</span>
                  </motion.div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Bottom Trust Statement */}
        <motion.div
          className="mt-20 pt-16 border-t border-gray-200 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <p className="text-lg text-gray-600">
            Trusted by <span className="font-bold text-primary-red">10,000+</span> happy customers for premium quality.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default WhyChooseUsSection;

