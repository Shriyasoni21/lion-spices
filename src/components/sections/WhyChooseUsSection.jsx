import React from 'react';
import { motion } from 'framer-motion';
import { FiAward, FiSmile, FiTruck, FiShield } from 'react-icons/fi';

const features = [
  {
    id: 1,
    title: '30+ Years Trust',
    description: 'Decades of heritage sourcing and consistent premium quality.',
    icon: FiAward,
    color: 'text-primary-red',
    bgColor: 'bg-primary-red/10'
  },
  {
    id: 2,
    title: '100% Pure',
    description: 'Pure vegetarian spice blends with no preservatives or artificial color.',
    icon: FiShield,
    color: 'text-green-600',
    bgColor: 'bg-green-100'
  },
  {
    id: 3,
    title: 'Hygienically Packed',
    description: 'Sealed fresh in modern facilities for safety and aroma retention.',
    icon: FiShield,
    color: 'text-blue-600',
    bgColor: 'bg-blue-100'
  },
  {
    id: 4,
    title: 'Fast Delivery',
    description: 'Reliable delivery that brings premium spices straight to your kitchen.',
    icon: FiTruck,
    color: 'text-orange-500',
    bgColor: 'bg-orange-100'
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
    <section className="relative overflow-hidden bg-gradient-to-b from-white to-cream py-8 sm:py-10 lg:py-12">
      <motion.div
        className="absolute top-1/4 right-0 h-72 w-72 rounded-full bg-gradient-radial from-primary-red/10 to-transparent blur-3xl"
        animate={{ y: [0, 50, 0] }}
        transition={{ duration: 8, repeat: Infinity }}
      />
      <div className="absolute bottom-1/4 left-0 h-72 w-72 rounded-full bg-gradient-radial from-turmeric/10 to-transparent blur-3xl" />

      <div className="relative z-10 container-custom">
        <motion.div
          className="mb-4 text-center sm:mb-6 lg:mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: '-100px' }}
        >
          <p className="subheading mb-2 text-xs text-primary-red sm:mb-3 sm:text-sm">Our Promise</p>
          <h2 className="mb-2 text-2xl font-extrabold text-gray-900 sm:mb-3 sm:text-3xl lg:text-4xl">
            Why Lion Spices
          </h2>
          <p className="mx-auto max-w-3xl text-xs font-light leading-relaxed text-gray-600 sm:text-sm lg:text-base">
            Traditional Indian spices made using carefully selected ingredients and modern hygiene standards. Every spice is a promise of authenticity, purity, and quality.
          </p>
        </motion.div>

        <motion.div
          className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4"
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
                className="group relative"
                variants={itemVariants}
                whileHover={{ y: -2 }}
              >
                <div className="rounded-[24px] border border-gray-100 bg-white p-4 shadow-sm transition duration-300 group-hover:shadow-md">
                  <div className={`mb-3 flex h-10 w-10 items-center justify-center rounded-2xl ${feature.bgColor} ${feature.color}`}>
                    <IconComponent className="h-5 w-5" />
                  </div>

                  <h3 className="text-sm font-semibold text-gray-900">{feature.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-gray-600">{feature.description}</p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

      </div>
    </section>
  );
};

export default WhyChooseUsSection;

