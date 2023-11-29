import ad from "../assets/advertise.jpg";

const Advertisement = () => {
  return (
    <>
      <div className="bg-gray-100 py-16">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-8">
            Special Offer
          </h2>
          <div className="flex items-center justify-center mb-8">
            <img
              src={ad}
              alt="Advertisement"
              className="rounded-lg shadow-lg "
            />
          </div>
          <p className="text-gray-700">
            Don't miss out on our exclusive offer! Limited time only.
          </p>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mt-8">
            Learn More
          </button>
        </div>
      </div>
    </>
  );
};

export default Advertisement;
