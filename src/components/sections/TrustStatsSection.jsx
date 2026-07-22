import React from 'react';
import { motion } from 'framer-motion';
import { FiAward, FiSmile, FiTruck, FiShield, FiStar } from 'react-icons/fi';

const stats = [
  {
    id: 1,
    number: '5,000+',
    label: 'Happy Customers',
    description: 'Loved by kitchens across India.',
    icon: FiSmile,
    color: 'from-primary-red/10 to-primary-red/5',
    iconColor: 'text-primary-red',
  },
  {
    id: 2,
    number: '30+',
    label: 'Years of Trust',
    description: 'Decades of heritage spice craftsmanship.',
    icon: FiAward,
    color: 'from-turmeric/10 to-turmeric/5',
    iconColor: 'text-turmeric',
  },
  {
    id: 3,
    number: 'Fast',
    label: 'Fast Delivery',
    description: 'Reliable delivery to homes across India.',
    icon: FiTruck,
    color: 'from-orange-200/10 to-orange-100/5',
    iconColor: 'text-orange-500',
  },
  {
    id: 4,
    number: '100%',
    label: 'Pure Veg',
    description: 'Clean, vegetarian ingredients with no additives.',
    icon: FiShield,
    color: 'from-green-500/10 to-green-400/5',
    iconColor: 'text-green-600',
  },
  {
    id: 5,
    number: 'Premium',
    label: 'Premium Quality',
    description: 'Curated spices for a luxurious cooking experience.',
    icon: FiStar,
    color: 'from-yellow-400/10 to-yellow-300/5',
    iconColor: 'text-yellow-500',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.15,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
};

const TrustStatsSection = () => {
  return (
    <section className="relative overflow-hidden bg-white py-6 sm:py-12 lg:py-20">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute right-0 top-1/4 h-96 w-96 rounded-full bg-primary-red/5 blur-3xl" />
        <div className="absolute bottom-1/4 left-0 h-96 w-96 rounded-full bg-turmeric/5 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-6 text-center sm:mb-8 lg:mb-10">
          <motion.h2
            className="text-2xl font-extrabold leading-tight text-gray-900 sm:text-3xl lg:text-5xl"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
          >
            Built on trust, quality and authentic flavour.
          </motion.h2>
          <motion.p
            className="mx-auto mt-3 max-w-2xl text-sm text-gray-600 sm:text-base lg:text-lg"
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Lion Spices blends heritage sourcing with premium quality for a confident kitchen experience.
          </motion.p>
        </div>

        <motion.div
          className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5 lg:gap-5"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          {stats.map((stat) => {
            const IconComponent = stat.icon;
            return (
              <motion.div
                key={stat.id}
                className={`group relative rounded-[28px] border border-gray-200/80 bg-gradient-to-br ${stat.color} p-5 transition duration-300 hover:-translate-y-1 hover:shadow-[0_25px_55px_-30px_rgba(15,23,42,0.25)]`}
                variants={cardVariants}
              >
                <div className={`mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-white/80 ${stat.iconColor} sm:h-14 sm:w-14`}>
                  <IconComponent className="h-6 w-6 sm:h-7 sm:w-7" />
                </div>
                <p className="text-3xl font-extrabold text-gray-900 sm:text-4xl">{stat.number}</p>
                <p className="mt-2 text-sm font-semibold text-gray-900 sm:text-base">{stat.label}</p>
                <p className="mt-3 text-sm leading-6 text-gray-600">{stat.description}</p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default TrustStatsSection;
