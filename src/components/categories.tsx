import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { selectCategory } from "../features/productsSlice";

const Categories = () => {
  const dispatch = useDispatch();
  const [types, setTypes] = useState([]);

  const baseURL = "http://localhost:3000/storeData";

  useEffect(() => {
    const getAll = async () => {
      const response = await axios.get(baseURL);
      setTypes(response.data);
    };
    getAll();
  }, []);

  const handleCategoryChange = (category) => {
    dispatch(selectCategory(category));
  };

  const allTypes: string[] = [];
  types.map((item) => {
    allTypes.push(item.type);
  });
  const uniqueTypes = [...new Set(allTypes)];
  return (
    <div>
      <div className="dropdown dropdown-hover">
        <div tabIndex={0} role="button" className="hover:text-gray-300">
          Categories
        </div>
        <ul className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
          {uniqueTypes.map((item, index) => {
            return (
              <li key={index}>
                <a onClick={() => handleCategoryChange(item)}>{item}</a>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Categories;
