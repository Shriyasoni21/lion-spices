import React from 'react';
import { Link } from 'react-router-dom';
import { imageAssets } from '../../config/imageAssets';
import ImageWithFallback from './ImageWithFallback';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-950 text-gray-300">
      <div className="container-custom py-8 sm:py-10">
        {/* Logo & Name */}
        <div className="flex items-center justify-center gap-2 mb-3">
          <ImageWithFallback src={imageAssets.logo.main} alt="Lion Spices logo" className="h-7 w-auto object-contain" loading="lazy" />
          <span className="text-xs font-semibold uppercase tracking-[0.18em] text-white">Lion Spices</span>
        </div>

        {/* Tagline */}
        <p className="text-xs text-gray-400 leading-relaxed text-center max-w-lg mx-auto mb-4">
          Bringing purity, tradition and premium taste to every Indian kitchen.
        </p>

        {/* Contact Info */}
        <div className="text-center text-xs text-gray-400 space-y-1 mb-4">
          <div>
            <a href="tel:+919010782782" className="hover:text-white transition">+91 90107 82782</a>
            {' • '}
            <span>Hyderabad, India</span>
          </div>
          <div>
            <a href="mailto:krishloya789@gmail.com" className="hover:text-white transition">krishloya789@gmail.com</a>
          </div>
        </div>

        {/* Legal Links */}
        <div className="text-center text-xs text-gray-400 space-y-1 mb-4">
          <div>
            <Link to="/privacy" className="hover:text-white transition">Privacy Policy</Link>
            {' • '}
            <Link to="/terms" className="hover:text-white transition">Terms & Conditions</Link>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center text-xs text-gray-500 border-t border-white/5 pt-3">
          © {currentYear} Lion Spices. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
}
