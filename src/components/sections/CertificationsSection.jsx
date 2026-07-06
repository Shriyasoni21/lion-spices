import React from 'react';
import { motion } from 'framer-motion';
import { FiShield, FiAward, FiCheckCircle, FiStar } from 'react-icons/fi';

const certifications = [
  {
    id: 1,
    title: 'FSSAI Certified',
    description: 'Approved for food safety and quality checks across our product range.',
    icon: FiShield,
    color: 'text-primary-red',
    bgColor: 'bg-primary-red/10'
  },
  {
    id: 2,
    title: 'AGMARK Quality',
    description: 'Products sourced and graded for premium agricultural standards.',
    icon: FiAward,
    color: 'text-turmeric',
    bgColor: 'bg-turmeric/10'
  },
  {
    id: 3,
    title: 'Hygienically Packed',
    description: 'Processed and sealed in certified facilities for freshness and safety.',
    icon: FiCheckCircle,
    color: 'text-emerald-600',
    bgColor: 'bg-emerald-100'
  },
  {
    id: 4,
    title: 'Premium Quality',
    description: 'Strict quality standards ensure pure aroma, texture and flavor in every pack.',
    icon: FiStar,
    color: 'text-yellow-500',
    bgColor: 'bg-yellow-100'
  }
];

export default function CertificationsSection() {
  return (
    <section className="py-20 bg-cream overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-primary-red">Certifications</p>
          <h2 className="mt-4 text-3xl sm:text-4xl font-extrabold text-gray-900">Quality You Can Trust</h2>
          <p className="mx-auto mt-4 max-w-2xl text-gray-600 text-base sm:text-lg">
            Our products are processed under strict quality standards to ensure freshness, purity and authenticity.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {certifications.map((cert) => {
            const Icon = cert.icon;
            return (
              <motion.div
                key={cert.id}
                className="group rounded-[28px] border border-gray-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.5, delay: cert.id * 0.08 }}
              >
                <div className={`mb-5 inline-flex h-14 w-14 items-center justify-center rounded-2xl ${cert.bgColor}`}>
                  <Icon className={`h-7 w-7 ${cert.color}`} />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{cert.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{cert.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
