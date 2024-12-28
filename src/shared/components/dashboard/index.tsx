import DashboardCardExplore from "./components/explorecontent/cardDisplay";
import HeroSection from "./components/HeroSection";
import StudentProgressCardComponent from "./components/progressCard";
import StudentStoriesCardComponent from "./components/studentStories";

export default function HomePage() {
    return (
        <div>
            <HeroSection />
            <DashboardCardExplore />
            <StudentProgressCardComponent />
            <StudentStoriesCardComponent />
        </div>
    )
}