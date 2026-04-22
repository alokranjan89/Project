import React from "react";
import { Link } from "react-router-dom";
import {
  AlertTriangle,
  ArrowRight,
  Boxes,
  CircleDollarSign,
  Layers3,
  Sparkles,
} from "lucide-react";

import { useProductCatalog } from "../../catalog/hooks/useProductCatalog";
import { formatCurrency } from "../../../shared/utils/format";

const AdminDashboard = () => {
  const { products, offerProducts } = useProductCatalog();
  const lowStockProducts = products.filter((product) => product.stock <= 20);
  const categories = new Set(products.map((product) => product.category));
  const totalInventoryValue = products.reduce(
    (sum, product) => sum + product.price * product.stock,
    0
  );
  const averagePrice = products.length
    ? Math.round(products.reduce((sum, product) => sum + product.price, 0) / products.length)
    : 0;
  const spotlightProducts = [...products]
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 4);
  const categorySummary = Array.from(categories)
    .map((category) => ({
      category,
      count: products.filter((product) => product.category === category).length,
    }))
    .sort((a, b) => b.count - a.count);

  return (
    <div className="space-y-6">
      <section className="overflow-hidden rounded-[2rem] border border-white/70 bg-[linear-gradient(135deg,#0f172a_0%,#172554_48%,#ec4899_100%)] p-6 text-white shadow-[0_24px_60px_rgba(15,23,42,0.12)] md:p-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm text-white/80 backdrop-blur-sm">
              <Sparkles size={16} />
              Catalog intelligence
            </div>
            <h1 className="mt-5 text-3xl font-semibold tracking-tight sm:text-4xl">
              A faster control room for your storefront.
            </h1>
            <p className="mt-4 max-w-xl text-sm leading-6 text-white/78 sm:text-base">
              Watch inventory health, highlight high-performing products, and make
              catalog updates from a cleaner admin surface.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-[1.5rem] border border-white/12 bg-white/10 p-4 backdrop-blur-sm">
              <p className="text-sm text-white/65">Inventory value</p>
              <p className="mt-2 text-2xl font-semibold">
                {formatCurrency(totalInventoryValue)}
              </p>
            </div>
            <div className="rounded-[1.5rem] border border-white/12 bg-black/10 p-4 backdrop-blur-sm">
              <p className="text-sm text-white/65">Average price</p>
              <p className="mt-2 text-2xl font-semibold">
                {formatCurrency(averagePrice)}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          {
            label: "Total Products",
            value: products.length,
            hint: "Across the active catalog",
            icon: Boxes,
          },
          {
            label: "Categories",
            value: categories.size,
            hint: "Live shopping segments",
            icon: Layers3,
          },
          {
            label: "Offer Items",
            value: offerProducts.length,
            hint: "Items currently discounted",
            icon: CircleDollarSign,
          },
          {
            label: "Low Stock",
            value: lowStockProducts.length,
            hint: "Need replenishment soon",
            icon: AlertTriangle,
          },
        ].map((item) => {
          const Icon = item.icon;

          return (
            <article
              key={item.label}
              className="rounded-[1.75rem] border border-white/70 bg-white/80 p-5 shadow-[0_18px_45px_rgba(15,23,42,0.06)] backdrop-blur"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm text-slate-500">{item.label}</p>
                  <p className="mt-3 text-3xl font-semibold tracking-tight text-slate-900">
                    {item.value}
                  </p>
                  <p className="mt-2 text-sm text-slate-500">{item.hint}</p>
                </div>
                <div className="rounded-2xl bg-slate-100 p-3 text-slate-700">
                  <Icon size={20} />
                </div>
              </div>
            </article>
          );
        })}
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.35fr_0.95fr]">
        <div className="rounded-[2rem] border border-white/70 bg-white/82 p-6 shadow-[0_18px_50px_rgba(15,23,42,0.06)] backdrop-blur">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-semibold text-slate-900">Product spotlight</h2>
              <p className="mt-1 text-sm text-slate-500">
                Highest-rated products getting the strongest customer response.
              </p>
            </div>
            <Link
              to="/admin/products"
              className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
            >
              View catalog
              <ArrowRight size={16} />
            </Link>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {spotlightProducts.map((product) => (
              <article
                key={product.id}
                className="overflow-hidden rounded-[1.5rem] border border-slate-100 bg-slate-50/80"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-40 w-full object-cover"
                />
                <div className="p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-lg font-semibold text-slate-900">{product.name}</p>
                      <p className="mt-1 text-sm capitalize text-slate-500">
                        {product.category}
                      </p>
                    </div>
                    <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-medium text-emerald-700">
                      {product.rating} rating
                    </span>
                  </div>

                  <div className="mt-4 flex items-center justify-between text-sm text-slate-500">
                    <span>{formatCurrency(product.price)}</span>
                    <span>{product.stock} in stock</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-[2rem] border border-white/70 bg-white/82 p-6 shadow-[0_18px_50px_rgba(15,23,42,0.06)] backdrop-blur">
            <h2 className="text-xl font-semibold text-slate-900">Low-stock watchlist</h2>
            <p className="mt-1 text-sm text-slate-500">
              Products that may need attention before they miss demand.
            </p>

            <div className="mt-5 space-y-3">
              {lowStockProducts.length === 0 ? (
                <div className="rounded-[1.5rem] border border-emerald-200 bg-emerald-50 px-4 py-4 text-sm text-emerald-700">
                  All products are comfortably stocked.
                </div>
              ) : (
                lowStockProducts.slice(0, 6).map((product) => (
                  <div
                    key={product.id}
                    className="flex items-center justify-between rounded-[1.5rem] border border-amber-100 bg-amber-50 px-4 py-4"
                  >
                    <div>
                      <p className="font-medium text-slate-900">{product.name}</p>
                      <p className="mt-1 text-sm capitalize text-slate-500">
                        {product.category}
                      </p>
                    </div>
                    <span className="rounded-full bg-white px-3 py-1 text-sm font-medium text-amber-700">
                      {product.stock} left
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="rounded-[2rem] border border-white/70 bg-white/82 p-6 shadow-[0_18px_50px_rgba(15,23,42,0.06)] backdrop-blur">
            <h2 className="text-xl font-semibold text-slate-900">Category mix</h2>
            <p className="mt-1 text-sm text-slate-500">
              Quick view of where your catalog density is highest.
            </p>

            <div className="mt-5 space-y-4">
              {categorySummary.map((item) => {
                const width = products.length
                  ? `${Math.max(18, (item.count / products.length) * 100)}%`
                  : "0%";

                return (
                  <div key={item.category}>
                    <div className="mb-2 flex items-center justify-between text-sm">
                      <span className="font-medium capitalize text-slate-800">
                        {item.category}
                      </span>
                      <span className="text-slate-500">{item.count} items</span>
                    </div>
                    <div className="h-3 rounded-full bg-slate-100">
                      <div
                        className="h-3 rounded-full bg-[linear-gradient(90deg,#0f172a_0%,#ec4899_100%)]"
                        style={{ width }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AdminDashboard;
