import React from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Heart, ShoppingBag, Trash2 } from "lucide-react";

import { useWishlist } from "../hooks/useWishlist";
import { useCart } from "../../cart/hooks/useCart";
import { formatCurrency } from "../../../shared/utils/format";

const Wishlist = () => {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { wishlistItems, removeFromWishlist, clearWishlist } = useWishlist();

  if (wishlistItems.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-16 text-center">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-pink-100 text-pink-600 mb-6">
          <Heart size={32} />
        </div>
        <h1 className="text-3xl font-bold text-gray-900">Your wishlist is empty</h1>
        <p className="mt-3 text-gray-500">
          Save the products you love and come back to them anytime.
        </p>
        <button
          type="button"
          onClick={() => navigate("/")}
          className="mt-8 bg-pink-600 text-white px-6 py-3 rounded-full hover:bg-pink-700 transition"
        >
          Explore Products
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">💖 My Wishlist</h1>
          <p className="text-gray-500 mt-2">
            {wishlistItems.length} saved {wishlistItems.length === 1 ? "item" : "items"}
          </p>
        </div>

        <button
          type="button"
          onClick={() => {
            clearWishlist();
            toast.success("Wishlist cleared");
          }}
          className="self-start md:self-auto border border-pink-200 text-pink-600 px-4 py-2 rounded-full hover:bg-pink-50 transition"
        >
          Clear Wishlist
        </button>
      </div>

      <div className="grid gap-5">
        {wishlistItems.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 md:p-5 flex flex-col md:flex-row gap-5 items-start md:items-center"
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-full md:w-32 h-48 md:h-32 rounded-xl object-cover cursor-pointer"
              onClick={() => navigate(`/product/${item.id}`)}
            />

            <div className="flex-1">
              <h2
                className="text-xl font-semibold text-gray-900 cursor-pointer"
                onClick={() => navigate(`/product/${item.id}`)}
              >
                {item.name}
              </h2>
              <p className="mt-2 text-sm text-gray-500 line-clamp-2">
                {item.description}
              </p>
              <div className="mt-3 flex items-center gap-3 text-sm text-gray-500">
                <span>★ {item.rating ?? 4.5}</span>
                <span>{item.reviews ?? 0} reviews</span>
                <span className="capitalize">{item.category}</span>
              </div>
            </div>

            <div className="w-full md:w-auto flex flex-col gap-3 md:items-end">
              <p className="text-xl font-semibold text-pink-600">
                {formatCurrency(item.price)}
              </p>

              <div className="flex gap-2 flex-wrap">
                <button
                  type="button"
                  onClick={() => {
                    addToCart(item);
                    toast.success(`${item.name} added to cart`);
                  }}
                  className="inline-flex items-center gap-2 bg-pink-600 text-white px-4 py-2 rounded-full hover:bg-pink-700 transition"
                >
                  <ShoppingBag size={16} />
                  Add to Cart
                </button>

                <button
                  type="button"
                  onClick={() => {
                    removeFromWishlist(item.id);
                    toast.success(`${item.name} removed from wishlist`);
                  }}
                  className="inline-flex items-center gap-2 border border-gray-200 text-gray-700 px-4 py-2 rounded-full hover:bg-gray-50 transition"
                >
                  <Trash2 size={16} />
                  Remove
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Wishlist;
