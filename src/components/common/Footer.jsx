import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiFacebook, FiInstagram, FiTwitter, FiYoutube, FiMapPin, FiPhone, FiMail, FiMessageCircle, FiLinkedin } from 'react-icons/fi';
import { imageAssets } from '../../config/imageAssets';
import ImageWithFallback from './ImageWithFallback';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { label: 'Home', href: '/' },
    { label: 'Products', href: '/products' },
    { label: 'Recipes', href: '/#recipes' },
    { label: 'About', href: '/#about' },
    { label: 'Contact', href: '/#contact' }
  ];

  const productLinks = [
    { label: 'Red Chilli Powder', href: '/products' },
    { label: 'Turmeric Powder', href: '/products' },
    { label: 'Coriander Powder', href: '/products' },
    { label: 'Aachar Mirchi', href: '/products' },
    { label: 'Rai Powder', href: '/products' },
    { label: 'Rai Dal', href: '/products' }
  ];

  const socialLinks = [
    { icon: FiFacebook, label: 'Facebook', href: 'https://www.facebook.com', color: 'hover:text-blue-600' },
    { icon: FiInstagram, label: 'Instagram', href: 'https://www.instagram.com', color: 'hover:text-pink-600' },
    { icon: FiTwitter, label: 'Twitter', href: 'https://www.twitter.com', color: 'hover:text-blue-400' },
    { icon: FiYoutube, label: 'YouTube', href: 'https://www.youtube.com', color: 'hover:text-red-600' },
    { icon: FiLinkedin, label: 'LinkedIn', href: 'https://www.linkedin.com', color: 'hover:text-blue-700' }
  ];

  const paymentMethods = ['💳 Credit/Debit', '🏦 NetBanking', '📱 UPI', '💰 Wallet'];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <footer className="relative overflow-hidden bg-gray-900 pb-6 pt-10 text-gray-300 sm:pt-14 lg:pt-20">
      <div className="pointer-events-none absolute right-0 top-0 h-96 w-96 rounded-full bg-primary-red/5 blur-3xl"></div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          className="grid gap-5 sm:gap-6 lg:grid-cols-4 lg:gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          <motion.div className="space-y-3 text-center sm:text-left" variants={itemVariants}>
            <div className="flex items-center gap-3">
              <ImageWithFallback src={imageAssets.logo.main} alt="Lion Spices logo" className="h-[42px] w-auto object-contain md:h-[60px]" loading="lazy" />
              <h3 className="text-xl font-bold text-white sm:text-2xl">Lion Spices</h3>
            </div>
            <p className="text-sm leading-relaxed text-gray-400">
              Premium Indian spices crafted for home chefs who demand authentic aroma and taste.
            </p>
            <div className="space-y-2 text-sm text-gray-400">
              <div className="flex items-start gap-3">
                <FiMapPin className="mt-1 h-4 w-4 text-primary-red sm:h-5 sm:w-5" />
                <div>
                  <p>14-4-274, Joshiwadi,</p>
                  <p>Begum Bazaar, Hyderabad, Telangana</p>
                  <p>India</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <FiPhone className="h-4 w-4 text-primary-red sm:h-5 sm:w-5" />
                <span>+91 90107 82782</span>
              </div>
              <div className="flex items-center gap-3">
                <FiMail className="h-4 w-4 text-primary-red sm:h-5 sm:w-5" />
                <a href="mailto:krishloya789@gmail.com" className="text-gray-300 hover:text-white">krishloya789@gmail.com</a>
              </div>
            </div>
          </motion.div>

          <motion.div className="space-y-3" variants={itemVariants}>
            <h4 className="text-lg font-bold text-white">Quick Links</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link to={link.href} className="block transition-colors hover:text-primary-red">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div className="space-y-3" variants={itemVariants}>
            <h4 className="text-lg font-bold text-white">Products</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              {productLinks.map((product) => (
                <li key={product.label}>
                  <Link to={product.href} className="block transition-colors hover:text-primary-red">
                    {product.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div className="space-y-3" variants={itemVariants}>
            <h4 className="text-lg font-bold text-white">Connect With Us</h4>
            <div className="flex flex-wrap gap-2 sm:gap-3">
              {socialLinks.map((social, idx) => {
                const Icon = social.icon;
                return (
                  <motion.a
                    key={idx}
                    href={social.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    className={`flex h-10 w-10 items-center justify-center rounded-full bg-gray-800 text-gray-300 transition-colors ${social.color}`}
                    whileHover={{ scale: 1.05 }}
                    title={social.label}
                  >
                    <Icon className="h-4 w-4 sm:h-5 sm:w-5" />
                  </motion.a>
                );
              })}
            </div>
            <p className="text-sm leading-relaxed text-gray-400">
              Follow us for recipes, exclusive offers, and fresh spice inspiration.
            </p>
          </motion.div>
        </motion.div>

        <div className="my-8 border-t border-gray-800"></div>

        <motion.div
          className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-2"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div>
            <h4 className="mb-3 text-lg font-bold text-white">Payment Methods</h4>
            <div className="flex flex-wrap gap-2">
              {paymentMethods.map((method, idx) => (
                <motion.div
                  key={idx}
                  className="cursor-pointer rounded-lg bg-gray-800 px-3 py-2 text-sm font-medium text-gray-300 transition-all hover:bg-primary-red hover:text-white"
                  whileHover={{ scale: 1.05 }}
                >
                  {method}
                </motion.div>
              ))}
            </div>

            <div className="mt-4 flex flex-wrap items-center gap-2">
              <motion.div
                className="rounded-lg border border-turmeric/30 bg-gray-800 px-3 py-2 text-[11px] font-bold text-turmeric"
                whileHover={{ borderColor: '#DC2626', color: '#DC2626' }}
              >
                🏅 FSSAI Certified
              </motion.div>
              <motion.div
                className="rounded-lg border border-saffron/30 bg-gray-800 px-3 py-2 text-[11px] font-bold text-saffron"
                whileHover={{ borderColor: '#DC2626', color: '#DC2626' }}
              >
                ✓ ISO Certified
              </motion.div>
            </div>
          </div>

          <div>
            <h4 className="mb-3 text-lg font-bold text-white">Follow Us</h4>
            <div className="flex flex-wrap gap-3">
              {socialLinks.map((social, idx) => {
                const Icon = social.icon;
                return (
                  <motion.a
                    key={idx}
                    href={social.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    className={`flex h-10 w-10 items-center justify-center rounded-full bg-gray-800 text-gray-300 transition-all hover:bg-primary-red ${social.color}`}
                    whileHover={{ scale: 1.1, y: -5 }}
                    whileTap={{ scale: 0.95 }}
                    title={social.label}
                    aria-label={social.label}
                  >
                    <Icon className="h-5 w-5" />
                  </motion.a>
                );
              })}
            </div>

            <div className="mt-4">
              <p className="mb-2 text-sm text-gray-400">Subscribe for exclusive offers</p>
              <form className="flex flex-col gap-2 sm:flex-row">
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 rounded-lg bg-gray-800 px-3 py-2 text-sm text-white placeholder-gray-500 transition-all focus:outline-none focus:ring-2 focus:ring-primary-red"
                />
                <button
                  type="submit"
                  className="rounded-lg bg-primary-red px-4 py-2 text-sm font-bold text-white transition-all hover:bg-primary-red/80"
                >
                  Sign Up
                </button>
              </form>
            </div>
          </div>
        </motion.div>

        <div className="my-6 border-t border-gray-800"></div>

        <motion.div
          className="flex flex-col items-center justify-between gap-3 text-center text-sm text-gray-400 md:flex-row md:text-left"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <div className="space-y-1">
            <p>© {currentYear} Lion Spices. All rights reserved.</p>
            <p>Authentic Indian spices packed with premium care for your kitchen.</p>
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/privacy" className="transition-colors hover:text-primary-red">
              Privacy Policy
            </Link>
            <Link to="/terms" className="transition-colors hover:text-primary-red">
              Terms of Service
            </Link>
            <Link to="/terms#returns" className="transition-colors hover:text-primary-red">
              Return Policy
            </Link>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
