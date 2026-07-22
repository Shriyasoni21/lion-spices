import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiStar, FiChevronLeft, FiChevronRight } from 'react-icons/fi';

const testimonials = [
  {
    id: 1,
    review: "The turmeric powder is incredibly fresh and authentic. I've been using Lion Spices for over 2 years now, and the consistency is remarkable. Worth every penny.",
    name: 'Priya Sharma',
    city: 'Hyderabad',
    rating: 5,
  },
  {
    id: 2,
    review: 'Finally found a brand that delivers premium quality spices without compromise. The packaging is excellent and my orders arrive faster than expected.',
    name: 'Rajesh Patel',
    city: 'Telangana',
    rating: 5,
  },
  {
    id: 3,
    review: 'The chilli powder brings out authentic flavour in my cooking. My family notices the difference immediately. Highly recommended for traditional Indian kitchens.',
    name: 'Swathi Reddy',
    city: 'Hyderabad',
    rating: 5,
  },
  {
    id: 4,
    review: "Impeccable quality and true to their promise of purity. The coriander powder is aromatic and potent. It's become my go-to brand for all spice needs.",
    name: 'Anand Kumar',
    city: 'Telangana',
    rating: 5,
  },
  {
    id: 5,
    review: 'I appreciate the hygienic packaging and the fact that there are no additives. The rai powder elevates every dish. A truly premium brand.',
    name: 'Neha Gupta',
    city: 'Hyderabad',
    rating: 5,
  },
  {
    id: 6,
    review: "Been recommending Lion Spices to all my friends. The authenticity and taste are unmatched. It's rare to find such commitment to quality in today's market.",
    name: 'Vikram Singh',
    city: 'Telangana',
    rating: 5,
  },
];

const TestimonialsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerPage, setItemsPerPage] = React.useState(3);

  React.useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setItemsPerPage(1);
      } else if (window.innerWidth < 1024) {
        setItemsPerPage(2);
      } else {
        setItemsPerPage(3);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % Math.ceil(testimonials.length / itemsPerPage));
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + Math.ceil(testimonials.length / itemsPerPage)) % Math.ceil(testimonials.length / itemsPerPage));
  };

  const displayedTestimonials = testimonials.slice(currentIndex * itemsPerPage, (currentIndex + 1) * itemsPerPage);
  const totalPages = Math.ceil(testimonials.length / itemsPerPage);

  return (
    <section className="bg-[#fff7ef] py-12 sm:py-14 lg:py-16">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center mb-10 max-w-3xl mx-auto">
          <motion.p
            className="text-primary-red font-semibold text-sm uppercase tracking-[0.3em]"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
          >
            Testimonials
          </motion.p>
          <motion.h2
            className="mt-3 text-3xl font-semibold text-gray-900 sm:text-4xl"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            What Our Customers Say
          </motion.h2>
          <motion.p
            className="mt-2 text-gray-600 text-sm sm:text-base"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Trusted by generations of Indian kitchens.
          </motion.p>
        </div>

        {/* Testimonials Grid/Carousel */}
        <div className="relative">
          <div className="grid gap-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {displayedTestimonials.map((item, index) => (
            <motion.article
              key={item.id}
              className="group rounded-[24px] border border-stone-200/80 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-md"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.05 * index }}
            >
              {/* Star Rating */}
              <div className="flex items-center gap-1 text-amber-400 mb-4">
                {Array.from({ length: item.rating }).map((_, i) => (
                  <FiStar key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                ))}
              </div>

              {/* Review Text */}
              <p className="text-sm leading-6 text-gray-700 mb-4">"{item.review}"</p>

              {/* Customer Info */}
              <div className="border-t border-gray-100 pt-4">
                <div className="text-sm font-semibold text-gray-900">{item.name}</div>
                <div className="text-xs text-gray-500">{item.city}</div>
              </div>
            </motion.article>
          ))}
          </div>

          {/* Carousel Navigation - Show on mobile and tablet */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-3 mt-8 lg:hidden">
              <button
                onClick={handlePrev}
                className="p-2 rounded-full border border-gray-300 hover:border-gray-400 hover:bg-gray-50 transition"
                aria-label="Previous"
              >
                <FiChevronLeft className="h-5 w-5 text-gray-700" />
              </button>
              <div className="flex gap-2">
                {Array.from({ length: totalPages }).map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentIndex(idx)}
                    className={`h-2 rounded-full transition ${
                      idx === currentIndex ? 'bg-primary-red w-6' : 'bg-gray-300 w-2'
                    }`}
                    aria-label={`Go to page ${idx + 1}`}
                  />
                ))}
              </div>
              <button
                onClick={handleNext}
                className="p-2 rounded-full border border-gray-300 hover:border-gray-400 hover:bg-gray-50 transition"
                aria-label="Next"
              >
                <FiChevronRight className="h-5 w-5 text-gray-700" />
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
