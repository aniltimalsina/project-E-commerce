import Header from "../components/header";
import Footer from "../components/footer";
import Hero from "../components/hero";
import Advertisement from "../components/advertisement";
import CarouselHome from "../components/carouselhome";
function Homepage() {
  return (
    <div>
      <Header />
      <Hero />
      <CarouselHome />
      <Advertisement />
      <Footer />
    </div>
  );
}

export default Homepage;
