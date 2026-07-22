import { Link } from 'react-router-dom';
import { products } from '../../data/productData';
import ImageWithFallback from '../common/ImageWithFallback';

export default function HomeFeaturedSection() {
  return (
    <section className="bg-white py-10 sm:py-12">
      <div className="container-custom">
        <div className="mx-auto max-w-3xl text-center">
          <p className="chip text-primary-red">Signature Products</p>
          <h2 className="mt-3 section-heading">Our six premium spice essentials.</h2>
          <p className="mt-3 section-copy text-gray-600">
            A curated collection of our signature mixes and pure spice powders.
          </p>
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <article
              key={product.id}
              className="group flex flex-col items-center rounded-[24px] border border-gray-100 bg-cream p-5 text-center shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-md"
            >
              <div className="mb-3 flex h-18 w-18 items-center justify-center rounded-[22px] bg-white shadow-sm">
                <ImageWithFallback src={product.image} alt={product.title} className="h-12 w-12 object-contain" />
              </div>
              <h3 className="text-sm font-semibold text-gray-900">{product.title}</h3>
            </article>
          ))}
        </div>

        <div className="mt-6 text-center">
          <Link
            to="/products"
            className="inline-flex items-center rounded-full bg-primary-red px-7 py-2 text-sm font-semibold text-white shadow-lg transition hover:bg-red-700"
          >
            See All Products
          </Link>
        </div>
      </div>
    </section>
  );
}
