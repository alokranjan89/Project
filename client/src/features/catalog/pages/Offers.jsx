import React from "react";

import ProductCard from "../components/ProductCard";
import { useProductCatalog } from "../hooks/useProductCatalog";

const Offers = () => {
  const { offerProducts } = useProductCatalog();

  return (
    <div className="bg-gray-50 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold">🔥 Today&apos;s Offers</h1>
            <p className="text-gray-500 text-sm">
              Limited time deals on selected products
            </p>
          </div>

          <span className="text-sm text-gray-400">Hurry before stock ends ⏳</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {offerProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Offers;
