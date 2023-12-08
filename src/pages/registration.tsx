import Header from "../components/header";
import Footer from "../components/footer";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { registerUser } from "../features/userSlice";
const Registration = () => {
  const dispatch = useDispatch();

  const [newUser, setNewUser] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    setNewUser({
      ...newUser,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegistration = async (e) => {
    e.preventDefault();

    try {
      // Make a POST request to register a new user
      const response = await axios.post("http://localhost:3000/users", newUser);

      // Assuming the response contains the newly created user
      const newUserFromServer = response.data;

      // Dispatch the registration action
      dispatch(registerUser(newUserFromServer));

      // Reset form after registration
      setNewUser({
        username: "",
        email: "",
        password: "",
      });
    } catch (error) {
      console.error("Error during registration:", error);
      // Handle registration error (e.g., display an error message)
    }
  };
  return (
    <div>
      <Header />
      <div className="container mx-auto grid items-center py-8 min-h-screen">
        <div className="mx-auto py-8">
          <div className="bg-white p-8 rounded-md shadow-md max-w-md w-full">
            <h2 className="text-2xl font-semibold mb-6 text-center">
              Create an Account
            </h2>
            <form onSubmit={handleRegistration}>
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
                  value={newUser.username}
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
                  value={newUser.email}
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
                  value={newUser.password}
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
