import React, { useMemo, useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowDownUp,
  Filter,
  Pencil,
  Plus,
  RefreshCw,
  Search,
  Star,
  Trash2,
  X,
} from "lucide-react";

import { useProductCatalog } from "../../catalog/hooks/useProductCatalog";
import { formatCurrency } from "../../../shared/utils/format";

const stockBadgeClassName = (stock) =>
  stock <= 10
    ? "bg-red-100 text-red-700"
    : stock <= 20
      ? "bg-amber-100 text-amber-700"
      : "bg-emerald-100 text-emerald-700";

const sortProducts = (products, sortBy) => {
  const sortable = [...products];

  switch (sortBy) {
    case "priceAsc":
      return sortable.sort((a, b) => a.price - b.price);
    case "priceDesc":
      return sortable.sort((a, b) => b.price - a.price);
    case "ratingDesc":
      return sortable.sort((a, b) => b.rating - a.rating);
    case "stockAsc":
      return sortable.sort((a, b) => a.stock - b.stock);
    case "stockDesc":
      return sortable.sort((a, b) => b.stock - a.stock);
    case "nameAsc":
    default:
      return sortable.sort((a, b) => a.name.localeCompare(b.name));
  }
};

const AdminProducts = () => {
  const navigate = useNavigate();
  const { products, deleteProduct, resetCatalog } = useProductCatalog();
  const [query, setQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [stockFilter, setStockFilter] = useState("all");
  const [sortBy, setSortBy] = useState("nameAsc");
  const [isResetting, setIsResetting] = useState(false);
  const [pendingDeleteId, setPendingDeleteId] = useState(null);

  const categories = useMemo(
    () => ["all", ...new Set(products.map((product) => product.category))],
    [products]
  );

  const filteredProducts = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    const nextProducts = products.filter((product) => {
      const matchesQuery =
        !normalizedQuery ||
        product.name.toLowerCase().includes(normalizedQuery) ||
        product.description.toLowerCase().includes(normalizedQuery) ||
        product.badge.toLowerCase().includes(normalizedQuery) ||
        product.tags.some((tag) => tag.toLowerCase().includes(normalizedQuery));

      const matchesCategory =
        categoryFilter === "all" || product.category === categoryFilter;

      const matchesStock =
        stockFilter === "all" ||
        (stockFilter === "low" && product.stock <= 20) ||
        (stockFilter === "healthy" && product.stock > 20);

      return matchesQuery && matchesCategory && matchesStock;
    });

    return sortProducts(nextProducts, sortBy);
  }, [categoryFilter, products, query, sortBy, stockFilter]);

  const activeFilterCount = [categoryFilter !== "all", stockFilter !== "all", query.trim()]
    .filter(Boolean)
    .length;

  const handleResetCatalog = async () => {
    const confirmed = window.confirm(
      "Reset the catalog to the default seeded products? This will overwrite your current product list."
    );

    if (!confirmed) {
      return;
    }

    try {
      setIsResetting(true);
      await resetCatalog();
      toast.success("Catalog reset to default products");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsResetting(false);
    }
  };

  const handleDeleteProduct = async (product) => {
    const confirmed = window.confirm(
      `Delete "${product.name}" from the catalog? This action cannot be undone.`
    );

    if (!confirmed) {
      return;
    }

    try {
      setPendingDeleteId(product.id);
      await deleteProduct(product.id);
      toast.success(`${product.name} deleted`);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setPendingDeleteId(null);
    }
  };

  const clearFilters = () => {
    setQuery("");
    setCategoryFilter("all");
    setStockFilter("all");
    setSortBy("nameAsc");
  };

  return (
    <div className="rounded-[2rem] border border-white/70 bg-white/82 p-5 shadow-[0_18px_50px_rgba(15,23,42,0.06)] backdrop-blur md:p-7">
      <div className="flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
        <div>
          <p className="text-sm font-medium uppercase tracking-[0.18em] text-pink-600">
            Product Control
          </p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-slate-900">
            Manage products with a production-ready workflow
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-500">
            Search quickly, filter by category and stock health, sort what matters,
            and handle edits or removals with safer confirmation steps.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={handleResetCatalog}
            disabled={isResetting}
            className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <RefreshCw size={16} className={isResetting ? "animate-spin" : ""} />
            {isResetting ? "Resetting..." : "Reset Catalog"}
          </button>
          <Link
            to="/admin/products/new"
            className="inline-flex items-center gap-2 rounded-2xl bg-slate-900 px-4 py-3 text-sm font-medium text-white transition hover:bg-slate-800"
          >
            <Plus size={16} />
            Add Product
          </Link>
        </div>
      </div>

      <div className="mt-6 rounded-[1.5rem] border border-slate-100 bg-slate-50/70 p-4">
        <div className="grid gap-4 lg:grid-cols-[minmax(0,1.3fr)_repeat(3,minmax(0,0.7fr))]">
          <label className="relative block">
            <span className="mb-2 block text-sm font-medium text-slate-700">Search</span>
            <Search
              size={16}
              className="pointer-events-none absolute left-4 top-[3.15rem] text-slate-400"
            />
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search by name, badge, tag, or description"
              className="w-full rounded-2xl border border-slate-200 bg-white py-3 pl-11 pr-4 text-sm text-slate-900 outline-none transition focus:border-pink-500 focus:ring-4 focus:ring-pink-100"
            />
          </label>

          <label>
            <span className="mb-2 block text-sm font-medium text-slate-700">Category</span>
            <select
              value={categoryFilter}
              onChange={(event) => setCategoryFilter(event.target.value)}
              className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-pink-500 focus:ring-4 focus:ring-pink-100"
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category === "all" ? "All categories" : category}
                </option>
              ))}
            </select>
          </label>

          <label>
            <span className="mb-2 block text-sm font-medium text-slate-700">Stock</span>
            <select
              value={stockFilter}
              onChange={(event) => setStockFilter(event.target.value)}
              className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-pink-500 focus:ring-4 focus:ring-pink-100"
            >
              <option value="all">All stock levels</option>
              <option value="low">Low stock only</option>
              <option value="healthy">Healthy stock</option>
            </select>
          </label>

          <label>
            <span className="mb-2 block text-sm font-medium text-slate-700">Sort</span>
            <select
              value={sortBy}
              onChange={(event) => setSortBy(event.target.value)}
              className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-pink-500 focus:ring-4 focus:ring-pink-100"
            >
              <option value="nameAsc">Name A-Z</option>
              <option value="priceAsc">Price low to high</option>
              <option value="priceDesc">Price high to low</option>
              <option value="ratingDesc">Top rated first</option>
              <option value="stockAsc">Lowest stock first</option>
              <option value="stockDesc">Highest stock first</option>
            </select>
          </label>
        </div>

        <div className="mt-4 flex flex-col gap-3 border-t border-slate-200 pt-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap items-center gap-3 text-sm text-slate-500">
            <span className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1.5 text-slate-700">
              <Filter size={14} />
              {activeFilterCount > 0 ? `${activeFilterCount} active filter(s)` : "No active filters"}
            </span>
            <span className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1.5 text-slate-700">
              <ArrowDownUp size={14} />
              {filteredProducts.length} result{filteredProducts.length === 1 ? "" : "s"}
            </span>
          </div>

          <button
            type="button"
            onClick={clearFilters}
            className="inline-flex items-center gap-2 self-start rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-100"
          >
            <X size={14} />
            Clear filters
          </button>
        </div>
      </div>

      {filteredProducts.length === 0 ? (
        <div className="mt-6 rounded-[1.75rem] border border-dashed border-slate-200 bg-white px-6 py-12 text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-slate-500">
            <Search size={22} />
          </div>
          <h2 className="mt-5 text-xl font-semibold text-slate-900">No matching products</h2>
          <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
            Try a different search, change the stock or category filters, or clear
            everything to view the full catalog again.
          </p>
          <button
            type="button"
            onClick={clearFilters}
            className="mt-5 inline-flex items-center gap-2 rounded-2xl bg-slate-900 px-4 py-3 text-sm font-medium text-white transition hover:bg-slate-800"
          >
            Clear filters
          </button>
        </div>
      ) : (
        <>
          <div className="mt-6 grid gap-4 lg:hidden">
            {filteredProducts.map((product) => (
              <article
                key={product.id}
                className="rounded-[1.5rem] border border-slate-100 bg-white p-4 shadow-[0_10px_24px_rgba(15,23,42,0.04)]"
              >
                <div className="flex items-start gap-3">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-16 w-16 rounded-2xl object-cover"
                  />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-base font-semibold text-slate-900">
                          {product.name}
                        </p>
                        <p className="mt-1 text-sm text-slate-500">
                          {product.badge || product.description}
                        </p>
                      </div>
                      <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium capitalize text-slate-700">
                        {product.category}
                      </span>
                    </div>

                    <div className="mt-4 grid grid-cols-3 gap-3 text-sm">
                      <div>
                        <p className="text-slate-400">Price</p>
                        <p className="mt-1 font-semibold text-slate-900">
                          {formatCurrency(product.price)}
                        </p>
                      </div>
                      <div>
                        <p className="text-slate-400">Stock</p>
                        <span
                          className={`mt-1 inline-flex rounded-full px-3 py-1 text-xs font-medium ${stockBadgeClassName(product.stock)}`}
                        >
                          {product.stock} units
                        </span>
                      </div>
                      <div>
                        <p className="text-slate-400">Rating</p>
                        <p className="mt-1 inline-flex items-center gap-1 font-semibold text-slate-700">
                          <Star size={14} className="fill-current text-amber-400" />
                          {product.rating}
                        </p>
                      </div>
                    </div>

                    <div className="mt-4 flex flex-wrap gap-2">
                      <button
                        type="button"
                        onClick={() => navigate(`/admin/products/${product.id}/edit`)}
                        className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
                      >
                        <Pencil size={15} />
                        Edit
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDeleteProduct(product)}
                        disabled={pendingDeleteId === product.id}
                        className="inline-flex items-center gap-2 rounded-xl border border-red-200 px-3 py-2 text-sm font-medium text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-60"
                      >
                        <Trash2 size={15} />
                        {pendingDeleteId === product.id ? "Deleting..." : "Delete"}
                      </button>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-6 hidden overflow-hidden rounded-[1.75rem] border border-slate-100 lg:block">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[860px] text-left">
                <thead>
                  <tr className="border-b border-slate-100 bg-slate-50 text-sm text-slate-500">
                    <th className="px-5 py-4 pr-4">Product</th>
                    <th className="py-4 pr-4">Category</th>
                    <th className="py-4 pr-4">Price</th>
                    <th className="py-4 pr-4">Stock</th>
                    <th className="py-4 pr-4">Rating</th>
                    <th className="py-4 pr-5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white">
                  {filteredProducts.map((product) => (
                    <tr
                      key={product.id}
                      className="border-b border-slate-100 transition hover:bg-slate-50/70 last:border-b-0"
                    >
                      <td className="px-5 py-4 pr-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="h-14 w-14 rounded-xl object-cover"
                          />
                          <div className="min-w-0">
                            <p className="font-semibold text-slate-900">{product.name}</p>
                            <p className="mt-1 line-clamp-1 text-sm text-slate-500">
                              {product.badge || product.description}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 pr-4">
                        <span className="rounded-full bg-slate-100 px-3 py-1 text-sm font-medium capitalize text-slate-700">
                          {product.category}
                        </span>
                      </td>
                      <td className="py-4 pr-4 font-medium text-slate-900">
                        {formatCurrency(product.price)}
                      </td>
                      <td className="py-4 pr-4">
                        <span
                          className={`rounded-full px-3 py-1 text-sm font-medium ${stockBadgeClassName(product.stock)}`}
                        >
                          {product.stock} units
                        </span>
                      </td>
                      <td className="py-4 pr-4 font-medium text-slate-700">
                        <span className="inline-flex items-center gap-1">
                          <Star size={14} className="fill-current text-amber-400" />
                          {product.rating}
                        </span>
                      </td>
                      <td className="py-4 pr-5">
                        <div className="flex justify-end gap-2">
                          <button
                            type="button"
                            onClick={() => navigate(`/admin/products/${product.id}/edit`)}
                            className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
                          >
                            <Pencil size={15} />
                            Edit
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDeleteProduct(product)}
                            disabled={pendingDeleteId === product.id}
                            className="inline-flex items-center gap-2 rounded-xl border border-red-200 px-3 py-2 text-sm font-medium text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-60"
                          >
                            <Trash2 size={15} />
                            {pendingDeleteId === product.id ? "Deleting..." : "Delete"}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default AdminProducts;
