const Footer = () => {
  return (
    <>
      <footer className="bg-gray-800 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="text-sm">
            &copy; 2023 My App. All rights reserved.
          </div>
          <nav>
            <ul className="flex space-x-4">
              <li className="hover:text-gray-300">Privacy Policy</li>
              <li className="hover:text-gray-300">Terms of Service</li>
              <li className="hover:text-gray-300">Contact Us</li>
            </ul>
          </nav>
        </div>
      </footer>
    </>
  );
};

export default Footer;
