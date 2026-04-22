import { useContext } from "react";

import { WishlistContext } from "../context/wishlistContextObject";

export const useWishlist = () => useContext(WishlistContext);
