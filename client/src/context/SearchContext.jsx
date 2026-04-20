import { useState } from "react";

import { SearchContext } from "./searchContextObject";

export const SearchProvider = ({ children }) => {
  const [query, setQuery] = useState("");

  return (
    <SearchContext.Provider value={{ query, setQuery }}>
      {children}
    </SearchContext.Provider>
  );
};
