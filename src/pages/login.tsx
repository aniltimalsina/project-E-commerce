import Header from "../components/header";
import Footer from "../components/footer";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { loginUser } from "../api/authapi";
import { setUser, setToken } from "../features/authSlice";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  const handleInputChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const user = await loginUser(credentials);

      // Dispatch actions to set user and token in Redux store
      dispatch(setUser(user));
      dispatch(setToken(user.id.toString()));
      localStorage.setItem("token", user.id);
      return navigate("/");
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  return (
    <div className="overflow-x-hidden">
      <Header />
      <main className="container mx-auto grid items-center py-8 min-h-screen">
        <div className=" mx-auto py-8 ">
          <div className="bg-white p-8 rounded-md shadow-md max-w-md w-full">
            <h2 className="text-2xl font-semibold mb-6 text-center">
              Login to Your Account
            </h2>
            <form method="post">
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
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
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
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                />
              </div>

              <button
                type="button"
                onClick={handleLogin}
                className="bg-blue-500 text-white p-2 rounded-full w-full hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue"
              >
                Login
              </button>
            </form>

            {/* <!-- Registration Link --> */}
            <p className="mt-4 text-center text-gray-700">
              Don't have an account?
              <Link to="/register" className="text-blue-500 hover:underline">
                Register here
              </Link>
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Login;
