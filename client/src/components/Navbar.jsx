import React, { useState } from "react";
import { Search, ShoppingCart, User, Menu, X } from "lucide-react";
import { useSearch } from "../context/SearchContext";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

const Navbar = () => {
  const [showCategories, setShowCategories] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const { query, setQuery } = useSearch();
  const navigate = useNavigate();
  const { totalItems } = useCart();

  return (
    <div className="w-full sticky top-0 bg-white/90 backdrop-blur-md z-50 shadow-sm">

      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">

        {/* LOGO */}
        <h1
          onClick={() => navigate("/")}
          className="text-2xl font-bold text-pink-600 cursor-pointer tracking-tight"
        >
          MyStore
        </h1>

        {/* SEARCH */}
        <div className="hidden md:flex items-center bg-gray-100 hover:bg-white focus-within:bg-white rounded-full px-4 py-2 w-[40%] focus-within:ring-2 focus-within:ring-pink-400 transition">
          <Search size={18} className="text-gray-500" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") navigate("/search");
            }}
            placeholder="Search for products..."
            className="ml-3 bg-transparent outline-none w-full text-sm"
          />
        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-6">

          {/* DESKTOP NAV */}
          <div className="hidden md:flex items-center gap-6 relative">

            {/* Categories */}
            <div
              onMouseEnter={() => setShowCategories(true)}
              onMouseLeave={() => setShowCategories(false)}
              className="relative cursor-pointer font-medium hover:text-pink-600 transition"
            >
              Categories

              {/* Dropdown */}
              <div
                className={`absolute top-12 mt-2 left-0 bg-white shadow-xl border border-gray-100 rounded-xl p-4 w-52 transition duration-200 ${
                  showCategories ? "opacity-100 visible" : "opacity-0 invisible"
                }`}
              >
                {["shringaar", "games", "clothing"].map((cat) => (
                  <p
                    key={cat}
                    onClick={() => navigate(`/category/${cat}`)}
                    className="cursor-pointer px-3 py-2 rounded-lg hover:bg-gray-100 capitalize"
                  >
                    {cat}
                  </p>
                ))}
              </div>
            </div>

            {/* Offers */}
            <span
              onClick={() => navigate("/offers")}
              className="cursor-pointer font-medium hover:text-pink-600 transition"
            >
              Offers
            </span>
          </div>

          {/* CART */}
          <div
            onClick={() => navigate("/cart")}
            className="relative cursor-pointer group"
          >
            <ShoppingCart size={20} className="group-hover:text-pink-600 transition" />

            {totalItems > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-pink-600 text-white text-xs px-1.5 py-0.5 rounded-full">
                {totalItems}
              </span>
            )}
          </div>

          {/* USER */}
          <div className="cursor-pointer group">
            <User size={20} className="group-hover:text-pink-600 transition" />
          </div>

          {/* MOBILE MENU BUTTON */}
          <button
            className="md:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}
      <div
        className={`md:hidden bg-white border-t transition-all duration-300 ease-in-out overflow-hidden ${
          menuOpen ? "max-h-[400px] py-4" : "max-h-0"
        }`}
      >
        <div className="px-6 flex flex-col gap-4">

          {/* SEARCH */}
          <div className="flex items-center bg-gray-100 rounded-full px-4 py-2">
            <Search size={18} />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  navigate("/search");
                  setMenuOpen(false);
                }
              }}
              placeholder="Search..."
              className="ml-2 bg-transparent outline-none w-full"
            />
          </div>

          {/* LINKS */}
          {["shringaar", "games", "clothing"].map((cat) => (
            <span
              key={cat}
              onClick={() => {
                navigate(`/category/${cat}`);
                setMenuOpen(false);
              }}
              className="cursor-pointer py-2 border-b capitalize"
            >
              {cat}
            </span>
          ))}

          <span
            onClick={() => {
              navigate("/offers");
              setMenuOpen(false);
            }}
            className="cursor-pointer text-pink-600 font-medium"
          >
            🔥 Offers
          </span>
        </div>
      </div>
    </div>
  );
};

export default Navbar;