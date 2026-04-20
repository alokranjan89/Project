import React from "react";

import ProductCard from "../components/ProductCard";
import { useProductCatalog } from "../context/useProductCatalog";
import { useSearch } from "../context/useSearch";

const Search = () => {
  const { query } = useSearch();
  const { products } = useProductCatalog();
  const q = query.toLowerCase();

  const filtered = products.filter((product) => {
    return (
      product.name?.toLowerCase().includes(q) ||
      product.category?.toLowerCase().includes(q) ||
      product.description?.toLowerCase().includes(q) ||
      product.tags?.some((tag) => tag.toLowerCase().includes(q))
    );
  });

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">
        {query
          ? `Search Results for "${query}"`
          : "Start typing to search products"}
      </h1>

      {!query ? (
        <div className="text-center text-gray-500 mt-10">
          🔎 Try searching "dress", "controller", "lipstick"
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center text-gray-500 mt-10">
          😕 No products found for "{query}"
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Search;
