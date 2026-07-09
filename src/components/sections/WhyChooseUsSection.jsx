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
    <section className="relative overflow-hidden bg-gradient-to-b from-white to-cream py-10 sm:py-16 lg:py-20">
      <motion.div
        className="absolute top-1/4 right-0 h-80 w-80 rounded-full bg-gradient-radial from-primary-red/10 to-transparent blur-3xl"
        animate={{ y: [0, 50, 0] }}
        transition={{ duration: 8, repeat: Infinity }}
      />
      <div className="absolute bottom-1/4 left-0 h-80 w-80 rounded-full bg-gradient-radial from-turmeric/10 to-transparent blur-3xl" />

      <div className="relative z-10 container-custom">
        <motion.div
          className="mb-8 text-center sm:mb-12 lg:mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: '-100px' }}
        >
          <p className="subheading mb-3 text-primary-red">Our Promise</p>
          <h2 className="mb-4 text-3xl font-extrabold text-gray-900 sm:mb-6 sm:text-4xl md:text-5xl">
            Why Choose <span className="text-primary-red">Lion Spices</span>
          </h2>
          <p className="mx-auto max-w-3xl text-base font-light leading-relaxed text-gray-600 sm:text-lg">
            Traditional Indian spices made using carefully selected ingredients and modern hygiene standards. Every spice is a promise of authenticity, purity, and quality.
          </p>
        </motion.div>

        <motion.div
          className="relative grid grid-cols-2 gap-2 sm:gap-4 md:grid-cols-2 lg:grid-cols-4"
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
                <motion.div
                  className="absolute inset-0 rounded-3xl bg-white opacity-0 shadow-lg transition-opacity duration-300 group-hover:opacity-100"
                  initial={{ opacity: 0 }}
                />

                <div className="relative flex h-full flex-col rounded-[18px] border border-gray-100 p-3 transition-shadow duration-300 group-hover:shadow-xl sm:rounded-2xl sm:p-4 lg:p-5">
                  <motion.div
                    className={`mb-3 flex h-10 w-10 items-center justify-center rounded-2xl ${feature.bgColor} ${feature.color} shadow-sm sm:mb-4 sm:h-12 sm:w-12 sm:rounded-2xl`}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ duration: 0.3 }}
                  >
                    <IconComponent className="h-5 w-5 sm:h-8 sm:w-8" />
                  </motion.div>

                  <h3 className="mb-1 text-sm font-bold text-gray-900 sm:mb-2 sm:text-base">
                    {feature.title}
                  </h3>

                  <p className="flex-grow text-xs leading-relaxed text-gray-600 sm:text-sm">
                    {feature.description}
                  </p>

                  <motion.div
                    className="mt-4 flex items-center gap-2 font-semibold text-primary-red sm:mt-6"
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    <span className="text-base sm:text-lg">✓</span>
                    <span className="text-xs sm:text-sm">Premium Quality</span>
                  </motion.div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        <motion.div
          className="mt-8 border-t border-gray-200 pt-8 text-center sm:mt-12 sm:pt-12 lg:mt-16 lg:pt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <p className="text-base text-gray-600 sm:text-lg">
            Trusted by <span className="font-bold text-primary-red">10,000+</span> happy customers for premium quality.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default WhyChooseUsSection;

