import React from "react";
import { Link } from "react-router-dom";

import { useProductCatalog } from "../context/useProductCatalog";

const AdminDashboard = () => {
  const { products, offerProducts } = useProductCatalog();
  const lowStockProducts = products.filter((product) => product.stock <= 20);
  const categories = new Set(products.map((product) => product.category));

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6">
        <p className="text-sm font-medium text-pink-600">Overview</p>
        <h1 className="mt-2 text-3xl font-bold text-gray-900">Store admin dashboard</h1>
        <p className="mt-3 text-gray-500">
          Manage your storefront catalog, review low-stock products, and update items from one place.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {[
          { label: "Total Products", value: products.length },
          { label: "Categories", value: categories.size },
          { label: "Offer Items", value: offerProducts.length },
          { label: "Low Stock", value: lowStockProducts.length },
        ].map((item) => (
          <div
            key={item.label}
            className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5"
          >
            <p className="text-sm text-gray-500">{item.label}</p>
            <p className="mt-2 text-3xl font-bold text-gray-900">{item.value}</p>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-[1.4fr_1fr] gap-6">
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold text-gray-900">Latest Products</h2>
              <p className="text-sm text-gray-500">Newest catalog entries in your storefront</p>
            </div>
            <Link
              to="/admin/products"
              className="text-sm font-medium text-pink-600 hover:text-pink-700"
            >
              View all
            </Link>
          </div>

          <div className="mt-5 space-y-4">
            {products.slice(0, 5).map((product) => (
              <div
                key={product.id}
                className="flex items-center gap-4 border border-gray-100 rounded-2xl p-3"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-16 h-16 rounded-xl object-cover"
                />
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-gray-900 truncate">{product.name}</p>
                  <p className="text-sm text-gray-500 capitalize">{product.category}</p>
                </div>
                <p className="text-sm font-medium text-gray-700">Stock: {product.stock}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-xl font-bold text-gray-900">Low Stock Alert</h2>
          <p className="text-sm text-gray-500">Products that may need attention soon</p>

          <div className="mt-5 space-y-3">
            {lowStockProducts.length === 0 ? (
              <div className="rounded-2xl bg-green-50 text-green-700 px-4 py-3">
                All products are comfortably stocked.
              </div>
            ) : (
              lowStockProducts.slice(0, 6).map((product) => (
                <div
                  key={product.id}
                  className="rounded-2xl border border-amber-100 bg-amber-50 px-4 py-3"
                >
                  <p className="font-medium text-gray-900">{product.name}</p>
                  <p className="text-sm text-amber-700">Only {product.stock} left in stock</p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
