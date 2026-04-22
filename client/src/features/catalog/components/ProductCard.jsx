import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Heart } from "lucide-react";
import toast from "react-hot-toast";

import { useCart } from "../../cart/hooks/useCart";
import { useWishlist } from "../../wishlist/hooks/useWishlist";
import { formatCurrency } from "../../../shared/utils/format";

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const { isWishlisted, toggleWishlist } = useWishlist();
  const navigate = useNavigate();
  const [imageSrc, setImageSrc] = useState(product.image);

  const originalPrice = product.originalPrice ?? product.price + 300;
  const discount = Math.max(
    0,
    Math.round(((originalPrice - product.price) / originalPrice) * 100)
  );

  const handleWishlistToggle = () => {
    const nextValue = toggleWishlist(product);
    toast.success(
      nextValue
        ? `${product.name} added to wishlist`
        : `${product.name} removed from wishlist`
    );
  };

  return (
    <div className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl hover:-translate-y-1 transition duration-300">
      <div className="relative overflow-hidden">
        <img
          src={imageSrc}
          alt={product.name}
          loading="lazy"
          onClick={() => navigate(`/product/${product.id}`)}
          onError={() =>
            setImageSrc(
              "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=900&auto=format&fit=crop"
            )
          }
          className="w-full h-52 object-cover cursor-pointer group-hover:scale-110 transition duration-500 ease-out"
        />

        <button
          type="button"
          onClick={handleWishlistToggle}
          className={`absolute top-3 right-3 backdrop-blur p-2 rounded-full shadow hover:scale-110 transition duration-300 ${
            isWishlisted(product.id)
              ? "bg-pink-600 text-white"
              : "bg-white/90 hover:text-pink-600"
          }`}
          aria-label={
            isWishlisted(product.id)
              ? `Remove ${product.name} from wishlist`
              : `Save ${product.name}`
          }
        >
          <Heart
            size={18}
            fill={isWishlisted(product.id) ? "currentColor" : "none"}
          />
        </button>

        <button
          type="button"
          onClick={() => addToCart(product)}
          className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-pink-600 text-white px-5 py-2 rounded-full opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition duration-300 shadow-md hover:shadow-lg"
        >
          Add to Cart
        </button>
      </div>

      <div className="p-5">
        <h3
          className="font-medium text-gray-800 line-clamp-1 cursor-pointer"
          onClick={() => navigate(`/product/${product.id}`)}
        >
          {product.name}
        </h3>

        <div className="flex items-center text-sm text-gray-500 mt-1">
          <span>★ {product.rating ?? 4.5}</span>
          <span className="ml-1">({product.reviews ?? 120})</span>
        </div>

        <div className="mt-3 flex items-center gap-2">
          <p className="text-pink-600 font-semibold text-lg">
            {formatCurrency(product.price)}
          </p>
          <p className="text-gray-400 line-through text-sm">
            {formatCurrency(originalPrice)}
          </p>
          {discount > 0 && (
            <span className="text-green-600 text-xs font-medium">
              {discount}% OFF
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
