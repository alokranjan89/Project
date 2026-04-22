import { useState, useMemo } from "react";
import { SearchContext } from "./searchContextObject";

export const SearchProvider = ({ children, products = [] }) => {
  const [query, setQuery] = useState("");

  // 🔥 Normalize query
  const normalizedQuery = query.trim().toLowerCase();

  // 🔥 Filtered results
  const filteredProducts = useMemo(() => {
    if (!normalizedQuery) return products;

    return products.filter((product) =>
      product.name.toLowerCase().includes(normalizedQuery)
    );
  }, [normalizedQuery, products]);

  // 🔥 Clear search
  const clearSearch = () => setQuery("");

  return (
    <SearchContext.Provider
      value={{
        query,
        setQuery,
        clearSearch,
        filteredProducts,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};