import { useDispatch } from "react-redux";
import { logout } from "../features/productsSlice";

const LogoutButton = () => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    localStorage.removeItem("token");
    dispatch(logout());
  };

  return <button onClick={handleLogout}>Logout</button>;
};

export default LogoutButton;
