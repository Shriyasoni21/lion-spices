import React from 'react';
import { FiSearch } from 'react-icons/fi';

export default function SearchBar({ value, onChange }) {
  return (
    <label className="flex items-center gap-3 rounded-full border border-gray-200 bg-white px-4 py-3 shadow-[0_8px_25px_-20px_rgba(15,23,42,0.25)]">
      <FiSearch className="text-gray-400" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search spices, blends, or flavors..."
        className="w-full border-0 bg-transparent text-sm text-gray-700 outline-none placeholder:text-gray-400"
      />
    </label>
  );
}
