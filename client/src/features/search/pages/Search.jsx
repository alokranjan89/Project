import React, { useMemo } from "react";

import ProductCard from "../../catalog/components/ProductCard";
import { useProductCatalog } from "../../catalog/hooks/useProductCatalog";
import { useSearch } from "../hooks/useSearch";

const Search = () => {
  const { query } = useSearch();
  const { products } = useProductCatalog();

  // ✅ Normalize query
  const normalizedQuery = query.trim().toLowerCase();

  // 🔥 Optimized filtering
  const filtered = useMemo(() => {
    if (!normalizedQuery) return [];

    return products.filter((product) => {
      return (
        product.name?.toLowerCase().includes(normalizedQuery) ||
        product.category?.toLowerCase().includes(normalizedQuery) ||
        product.description?.toLowerCase().includes(normalizedQuery) ||
        product.tags?.some((tag) =>
          tag.toLowerCase().includes(normalizedQuery)
        )
      );
    });
  }, [normalizedQuery, products]);

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">
        {normalizedQuery
          ? `Search Results for "${query}"`
          : "Start typing to search products"}
      </h1>

      {/* No query */}
      {!normalizedQuery ? (
        <div className="text-center text-gray-500 mt-16">
          <div className="text-5xl mb-4">🔎</div>
          <p>Try searching for products like:</p>
          <div className="mt-2 text-sm">
            "dress", "controller", "lipstick"
          </div>
        </div>

      ) : filtered.length === 0 ? (

        /* No results */
        <div className="text-center text-gray-500 mt-16">
          <div className="text-5xl mb-4">😕</div>
          <p>No products found for "{query}"</p>
        </div>

      ) : (

        /* Results */
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