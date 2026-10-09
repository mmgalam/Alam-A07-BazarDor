import AllProducts from "./Home/AllProducts";
import FallingProducts from "./Home/FallingProducts";
import Hero from "./Home/Hero";
import RisingProducts from "./Home/RisingProducts";


export default function Home() {
  return (
    <div className="bg-[#f3f7f2]">
      <Hero />
      <RisingProducts />
      <FallingProducts />
      <AllProducts />
    </div>
  );
}
