import React, { useEffect, useMemo, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { FiStar, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { testimonials } from '../../data/testimonialData';

const TestimonialsSection = () => {
  const featuredTestimonials = testimonials.slice(0, 6);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleCards, setVisibleCards] = useState(3);
  const [isPaused, setIsPaused] = useState(false);
  const trackRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width >= 1024) setVisibleCards(3);
      else if (width >= 768) setVisibleCards(2);
      else setVisibleCards(1);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const maxIndex = useMemo(() => Math.max(0, featuredTestimonials.length - visibleCards), [featuredTestimonials.length, visibleCards]);

  useEffect(() => {
    if (currentIndex > maxIndex) {
      setCurrentIndex(0);
    }
  }, [currentIndex, maxIndex]);

  useEffect(() => {
    if (isPaused || maxIndex === 0) return;
    const interval = window.setInterval(() => {
      setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
    }, 5000);
    return () => window.clearInterval(interval);
  }, [isPaused, maxIndex]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  const renderStars = (rating) => {
    return [...Array(5)].map((_, i) => (
      <FiStar
        key={i}
        className={`w-4 h-4 ${i < Math.round(rating) ? 'text-turmeric fill-turmeric' : 'text-gray-300'}`}
      />
    ));
  };

  return (
    <section className="bg-white py-16 sm:py-20">
      <div className="max-w-7xl mx-auto overflow-hidden px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-12 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: '-100px' }}
        >
          <p className="text-primary-red font-semibold text-sm uppercase tracking-wider mb-3">
            Customer Love
          </p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4">
            What Our Customers <span className="text-primary-red">Say About Us</span>
          </h2>
          <p className="text-gray-600 text-base sm:text-lg">
            Trusted reviews from kitchens that love the aroma, purity, and flavor of Lion Spices.
          </p>
        </motion.div>

        <div
          className="relative overflow-hidden"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div
            ref={trackRef}
            className="flex gap-6 overflow-x-auto pb-4 scroll-smooth snap-x snap-mandatory hide-scrollbar"
            style={{ WebkitOverflowScrolling: 'touch' }}
          >
            {featuredTestimonials.map((testimonial) => (
              <article
                key={testimonial.id}
                className="flex-shrink-0 w-full rounded-3xl border border-gray-100 bg-white p-8 shadow-lg snap-start md:w-1/2 lg:w-1/3"
              >
                <div className="flex h-full flex-col overflow-hidden">
                  <div className="flex items-center gap-2 text-amber-500 mb-6">
                    {renderStars(testimonial.rating)}
                  </div>
                  <p className="text-base leading-7 text-gray-700 mb-8 break-words whitespace-normal">
                    “{testimonial.review}”
                  </p>
                  <div className="mt-auto border-t border-gray-100 pt-6">
                    <p className="font-semibold text-gray-900">{testimonial.name}</p>
                    <p className="text-sm text-gray-500">{testimonial.location}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className="mt-6 flex flex-col items-center justify-between gap-3 sm:flex-row">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handlePrev}
              className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-700 shadow-sm transition hover:border-primary-red hover:text-primary-red"
              aria-label="Previous testimonial"
            >
              <FiChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={handleNext}
              className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-700 shadow-sm transition hover:border-primary-red hover:text-primary-red"
              aria-label="Next testimonial"
            >
              <FiChevronRight className="h-5 w-5" />
            </button>
          </div>
          <div className="flex items-center gap-2">
            {Array.from({ length: maxIndex + 1 }).map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setCurrentIndex(idx)}
                className={`h-2.5 w-2.5 rounded-full transition ${currentIndex === idx ? 'bg-primary-red' : 'bg-gray-300'}`}
                aria-label={`Go to testimonial ${idx + 1}`}
              />
            ))}
          </div>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-3 text-center">
          <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">
            <p className="text-4xl font-bold text-primary-red">4.9</p>
            <p className="mt-2 text-sm text-gray-600">Rating</p>
          </div>
          <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">
            <p className="text-4xl font-bold text-turmeric">2800+</p>
            <p className="mt-2 text-sm text-gray-600">Reviews</p>
          </div>
          <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">
            <p className="text-4xl font-bold text-saffron">98%</p>
            <p className="mt-2 text-sm text-gray-600">Happy Customers</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
