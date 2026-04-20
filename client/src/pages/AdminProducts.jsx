import React from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

import { useProductCatalog } from "../context/useProductCatalog";
import { formatCurrency } from "../utils/format";

const AdminProducts = () => {
  const navigate = useNavigate();
  const { products, deleteProduct, resetCatalog } = useProductCatalog();

  return (
    <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Manage Products</h1>
          <p className="text-gray-500 mt-2">Create, edit, and remove storefront products.</p>
        </div>

        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => {
              resetCatalog();
              toast.success("Catalog reset to default products");
            }}
            className="px-4 py-3 rounded-xl border border-gray-200 text-gray-700 hover:bg-gray-50 transition"
          >
            Reset Catalog
          </button>
          <Link
            to="/admin/products/new"
            className="px-4 py-3 rounded-xl bg-pink-600 text-white hover:bg-pink-700 transition"
          >
            Add Product
          </Link>
        </div>
      </div>

      <div className="mt-6 overflow-x-auto">
        <table className="w-full min-w-[840px] text-left">
          <thead>
            <tr className="text-sm text-gray-500 border-b border-gray-100">
              <th className="py-3 pr-4">Product</th>
              <th className="py-3 pr-4">Category</th>
              <th className="py-3 pr-4">Price</th>
              <th className="py-3 pr-4">Stock</th>
              <th className="py-3 pr-4">Rating</th>
              <th className="py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id} className="border-b border-gray-100 last:border-b-0">
                <td className="py-4 pr-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-14 h-14 rounded-xl object-cover"
                    />
                    <div>
                      <p className="font-semibold text-gray-900">{product.name}</p>
                      <p className="text-sm text-gray-500 line-clamp-1">{product.badge}</p>
                    </div>
                  </div>
                </td>
                <td className="py-4 pr-4 capitalize">{product.category}</td>
                <td className="py-4 pr-4">{formatCurrency(product.price)}</td>
                <td className="py-4 pr-4">{product.stock}</td>
                <td className="py-4 pr-4">★ {product.rating}</td>
                <td className="py-4">
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => navigate(`/admin/products/${product.id}/edit`)}
                      className="px-3 py-2 rounded-lg border border-gray-200 text-gray-700 hover:bg-gray-50 transition"
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        deleteProduct(product.id);
                        toast.success(`${product.name} deleted`);
                      }}
                      className="px-3 py-2 rounded-lg border border-red-200 text-red-600 hover:bg-red-50 transition"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminProducts;
