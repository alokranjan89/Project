import { useContext } from "react";

import { SearchContext } from "../context/searchContextObject";

export const useSearch = () => useContext(SearchContext);
