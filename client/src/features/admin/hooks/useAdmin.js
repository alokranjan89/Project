import { useContext } from "react";

import { AdminContext } from "../context/adminContextObject";

export const useAdmin = () => useContext(AdminContext);
