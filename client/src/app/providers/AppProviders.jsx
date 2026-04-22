import { AdminProvider } from "../../features/admin/context/AdminContext";
import { AuthProvider } from "../../features/auth/context/AuthContext";
import { CartProvider } from "../../features/cart/context/CartContext";
import { ProductCatalogProvider } from "../../features/catalog/context/ProductCatalogContext";
import { SearchProvider } from "../../features/search/context/SearchContext";
import { WishlistProvider } from "../../features/wishlist/context/WishlistContext";

const AppProviders = ({ children }) => {
  return (
    <AuthProvider>
      <AdminProvider>
        <ProductCatalogProvider>
          <CartProvider>
            <WishlistProvider>
              <SearchProvider>{children}</SearchProvider>
            </WishlistProvider>
          </CartProvider>
        </ProductCatalogProvider>
      </AdminProvider>
    </AuthProvider>
  );
};

export default AppProviders;
