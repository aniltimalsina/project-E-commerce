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
            <li>
              <Link
                to="/"
                className={`text-white hover:text-blue-500 focus:text-blue-500 ${
                  location.pathname === "/" ? "border-b-2 border-blue-500" : ""
                }`}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                className={`text-white hover:text-blue-500 focus:text-blue-500 ${
                  location.pathname === "/about"
                    ? "border-b-2 border-blue-500"
                    : ""
                }`}
              >
                About
              </Link>
            </li>
            <li>
              <Link
                to="/products"
                className={`text-white hover:text-blue-500 focus:text-blue-500 ${
                  location.pathname === "/products"
                    ? "border-b-2 border-blue-500"
                    : ""
                }`}
              >
                Products
              </Link>
            </li>
            <li>
              <Link
                to="/cart"
                className={`text-white hover:text-blue-500 focus:text-blue-500 ${
                  location.pathname === "/cart"
                    ? "border-b-2 border-blue-500"
                    : ""
                }`}
              >
                Cart
              </Link>
            </li>
            <li>
              <Link
                to="/wishlist"
                className={`text-white hover:text-blue-500 focus:text-blue-500 ${
                  location.pathname === "/wishlist"
                    ? "border-b-2 border-blue-500"
                    : ""
                }`}
              >
                Wishlist
              </Link>
            </li>
            <li className="hover:text-gray-300">
              <Categories />
            </li>
            <li>
              <Link
                to="/orders"
                className={`text-white hover:text-blue-500 focus:text-blue-500 ${
                  location.pathname === "/orders"
                    ? "border-b-2 border-blue-500"
                    : ""
                }`}
              >
                Orders
              </Link>
            </li>
            <li>
              <Link
                to="/login"
                className={`text-white hover:text-blue-500 focus:text-blue-500 ${
                  location.pathname === "/login"
                    ? "border-b-2 border-blue-500"
                    : ""
                }`}
              >
                Login
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
