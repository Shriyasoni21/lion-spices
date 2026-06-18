import React from 'react';
import { motion } from 'framer-motion';

const PromoSection = () => {
  return (
    <section className="relative overflow-hidden bg-black text-white py-24">
      <div className="absolute inset-0 bg-gradient-to-br from-black via-charcoal to-black opacity-95" />
      <div className="absolute top-0 left-1/2 w-80 h-80 bg-saffron/10 rounded-full blur-3xl -translate-x-1/2" />
      <div className="absolute bottom-0 right-24 w-72 h-72 bg-orange-500/10 rounded-full blur-3xl" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(255,140,66,0.18),_transparent_35%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,_rgba(255,255,255,0.06),_transparent_30%)]" />

      <div className="container-custom relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <motion.div
            className="space-y-8 max-w-xl"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <p className="subheading text-saffron">Limited-Time Experience</p>
            <h2 className="heading-luxury text-white leading-tight">
              Monsoon Sale in Cinematic Black
            </h2>
            <p className="text-gray-300 text-lg font-light leading-relaxed">
              Experience an elevated spice sale with rich aromas, glowing packaging, and premium savings.
            </p>
            <motion.button
              className="btn-primary"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Shop the Sale
            </motion.button>
          </motion.div>

          <motion.div
            className="grid grid-cols-2 gap-6"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            {['Spice Smoke', 'Orange Glow', 'Glass Cards', 'Premium Picks'].map((label, index) => (
              <motion.div
                key={index}
                className="glass bg-white/10 border border-white/10 rounded-3xl p-6 min-h-[180px] flex flex-col justify-between"
                whileHover={{ y: -8, scale: 1.02 }}
                transition={{ duration: 0.4 }}
              >
                <p className="text-xs uppercase tracking-[0.3em] text-saffron font-semibold mb-3">
                  {label}
                </p>
                <div className="space-y-4">
                  <p className="text-white font-semibold text-xl">{label}</p>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    {label === 'Spice Smoke'
                      ? 'Subtle smoky accents and premium spice ambiance.'
                      : label === 'Orange Glow'
                      ? 'Warm saffron highlights that glow across the layout.'
                      : label === 'Glass Cards'
                      ? 'Elegant glassmorphism details and luxury surfaces.'
                      : 'Curated premium products for the modern gourmet.'}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        <motion.div
          className="mt-16 grid grid-cols-2 gap-4 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          {['05', '12', '34', '56'].map((value, index) => (
            <div key={index} className="glass bg-white/10 border border-white/10 rounded-3xl p-6">
              <p className="text-4xl font-bold text-white">{value}</p>
              <p className="text-sm uppercase tracking-[0.3em] text-gray-400 mt-2">
                {index === 0
                  ? 'Days'
                  : index === 1
                  ? 'Hours'
                  : index === 2
                  ? 'Minutes'
                  : 'Seconds'}
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default PromoSection;
