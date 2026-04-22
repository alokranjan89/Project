import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

import CategoryCard from "../components/CategoryCard";
import ProductCard from "../components/ProductCard";
import SkeletonCard from "../components/SkeletonCard";
import { useProductCatalog } from "../hooks/useProductCatalog";

const Home = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const { categoryHighlights, featuredProducts } = useProductCatalog();
  const MotionCard = motion.div;

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="bg-white">
      <section className="min-h-[85vh] flex items-center bg-gradient-to-br from-pink-100 via-white to-purple-100">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-pink-500 font-medium mb-3 tracking-wide">
              ✨ New Collection 2026
            </p>

            <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
              Upgrade Your <br />
              <span className="text-pink-600">Style & Beauty</span>
            </h1>

            <p className="text-gray-600 mb-8 max-w-lg text-lg">
              Discover premium makeup, fashion and lifestyle products curated
              for modern women.
            </p>

            <div className="flex gap-4">
              <button
                onClick={() => navigate("/category/shringaar")}
                className="bg-pink-600 text-white px-8 py-3 rounded-full shadow-md hover:shadow-xl hover:-translate-y-1 transition duration-300"
              >
                Shop Now
              </button>

              <button
                onClick={() => navigate("/offers")}
                className="border border-gray-300 text-gray-700 px-8 py-3 rounded-full hover:border-pink-500 hover:text-pink-600 hover:bg-pink-50 transition duration-300"
              >
                Explore
              </button>
            </div>

            <p className="text-sm text-gray-500 mt-6">⭐ 10,000+ happy customers</p>
          </div>

          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=1200&auto=format&fit=crop"
              alt="MyStore hero"
              className="w-full h-[480px] object-cover rounded-3xl shadow-xl hover:scale-105 transition duration-500"
            />
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-pink-300/30 rounded-full blur-3xl"></div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-20 bg-white border-t border-gray-100">
        <h2 className="text-3xl font-semibold mb-10">🛍️ Shop by Category</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {categoryHighlights.map((category) => (
            <CategoryCard
              key={category.title}
              title={category.title}
              image={category.image}
              path={category.path}
            />
          ))}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-20 bg-gray-50 rounded-3xl shadow-inner">
        <h2 className="text-3xl font-semibold mb-10">🔥 Trending Products</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {loading
            ? Array.from({ length: 4 }).map((_, i) => <SkeletonCard key={i} />)
            : featuredProducts.map((product, i) => (
                <MotionCard
                  key={product.id}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <ProductCard product={product} />
                </MotionCard>
              ))}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="relative bg-gradient-to-r from-pink-600 to-purple-600 text-white rounded-2xl p-10 flex flex-col md:flex-row justify-between items-center shadow-xl overflow-hidden">
          <div className="absolute -top-10 -right-10 w-52 h-52 bg-white/20 rounded-full blur-3xl"></div>

          <div>
            <h2 className="text-3xl font-semibold mb-3">🎉 Flat 50% OFF</h2>
            <p className="opacity-90 text-lg">
              On all beauty products this week
            </p>
          </div>

          <button
            onClick={() => navigate("/category/shringaar")}
            className="mt-6 md:mt-0 bg-white text-pink-600 px-7 py-3 rounded-full font-semibold hover:scale-105 shadow-md hover:shadow-lg transition duration-300"
          >
            Shop Deals
          </button>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 pb-20 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        {[
          { label: "Customers", value: "10K+ 😊" },
          { label: "Products", value: `${featuredProducts.length}+ 🛒` },
          { label: "Ratings", value: "4.8⭐" },
          { label: "Delivery", value: "Fast 🚚" },
        ].map((item, i) => (
          <div
            key={i}
            className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-lg hover:-translate-y-1 transition text-center"
          >
            <p className="text-2xl font-bold">{item.value}</p>
            <p className="text-gray-500">{item.label}</p>
          </div>
        ))}
      </section>
    </div>
  );
};

export default Home;
