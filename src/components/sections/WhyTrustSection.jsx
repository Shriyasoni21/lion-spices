import React from 'react';
import { motion } from 'framer-motion';
import { FiCheckCircle, FiSlash, FiShield, FiDroplet, FiAward, FiPackage } from 'react-icons/fi';

const features = [
  { id: 1, title: '100% Pure', description: 'Handpicked spices without additives, preserving natural aroma.', icon: FiCheckCircle, color: 'text-green-600', bgColor: 'bg-green-50' },
  { id: 2, title: 'No Artificial Colors', description: 'We never use artificial colors or preservatives.', icon: FiSlash, color: 'text-red-600', bgColor: 'bg-red-50' },
  { id: 3, title: 'Hygienically Packed', description: 'Processed and sealed in certified hygienic facilities.', icon: FiShield, color: 'text-blue-600', bgColor: 'bg-blue-50' },
  { id: 4, title: 'Farm Fresh Ingredients', description: 'Sourced directly from trusted farms to ensure freshness.', icon: FiDroplet, color: 'text-green-700', bgColor: 'bg-green-50' },
  { id: 5, title: 'FSSAI Certified', description: 'Manufactured under strict food safety and hygiene standards.', icon: FiAward, color: 'text-amber-600', bgColor: 'bg-amber-50' },
  { id: 6, title: 'AGMARK Quality', description: 'Trusted quality assurance for authentic Indian spice standards.', icon: FiPackage, color: 'text-purple-600', bgColor: 'bg-purple-50' }
];

const itemVariants = { hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } };

export default function WhyTrustSection() {
  return (
    <section className="py-6 sm:py-10 bg-white">
      <div className="container-custom">
        <div className="text-center mb-6 sm:mb-10">
          <p className="text-sm font-semibold uppercase tracking-wider text-primary-red">Why Trust Lion Spices</p>
          <h2 className="mt-2 text-2xl sm:text-3xl lg:text-4xl font-extrabold text-gray-900">Trusted by thousands of Indian families for authentic, hygienically packed premium spices.</h2>
        </div>

        <motion.div className="grid grid-cols-2 gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3" initial="hidden" whileInView="visible" viewport={{ once: true }}>
          {features.map((f) => {
            const Icon = f.icon;
            return (
              <motion.div key={f.id} variants={itemVariants} className="flex items-start gap-3 rounded-lg border border-gray-100 p-3 bg-white shadow-sm">
                <div className={`flex-shrink-0 flex h-10 w-10 items-center justify-center rounded-lg ${f.bgColor} ${f.color}`}>
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-gray-900">{f.title}</h3>
                  <p className="mt-1 text-[0.78rem] text-gray-600 leading-snug">{f.description}</p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
