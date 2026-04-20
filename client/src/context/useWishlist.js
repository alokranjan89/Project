import { useContext } from "react";

import { WishlistContext } from "./wishlistContextObject";

export const useWishlist = () => useContext(WishlistContext);
