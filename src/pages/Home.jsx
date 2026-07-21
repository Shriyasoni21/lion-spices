import { Link } from 'react-router-dom';
import HeroSection from '../components/sections/HeroSection';
import { products } from '../data/productData';

const reasons = [
  { title: 'Pure ingredients', text: 'No additives, no fillers, just clean spice blends with real character.' },
  { title: 'Hygienic packing', text: 'Sealed and handled with care to preserve freshness and aroma.' },
  { title: 'Fast delivery', text: 'Efficient dispatch and reliable delivery to kitchens across India.' },
  { title: 'Trusted quality', text: 'Crafted for everyday cooking and special occasions alike.' },
];

const reviews = [
  { name: 'Rohit', quote: 'The color, aroma, and flavor feel premium from the first spoon.' },
  { name: 'Priya', quote: 'Beautiful packaging and honest quality. My go-to spice brand.' },
  { name: 'Meera', quote: 'Simple, elegant, and consistent every single time.' },
];

export default function HomePage() {
  return (
    <>
      <HeroSection />

      <section className="bg-white py-8 sm:py-10">
        <div className="container-custom">
          <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-2xl">
              <p className="chip text-primary-red">Our Premium Collection</p>
              <h2 className="mt-3 section-heading">Handpicked spices crafted with authenticity and tradition.</h2>
            </div>
            <Link to="/products" className="btn-soft">View all products</Link>
          </div>

          <div className="grid gap-4 grid-cols-2 md:grid-cols-3">
            {products.slice(0, 6).map((product) => (
              <article key={product.id} className="group overflow-hidden rounded-[24px] border border-gray-200 bg-[#fffaf5] transition duration-300 hover:-translate-y-1 hover:shadow-[0_16px_40px_-24px_rgba(15,23,42,0.25)]">
                <div className="product-image-shell my-3 transition duration-300 group-hover:scale-[1.02]">
                  <img src={product.image} alt={product.title} className="max-w-[85%] max-h-[85%] object-contain" />
                </div>
                <div className="p-5 pb-6 text-center">
                  <h3 className="text-lg font-semibold text-gray-900">{product.title}</h3>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between rounded-[24px] border border-gray-200 bg-[#fff7ef] p-5 sm:p-6">
            <p className="text-sm leading-7 text-gray-600">A refined collection of six signature spices, presented with the same clarity and elegance as the rest of the brand.</p>
            <div className="flex gap-3">
              <Link to="/products" className="btn-solid">Explore Collection</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#fff7ef] py-8 sm:py-10">
        <div className="container-custom">
          <div className="mb-6 max-w-2xl">
            <p className="chip text-primary-red">Why choose us</p>
            <h2 className="mt-3 section-heading">Minimal luxury, crafted into every spice.</h2>
          </div>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {reasons.map((reason) => (
              <div key={reason.title} className="panel-card p-5">
                <h3 className="text-lg font-semibold text-gray-900">{reason.title}</h3>
                <p className="mt-2 text-sm leading-7 text-gray-600">{reason.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-8 sm:py-10">
        <div className="container-custom">
          <div className="mb-6 max-w-2xl">
            <p className="chip text-primary-red">Customer love</p>
            <h2 className="mt-3 section-heading">Simple words from homes that trust Lion Spices.</h2>
          </div>
          <div className="grid gap-4 lg:grid-cols-3">
            {reviews.map((review) => (
              <div key={review.name} className="panel-card p-5">
                <p className="text-base leading-7 text-gray-700">“{review.quote}”</p>
                <p className="mt-4 text-sm font-semibold text-gray-900">{review.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white pb-8 sm:pb-10">
        <div className="container-custom">
          <div className="flex flex-col gap-4 rounded-[24px] border border-gray-200 bg-[#fffaf5] p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-primary-red">Bring premium spices home</p>
              <h2 className="mt-2 text-2xl font-semibold text-gray-900">Create rich, authentic meals with Lion Spices.</h2>
            </div>
            <div className="flex gap-3">
              <Link to="/products" className="btn-solid">Shop now</Link>
              <Link to="/contact" className="btn-soft">Contact us</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
