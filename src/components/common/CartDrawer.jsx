import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { FiX, FiTrash2 } from 'react-icons/fi';
import ImageWithFallback from './ImageWithFallback';
import { getProductImageSrc } from '../../utils/imageHelpers';

const CartDrawer = ({ open, items, onClose, onRemove, onClear, onUpdateQuantity }) => {
  const navigate = useNavigate();
  const subtotal = useMemo(() => items.reduce((sum, item) => sum + item.price * item.quantity, 0), [items]);

  const openCart = () => {
    onClose();
    navigate('/cart');
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div className="absolute inset-0 bg-black/40" onClick={onClose} />

          <motion.div
            className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl border-l border-gray-200 overflow-y-auto"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-semibold text-gray-900">Your Cart</h2>
                  <p className="text-sm text-gray-500">{items.length} item{items.length !== 1 ? 's' : ''}</p>
                </div>
                <button onClick={onClose} className="text-gray-500 hover:text-gray-900">
                  <FiX className="w-6 h-6" />
                </button>
              </div>

              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center gap-4 py-20 text-center text-gray-500">
                  <span className="text-6xl">🛒</span>
                  <div className="space-y-2">
                    <p className="text-xl font-semibold text-gray-900">Your Cart is Empty</p>
                    <p className="text-sm text-gray-500">Explore our premium spices and start shopping.</p>
                  </div>
                  <button onClick={onClose} className="rounded-full bg-primary-red px-6 py-3 text-sm font-semibold text-white hover:bg-red-700 transition">
                    Continue Shopping
                  </button>
                </div>
              ) : (
                <div className="space-y-5">
                  {items.map((item) => (
                    <div key={`${item._id}-${item.selectedWeight}`} className="rounded-3xl border border-gray-100 p-4 shadow-sm">
                      <div className="flex items-start gap-4">
                        <ImageWithFallback src={getProductImageSrc(item)} alt={item.title} className="w-20 h-20 rounded-2xl object-cover" loading="lazy" />
                        <div className="flex-1">
                          <div className="flex items-start justify-between gap-4">
                            <div>
                              <h3 className="font-semibold text-gray-900">{item.title}</h3>
                              <p className="text-sm text-gray-500 mt-1">Qty: {item.quantity}</p>
                              <p className="text-sm text-gray-500">{item.selectedWeight}</p>
                            </div>
                            <button onClick={() => onRemove(item._id, item.selectedWeight)} className="text-red-600 hover:text-red-800">
                              <FiTrash2 className="w-5 h-5" />
                            </button>
                          </div>
                          <div className="mt-4 flex items-center justify-between text-gray-900 font-semibold">
                            <div className="flex items-center gap-2">
                              <button onClick={() => onUpdateQuantity?.(item._id, item.selectedWeight, -1)} className="h-8 w-8 rounded-full border border-gray-200 bg-white text-lg leading-none">−</button>
                              <span className="min-w-[1.5rem] text-center">{item.quantity}</span>
                              <button onClick={() => onUpdateQuantity?.(item._id, item.selectedWeight, 1)} className="h-8 w-8 rounded-full border border-gray-200 bg-white text-lg leading-none">+</button>
                            </div>
                            <span>₹{item.quantity * item.price}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}

                  <div className="mt-6 border-t border-gray-200 pt-6">
                    <div className="flex items-center justify-between text-gray-700 mb-4">
                      <span>Subtotal</span>
                      <span className="font-semibold text-gray-900">₹{subtotal}</span>
                    </div>
                    <button onClick={openCart} className="w-full mb-3 rounded-2xl bg-red-600 text-white py-3 font-semibold hover:bg-red-700 transition">
                      Go to Cart
                    </button>
                    <button onClick={onClear} className="w-full rounded-2xl border border-gray-200 py-3 text-gray-700 hover:bg-gray-50 transition">
                      Clear Cart
                    </button>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CartDrawer;
