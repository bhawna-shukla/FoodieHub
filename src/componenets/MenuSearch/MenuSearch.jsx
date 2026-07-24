import "./MenuSearch.css";
import { FaSearch } from "react-icons/fa";

const MenuSearch = ({ search, setSearch }) => {
  return (
    <div className="menu-search">
      <div className="search-box">
        <FaSearch className="search-icon" />

        <input
          type="text"
          placeholder="Search delicious food..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
    </div>
  );
};

export default MenuSearch;