import { useContext } from "react";

import { ProductCatalogContext } from "../context/productCatalogContextObject";

export const useProductCatalog = () => useContext(ProductCatalogContext);
