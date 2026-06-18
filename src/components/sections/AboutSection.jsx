import React from 'react';
import { motion } from 'framer-motion';
import { useLocation, useNavigate } from 'react-router-dom';
import { imageAssets } from '../../config/imageAssets';

export default function AboutSection() {
  const location = useLocation();
  const navigate = useNavigate();

  const handleScrollToAbout = () => {
    if (location.pathname === '/') {
      const target = document.getElementById('about');
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        return;
      }
    }
    navigate('/#about');
  };

  const stats = [
    { id: 1, value: '10+', label: 'Years Experience', icon: '🏆' },
    { id: 2, value: '5000+', label: 'Happy Customers', icon: '😊' },
    { id: 3, value: '100%', label: 'Natural Products', icon: '🌾' },
    { id: 4, value: '50+', label: 'Product Range', icon: '🌶️' }
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
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.6 }
    }
  };

  return (
    <section id="about" className="py-16 md:py-20 bg-white relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-primary-red/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left - Content */}
          <motion.div
            className="text-center lg:text-left"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: '-100px' }}
          >
            <motion.p
              className="text-primary-red font-semibold text-sm uppercase tracking-wider mb-3"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              Our Story
            </motion.p>

            <motion.h2
              className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              Authentic spices, <span className="text-primary-red">premium presentation</span>
            </motion.h2>

            <motion.p
              className="text-gray-600 text-lg leading-relaxed mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              Lion Spices crafts traditional Indian masalas and whole spices with strict quality checks and premium hygiene. We partner with trusted sources to deliver fresh, flavorful ingredients to your kitchen, ensuring every purchase brings authentic taste and aroma to your home.
            </motion.p>

            <motion.ul
              className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              {[
                'Authentic sourcing from certified farms',
                'Premium quality certifications',
                'Small-batch traditional roasting',
                'Sustainable & eco-friendly practices'
              ].map((item, idx) => (
                <motion.li
                  key={idx}
                  className="flex items-start gap-3"
                  whileHover={{ x: 5 }}
                >
                  <span className="text-2xl text-primary-red mt-1">✓</span>
                  <span className="text-gray-700 font-medium">{item}</span>
                </motion.li>
              ))}
            </motion.ul>

            <motion.button
              onClick={handleScrollToAbout}
              className="bg-gradient-spice text-white px-8 py-4 rounded-2xl font-bold shadow-premium hover:shadow-premium-lg transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              Learn More About Our Story
            </motion.button>
          </motion.div>

          {/* Right - Image & Decorative */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: '-100px' }}
          >
            {/* Decorative Background Shape */}
            <motion.div
              className="absolute -inset-8 bg-gradient-spice/10 rounded-3xl"
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            />

            {/* Image Container */}
            <div className="relative mx-auto w-full max-w-sm overflow-hidden rounded-3xl shadow-2xl border border-gray-100 sm:max-w-md lg:max-w-lg">
              <div className="relative bg-white p-4 rounded-3xl">
                <img
                  src={imageAssets.about.hero}
                  alt="About Lion Spices"
                  className="w-full h-full rounded-[24px] object-contain"
                />
              </div>

              {/* Decorative Spice Pattern Overlay */}
              <div className="absolute inset-0 bg-gradient-to-tr from-primary-red/20 to-transparent pointer-events-none"></div>

              {/* Floating Stats Badges */}
              <motion.div
                className="absolute bottom-6 left-6 bg-white rounded-2xl p-4 shadow-lg"
                animate={{ y: [-10, 10, -10] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <p className="text-2xl font-bold text-primary-red">4.9★</p>
                <p className="text-xs text-gray-600">Rating</p>
              </motion.div>

              <motion.div
                className="absolute top-6 right-6 bg-white rounded-2xl p-4 shadow-lg"
                animate={{ y: [10, -10, 10] }}
                transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
              >
                <p className="text-2xl font-bold text-turmeric">5000+</p>
                <p className="text-xs text-gray-600">Customers</p>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Statistics Section */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-20 pt-20 border-t border-gray-200"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          {stats.map((stat) => (
            <motion.div
              key={stat.id}
              className="card-premium p-8 text-center"
              variants={itemVariants}
              whileHover={{ y: -5 }}
            >
              <motion.p
                className="text-4xl mb-2"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                {stat.icon}
              </motion.p>
              <p className="text-3xl font-bold text-primary-red mb-2">
                {stat.value}
              </p>
              <p className="text-gray-600 font-medium">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
