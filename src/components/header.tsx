import { Link } from "react-router-dom";
import Categories from "./categories";

const Header = () => {
  return (
    <header className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-2xl font-bold">
          <Link to="/">Pasal</Link>
        </div>

        <nav className="navbar navbar-end">
          <ul className="flex space-x-8">
            <li>
              <Link
                to="/"
                className={`text-white hover:text-blue-500 focus:text-blue-500 ${
                  location.pathname === "/" ? "border-b-2 border-blue-500" : ""
                }`}
              >
                <svg
                  fill="none"
                  width="30"
                  height="26"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                  ></path>
                </svg>
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
                <svg
                  fill="none"
                  stroke="currentColor"
                  width="30"
                  height="26"
                  strokeWidth="1.5"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
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
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="30"
                  height="26"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                >
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                </svg>
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
                <svg
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  width="30"
                  height="26"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
                  ></path>
                </svg>
              </Link>
            </li>
            <li className="hover:text-gray-300">
              <Categories />
            </li>

            <div>
              <div>
                <div className="dropdown dropdown-hover">
                  <div
                    tabIndex={0}
                    role="button"
                    className="btn btn-ghost btn-circle"
                  >
                    <svg
                      className="w-5 h-5"
                      aria-hidden="true"
                      width="30"
                      height="26"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 17 14"
                    >
                      <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M1 1h15M1 7h15M1 13h15"
                      />
                    </svg>
                  </div>
                  <ul
                    tabIndex={0}
                    className="menu menu-sm dropdown-content z-[1] p-2 shadow bg-base-100 rounded-box w-52"
                  >
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
                  </ul>
                </div>
              </div>
            </div>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
