import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { FiStar, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const TestimonialsSection = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/testimonials')
      .then((res) => res.json())
      .then((data) => setTestimonials(data))
      .catch((error) => {
        console.error('Failed to load testimonials:', error);
      })
      .finally(() => setLoading(false));
  }, []);

  const renderStars = (rating) => {
    return [...Array(5)].map((_, i) => (
      <FiStar
        key={i}
        className={`w-4 h-4 ${
          i < Math.round(rating)
            ? 'text-turmeric fill-turmeric'
            : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <section className="py-20 md:py-28 bg-white relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-turmeric/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: '-100px' }}
        >
          <p className="text-primary-red font-semibold text-sm uppercase tracking-wider mb-3">
            Customer Love
          </p>
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6">
            What Our Customers <span className="text-primary-red">Say About Us</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Join thousands of satisfied customers who trust Lion Spices for authentic flavors
          </p>
        </motion.div>

        {loading ? (
          <div className="grid place-items-center py-20">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-12 h-12 border-4 border-gray-300 border-t-primary-red rounded-full"
            ></motion.div>
          </div>
        ) : (
          <div className="relative">
            {/* Swiper Carousel */}
            <Swiper
              modules={[Navigation, Pagination, Autoplay]}
              spaceBetween={30}
              slidesPerView={1}
              breakpoints={{
                640: {
                  slidesPerView: 2,
                  spaceBetween: 20,
                },
                1024: {
                  slidesPerView: 3,
                  spaceBetween: 30,
                },
              }}
              pagination={{
                clickable: true,
                dynamicBullets: true,
              }}
              navigation={{
                prevEl: '.swiper-button-prev-testimonials',
                nextEl: '.swiper-button-next-testimonials',
              }}
              autoplay={{
                delay: 5000,
                disableOnInteraction: false,
              }}
              loop={true}
              className="testimonials-swiper"
            >
              {testimonials.map((testimonial, idx) => (
                <SwiperSlide key={testimonial.id}>
                  <motion.div
                    className="card-premium p-8 h-full flex flex-col"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                  >
                    {/* Rating */}
                    <div className="flex items-center gap-2 mb-4">
                      <div className="flex items-center gap-1">
                        {renderStars(testimonial.rating)}
                      </div>
                      <span className="text-sm font-bold text-gray-900">
                        {testimonial.rating}/5
                      </span>
                    </div>

                    {/* Review Text */}
                    <p className="text-gray-700 text-lg leading-relaxed mb-6 flex-grow italic">
                      "{testimonial.review}"
                    </p>

                    {/* Divider */}
                    <div className="w-8 h-1 bg-gradient-spice rounded-full mb-6"></div>

                    {/* Author Info */}
                    <div className="flex items-center gap-4">
                      <motion.img
                        src={testimonial.image}
                        alt={testimonial.name}
                        className="w-16 h-16 rounded-full object-cover border-2 border-primary-red"
                        whileHover={{ scale: 1.1 }}
                      />
                      <div>
                        <p className="font-bold text-gray-900 text-lg">
                          {testimonial.name}
                        </p>
                        <p className="text-sm text-gray-500">
                          {testimonial.location}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </SwiperSlide>
              ))}
            </Swiper>

            {/* Custom Navigation Buttons */}
            <motion.button
              className="swiper-button-prev-testimonials absolute -left-4 top-1/3 z-20 w-12 h-12 bg-primary-red text-white rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all hidden md:flex"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <FiChevronLeft className="w-6 h-6" />
            </motion.button>
            <motion.button
              className="swiper-button-next-testimonials absolute -right-4 top-1/3 z-20 w-12 h-12 bg-primary-red text-white rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all hidden md:flex"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <FiChevronRight className="w-6 h-6" />
            </motion.button>
          </div>
        )}

        {/* Bottom Stats */}
        <motion.div
          className="grid grid-cols-3 gap-4 md:gap-8 mt-16 pt-16 border-t border-gray-200"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <div className="text-center">
            <p className="text-4xl font-bold text-primary-red mb-2">4.9/5</p>
            <p className="text-gray-600 text-sm">Average Rating</p>
          </div>
          <div className="text-center">
            <p className="text-4xl font-bold text-turmeric mb-2">2,847+</p>
            <p className="text-gray-600 text-sm">Customer Reviews</p>
          </div>
          <div className="text-center">
            <p className="text-4xl font-bold text-saffron mb-2">98%</p>
            <p className="text-gray-600 text-sm">Happy Customers</p>
          </div>
        </motion.div>
      </div>

      {/* Custom Swiper Pagination Styles */}
      <style>{`
        .testimonials-swiper .swiper-pagination-bullet {
          background-color: #DC2626;
          opacity: 0.4;
          width: 10px;
          height: 10px;
        }
        .testimonials-swiper .swiper-pagination-bullet-active {
          opacity: 1;
          background-color: #DC2626;
        }
      `}</style>
    </section>
  );
};

export default TestimonialsSection;
