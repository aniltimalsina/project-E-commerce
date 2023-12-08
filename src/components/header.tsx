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
                <svg
                  fill="none"
                  stroke="currentColor"
                  width="30"
                  height="26"
                  stroke-width="1.5"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                  ></path>
                </svg>
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
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="30"
                  height="26"
                  fill="none"
                  className="ml-3"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                >
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                </svg>
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
                <svg
                  fill="none"
                  stroke="currentColor"
                  stroke-width="1.5"
                  width="30"
                  height="26"
                  className="ml-2"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
                  ></path>
                </svg>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
