import React from 'react';

export default function AnnouncementBar() {
  return (
    <div className="bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-3 py-2 text-sm text-gray-700">
          <div className="flex items-center gap-4">
            <span className="font-semibold text-red-600">Lion Spices Premium</span>
            <span>Free shipping across India on orders above ₹499</span>
          </div>
          <div className="flex items-center gap-6 text-gray-600">
            <span>100% Pure Spices</span>
            <span>Authentic Flavors</span>
          </div>
        </div>
      </div>
    </div>
  );
}
