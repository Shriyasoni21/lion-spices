import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiMapPin, FiPhone, FiMail, FiInstagram, FiFacebook, FiTwitter } from 'react-icons/fi';
import { imageAssets } from '../../config/imageAssets';
import ImageWithFallback from './ImageWithFallback';

export default function Footer() {
  const quickLinks = [
    { label: 'Home', href: '/' },
    { label: 'Products', href: '/products' },
    { label: 'Recipes', href: '/recipes' },
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' }
  ];

  const productLinks = [
    { label: 'Red Chilli', href: '/products' },
    { label: 'Turmeric', href: '/products' },
    { label: 'Coriander', href: '/products' },
    { label: 'Rai Powder', href: '/products' }
  ];

  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden bg-gray-950 text-gray-300">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-72 bg-gradient-to-b from-primary-red/5 to-transparent" />
      <div className="relative z-10 mx-auto max-w-7xl px-6 py-12 sm:px-6 sm:py-16 lg:px-8">
        <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr_1fr]">
          <div className="space-y-5 text-center md:text-left">
            <div className="flex flex-col items-center gap-3 md:flex-row md:items-center">
              <ImageWithFallback src={imageAssets.logo.main} alt="Lion Spices logo" className="h-10 w-auto object-contain" loading="lazy" />
              <span className="text-lg font-bold uppercase tracking-[0.25em] text-white">Lion Spices</span>
            </div>
            <p className="mx-auto max-w-md text-sm leading-7 text-gray-400 md:mx-0">
              A premium Indian spice brand focused on authentic flavors, elegant packaging, and trusted kitchen delivery.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3 md:justify-start">
              {[
                { icon: FiInstagram, href: 'https://instagram.com' },
                { icon: FiFacebook, href: 'https://facebook.com' },
                { icon: FiTwitter, href: 'https://twitter.com' }
              ].map(({ icon: Icon, href }) => (
                <a key={href} href={href} target="_blank" rel="noreferrer" className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/5 text-gray-300 transition hover:bg-primary-red/10 hover:text-white">
                  <Icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-primary-red">Company</h3>
            <ul className="mt-5 space-y-3 text-sm text-gray-400">
              <li><Link to="/about" className="transition hover:text-white">About Us</Link></li>
              <li><Link to="/contact" className="transition hover:text-white">Contact</Link></li>
              <li><Link to="/privacy" className="transition hover:text-white">Privacy</Link></li>
              <li><Link to="/terms" className="transition hover:text-white">Terms</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-primary-red">Products</h3>
            <ul className="mt-5 space-y-3 text-sm text-gray-400">
              {productLinks.map((link) => (
                <li key={link.label}>
                  <Link to={link.href} className="transition hover:text-white">{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-primary-red">Contact</h3>
            <div className="mt-5 space-y-3 text-sm text-gray-400">
              <div className="flex items-start gap-3">
                <FiMapPin className="mt-1 h-4 w-4 text-primary-red" />
                <div>14-4-274, Joshiwadi, Begum Bazaar, Hyderabad, Telangana, India</div>
              </div>
              <div className="flex items-center gap-3">
                <FiPhone className="h-4 w-4 text-primary-red" />
                <a href="tel:+919010782782" className="transition hover:text-white">+91 90107 82782</a>
              </div>
              <div className="flex items-center gap-3">
                <FiMail className="h-4 w-4 text-primary-red" />
                <a href="mailto:krishloya789@gmail.com" className="transition hover:text-white">krishloya789@gmail.com</a>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-white/10 pt-6 text-center text-sm text-gray-500">
          © {currentYear} Lion Spices. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
