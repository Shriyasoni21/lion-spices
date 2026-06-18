import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiInstagram, FiHeart, FiMessageCircle } from 'react-icons/fi';
import { instagramFeed } from '../../data/blogData';

const InstagramGallerySection = () => {
  const [hoveredId, setHoveredId] = useState(null);

  return (
    <section className="bg-white py-16 md:py-24">
      <div className="container-custom">
        {/* Section Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <div className="flex items-center justify-center gap-2 mb-2">
            <FiInstagram className="w-6 h-6 text-spice-red" />
            <p className="text-gold font-semibold uppercase tracking-wider">Follow Us</p>
          </div>
          <h2 className="heading-secondary mb-4">@lionspices</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Join our Instagram community for daily spice inspiration and exclusive content
          </p>
        </motion.div>

        {/* Instagram Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          {instagramFeed.map((post, index) => (
            <motion.div
              key={post.id}
              className="relative aspect-square rounded-lg overflow-hidden cursor-pointer group"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              viewport={{ once: true, margin: "-100px" }}
              onHoverStart={() => setHoveredId(post.id)}
              onHoverEnd={() => setHoveredId(null)}
            >
              {/* Image */}
              <img
                src={post.image}
                alt="Instagram post"
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
              />

              {/* Hover Overlay */}
              <motion.div
                className="absolute inset-0 bg-black/60 flex items-center justify-center gap-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: hoveredId === post.id ? 1 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <motion.div
                  className="flex items-center gap-1 text-white"
                  whileHover={{ scale: 1.2 }}
                >
                  <FiHeart className="w-5 h-5 fill-white" />
                  <span className="text-sm font-semibold">{post.likes}</span>
                </motion.div>
                <motion.div
                  className="w-px h-6 bg-white/30"
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <motion.div
                  className="flex items-center gap-1 text-white"
                  whileHover={{ scale: 1.2 }}
                >
                  <FiMessageCircle className="w-5 h-5" />
                  <span className="text-sm font-semibold">View</span>
                </motion.div>
              </motion.div>

              {/* Caption on Hover */}
              {hoveredId === post.id && (
                <motion.p
                  className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent text-white text-xs p-2 text-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  {post.caption}
                </motion.p>
              )}
            </motion.div>
          ))}
        </div>

        {/* Follow Button */}
        <motion.div
          className="flex justify-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 btn-primary"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FiInstagram className="w-5 h-5" />
            Follow on Instagram
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default InstagramGallerySection;
