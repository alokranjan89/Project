import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

import { useCart } from "../../cart/hooks/useCart";
import { formatCurrency } from "../../../shared/utils/format";

const CHECKOUT_FORM_KEY = "checkoutForm";

const Checkout = () => {
  const { cart, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState(() => {
    try {
      const savedForm = sessionStorage.getItem(CHECKOUT_FORM_KEY);
      return savedForm
        ? JSON.parse(savedForm)
        : { name: "", phone: "", address: "" };
    } catch {
      return { name: "", phone: "", address: "" };
    }
  });

  useEffect(() => {
    try {
      sessionStorage.setItem(CHECKOUT_FORM_KEY, JSON.stringify(form));
    } catch (err) {
      console.error("Unable to persist checkout form", err);
    }
  }, [form]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const placeOrder = () => {
    if (!form.name.trim() || !form.phone.trim() || !form.address.trim()) {
      toast.error("Please fill all fields");
      return;
    }

    setIsSubmitting(true);

    window.setTimeout(() => {
      try {
        sessionStorage.removeItem(CHECKOUT_FORM_KEY);
      } catch (err) {
        console.error("Unable to clear checkout form", err);
      }

      toast.success("Order placed successfully");
      clearCart();
      setIsSubmitting(false);
      navigate("/");
    }, 700);
  };

  if (cart.length === 0) {
    return <div className="p-10 text-center">Cart is empty</div>;
  }

  return (
    <div className="bg-gray-50 min-h-screen py-10">
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h2 className="text-xl font-bold mb-4">📍 Delivery Details</h2>

          <input
            type="text"
            name="name"
            value={form.name}
            placeholder="Full Name"
            className="w-full border p-2 mb-3 rounded"
            onChange={handleChange}
          />

          <input
            type="text"
            name="phone"
            value={form.phone}
            placeholder="Phone Number"
            className="w-full border p-2 mb-3 rounded"
            onChange={handleChange}
          />

          <textarea
            name="address"
            value={form.address}
            placeholder="Address"
            className="w-full border p-2 mb-3 rounded"
            onChange={handleChange}
          />
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h2 className="text-xl font-bold mb-4">🧾 Order Summary</h2>

          {cart.map((item) => (
            <div key={item.id} className="flex justify-between mb-2">
              <span>
                {item.name} x {item.quantity}
              </span>
              <span>{formatCurrency(item.price * item.quantity)}</span>
            </div>
          ))}

          <hr className="my-4" />

          <p className="text-lg font-semibold">
            Total: {formatCurrency(totalPrice)}
          </p>

          <button
            type="button"
            disabled={isSubmitting}
            onClick={placeOrder}
            className="mt-4 w-full bg-pink-600 text-white py-3 rounded-lg hover:bg-pink-700 transition disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Placing Order..." : "Place Order"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
