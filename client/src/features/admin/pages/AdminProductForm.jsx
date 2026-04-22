import React, { useMemo, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, ImagePlus, Layers3, PackagePlus, Save } from "lucide-react";

import { useProductCatalog } from "../../catalog/hooks/useProductCatalog";
import { formatCurrency } from "../../../shared/utils/format";

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
  const hasImagePreview = form.image.trim().startsWith("http");

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

    try {
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
        await updateProduct(editingProduct.id, normalizedProduct);
        toast.success("Product updated");
      } else {
        await addProduct(normalizedProduct);
        toast.success("Product created");
      }

      navigate("/admin/products");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <section className="overflow-hidden rounded-[2rem] border border-white/70 bg-[linear-gradient(135deg,#ffffff_0%,#f8fafc_52%,#ffe4f1_100%)] p-6 shadow-[0_18px_50px_rgba(15,23,42,0.06)] md:p-7">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className="text-sm font-medium uppercase tracking-[0.18em] text-pink-600">
              {isEditing ? "Edit Product" : "Create Product"}
            </p>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight text-slate-900">
              {isEditing ? "Refine your catalog details" : "Add a polished new catalog entry"}
            </h1>
            <p className="mt-3 text-sm leading-6 text-slate-500">
              {isEditing
                ? "Update merchandising details, improve pricing clarity, and keep inventory data current."
                : "Fill in a strong product profile with imagery, stock, tags, and pricing so the storefront feels complete."}
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            <div className="rounded-[1.5rem] border border-slate-200 bg-white/90 p-4">
              <ImagePlus size={18} className="text-pink-600" />
              <p className="mt-3 text-sm font-medium text-slate-900">Visual-first</p>
              <p className="mt-1 text-xs leading-5 text-slate-500">
                Use strong imagery and concise product summaries.
              </p>
            </div>
            <div className="rounded-[1.5rem] border border-slate-200 bg-white/90 p-4">
              <Layers3 size={18} className="text-pink-600" />
              <p className="mt-3 text-sm font-medium text-slate-900">Clean metadata</p>
              <p className="mt-1 text-xs leading-5 text-slate-500">
                Tags and categories help browsing stay organized.
              </p>
            </div>
            <div className="rounded-[1.5rem] border border-slate-200 bg-white/90 p-4">
              <PackagePlus size={18} className="text-pink-600" />
              <p className="mt-3 text-sm font-medium text-slate-900">Stock ready</p>
              <p className="mt-1 text-xs leading-5 text-slate-500">
                Keep quantity and pricing aligned before publishing.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="rounded-[2rem] border border-white/70 bg-white/82 p-6 shadow-[0_18px_50px_rgba(15,23,42,0.06)] backdrop-blur md:p-7">
        <form onSubmit={handleSubmit} className="grid gap-5 xl:grid-cols-[minmax(0,1.2fr)_minmax(320px,0.8fr)]">
          <div className="grid gap-5 md:grid-cols-2">
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
              <label className="mb-2 block text-sm font-medium text-slate-700">
                {label}
              </label>
              {key === "category" ? (
                <select
                  name="category"
                  value={form.category}
                  onChange={handleChange}
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-slate-900 outline-none transition focus:border-pink-500 focus:bg-white focus:ring-4 focus:ring-pink-100"
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
                  min={["price", "originalPrice", "reviews", "stock"].includes(key) ? "0" : undefined}
                  max={key === "rating" ? "5" : undefined}
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-slate-900 outline-none transition focus:border-pink-500 focus:bg-white focus:ring-4 focus:ring-pink-100"
                />
              )}
            </div>
          ))}

          <div className="md:col-span-2">
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Description
            </label>
            <textarea
              rows="5"
              name="description"
              value={form.description}
              onChange={handleChange}
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-slate-900 outline-none transition focus:border-pink-500 focus:bg-white focus:ring-4 focus:ring-pink-100"
            />
          </div>

          <div className="md:col-span-2 flex flex-wrap gap-3 pt-2">
            <button
              type="button"
              onClick={() => navigate("/admin/products")}
              className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 px-5 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
            >
              <ArrowLeft size={16} />
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center gap-2 rounded-2xl bg-slate-900 px-5 py-3 text-sm font-medium text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-70"
            >
              <Save size={16} />
              {loading
                ? isEditing
                  ? "Saving..."
                  : "Creating..."
                : isEditing
                  ? "Save Changes"
                : "Create Product"}
            </button>
          </div>
          </div>

          <aside className="rounded-[1.75rem] border border-slate-200 bg-slate-50/80 p-5">
            <p className="text-sm font-medium uppercase tracking-[0.16em] text-slate-500">
              Live Preview
            </p>
            <div className="mt-4 overflow-hidden rounded-[1.5rem] border border-slate-200 bg-white">
              <div className="aspect-[4/3] bg-slate-100">
                {hasImagePreview ? (
                  <img
                    src={form.image}
                    alt={form.name || "Product preview"}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center px-6 text-center text-sm text-slate-400">
                    Add a valid image URL to preview the product card.
                  </div>
                )}
              </div>

              <div className="p-5">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-lg font-semibold text-slate-900">
                      {form.name.trim() || "Product name preview"}
                    </p>
                    <p className="mt-1 text-sm text-slate-500 capitalize">
                      {form.category}
                    </p>
                  </div>
                  <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">
                    {form.badge.trim() || "Badge"}
                  </span>
                </div>

                <p className="mt-4 line-clamp-4 text-sm leading-6 text-slate-500">
                  {form.description.trim() ||
                    "Your product description will appear here so you can quickly review tone and structure before saving."}
                </p>

                <div className="mt-5 grid grid-cols-2 gap-3 text-sm">
                  <div className="rounded-2xl bg-slate-50 p-3">
                    <p className="text-slate-400">Price</p>
                    <p className="mt-1 font-semibold text-slate-900">
                      {Number(form.price) > 0 ? formatCurrency(Number(form.price)) : "Not set"}
                    </p>
                  </div>
                  <div className="rounded-2xl bg-slate-50 p-3">
                    <p className="text-slate-400">Stock</p>
                    <p className="mt-1 font-semibold text-slate-900">
                      {form.stock === "" ? "Not set" : `${form.stock} units`}
                    </p>
                  </div>
                  <div className="rounded-2xl bg-slate-50 p-3">
                    <p className="text-slate-400">Rating</p>
                    <p className="mt-1 font-semibold text-slate-900">
                      {form.rating === "" ? "Not set" : `${form.rating} / 5`}
                    </p>
                  </div>
                  <div className="rounded-2xl bg-slate-50 p-3">
                    <p className="text-slate-400">Tags</p>
                    <p className="mt-1 line-clamp-2 font-medium text-slate-700">
                      {form.tags.trim() || "No tags yet"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </aside>
        </form>
      </section>
    </div>
  );
};

export default AdminProductForm;
