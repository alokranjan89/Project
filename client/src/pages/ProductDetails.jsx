import React from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";

import { useCart } from "../context/useCart";
import { useProductCatalog } from "../context/useProductCatalog";
import { formatCurrency } from "../utils/format";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { products } = useProductCatalog();

  const product = products.find((item) => item.id === Number(id));

  if (!product) {
    return <div className="text-center mt-10 text-red-500">Product not found</div>;
  }

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="overflow-hidden rounded-xl">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-auto md:h-[400px] object-cover hover:scale-105 transition duration-300"
        />
      </div>

      <div>
        <h1 className="text-3xl font-bold text-gray-800">{product.name}</h1>

        <p className="text-pink-600 text-2xl font-semibold mt-3">
          {formatCurrency(product.price)}
        </p>

        <div className="mt-3 flex items-center gap-3 text-sm text-gray-500">
          <span>⭐ {product.rating}</span>
          <span>{product.reviews} reviews</span>
          <span>{product.stock > 0 ? "✅ In stock" : "❌ Out of stock"}</span>
        </div>

        <p className="mt-4 text-gray-600 leading-relaxed">{product.description}</p>

        <div className="mt-6 flex gap-4">
          <button
            type="button"
            onClick={() => {
              addToCart(product);
              toast.success("Added to cart");
            }}
            className="bg-pink-600 text-white px-6 py-3 rounded-lg hover:bg-pink-700 transition"
          >
            Add to Cart
          </button>

          <button
            type="button"
            onClick={() => {
              addToCart(product);
              navigate("/checkout");
            }}
            className="border px-6 py-3 rounded-lg hover:bg-gray-100 transition"
          >
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
