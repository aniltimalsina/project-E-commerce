import Header from "../components/header";
import Footer from "../components/footer";
const About = () => {
  return (
    <div className="bg-gray-100">
      <Header />
      <div className="container mx-auto py-8 min-h-screen ">
        <div className="flex flex-wrap ">
          <div className="w-full md:w-1/2 p-4">
            <h2 className="text-2xl font-semibold mb-4">Our Story</h2>
            <p className="text-gray-700">
              At <strong>Pasal</strong>, our journey began with a simple idea:
              to provide high quality product in cheap and convenient way. Since
              2023, we have grown from a small garage-based operation to a
              thriving e-commerce platform serving customers all over Canada.
            </p>
          </div>
          <div className="w-full md:w-1/2 p-4">
            <h2 className="text-2xl font-semibold mb-4">Our Values</h2>
            <p className="text-gray-700">
              Our Values Quality: We take pride in offering high-quality
              products crafted with precision and attention to detail. Customer
              Satisfaction: Your satisfaction is our top priority. We strive to
              exceed your expectations at every step of your shopping journey.
              Innovation: Embracing innovation is at the core of our business.
              We constantly seek new ways to enhance our products and services.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default About;
