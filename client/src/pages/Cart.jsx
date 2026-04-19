import React from "react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const {
    cart,
    removeFromCart,
    increaseQty,
    decreaseQty,
    totalItems,
    totalPrice,
  } = useCart();

  const navigate = useNavigate();

  // Empty Cart
  if (cart.length === 0) {
    return (
      <div className="p-10 text-center text-xl">
        Your cart is empty 🛒
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-10">
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-6">

        {/* Cart Items */}
        <div className="md:col-span-2 space-y-4">
          {cart.map((item) => (
            <div
              key={item.id}
              className="flex gap-4 bg-white p-4 rounded-xl shadow-sm items-center"
            >
              {/* Image */}
              <img
                src={item.image}
                alt={item.name}
                className="w-24 h-24 object-cover rounded"
              />

              {/* Info */}
              <div className="flex-1">
                <h3 className="font-semibold text-gray-800">
                  {item.name}
                </h3>

                <p className="text-pink-600 font-medium">
                  ₹{item.price}
                </p>

                {/* Quantity Controls */}
                <div className="flex items-center gap-3 mt-2">
                  <button
                    onClick={() => decreaseQty(item.id)}
                    className="w-8 h-8 flex items-center justify-center bg-gray-200 rounded hover:bg-gray-300"
                  >
                    -
                  </button>

                  <span className="font-medium">{item.quantity}</span>

                  <button
                    onClick={() => increaseQty(item.id)}
                    className="w-8 h-8 flex items-center justify-center bg-gray-200 rounded hover:bg-gray-300"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Remove */}
              <button
                onClick={() => removeFromCart(item.id)}
                className="text-red-500 hover:underline"
              >
                Remove
              </button>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="bg-white p-6 rounded-xl shadow-sm h-fit">
          <h2 className="text-xl font-bold mb-4">
            Order Summary
          </h2>

          <p className="mb-2">
            Total Items: {totalItems}
          </p>

          <p className="text-lg font-semibold">
            Total: ₹{totalPrice}
          </p>

          <button
            onClick={() => navigate("/checkout")}
            className="mt-4 w-full bg-pink-600 text-white py-3 rounded-lg hover:bg-pink-700 transition"
          >
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;