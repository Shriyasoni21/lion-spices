import React from 'react';

export default function AnnouncementBar() {
  return (
    <div className="hidden border-b border-gray-100 bg-white/95 sm:block">
      <div className="mx-auto flex max-w-7xl items-center justify-center px-4 py-2 text-sm text-gray-700 sm:px-6 lg:px-8">
        <span className="font-semibold text-primary-red">Lion Spices Premium</span>
        <span className="ml-3">Free shipping across India on orders above ₹499</span>
      </div>
    </div>
  );
}
