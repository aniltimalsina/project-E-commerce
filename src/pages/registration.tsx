import Header from "../components/header";
import Footer from "../components/footer";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { doesUserExist, hashPassword, registerUser } from "../api/authapi";
import { setUser, setToken } from "../features/authSlice";
import { registerWishlist } from "../api/wishlistapi";
import { registerCart } from "../api/cartapi";

const Registration = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const userExist = await doesUserExist(formData);
      if (!userExist) {
        const hashedPassword = await hashPassword(formData);
        setFormData({ ...formData, password: hashedPassword });
        const user = await registerUser({
          ...formData,
          password: hashedPassword,
        });

        const obj = {
          userId: user.id,
          products: [],
        };

        await registerCart(obj);
        await registerWishlist(obj);
        // Dispatch actions to set user and token in Redux store
        dispatch(setUser(user));
        dispatch(setToken(user.token));
        navigate("/login");
      } else {
        alert("user already exist");
      }
    } catch (error) {
      console.error("Registration error:", error);
    }
  };
  return (
    <div className="overflow-x-hidden">
      <Header />
      <div className="container mx-auto grid items-center py-8 min-h-screen">
        <div className="mx-auto py-8">
          <div className="bg-white p-8 rounded-md shadow-md max-w-md w-full">
            <h2 className="text-2xl font-semibold mb-6 text-center">
              Create an Account
            </h2>
            <form onSubmit={handleRegister} method="post">
              <div className="mb-4">
                <label
                  htmlFor="username"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                  onChange={handleInputChange}
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                  onChange={handleInputChange}
                />
              </div>

              <div className="mb-6">
                <label
                  htmlFor="password"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                  onChange={handleInputChange}
                />
              </div>

              <button
                type="submit"
                className="bg-blue-500 text-white p-2 rounded-full w-full hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue"
              >
                Register
              </button>
            </form>

            <p className="mt-4 text-center text-gray-700">
              Already have an account?
              <Link to="/login" className="text-blue-500 hover:underline">
                Login here
              </Link>
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Registration;
