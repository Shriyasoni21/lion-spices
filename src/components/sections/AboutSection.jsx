import React from 'react';
import { motion } from 'framer-motion';
import { useLocation, useNavigate } from 'react-router-dom';
import { imageAssets } from '../../config/imageAssets';
import ImageWithFallback from '../common/ImageWithFallback';

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
    <section id="about" className="relative overflow-hidden bg-white py-10 sm:py-16 md:py-20">
      <div className="pointer-events-none absolute left-0 top-0 h-96 w-96 rounded-full bg-primary-red/5 blur-3xl"></div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-6 lg:grid-cols-2 lg:gap-12">
          <motion.div
            className="text-center lg:text-left"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: '-100px' }}
          >
            <motion.p
              className="mb-3 text-sm font-semibold uppercase tracking-wider text-primary-red"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              Our Story
            </motion.p>

            <motion.h2
              className="mb-4 text-3xl font-extrabold text-gray-900 sm:mb-6 sm:text-4xl md:text-5xl"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              Authentic spices, <span className="text-primary-red">premium presentation</span>
            </motion.h2>

            <motion.p
              className="mb-5 text-base leading-relaxed text-gray-600 sm:mb-6 sm:text-lg"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              Lion Spices crafts traditional Indian masalas and whole spices with strict quality checks and premium hygiene. We partner with trusted sources to deliver fresh, flavorful ingredients to your kitchen, ensuring every purchase brings authentic taste and aroma to your home.
            </motion.p>

            <motion.ul
              className="mb-6 grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4"
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
                  <span className="mt-1 text-xl text-primary-red">✓</span>
                  <span className="text-sm font-medium text-gray-700 sm:text-base">{item}</span>
                </motion.li>
              ))}
            </motion.ul>

            <motion.button
              onClick={handleScrollToAbout}
              className="w-full rounded-2xl bg-gradient-spice px-6 py-3.5 font-bold text-white shadow-premium transition-all hover:shadow-premium-lg sm:w-auto sm:px-8 sm:py-4"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              Learn More About Our Story
            </motion.button>
          </motion.div>

          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: '-100px' }}
          >
            <motion.div
              className="absolute -inset-6 rounded-3xl bg-gradient-spice/10"
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            />

            <div className="relative mx-auto w-full max-w-sm overflow-hidden rounded-[24px] border border-gray-100 shadow-2xl sm:max-w-md lg:max-w-lg">
              <div className="relative rounded-[24px] bg-white p-3 sm:p-4">
                <ImageWithFallback
                  src={imageAssets.about.hero}
                  alt="About Lion Spices"
                  className="h-[220px] w-full rounded-[20px] object-contain sm:h-[320px] lg:h-full"
                  width={600}
                  height={450}
                />
              </div>

              <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-primary-red/20 to-transparent"></div>

              <motion.div
                className="absolute bottom-4 left-4 rounded-2xl bg-white p-3 shadow-lg sm:bottom-6 sm:left-6 sm:p-4"
                animate={{ y: [-10, 10, -10] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <p className="text-xl font-bold text-primary-red sm:text-2xl">4.9★</p>
                <p className="text-[11px] text-gray-600 sm:text-xs">Rating</p>
              </motion.div>

              <motion.div
                className="absolute right-4 top-4 rounded-2xl bg-white p-3 shadow-lg sm:right-6 sm:top-6 sm:p-4"
                animate={{ y: [10, -10, 10] }}
                transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
              >
                <p className="text-xl font-bold text-turmeric sm:text-2xl">5000+</p>
                <p className="text-[11px] text-gray-600 sm:text-xs">Customers</p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
