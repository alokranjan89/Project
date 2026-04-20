import { useContext } from "react";

import { SearchContext } from "./searchContextObject";

export const useSearch = () => useContext(SearchContext);
