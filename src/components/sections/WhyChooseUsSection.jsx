import React from 'react';
import { motion } from 'framer-motion';
import { FiCheckCircle, FiShield, FiSlash, FiPackage, FiStar, FiDroplet, FiAward } from 'react-icons/fi';

const features = [
  {
    id: 1,
    title: '100% Pure',
    description: 'Handpicked spices without additives, preserving natural aroma and depth.',
    icon: FiCheckCircle,
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
    description: 'Processed and packed in certified hygienic facilities with strict quality checks.',
    icon: FiShield,
    color: 'text-blue-600',
    bgColor: 'bg-blue-100'
  },
  {
    id: 4,
    title: 'Farm Fresh Ingredients',
    description: 'Sourced directly from trusted farms to ensure freshness and traceability.',
    icon: FiDroplet,
    color: 'text-green-700',
    bgColor: 'bg-green-100'
  },
  {
    id: 5,
    title: 'FSSAI Certified',
    description: 'Manufactured under strict food safety and hygiene standards.',
    icon: FiAward,
    color: 'text-amber-600',
    bgColor: 'bg-amber-100'
  },
  {
    id: 6,
    title: 'AGMARK Quality',
    description: 'Trusted quality assurance for authentic Indian spice standards.',
    icon: FiPackage,
    color: 'text-purple-600',
    bgColor: 'bg-purple-100'
  },
  {
    id: 7,
    title: 'Premium Quality',
    description: 'A polished blend of tradition, texture, and consistency in every pack.',
    icon: FiStar,
    color: 'text-primary-red',
    bgColor: 'bg-red-100'
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
    <section className="relative overflow-hidden bg-gradient-to-b from-white to-cream py-6 sm:py-12 lg:py-20">
      <motion.div
        className="absolute top-1/4 right-0 h-80 w-80 rounded-full bg-gradient-radial from-primary-red/10 to-transparent blur-3xl"
        animate={{ y: [0, 50, 0] }}
        transition={{ duration: 8, repeat: Infinity }}
      />
      <div className="absolute bottom-1/4 left-0 h-80 w-80 rounded-full bg-gradient-radial from-turmeric/10 to-transparent blur-3xl" />

      <div className="relative z-10 container-custom">
        <motion.div
          className="mb-4 text-center sm:mb-8 lg:mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: '-100px' }}
        >
          <p className="subheading mb-2 text-xs text-primary-red sm:mb-3 sm:text-sm">Our Promise</p>
          <h2 className="mb-2 text-2xl font-extrabold text-gray-900 sm:mb-4 sm:text-3xl lg:mb-6 lg:text-5xl">
            Why Choose <span className="text-primary-red">Lion Spices</span>
          </h2>
          <p className="mx-auto max-w-3xl text-xs font-light leading-relaxed text-gray-600 sm:text-sm lg:text-base">
            Traditional Indian spices made using carefully selected ingredients and modern hygiene standards. Every spice is a promise of authenticity, purity, and quality.
          </p>
        </motion.div>

        <motion.div
          className="relative grid grid-cols-2 gap-2 sm:gap-3 lg:grid-cols-4 lg:gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          {features.slice(0, 6).map((feature) => {
            const IconComponent = feature.icon;
            return (
              <motion.div
                key={feature.id}
                className="group relative h-full"
                variants={itemVariants}
                whileHover={{ y: -5 }}
              >
                <motion.div
                  className="absolute inset-0 rounded-xl bg-white opacity-0 shadow-sm transition-opacity duration-300 group-hover:opacity-100 sm:rounded-2xl lg:rounded-3xl"
                  initial={{ opacity: 0 }}
                />

                <div className="relative flex h-full flex-col rounded-xl border border-gray-100 p-2 transition-shadow duration-300 group-hover:shadow-md sm:rounded-lg sm:p-3 lg:rounded-2xl lg:p-5">
                  <motion.div
                    className={`mb-1.5 flex h-8 w-8 items-center justify-center rounded-lg ${feature.bgColor} ${feature.color} shadow-sm sm:mb-2 sm:h-10 sm:w-10 sm:rounded-xl lg:h-12 lg:w-12 lg:rounded-2xl`}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ duration: 0.3 }}
                  >
                    <IconComponent className="h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6" />
                  </motion.div>

                  <h3 className="mb-0.5 text-xs font-bold text-gray-900 sm:mb-1 sm:text-sm lg:text-base">
                    {feature.title}
                  </h3>

                  <p className="flex-grow text-[0.65rem] leading-tight text-gray-600 sm:text-xs lg:text-sm">
                    {feature.description}
                  </p>

                  <motion.div
                    className="mt-1.5 flex items-center gap-1 font-semibold text-primary-red sm:mt-2 lg:mt-3"
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    <span className="text-xs sm:text-sm lg:text-base">✓</span>
                    <span className="text-[0.65rem] sm:text-xs lg:text-sm">Premium</span>
                  </motion.div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        <motion.div
          className="mt-4 border-t border-gray-200 pt-4 text-center sm:mt-6 sm:pt-6 lg:mt-12 lg:pt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <p className="text-xs text-gray-600 sm:text-sm lg:text-base">
            Trusted by <span className="font-bold text-primary-red">10,000+</span> happy customers for premium quality.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default WhyChooseUsSection;

