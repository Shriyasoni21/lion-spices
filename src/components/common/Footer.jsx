import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiFacebook, FiInstagram, FiTwitter, FiYoutube, FiMapPin, FiPhone, FiMail, FiMessageCircle, FiLinkedin } from 'react-icons/fi';
import { imageAssets } from '../../config/imageAssets';

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
    { label: 'Red Chilli Powder', href: '/products?category=chilli-powders' },
    { label: 'Turmeric Powder', href: '/products?category=chilli-powders' },
    { label: 'Coriander Powder', href: '/products?category=pure-veg-masalas' },
    { label: 'Aachar Mirchi', href: '/products?category=chilli-powders' },
    { label: 'Rai Powder', href: '/products?category=pure-veg-masalas' },
    { label: 'Rai Dal', href: '/products?category=pure-veg-masalas' }
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
    <footer className="bg-gray-900 text-gray-300 pt-20 pb-8 relative overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary-red/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Main Footer Content */}
        <motion.div
          className="grid gap-10 lg:grid-cols-4"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          <motion.div className="space-y-5" variants={itemVariants}>
            <div className="flex items-center gap-3">
              <img src={imageAssets.logo.main} alt="Lion Spices logo" className="h-12 w-12 rounded-2xl object-contain shadow-lg" loading="lazy" />
              <h3 className="text-2xl font-bold text-white">Lion Spices</h3>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">
              Premium Indian spices crafted for home chefs who demand authentic aroma and taste.
            </p>
            <div className="space-y-3 text-sm text-gray-400">
              <div className="flex items-center gap-3">
                <FiMapPin className="h-5 w-5 text-primary-red" />
                <span>Hyderabad, India</span>
              </div>
              <div className="flex items-center gap-3">
                <FiPhone className="h-5 w-5 text-primary-red" />
                <span>+91 90107 82782</span>
              </div>
              <div className="flex items-center gap-3">
                <FiMail className="h-5 w-5 text-primary-red" />
                <span>hello@lionspices.com</span>
              </div>
            </div>
          </motion.div>

          <motion.div className="space-y-5" variants={itemVariants}>
            <h4 className="text-lg font-bold text-white">Quick Links</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link to={link.href} className="hover:text-primary-red transition-colors block">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div className="space-y-5" variants={itemVariants}>
            <h4 className="text-lg font-bold text-white">Products</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              {productLinks.map((product) => (
                <li key={product.label}>
                  <Link to={product.href} className="hover:text-primary-red transition-colors block">
                    {product.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div className="space-y-5" variants={itemVariants}>
            <h4 className="text-lg font-bold text-white">Connect With Us</h4>
            <div className="flex flex-wrap gap-3">
              {socialLinks.map((social, idx) => {
                const Icon = social.icon;
                return (
                  <motion.a
                    key={idx}
                    href={social.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    className={`flex h-11 w-11 items-center justify-center rounded-full bg-gray-800 text-gray-300 transition-colors ${social.color}`}
                    whileHover={{ scale: 1.05 }}
                    title={social.label}
                  >
                    <Icon className="h-5 w-5" />
                  </motion.a>
                );
              })}
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">
              Follow us for recipes, exclusive offers, and fresh spice inspiration.
            </p>
          </motion.div>
        </motion.div>

        {/* Divider */}
        <div className="border-t border-gray-800 my-12"></div>

        {/* Payment & Social Section */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          {/* Payment Methods */}
          <div>
            <h4 className="text-lg font-bold text-white mb-4">Payment Methods</h4>
            <div className="flex flex-wrap gap-3">
              {paymentMethods.map((method, idx) => (
                <motion.div
                  key={idx}
                  className="px-4 py-2 bg-gray-800 rounded-lg text-sm font-medium hover:bg-primary-red hover:text-white transition-all cursor-pointer"
                  whileHover={{ scale: 1.05 }}
                >
                  {method}
                </motion.div>
              ))}
            </div>

            {/* Certifications */}
            <div className="mt-6 flex items-center gap-4">
              <motion.div
                className="px-4 py-2 bg-gray-800 rounded-lg text-xs font-bold text-turmeric border border-turmeric/30"
                whileHover={{ borderColor: '#DC2626', color: '#DC2626' }}
              >
                🏅 FSSAI Certified
              </motion.div>
              <motion.div
                className="px-4 py-2 bg-gray-800 rounded-lg text-xs font-bold text-saffron border border-saffron/30"
                whileHover={{ borderColor: '#DC2626', color: '#DC2626' }}
              >
                ✓ ISO Certified
              </motion.div>
            </div>
          </div>

          {/* Social Links */}
          <div>
            <h4 className="text-lg font-bold text-white mb-4">Follow Us</h4>
            <div className="flex gap-4 flex-wrap">
              {socialLinks.map((social, idx) => {
                const Icon = social.icon;
                return (
                  <motion.a
                    key={idx}
                    href={social.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    className={`w-12 h-12 rounded-full bg-gray-800 flex items-center justify-center hover:bg-primary-red transition-all ${social.color}`}
                    whileHover={{ scale: 1.1, y: -5 }}
                    whileTap={{ scale: 0.95 }}
                    title={social.label}
                    aria-label={social.label}
                  >
                    <Icon className="w-6 h-6" />
                  </motion.a>
                );
              })}
            </div>

            {/* Newsletter Signup */}
            <div className="mt-6">
              <p className="text-sm text-gray-400 mb-3">Subscribe for exclusive offers</p>
              <form className="flex gap-2">
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 px-4 py-2 rounded-lg bg-gray-800 text-white placeholder-gray-500 text-sm focus:outline-none focus:ring-2 focus:ring-primary-red transition-all"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-primary-red text-white rounded-lg font-bold text-sm hover:bg-primary-red/80 transition-all"
                >
                  Sign Up
                </button>
              </form>
            </div>
          </div>
        </motion.div>

        {/* Divider */}
        <div className="border-t border-gray-800 my-8"></div>

        {/* Bottom Footer */}
        <motion.div
          className="flex flex-col md:flex-row justify-between items-center gap-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <div className="space-y-2 text-sm text-gray-400">
            <p>© {currentYear} Lion Spices. All rights reserved.</p>
            <p>Authentic Indian spices packed with premium care for your kitchen.</p>
          </div>

          <div className="flex gap-6 text-sm text-gray-400">
            <Link to="/privacy" className="hover:text-primary-red transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="hover:text-primary-red transition-colors">
              Terms of Service
            </Link>
            <Link to="/terms#returns" className="hover:text-primary-red transition-colors">
              Return Policy
            </Link>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
