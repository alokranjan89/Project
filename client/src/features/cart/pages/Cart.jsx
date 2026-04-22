import React from "react";
import { useNavigate } from "react-router-dom";

import { useCart } from "../hooks/useCart";
import { formatCurrency } from "../../../shared/utils/format";

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

  // ✅ Empty Cart UI (Improved)
  if (cart.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-[70vh] text-center">
        <div className="text-6xl mb-4">🛒</div>
        <h2 className="text-2xl font-semibold">Your cart is empty</h2>
        <p className="text-gray-500 mt-2">
          Looks like you haven't added anything yet.
        </p>

        <button
          onClick={() => navigate("/")}
          className="mt-6 bg-pink-600 text-white px-6 py-3 rounded-lg hover:bg-pink-700 transition"
        >
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-10">
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-6">
        
        {/* LEFT SIDE */}
        <div className="md:col-span-2 space-y-4">

          {/* Continue Shopping */}
          <button
            onClick={() => navigate("/")}
            className="text-pink-600 hover:underline"
          >
            ← Continue Shopping
          </button>

          {cart.map((item) => (
            <div
              key={item.id}
              className="flex gap-4 bg-white p-4 rounded-xl shadow-sm items-center hover:shadow-md transition"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-24 h-24 object-cover rounded"
              />

              <div className="flex-1">
                <h3 className="font-semibold text-gray-800">
                  {item.name}
                </h3>

                <p className="text-pink-600 font-medium">
                  {formatCurrency(item.price)}
                </p>

                {/* ✅ Per Item Total */}
                <p className="text-sm text-gray-500">
                  {item.quantity} × {formatCurrency(item.price)} ={" "}
                  <span className="font-medium text-gray-800">
                    {formatCurrency(item.price * item.quantity)}
                  </span>
                </p>

                {/* Quantity Controls */}
                <div className="flex items-center gap-3 mt-2">
                  <button
                    type="button"
                    onClick={() => decreaseQty(item.id)}
                    disabled={item.quantity === 1}
                    className={`w-8 h-8 flex items-center justify-center rounded ${
                      item.quantity === 1
                        ? "bg-gray-100 cursor-not-allowed"
                        : "bg-gray-200 hover:bg-gray-300"
                    }`}
                  >
                    -
                  </button>

                  <span className="font-medium">{item.quantity}</span>

                  <button
                    type="button"
                    onClick={() => increaseQty(item.id)}
                    className="w-8 h-8 flex items-center justify-center bg-gray-200 rounded hover:bg-gray-300"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Remove */}
              <button
                type="button"
                onClick={() => removeFromCart(item.id)}
                className="text-red-500 hover:underline"
              >
                Remove
              </button>
            </div>
          ))}
        </div>

        {/* RIGHT SIDE */}
        <div className="bg-white p-6 rounded-xl shadow-sm h-fit">
          <h2 className="text-xl font-bold mb-4">📦 Order Summary</h2>

          <p className="mb-2">Total Items: {totalItems}</p>

          <p className="text-lg font-semibold">
            Total: {formatCurrency(totalPrice)}
          </p>

          <button
            type="button"
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