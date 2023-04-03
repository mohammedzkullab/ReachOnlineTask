import { useState, useEffect } from "react";
// import { AdjustmentsHorizontalIcon, MagnifyingGlassIcon } from "lib/@heroicons";
// import SearchFilter from "./SearchFilter";

const Search = ({ setSearch: onSearchSubmit }: any) => {
  const [term, setTerm] = useState("");
  const [debouncedTerm, setDebouncedTerm] = useState(term);
  useEffect(() => {
    const timer = setTimeout(() => setTerm(debouncedTerm), 500);
    return () => clearTimeout(timer);
  }, [debouncedTerm]);

  useEffect(() => {
    if (term !== "") {
      onSearchSubmit(term);
    } else {
      onSearchSubmit("");
    }
  }, [onSearchSubmit, term]);
  return (
    <div className="relative mb-4 shadow-md">
      {/* <MagnifyingGlassIcon
        width={24}
        height={24}
        className="absolute inset-4"
      /> */}
      <input
        type="search"
        placeholder="search"
        value={debouncedTerm}
        onChange={(e) => setDebouncedTerm(e.target.value)}
        className="w-full border-none py-4 rounded px-16"
      />
      {/* <AdjustmentsHorizontalIcon
        width={24}
        height={24}
        className="absolute right-4 top-4 cursor-pointer"
      /> */}
      <div className="">{/* <SearchFilter /> */}</div>
    </div>
  );
};

export default Search;
