import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { selectCategory } from "../features/productsSlice";

const Categories = () => {
  const dispatch = useDispatch();
  const [types, setTypes] = useState([]);
  const navigate = useNavigate();

  const baseURL = "http://localhost:3000/storeData";

  useEffect(() => {
    const getAll = async () => {
      const response = await axios.get(baseURL);
      setTypes(response.data);
    };
    getAll();
  }, []);

  const allTypes: string[] = [];
  types.map((item) => {
    allTypes.push(item.type);
  });
  const uniqueTypes = [...new Set(allTypes)];

  const handleCategoryChange = (category) => {
    dispatch(selectCategory(category));
    navigate("/products");
  };
  return (
    <div>
      <div className="dropdown dropdown-hover">
        <div tabIndex={0} role="button" className="hover:text-gray-300">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className="mt-2"
            width="30"
            height="26"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
          >
            <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
            <line x1="7" x2="7.01" y1="7" y2="7" />
          </svg>
        </div>

        <ul className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
          {uniqueTypes.map((item, index) => {
            return (
              <li key={index}>
                <Link to="/products" onClick={() => handleCategoryChange(item)}>
                  {item}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Categories;
