import Footer from "@/components/footer";
import Arrivals from "@/components/home/arrivals";
import HappyCustomers from "@/components/home/happy-customers";
import Header from "@/components/home/header";
import Navbar from "@/components/layout/header/navbar";

export default function Home() {
  return (
    <div>
      <Navbar />
      <Header />
      <div className="w-full h-24 bg-black" />
      <Arrivals />
      <div className="w-full h-[1px] bg-gray-200" />
      <HappyCustomers />
      <Footer />
    </div>
  );
}
