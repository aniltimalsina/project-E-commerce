import { Link } from "react-router-dom";
const Hero = () => {
  return (
    <>
      <div className="bg-gray-800 text-white p-8">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl font-bold mb-4">
            Best Quality!!! Save your Money
          </h1>
          <p className="text-lg mb-8">
            Explore the amazing products of Pasal and enjoy the experience.
          </p>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
            <Link to="/products">Explore Products</Link>
          </button>
        </div>
      </div>
    </>
  );
};

export default Hero;
