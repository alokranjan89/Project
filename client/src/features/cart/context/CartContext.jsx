import { useEffect, useState, useMemo } from "react";
import { CartContext } from "./cartContextObject";
import { toast } from "react-hot-toast";

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem("cart");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // ✅ Persist cart
  useEffect(() => {
    try {
      localStorage.setItem("cart", JSON.stringify(cart));
    } catch (err) {
      console.error("Unable to persist cart", err);
    }
  }, [cart]);

  // 🔥 Helper function (clean code)
  const updateCart = (callback) => {
    setCart((prev) => callback(prev));
  };

  // ✅ Add to cart
  const addToCart = (product) => {
    if (!product?.id) return;

    updateCart((prev) => {
      const exist = prev.find((item) => item.id === product.id);

      if (exist) {
        toast.success("Quantity updated 🛒");
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      toast.success("Added to cart 🛍️");
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  // ✅ Remove item
  const removeFromCart = (id) => {
    updateCart((prev) => {
      toast.error("Item removed ❌");
      return prev.filter((item) => item.id !== id);
    });
  };

  // ✅ Increase quantity
  const increaseQty = (id) => {
    updateCart((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  // ✅ Decrease quantity (NO DELETE)
  const decreaseQty = (id) => {
    updateCart((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: item.quantity > 1 ? item.quantity - 1 : 1,
            }
          : item
      )
    );
  };

  // ✅ Clear cart
  const clearCart = () => {
    setCart([]);
    toast("Cart cleared 🧹");
  };

  // 🔥 Optimized totals
  const totalItems = useMemo(
    () => cart.reduce((sum, item) => sum + item.quantity, 0),
    [cart]
  );

  const totalPrice = useMemo(
    () => cart.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [cart]
  );

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        increaseQty,
        decreaseQty,
        clearCart,
        totalItems,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};