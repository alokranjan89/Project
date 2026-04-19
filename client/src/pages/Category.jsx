import React from "react";
import { useParams } from "react-router-dom";
import { products } from "../data/products";
import ProductCard from "../components/ProductCard";

const Category = () => {
  const { name } = useParams();

  const filtered = products.filter(
    (p) => p.category === name.toLowerCase()
  );

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6 capitalize">
        {name} Products
      </h1>

      {filtered.length === 0 ? (
        <p>No products found</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {filtered.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Category;