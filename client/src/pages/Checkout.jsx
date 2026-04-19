import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Checkout = () => {
  const { cart, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const placeOrder = () => {
    if (!form.name || !form.phone || !form.address) {
      toast.error("Please fill all fields"); // ✅ better UX
      return;
    }

    toast.success("Order placed successfully 🎉"); // ✅ moved here

    clearCart();

    setTimeout(() => {
      navigate("/success");
    }, 1000); // small delay for UX
  };

  if (cart.length === 0) {
    return <div className="p-10 text-center">Cart is empty</div>;
  }

  return (
    <div className="bg-gray-50 min-h-screen py-10">
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-6">

        {/* Address Form */}
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h2 className="text-xl font-bold mb-4">Delivery Details</h2>

          <input
            type="text"
            name="name"
            placeholder="Full Name"
            className="w-full border p-2 mb-3 rounded"
            onChange={handleChange}
          />

          <input
            type="text"
            name="phone"
            placeholder="Phone Number"
            className="w-full border p-2 mb-3 rounded"
            onChange={handleChange}
          />

          <textarea
            name="address"
            placeholder="Address"
            className="w-full border p-2 mb-3 rounded"
            onChange={handleChange}
          />
        </div>

        {/* Order Summary */}
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h2 className="text-xl font-bold mb-4">Order Summary</h2>

          {cart.map((item) => (
            <div key={item.id} className="flex justify-between mb-2">
              <span>
                {item.name} × {item.quantity}
              </span>
              <span>₹{item.price * item.quantity}</span>
            </div>
          ))}

          <hr className="my-4" />

          <p className="text-lg font-semibold">
            Total: ₹{totalPrice}
          </p>

          <button
            onClick={placeOrder}
            className="mt-4 w-full bg-pink-600 text-white py-3 rounded-lg hover:bg-pink-700 transition"
          >
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;