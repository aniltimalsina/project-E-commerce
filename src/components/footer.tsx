const Footer = () => {
  return (
    <>
      <footer className="bg-gray-800 text-white p-4">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="text-sm mb-2 md:mb-0">
            &copy; 2023 Pasal. All rights reserved.
          </div>
          <nav className="flex flex-wrap justify-center md:justify-end space-x-4">
            <ul className="flex space-x-4">
              <li className=" block md:inline-block hover:text-gray-300">
                Privacy Policy
              </li>
              <li className=" block md:inline-block hover:text-gray-300">
                Terms of Service
              </li>
              <li className=" block md:inline-block hover:text-gray-300">
                Contact Us
              </li>
            </ul>
          </nav>
        </div>
      </footer>
    </>
  );
};

export default Footer;
