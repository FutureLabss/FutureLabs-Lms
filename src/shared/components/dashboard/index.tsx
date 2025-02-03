import DashboardCardExplore from "./components/explorecontent/cardDisplay";
import HeroSection from "./components/HeroSection";
import StudentProgressCardComponent from "./components/progressCard";
import StudentStoriesCardComponent from "./components/studentStories";
import Footer from "../common/Footer";
import WhyChoseUs from "./components/WhyChoseUs";

export default function HomePage() {
    return (
        <div>
            <HeroSection />
            <DashboardCardExplore />
            <StudentProgressCardComponent />
            <StudentStoriesCardComponent />
            <WhyChoseUs />
            <Footer />
        </div>
    )
}