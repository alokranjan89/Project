import React from "react";
import { useCart } from "../context/CartContext";
import { Heart } from "lucide-react";

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  return (
    <div className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl hover:-translate-y-1 transition duration-300">

      {/* IMAGE */}
      <div className="relative overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-52 object-cover group-hover:scale-110 transition duration-500 ease-out"
        />

        {/* Wishlist */}
        <button className="absolute top-3 right-3 bg-white/90 backdrop-blur p-2 rounded-full shadow hover:text-pink-600 hover:scale-110 transition duration-300">
          <Heart size={18} />
        </button>

        {/* Quick Add */}
        <button
          onClick={() => addToCart(product)}
          className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-pink-600 text-white px-5 py-2 rounded-full 
          opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 
          transition duration-300 shadow-md hover:shadow-lg"
        >
          Add to Cart
        </button>
      </div>

      {/* CONTENT */}
      <div className="p-5">

        {/* Product Name */}
        <h3 className="font-medium text-gray-800 line-clamp-1">
          {product.name}
        </h3>

        {/* Rating */}
        <div className="flex items-center text-sm text-gray-500 mt-1">
          ⭐ 4.5 <span className="ml-1">(120)</span>
        </div>

        {/* Price */}
        <div className="mt-3 flex items-center gap-2">
          <p className="text-pink-600 font-semibold text-lg">
            ₹{product.price}
          </p>
          <p className="text-gray-400 line-through text-sm">
            ₹{product.price + 300}
          </p>
          <span className="text-green-600 text-xs font-medium">
            20% OFF
          </span>
        </div>

      </div>
    </div>
  );
};

export default ProductCard;