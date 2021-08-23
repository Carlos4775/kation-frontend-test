import { SearchIcon } from "@heroicons/react/outline";
import { useState } from "react";
import { useHistory, useLocation } from "react-router-dom";

const SearchInput = () => {
  const [state, setState] = useState({
    search: "",
  });
  let location = useLocation();
  const handleChange = (e) => {
    let { name, value } = e.target;
    const newSelection = {
      ...state,
      [name]: value,
    };
    setState(newSelection);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      history.replace(
        location.pathname === "/addresses/*"
          ? `?q=${state.search}`
          : `/addresses?q=${state.search}`
      );
    }
  };

  let history = useHistory();

  return (
    <label className="relative text-gray-400 focus-within:text-gray-600 block">
      <SearchIcon className="absolute top-1/2 pointer-events-none w-4 h-4 transform -translate-y-1/2 left-3" />

      <input
        type="search"
        name="search"
        className="focus:ring-indigo-500 focus:border-indigo-500 block h-10 w-full sm:w-80 pl-10 pr-12 text-xs sm:text-sm border border-gray-300 rounded-md"
        placeholder="Escribe lo que deseas buscar..."
        onChange={handleChange}
        onKeyPress={handleKeyPress}
      />
    </label>
  );
};

export default SearchInput;
