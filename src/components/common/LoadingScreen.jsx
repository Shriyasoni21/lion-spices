import React from 'react';
import { motion } from 'framer-motion';
import { imageAssets } from '../../config/imageAssets';
import ImageWithFallback from './ImageWithFallback';

export default function LoadingScreen() {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#fffaf5]">
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col items-center rounded-[32px] border border-gray-100 bg-white px-8 py-10 text-center shadow-[0_24px_60px_-25px_rgba(15,23,42,0.25)]">
        <ImageWithFallback src={imageAssets.logo.main} alt="Lion Spices logo" className="h-16 w-auto object-contain" loading="eager" />
        <p className="mt-5 text-sm font-semibold uppercase tracking-[0.28em] text-primary-red">Loading</p>
        <p className="mt-2 text-lg font-semibold text-gray-900">Preparing your spice experience</p>
      </motion.div>
    </div>
  );
}
