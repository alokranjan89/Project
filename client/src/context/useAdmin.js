import { useContext } from "react";

import { AdminContext } from "./adminContextObject";

export const useAdmin = () => useContext(AdminContext);
