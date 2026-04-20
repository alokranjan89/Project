import { useEffect, useMemo, useState } from "react";

import { useProductCatalog } from "./useProductCatalog";
import { WishlistContext } from "./wishlistContextObject";

export const WishlistProvider = ({ children }) => {
  const { products } = useProductCatalog();
  const [wishlistIds, setWishlistIds] = useState(() => {
    try {
      const savedWishlist = localStorage.getItem("wishlistIds");
      const parsed = savedWishlist ? JSON.parse(savedWishlist) : [];
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem("wishlistIds", JSON.stringify(wishlistIds));
    } catch (err) {
      console.error("Unable to persist wishlist", err);
    }
  }, [wishlistIds]);

  const wishlistItems = useMemo(
    () => products.filter((product) => wishlistIds.includes(product.id)),
    [products, wishlistIds]
  );

  const isWishlisted = (productId) => wishlistIds.includes(productId);

  const toggleWishlist = (product) => {
    let nextValue = false;

    setWishlistIds((prev) => {
      const exists = prev.includes(product.id);
      nextValue = !exists;

      if (exists) {
        return prev.filter((id) => id !== product.id);
      }

      return [...prev, product.id];
    });

    return nextValue;
  };

  const removeFromWishlist = (productId) => {
    setWishlistIds((prev) => prev.filter((id) => id !== productId));
  };

  const clearWishlist = () => {
    setWishlistIds([]);
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlistItems,
        wishlistCount: wishlistIds.length,
        isWishlisted,
        toggleWishlist,
        removeFromWishlist,
        clearWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};
