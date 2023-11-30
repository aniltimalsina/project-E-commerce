const Categories = () => {
  return (
    <div>
      <div className="dropdown dropdown-hover">
        <div tabIndex={0} role="button" className="hover:text-gray-300">
          Categories
        </div>
        <ul className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
          <li>
            <a>Apparel and Footwear</a>
          </li>
          <li>
            <a>Equipment</a>
          </li>
          <li>
            <a>Accessories</a>
          </li>
          <li>
            <a>Nutrition and Supplements</a>
          </li>
          <li>
            <a>Recovery and Injury Prevention</a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Categories;
