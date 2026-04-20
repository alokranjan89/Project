import { useContext } from "react";

import { ProductCatalogContext } from "./productCatalogContextObject";

export const useProductCatalog = () => useContext(ProductCatalogContext);
