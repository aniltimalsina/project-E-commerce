const Header = () => {
  return (
    <header className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-2xl font-bold">Pasal</div>
        <nav>
          <ul className="flex space-x-4">
            <li className="hover:text-gray-300">Home</li>
            <li className="hover:text-gray-300">About</li>
            <li className="hover:text-gray-300">Products</li>
            <li className="hover:text-gray-300">Cart</li>
            <li className="hover:text-gray-300">Wishlist</li>
            <li className="hover:text-gray-300">Categories</li>
            <li className="hover:text-gray-300">Orders</li>
            <li className="hover:text-gray-300">Login/Sign-up</li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
