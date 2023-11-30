import { Link } from "react-router-dom";
import Categories from "./categories";
const Header = () => {
  return (
    <header className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-2xl font-bold">
          <Link to="/">Pasal</Link>
        </div>
        <nav>
          <ul className="flex space-x-4">
            <li className="hover:text-gray-300">
              <Link to="/">Home</Link>
            </li>
            <li className="hover:text-gray-300">
              <Link to="/about">About</Link>
            </li>
            <li className="hover:text-gray-300">
              <Link to="/products">Products</Link>
            </li>
            <li className="hover:text-gray-300">
              <Link to="/cart">Cart</Link>
            </li>
            <li className="hover:text-gray-300">
              <Link to="/wishlist">Wishlist</Link>
            </li>
            <li className="hover:text-gray-300">
              <Categories />
            </li>
            <li className="hover:text-gray-300">
              <Link to="/orders">Orders</Link>
            </li>
            <li className="hover:text-gray-300">
              <Link to="/login">Login</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
