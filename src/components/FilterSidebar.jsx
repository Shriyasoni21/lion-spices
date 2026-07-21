import React from 'react';

export default function FilterSidebar({ options = ['All'], selectedCategory, onChange }) {
  const filterOptions = Array.isArray(options) && options.length > 0 ? options : ['All'];

  return (
    <div className="flex flex-wrap items-center gap-1.5 rounded-[16px] border border-gray-200 bg-white p-2 shadow-[0_10px_30px_-20px_rgba(15,23,42,0.28)] sm:p-2.5">
      {filterOptions.map((option) => (
        <button
          key={option}
          type="button"
          onClick={() => onChange?.(option)}
          aria-pressed={selectedCategory === option}
          className={`rounded-full px-2.5 py-1.5 text-sm font-semibold transition ${selectedCategory === option ? 'bg-primary-red text-white' : 'bg-gray-50 text-gray-700 hover:bg-red-50 hover:text-primary-red'}`}
        >
          {option}
        </button>
      ))}
    </div>
  );
}
