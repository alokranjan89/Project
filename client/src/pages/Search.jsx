import React from "react";
import { useSearch } from "../context/SearchContext";
import { products } from "../data/products";
import ProductCard from "../components/ProductCard";

const Search = () => {
  const { query } = useSearch();

  const q = query.toLowerCase();

  // ✅ Combined filtering (REAL WORLD)
  const filtered = products.filter((p) => {
    return (
      p.name?.toLowerCase().includes(q) ||
      p.category?.toLowerCase().includes(q) ||
      p.description?.toLowerCase().includes(q) ||
      p.tags?.some((tag) => tag.toLowerCase().includes(q))
    );
  });

  return (
    <div className="max-w-7xl mx-auto p-6">

      {/* Heading */}
      <h1 className="text-2xl font-bold mb-6">
        {query
          ? `Search Results for "${query}"`
          : "Start typing to search products"}
      </h1>

      {/* Empty query */}
      {!query ? (
        <div className="text-center text-gray-500 mt-10">
          🔍 Try searching "dress", "toy", "lipstick"
        </div>

      ) : filtered.length === 0 ? (

        /* No results */
        <div className="text-center text-gray-500 mt-10">
          😕 No products found for "{query}"
        </div>

      ) : (

        /* Results */
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filtered.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Search;