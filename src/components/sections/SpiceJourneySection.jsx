import React from 'react';
import { motion } from 'framer-motion';
import { FiArrowRight, FiMapPin, FiClock, FiPackage } from 'react-icons/fi';

const SpiceJourneySection = () => {
  const journeySteps = [
    {
      id: 1,
      title: 'Farm to Table',
      subtitle: 'Sourced from Hyderabad Farms',
      description: 'Our spices begin their journey in the fertile lands of Hyderabad, where farmers cultivate the finest ingredients with traditional methods.',
      icon: FiMapPin,
      image: 'https://images.unsplash.com/photo-1500651230702-0e2d8a49d4ad?w=600&h=400&fit=crop',
      color: 'from-green-500 to-emerald-600'
    },
    {
      id: 2,
      title: 'Traditional Drying',
      subtitle: 'Sun-Dried Perfection',
      description: 'Each spice is carefully sun-dried using age-old techniques that preserve natural flavors and aromas.',
      icon: FiClock,
      image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&h=400&fit=crop',
      color: 'from-yellow-500 to-orange-500'
    },
    {
      id: 3,
      title: 'Artisan Grinding',
      subtitle: 'Stone-Ground Quality',
      description: 'Our master grinders use traditional stone mills to achieve the perfect texture and release essential oils.',
      icon: FiPackage,
      image: 'https://images.unsplash.com/photo-1596040322976-6bba3b8a1ba4?w=600&h=400&fit=crop',
      color: 'from-red-500 to-pink-600'
    },
    {
      id: 4,
      title: 'Quality Packaging',
      subtitle: 'Sealed for Freshness',
      description: 'Every jar is hygienically packed and sealed to lock in freshness, aroma, and authentic flavors.',
      icon: FiPackage,
      image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&h=400&fit=crop',
      color: 'from-purple-500 to-indigo-600'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: 'easeOut',
      },
    },
  };

  return (
    <section className="section-padding-lg bg-beige-50 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-saffron/10 via-transparent to-gold/10" />
      </div>

      {/* Animated Spice Particles */}
      <motion.div
        className="absolute top-20 left-20 w-2 h-2 bg-saffron rounded-full opacity-20"
        animate={{
          y: [0, -20, 0],
          x: [0, 10, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{ duration: 4, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-32 right-32 w-3 h-3 bg-gold rounded-full opacity-15"
        animate={{
          y: [0, 15, 0],
          x: [0, -15, 0],
          scale: [1, 0.8, 1],
        }}
        transition={{ duration: 5, repeat: Infinity, delay: 1 }}
      />

      <div className="container-custom relative z-10">
        {/* Section Header */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <p className="subheading text-saffron mb-4">Our Heritage</p>
          <h2 className="heading-luxury text-charcoal mb-6">
            Inside The Spice Journey
          </h2>
          <p className="text-gray-600 max-w-3xl mx-auto text-lg font-light leading-relaxed">
            From the sun-kissed fields of Hyderabad to your kitchen, every Lion Spices product
            carries the legacy of generations of spice masters and the promise of authentic flavor.
          </p>
        </motion.div>

        {/* Journey Timeline */}
        <motion.div
          className="relative"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {/* Connecting Line */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-saffron via-gold to-cinnamon transform -translate-y-1/2 z-0" />

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-12 relative z-10">
            {journeySteps.map((step, index) => {
              const IconComponent = step.icon;
              const isEven = index % 2 === 0;

              return (
                <motion.div
                  key={step.id}
                  className={`group relative ${index < journeySteps.length - 1 ? 'lg:pb-16' : ''}`}
                  variants={itemVariants}
                >
                  {/* Step Number */}
                  <motion.div
                    className="absolute -top-4 -left-4 w-12 h-12 bg-gradient-saffron rounded-full flex items-center justify-center text-white font-bold text-lg shadow-luxury z-20"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.3 }}
                  >
                    {step.id}
                  </motion.div>

                  {/* Card */}
                  <motion.div
                    className="card-luxury p-6 h-full hover:shadow-luxury-xl transition-all duration-500"
                    whileHover={{ y: -12 }}
                    transition={{ duration: 0.3 }}
                  >
                    {/* Image */}
                    <div className="relative mb-6 overflow-hidden rounded-xl h-48">
                      <motion.img
                        src={step.image}
                        alt={step.title}
                        className="w-full h-full object-cover"
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.6, ease: 'easeOut' }}
                      />
                      <div className={`absolute inset-0 bg-gradient-to-t ${step.color} opacity-0 group-hover:opacity-20 transition-opacity duration-300`} />
                    </div>

                    {/* Icon */}
                    <div className="flex justify-center mb-4">
                      <motion.div
                        className="w-16 h-16 bg-gradient-saffron rounded-full flex items-center justify-center text-white shadow-lg"
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.6 }}
                      >
                        <IconComponent className="w-8 h-8" />
                      </motion.div>
                    </div>

                    {/* Content */}
                    <div className="text-center">
                      <h3 className="heading-tertiary text-charcoal mb-2">
                        {step.title}
                      </h3>
                      <p className="text-saffron font-semibold text-sm mb-3 uppercase tracking-wide">
                        {step.subtitle}
                      </p>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        {step.description}
                      </p>
                    </div>

                    {/* Arrow for desktop */}
                    {index < journeySteps.length - 1 && (
                      <motion.div
                        className="hidden lg:block absolute -right-6 top-1/2 transform -translate-y-1/2 z-30"
                        animate={{ x: [0, 10, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        <FiArrowRight className="w-6 h-6 text-saffron" />
                      </motion.div>
                    )}
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          className="text-center mt-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.button
            className="btn-primary inline-flex items-center gap-3"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Experience Our Heritage
            <FiArrowRight className="w-5 h-5" />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default SpiceJourneySection;