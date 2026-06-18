import React from 'react';
import { motion } from 'framer-motion';
import { FiMessageCircle } from 'react-icons/fi';

export default function FloatingWhatsApp() {
  const whatsappNumber = '919010782782';
  const message = 'Hi! I would like to know more about your spices.';

  return (
    <motion.a
      href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-4 z-50 rounded-full bg-black/90 p-4 text-saffron shadow-luxury-xl transition-colors hover:bg-black md:bottom-8 md:right-8 border border-saffron/30"
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <motion.div
        className="relative"
        animate={{ scale: [1, 1.15, 1], opacity: [0.8, 1, 0.8] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      >
        <FiMessageCircle className="w-6 h-6" />
        <span className="absolute inset-0 rounded-full border border-saffron/30 opacity-70 animate-pulse" />
      </motion.div>
    </motion.a>
  );
}
