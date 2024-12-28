import Footer from "../common/Footer";
import Navbar from "../common/NavBar";
import HeroSection from "./components/HeroSection";
import WhyChoseUs from "./components/WhyChoseUs";

export default function HomePage() {
    return (
        <div>
            <Navbar />
            <HeroSection />
            <WhyChoseUs />
            <Footer />
        </div>
    )
}