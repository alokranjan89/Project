import React, { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Search,
  ShoppingCart,
  Heart,
  User,
  Menu,
  X,
  ChevronDown,
} from "lucide-react";

import { useSearch } from "../context/useSearch";
import { useCart } from "../context/useCart";
import { useWishlist } from "../context/useWishlist";

const Navbar = () => {
  const [showCategories, setShowCategories] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const { query, setQuery } = useSearch();
  const navigate = useNavigate();
  const { totalItems } = useCart();
  const { wishlistCount } = useWishlist();

  const categories = useMemo(
    () => [
      { label: "Shringaar", slug: "shringaar" },
      { label: "Games", slug: "games" },
      { label: "Clothing", slug: "clothing" },
    ],
    []
  );

  const openSearch = () => {
    navigate("/search");
    setMenuOpen(false);
  };

  const goToCategory = (slug) => {
    navigate(`/category/${slug}`);
    setMenuOpen(false);
    setShowCategories(false);
  };

  return (
    <header className="w-full sticky top-0 bg-white/90 backdrop-blur-md z-50 shadow-sm">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        <Link
          to="/"
          className="shrink-0 inline-flex items-center text-2xl font-bold text-pink-600 tracking-tight rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-400"
          aria-label="Go to homepage"
        >
          MyStore
        </Link>

        <div className="hidden md:flex items-center bg-gray-100 hover:bg-white focus-within:bg-white rounded-full px-4 py-2 w-[40%] focus-within:ring-2 focus-within:ring-pink-400 transition">
          <Search size={18} className="text-gray-500" aria-hidden="true" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") openSearch();
            }}
            placeholder="Search for products..."
            className="ml-3 bg-transparent outline-none w-full text-sm"
            aria-label="Search products"
          />
        </div>

        <div className="flex items-center gap-6">
          <div className="hidden md:flex items-center gap-6 relative">
            <div
              className="relative"
              onMouseEnter={() => setShowCategories(true)}
              onMouseLeave={() => setShowCategories(false)}
            >
              <button
                type="button"
                onClick={() => setShowCategories((prev) => !prev)}
                onFocus={() => setShowCategories(true)}
                className="flex items-center gap-1 font-medium hover:text-pink-600 transition"
                aria-haspopup="menu"
                aria-expanded={showCategories}
                aria-controls="navbar-categories-menu"
              >
                Categories
                <ChevronDown size={16} aria-hidden="true" />
              </button>

              <div
                id="navbar-categories-menu"
                className={`absolute top-12 mt-2 left-0 bg-white shadow-xl border border-gray-100 rounded-xl p-4 w-52 transition duration-200 ${
                  showCategories ? "opacity-100 visible" : "opacity-0 invisible"
                }`}
                role="menu"
              >
                {categories.map((cat) => (
                  <button
                    key={cat.slug}
                    type="button"
                    onClick={() => goToCategory(cat.slug)}
                    className="block w-full text-left cursor-pointer px-3 py-2 rounded-lg hover:bg-gray-100 capitalize"
                    role="menuitem"
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>

            <button
              type="button"
              onClick={() => navigate("/offers")}
              className="font-medium hover:text-pink-600 transition"
            >
              Offers
            </button>
          </div>

          <button
            type="button"
            onClick={() => navigate("/wishlist")}
            className="relative cursor-pointer group"
            aria-label={`Open wishlist with ${wishlistCount} items`}
          >
            <Heart size={20} className="group-hover:text-pink-600 transition" />

            {wishlistCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-pink-600 text-white text-xs px-1.5 py-0.5 rounded-full">
                {wishlistCount}
              </span>
            )}
          </button>

          <button
            type="button"
            onClick={() => navigate("/cart")}
            className="relative cursor-pointer group"
            aria-label={`Open cart with ${totalItems} items`}
          >
            <ShoppingCart
              size={20}
              className="group-hover:text-pink-600 transition"
            />

            {totalItems > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-pink-600 text-white text-xs px-1.5 py-0.5 rounded-full">
                {totalItems}
              </span>
            )}
          </button>

          <button
            type="button"
            className="cursor-pointer group"
            aria-label="Open account"
          >
            <User size={20} className="group-hover:text-pink-600 transition" />
          </button>

          <button
            type="button"
            className="md:hidden"
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-navbar-menu"
          >
            {menuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>

      <div
        id="mobile-navbar-menu"
        className={`md:hidden bg-white border-t transition-all duration-300 ease-in-out overflow-hidden ${
          menuOpen ? "max-h-[440px] py-4" : "max-h-0"
        }`}
      >
        <div className="px-6 flex flex-col gap-4">
          <div className="flex items-center bg-gray-100 rounded-full px-4 py-2">
            <Search size={18} aria-hidden="true" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") openSearch();
              }}
              placeholder="Search..."
              className="ml-2 bg-transparent outline-none w-full"
              aria-label="Search products"
            />
          </div>

          {categories.map((cat) => (
            <button
              key={cat.slug}
              type="button"
              onClick={() => goToCategory(cat.slug)}
              className="text-left py-2 border-b capitalize"
            >
              {cat.label}
            </button>
          ))}

          <button
            type="button"
            onClick={() => {
              navigate("/wishlist");
              setMenuOpen(false);
            }}
            className="text-left border-b pb-2"
          >
            Wishlist ({wishlistCount})
          </button>

          <button
            type="button"
            onClick={() => {
              navigate("/offers");
              setMenuOpen(false);
            }}
            className="text-left text-pink-600 font-medium"
          >
            Offers
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
