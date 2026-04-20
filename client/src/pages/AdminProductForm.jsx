import React, { useMemo, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";

import { useProductCatalog } from "../context/useProductCatalog";

const emptyProduct = {
  name: "",
  category: "shringaar",
  description: "",
  tags: "",
  price: "",
  originalPrice: "",
  rating: "",
  reviews: "",
  stock: "",
  badge: "",
  image: "",
};

const AdminProductForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { products, addProduct, updateProduct } = useProductCatalog();

  const editingProduct = useMemo(
    () => products.find((product) => product.id === Number(id)),
    [id, products]
  );

  const [form, setForm] = useState(() => {
    if (!editingProduct) {
      return emptyProduct;
    }

    return {
      ...editingProduct,
      tags: editingProduct.tags.join(", "),
    };
  });

  const [loading, setLoading] = useState(false);
  const isEditing = Boolean(editingProduct);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name.trim() || !form.description.trim() || !form.image.trim()) {
      toast.error("Name, description, and image are required");
      return;
    }

    if (Number(form.price) <= 0) {
      toast.error("Price must be greater than 0");
      return;
    }

    if (Number(form.stock) < 0) {
      toast.error("Stock cannot be negative");
      return;
    }

    if (!form.image.startsWith("http")) {
      toast.error("Enter a valid image URL");
      return;
    }

    setLoading(true);

    const normalizedProduct = {
      ...form,
      tags: form.tags
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean),
      price: Number(form.price),
      originalPrice: Number(form.originalPrice),
      rating: Number(form.rating),
      reviews: Number(form.reviews),
      stock: Number(form.stock),
    };

    if (isEditing) {
      updateProduct(editingProduct.id, normalizedProduct);
      toast.success("Product updated");
    } else {
      addProduct(normalizedProduct);
      toast.success("Product created");
    }

    setLoading(false);
    navigate("/admin/products");
  };

  return (
    <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6">
      <h1 className="text-3xl font-bold text-gray-900">
        {isEditing ? "Edit Product" : "Add Product"}
      </h1>
      <p className="text-gray-500 mt-2">
        {isEditing
          ? "Update product details for the storefront."
          : "Create a new product entry for the storefront catalog."}
      </p>

      <form onSubmit={handleSubmit} className="mt-8 grid md:grid-cols-2 gap-5">
        {[
          ["name", "Product Name"],
          ["badge", "Badge"],
          ["image", "Image URL"],
          ["category", "Category"],
          ["price", "Price"],
          ["originalPrice", "Original Price"],
          ["rating", "Rating"],
          ["reviews", "Reviews"],
          ["stock", "Stock"],
          ["tags", "Tags (comma separated)"],
        ].map(([key, label]) => (
          <div
            key={key}
            className={key === "image" || key === "tags" ? "md:col-span-2" : ""}
          >
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {label}
            </label>
            {key === "category" ? (
              <select
                name="category"
                value={form.category}
                onChange={handleChange}
                className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-pink-500"
              >
                <option value="shringaar">Shringaar</option>
                <option value="games">Games</option>
                <option value="clothing">Clothing</option>
              </select>
            ) : (
              <input
                type={
                  ["price", "originalPrice", "rating", "reviews", "stock"].includes(key)
                    ? "number"
                    : "text"
                }
                step={key === "rating" ? "0.1" : undefined}
                name={key}
                value={form[key]}
                onChange={handleChange}
                className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-pink-500"
              />
            )}
          </div>
        ))}

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Description
          </label>
          <textarea
            rows="5"
            name="description"
            value={form.description}
            onChange={handleChange}
            className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-pink-500"
          />
        </div>

        <div className="md:col-span-2 flex gap-3">
          <button
            type="button"
            onClick={() => navigate("/admin/products")}
            className="px-5 py-3 rounded-xl border border-gray-200 text-gray-700 hover:bg-gray-50 transition"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-5 py-3 rounded-xl bg-pink-600 text-white hover:bg-pink-700 transition disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {loading
              ? isEditing
                ? "Saving..."
                : "Creating..."
              : isEditing
                ? "Save Changes"
                : "Create Product"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminProductForm;
