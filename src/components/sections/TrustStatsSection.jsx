import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { FiAward, FiSmile, FiStar, FiShield } from 'react-icons/fi';

const AnimatedNumber = ({ value, suffix }) => {
  const [displayValue, setDisplayValue] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    if (hasAnimated) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          let start = 0;
          const duration = 700;
          const startTime = performance.now();

          const step = (now) => {
            const progress = Math.min((now - startTime) / duration, 1);
            setDisplayValue(Math.round(start + (value - start) * progress));
            if (progress < 1) {
              requestAnimationFrame(step);
            } else {
              setHasAnimated(true);
            }
          };

          requestAnimationFrame(step);
          observer.disconnect();
        }
      },
      { threshold: 0.45 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [hasAnimated, value]);

  return (
    <span ref={ref}>
      {displayValue}
      {suffix}
    </span>
  );
};

const TrustStatsSection = () => {
  const stats = [
    {
      id: 1,
      number: '30+',
      label: 'Years Experience',
      description: 'Decades of expertise in premium spice sourcing.',
      icon: FiAward,
      color: 'from-primary-red/10 to-primary-red/5',
      iconColor: 'text-primary-red',
      numericValue: 30,
      suffix: '+',
    },
    {
      id: 2,
      number: '10000+',
      label: 'Happy Customers',
      description: 'Trusted by spice lovers across India.',
      icon: FiSmile,
      color: 'from-turmeric/10 to-turmeric/5',
      iconColor: 'text-turmeric',
      numericValue: 10000,
      suffix: '+',
    },
    {
      id: 3,
      number: '5+',
      label: 'Premium Products',
      description: 'Carefully selected authentic spice products.',
      icon: FiStar,
      color: 'from-yellow-400/10 to-yellow-300/5',
      iconColor: 'text-yellow-500',
      numericValue: 5,
      suffix: '+',
    },
    {
      id: 4,
      number: '100%',
      label: 'Authentic Spices',
      description: 'Pure, natural, and sourced directly from trusted farms.',
      icon: FiShield,
      color: 'from-green-500/10 to-green-400/5',
      iconColor: 'text-green-600',
      numericValue: 100,
      suffix: '%',
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.15
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  return (
    <section className="relative overflow-hidden bg-white py-12 sm:py-20 lg:py-24">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute right-0 top-1/4 h-96 w-96 rounded-full bg-primary-red/5 blur-3xl" />
        <div className="absolute bottom-1/4 left-0 h-96 w-96 rounded-full bg-turmeric/5 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 text-center sm:mb-12 lg:mb-16">
          <motion.h2
            className="text-3xl font-extrabold leading-tight text-gray-900 sm:text-4xl lg:text-5xl"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
          >
            Why Trust <span className="text-primary-red">Lion Spices</span>
          </motion.h2>
          <motion.p
            className="mx-auto mt-3 max-w-2xl text-base text-gray-600 sm:mt-4 sm:text-lg"
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Built on heritage, trust, and authentic Indian flavors.
          </motion.p>
        </div>

        <motion.div
          className="grid grid-cols-2 gap-3 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4 lg:gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          {stats.map((stat) => {
            const IconComponent = stat.icon;
            return (
              <motion.div
                key={stat.id}
                className={`group relative h-full rounded-2xl border border-gray-200/80 bg-gradient-to-br ${stat.color} p-3 transition-all duration-300 hover:-translate-y-1 hover:border-gray-300 hover:shadow-lg sm:p-6 sm:rounded-[24px]`}
                variants={cardVariants}
              >
                <div className={`mb-3 inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-white/70 transition-all duration-300 group-hover:bg-white sm:mb-4 sm:h-14 sm:w-14 ${stat.iconColor}`}>
                  <IconComponent className="h-5 w-5 sm:h-7 sm:w-7" />
                </div>

                <div className="mb-2">
                  <p className="text-2xl font-extrabold leading-tight text-gray-900 sm:text-4xl lg:text-5xl">
                    <AnimatedNumber value={stat.numericValue} suffix={stat.suffix} />
                  </p>
                </div>

                <p className="mb-1 text-sm font-bold text-gray-900 sm:text-lg">
                  {stat.label}
                </p>

                <p className="text-[0.72rem] leading-relaxed text-gray-600 sm:text-sm">
                  {stat.description}
                </p>

                <div className="absolute bottom-0 left-0 h-1 w-0 rounded-bl-2xl bg-gradient-to-r from-primary-red/60 via-turmeric/40 to-transparent transition-all duration-500 group-hover:w-full" />
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default TrustStatsSection;
