import React from 'react';
import { motion } from 'framer-motion';

const sourcingSteps = [
  {
    id: 1,
    title: 'Farm',
    description: 'We partner with certified farms that grow premium spices using responsible practices.',
  },
  {
    id: 2,
    title: 'Selection',
    description: 'Harvests are carefully chosen to move forward only when they meet our quality standards.',
  },
  {
    id: 3,
    title: 'Quality Test',
    description: 'Every batch is tested for aroma, purity, and consistency before packaging.',
  },
  {
    id: 4,
    title: 'Packing',
    description: 'Modern hygienic packing seals in freshness and preserves every spice note.',
  },
  {
    id: 5,
    title: 'Delivery',
    description: 'Fast, reliable delivery brings premium spices to your kitchen without delay.',
  },
];

const SourceJourneySection = () => {
  return (
    <section className="bg-[#fff7ef] py-16 sm:py-18 lg:py-20">
      <div className="container-custom">
        <div className="text-center mb-10 sm:mb-12">
          <p className="text-primary-red font-semibold text-sm uppercase tracking-wider mb-3">
            Our Process
          </p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4">
            How we move spices from farm to kitchen
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-base sm:text-lg">
            Every step is designed to preserve premium quality and authentic flavor.
          </p>
        </div>

        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-5">
          {sourcingSteps.map((step, idx) => (
            <div key={step.id} className="relative flex min-h-[220px] flex-col overflow-hidden rounded-[32px] border border-gray-200 bg-white p-6 text-center shadow-[0_20px_60px_-40px_rgba(15,23,42,0.18)]">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary-red/10 text-primary-red font-semibold">
                {idx + 1}
              </div>
              <h3 className="text-xl font-semibold text-gray-900">{step.title}</h3>
              <p className="mt-3 text-sm leading-7 text-gray-600">{step.description}</p>

              {idx < sourcingSteps.length - 1 && (
                <div className="absolute right-0 top-1/2 hidden h-0.5 w-16 translate-x-full -translate-y-1/2 rounded-full bg-primary-red lg:block" />
              )}

              {idx < sourcingSteps.length - 1 && (
                <div className="mt-6 flex items-center justify-center lg:hidden">
                  <span className="text-3xl text-primary-red">↓</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SourceJourneySection;
