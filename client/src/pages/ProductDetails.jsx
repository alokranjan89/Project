import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import toast from "react-hot-toast";

const products = [
  {
    id: 1,
    name: "Lipstick",
    price: 299,
    description: "High quality lipstick for daily use",
    image: "https://images.unsplash.com/photo-1586495777744-4413f21062fa",
  },
  {
    id: 2,
    name: "Toy Car",
    price: 499,
    description: "Fun toy car for kids",
    image: "https://images.unsplash.com/photo-1594787318286-3d835c1d207f",
  },
  {
    id: 3,
    name: "Kurti",
    price: 999,
    description: "Comfortable cotton kurti",
    image: "https://images.unsplash.com/photo-1618354691373-d851c5c3a990",
  },
];

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const product = products.find((p) => p.id === Number(id));

  if (!product) {
    return (
      <div className="text-center mt-10 text-red-500">
        Product not found
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-6 grid grid-cols-1 md:grid-cols-2 gap-6">

      {/* Image */}
      <div className="overflow-hidden rounded-xl">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-auto md:h-[400px] object-cover hover:scale-105 transition duration-300"
        />
      </div>

      {/* Details */}
      <div>
        <h1 className="text-3xl font-bold text-gray-800">
          {product.name}
        </h1>

        <p className="text-pink-600 text-2xl font-semibold mt-3">
          ₹{product.price}
        </p>

        <p className="mt-4 text-gray-600 leading-relaxed">
          {product.description}
        </p>

        {/* Buttons */}
        <div className="mt-6 flex gap-4">

          {/* Add to Cart */}
          <button
            onClick={() => {
              addToCart(product);
              toast.success("Added to cart 🛒");
            }}
            className="bg-pink-600 text-white px-6 py-3 rounded-lg hover:bg-pink-700 transition"
          >
            Add to Cart
          </button>

          {/* Buy Now */}
          <button
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