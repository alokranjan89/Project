import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";
import toast from "react-hot-toast";

const Footer = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  const handleSubscribe = () => {
    if (!email) return;
    toast.success(`Subscribed with ${email}`);
    setEmail("");
  };

  return (
    <footer className="bg-gray-950 text-gray-300 mt-16 relative overflow-hidden">
      <div className="absolute -top-20 -right-20 w-72 h-72 bg-pink-600/20 blur-3xl rounded-full"></div>

      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12">
        <div>
          <h2
            onClick={() => navigate("/")}
            className="text-2xl font-bold text-pink-500 cursor-pointer tracking-tight"
          >
            MyStore
          </h2>
          <p className="mt-4 text-sm text-gray-400 leading-relaxed max-w-xs">
            Discover curated fashion, beauty, and lifestyle essentials designed
            for modern living.
          </p>
        </div>

        <div>
          <h3 className="text-white font-semibold mb-5">Quick Links</h3>
          <ul className="space-y-3 text-sm">
            {[
              { name: "Home", path: "/" },
              { name: "Shringaar", path: "/category/shringaar" },
              { name: "Games", path: "/category/games" },
              { name: "Clothing", path: "/category/clothing" },
            ].map((item) => (
              <li
                key={item.name}
                onClick={() => navigate(item.path)}
                className="cursor-pointer hover:text-pink-500 transition duration-200"
              >
                {item.name}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-white font-semibold mb-5">Support</h3>
          <ul className="space-y-3 text-sm">
            {["Contact Us", "FAQs", "Shipping", "Returns"].map((item) => (
              <li
                key={item}
                className="cursor-pointer hover:text-pink-500 transition duration-200"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-white font-semibold mb-5">💌 Stay Updated</h3>

          <p className="text-sm text-gray-400 mb-4">
            Get exclusive offers and updates straight to your inbox.
          </p>

          <div className="flex w-full max-w-sm bg-gray-900 border border-gray-800 rounded-full overflow-hidden focus-within:ring-2 focus-within:ring-pink-500 transition">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="flex-1 px-4 py-2 bg-transparent outline-none text-sm"
            />
            <button
              type="button"
              onClick={handleSubscribe}
              className="bg-pink-600 px-6 py-2 text-sm font-medium hover:bg-pink-700 transition"
            >
              Join
            </button>
          </div>

          <div className="flex gap-4 mt-6">
            {[FaFacebookF, FaInstagram, FaTwitter].map((Icon, i) => (
              <div
                key={i}
                className="p-3 bg-gray-800 rounded-full hover:bg-pink-600 hover:scale-110 transition duration-300 cursor-pointer"
              >
                <Icon size={14} />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-gray-800 text-center py-5 text-sm text-gray-500">
        © {new Date().getFullYear()} MyStore. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
