import { useContext } from "react";

import { CartContext } from "../context/cartContextObject";

export const useCart = () => useContext(CartContext);
