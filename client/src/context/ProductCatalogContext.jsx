import { useEffect, useMemo, useState } from "react";

import {
  initialProducts,
  initialCategoryHighlights,
  getOfferProducts,
} from "../data/products";
import { ProductCatalogContext } from "./productCatalogContextObject";

const PRODUCT_CATALOG_KEY = "productCatalog";

export const ProductCatalogProvider = ({ children }) => {
  const [products, setProducts] = useState(() => {
    try {
      const savedProducts = localStorage.getItem(PRODUCT_CATALOG_KEY);
      const parsed = savedProducts ? JSON.parse(savedProducts) : null;
      return Array.isArray(parsed) && parsed.length > 0 ? parsed : initialProducts;
    } catch {
      return initialProducts;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(PRODUCT_CATALOG_KEY, JSON.stringify(products));
    } catch (err) {
      console.error("Unable to persist product catalog", err);
    }
  }, [products]);

  const addProduct = (productInput) => {
    const nextId = products.reduce((maxId, product) => Math.max(maxId, product.id), 0) + 1;
    const nextProduct = { ...productInput, id: nextId };
    setProducts((prev) => [nextProduct, ...prev]);
    return nextProduct;
  };

  const updateProduct = (productId, updates) => {
    let updatedProduct = null;

    setProducts((prev) =>
      prev.map((product) => {
        if (product.id !== productId) {
          return product;
        }

        updatedProduct = { ...product, ...updates, id: product.id };
        return updatedProduct;
      })
    );

    return updatedProduct;
  };

  const deleteProduct = (productId) => {
    setProducts((prev) => prev.filter((product) => product.id !== productId));
  };

  const resetCatalog = () => {
    setProducts(initialProducts);
  };

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
      }}
    >
      {children}
    </ProductCatalogContext.Provider>
  );
};
