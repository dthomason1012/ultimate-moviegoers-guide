import React, { FC, useState } from "react";
import { ReactComponent as SearchIcon } from "../../icons/icons8-search.svg";

const SearchBar: FC = () => {
  const [input, setInput] = useState("");

  const handleChange = (e: any) => {
    e.preventDefault();
    setInput(e.target.value);
  };

  return (
    <form style={{ display: "inline-flex" }}>
      <input
        style={{ width: "400px", fontSize: "18px" }}
        type="search"
        placeholder="Search Movies"
        value={input}
        onChange={handleChange}
      />
      <button type="submit" style={{ height: "100%" }} onClick={() => {}}>
        <SearchIcon />
      </button>
    </form>
  );
};

export default SearchBar;
