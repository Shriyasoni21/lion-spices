import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiMail, FiArrowRight } from 'react-icons/fi';

const NewsletterSection = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  return (
    <section className="py-20 md:py-28 bg-gradient-to-r from-primary-red via-primary-red/95 to-primary-red relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/5 rounded-full blur-3xl pointer-events-none"></div>

      {/* Floating spice icons */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[1, 2, 3].map((item) => (
          <motion.div
            key={item}
            className="absolute text-6xl opacity-5"
            animate={{ y: [0, -30, 0], rotate: [0, 20, 0] }}
            transition={{ duration: 8, delay: item * 2, repeat: Infinity }}
            style={{ top: `${item * 25}%`, left: `${item * 30}%` }}
          >
            ✦
          </motion.div>
        ))}
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: '-100px' }}
        >
          {/* Main Heading */}
          <motion.h2
            className="text-4xl md:text-5xl font-extrabold text-white mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Get <span className="text-turmeric">10% OFF</span> Your First Order
          </motion.h2>

          {/* Subheading */}
          <motion.p
            className="text-white/90 text-lg mb-2"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            Join our community for exclusive recipes, special offers and product launches
          </motion.p>

          <motion.p
            className="text-white/70 text-base mb-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            ✓ No spam • Unsubscribe anytime • Plus exclusive member-only deals
          </motion.p>

          {/* Newsletter Form */}
          <motion.form
            onSubmit={handleSubscribe}
            className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <div className="flex-1 relative">
              <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white/95 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-turmeric focus:bg-white transition-all"
                required
              />
            </div>

            <motion.button
              type="submit"
              className="bg-turmeric hover:bg-turmeric-dark text-dark-brown px-8 py-4 rounded-2xl font-bold shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 whitespace-nowrap"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {subscribed ? '✓ Subscribed!' : (
                <>
                  Subscribe
                  <FiArrowRight className="w-5 h-5" />
                </>
              )}
            </motion.button>
          </motion.form>

          {/* Success Message */}
          {subscribed && (
            <motion.div
              className="mt-6 inline-block bg-white/20 backdrop-blur-sm border border-white/30 rounded-2xl px-6 py-3 text-white"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              Thank you! Check your email for your 10% discount code.
            </motion.div>
          )}

          {/* Trust Indicators */}
          <motion.div
            className="mt-12 flex flex-wrap justify-center items-center gap-6 pt-8 border-t border-white/20"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            <div className="flex items-center gap-2 text-white/80">
              <span className="text-xl">🔒</span>
              <span className="text-sm">Secure</span>
            </div>
            <div className="flex items-center gap-2 text-white/80">
              <span className="text-xl">✓</span>
              <span className="text-sm">Trusted by 5000+ customers</span>
            </div>
            <div className="flex items-center gap-2 text-white/80">
              <span className="text-xl">📧</span>
              <span className="text-sm">Weekly tips & recipes</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default NewsletterSection;
