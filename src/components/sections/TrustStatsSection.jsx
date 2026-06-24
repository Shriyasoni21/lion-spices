import React from 'react';
import { motion } from 'framer-motion';
import { FiAward, FiSmile, FiStar, FiShield } from 'react-icons/fi';

const TrustStatsSection = () => {
  const stats = [
    {
      id: 1,
      number: '30+',
      label: 'Years Experience',
      description: 'Decades of expertise in premium spice sourcing.',
      icon: FiAward,
      color: 'from-primary-red/10 to-primary-red/5',
      iconColor: 'text-primary-red'
    },
    {
      id: 2,
      number: '10000+',
      label: 'Happy Customers',
      description: 'Trusted by spice lovers across India.',
      icon: FiSmile,
      color: 'from-turmeric/10 to-turmeric/5',
      iconColor: 'text-turmeric'
    },
    {
      id: 3,
      number: '5+',
      label: 'Premium Products',
      description: 'Carefully selected authentic spice products.',
      icon: FiStar,
      color: 'from-yellow-400/10 to-yellow-300/5',
      iconColor: 'text-yellow-500'
    },
    {
      id: 4,
      number: '100%',
      label: 'Authentic Spices',
      description: 'Pure, natural, and sourced directly from trusted farms.',
      icon: FiShield,
      color: 'from-green-500/10 to-green-400/5',
      iconColor: 'text-green-600'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.15
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-white relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-primary-red/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-turmeric/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12 sm:mb-16 lg:mb-20">
          <motion.h2
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 leading-tight"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
          >
            Why Trust <span className="text-primary-red">Lion Spices</span>
          </motion.h2>
          <motion.p
            className="mt-4 text-gray-600 text-base sm:text-lg max-w-2xl mx-auto"
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Built on heritage, trust, and authentic Indian flavors.
          </motion.p>
        </div>

        <motion.div
          className="grid grid-cols-2 gap-4 sm:grid-cols-2 lg:grid-cols-4 sm:gap-6 lg:gap-8"
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
                className={`group relative h-full rounded-2xl p-6 sm:p-8 bg-gradient-to-br ${stat.color} border border-gray-200/80 hover:border-gray-300 transition-all duration-300 hover:shadow-lg hover:-translate-y-1`}
                variants={cardVariants}
              >
                <div className={`inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-white/70 group-hover:bg-white transition-all duration-300 mb-4 ${stat.iconColor}`}>
                  <IconComponent className="w-7 h-7" />
                </div>

                <div className="mb-3">
                  <p className="text-4xl sm:text-5xl font-extrabold text-gray-900 leading-tight">
                    {stat.number}
                  </p>
                </div>

                <p className="text-lg sm:text-xl font-bold text-gray-900 mb-2">
                  {stat.label}
                </p>

                <p className="text-sm text-gray-600 leading-relaxed">
                  {stat.description}
                </p>

                <div className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-primary-red/60 via-turmeric/40 to-transparent rounded-bl-2xl w-0 group-hover:w-full transition-all duration-500" />
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default TrustStatsSection;
