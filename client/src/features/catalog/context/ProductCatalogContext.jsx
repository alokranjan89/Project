import { useCallback, useEffect, useMemo, useState } from "react";

import { apiRequest, authRequest } from "../../../shared/lib/api";
import {
  initialProducts,
  initialCategoryHighlights,
  getOfferProducts,
} from "../data/products";
import { useAuth } from "../../auth/hooks/useAuth";
import { ProductCatalogContext } from "./productCatalogContextObject";

export const ProductCatalogProvider = ({ children }) => {
  const { token } = useAuth();
  const [products, setProducts] = useState(initialProducts);
  const [isCatalogReady, setIsCatalogReady] = useState(false);
  const [catalogError, setCatalogError] = useState("");

  const loadProducts = useCallback(async () => {
    try {
      setCatalogError("");
      const nextProducts = await apiRequest("/products");
      setProducts(Array.isArray(nextProducts) && nextProducts.length > 0 ? nextProducts : []);
    } catch (error) {
      setCatalogError(error.message);
      setProducts(initialProducts);
    } finally {
      setIsCatalogReady(true);
    }
  }, []);

  useEffect(() => {
    Promise.resolve().then(loadProducts);
  }, [loadProducts]);

  const addProduct = useCallback(
    async (productInput) => {
      if (!token) {
        throw new Error("You must be logged in as admin to create products");
      }

      const nextProduct = await authRequest("/products", token, {
        method: "POST",
        body: JSON.stringify(productInput),
      });

      setProducts((prev) => [nextProduct, ...prev]);
      return nextProduct;
    },
    [token]
  );

  const updateProduct = useCallback(
    async (productId, updates) => {
      if (!token) {
        throw new Error("You must be logged in as admin to update products");
      }

      const updatedProduct = await authRequest(`/products/${productId}`, token, {
        method: "PUT",
        body: JSON.stringify(updates),
      });

      setProducts((prev) =>
        prev.map((product) => (product.id === productId ? updatedProduct : product))
      );

      return updatedProduct;
    },
    [token]
  );

  const deleteProduct = useCallback(
    async (productId) => {
      if (!token) {
        throw new Error("You must be logged in as admin to delete products");
      }

      await authRequest(`/products/${productId}`, token, {
        method: "DELETE",
      });

      setProducts((prev) => prev.filter((product) => product.id !== productId));
    },
    [token]
  );

  const resetCatalog = useCallback(async () => {
    if (!token) {
      throw new Error("You must be logged in as admin to reset products");
    }

    const nextProducts = await authRequest("/products/reset", token, {
      method: "POST",
    });

    setProducts(nextProducts);
    return nextProducts;
  }, [token]);

  const featuredProducts = useMemo(() => products.slice(0, 8), [products]);
  const offerProducts = useMemo(() => getOfferProducts(products), [products]);

  return (
    <ProductCatalogContext.Provider
      value={{
        products,
        featuredProducts,
        categoryHighlights: initialCategoryHighlights,
        offerProducts,
        addProduct,
        updateProduct,
        deleteProduct,
        resetCatalog,
        reloadProducts: loadProducts,
        isCatalogReady,
        catalogError,
      }}
    >
      {children}
    </ProductCatalogContext.Provider>
  );
};
