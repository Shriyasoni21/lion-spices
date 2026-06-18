import React from 'react';

export default function AboutPage() {
  return (
    <main className="pt-28 bg-cream pb-16 text-gray-900">
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-[32px] bg-white p-8 shadow-[0_18px_45px_-24px_rgba(0,0,0,0.35)]">
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-primary-red">Our Story</p>
          <h1 className="mt-3 text-4xl font-bold text-gray-900 md:text-5xl">From Indian farms to your kitchen</h1>
          <p className="mt-4 max-w-3xl text-gray-600">Lion Spices celebrates authentic Indian flavors with farm-sourced spices, hygienic processing, and premium packaging that brings tradition to modern homes.</p>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {['Purity', 'Quality', 'Hygiene', 'Sustainability'].map((value) => (
            <article key={value} className="rounded-[28px] bg-white p-6 shadow-[0_18px_40px_-24px_rgba(0,0,0,0.35)]">
              <h2 className="text-xl font-semibold text-gray-900">{value}</h2>
              <p className="mt-2 text-sm text-gray-600">Premium practices and responsible sourcing keep every spice rich, safe, and full of character.</p>
            </article>
          ))}
        </div>

        <div className="mt-8 rounded-[32px] bg-white p-8 shadow-[0_18px_45px_-24px_rgba(0,0,0,0.35)]">
          <h2 className="text-2xl font-bold text-gray-900">Why choose Lion Spices</h2>
          <ul className="mt-4 grid gap-3 text-sm text-gray-700 md:grid-cols-2">
            <li>• Farm sourced ingredients</li>
            <li>• No preservatives</li>
            <li>• Lab tested for purity</li>
            <li>• Premium quality packaging</li>
          </ul>
        </div>

        <div className="mt-8 rounded-[32px] bg-white p-8 shadow-[0_18px_45px_-24px_rgba(0,0,0,0.35)]">
          <h2 className="text-2xl font-bold text-gray-900">Journey</h2>
          <div className="mt-6 flex flex-wrap gap-3 text-sm text-gray-700">
            {['Farm', 'Cleaning', 'Grinding', 'Packaging', 'Delivery'].map((step) => <span key={step} className="rounded-full bg-gray-100 px-4 py-2">{step}</span>)}
          </div>
        </div>
      </section>
    </main>
  );
}
