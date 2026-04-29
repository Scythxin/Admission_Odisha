import React from "react";
import Hero from "./HeroSection";
import CourseSection from "./CourseSection";
import CollegeSection from "./CollegeSection";
import InfoSection from "./InfoSection";
import StatsSection from "./StateSection";
// import HeroSection from "../../components/HeroSection";

const Home = () => {
  return (
    <div>
      <Hero />
      <CourseSection />
      <CollegeSection />
      <InfoSection />
      <StatsSection />
    </div>
  );
};

export default Home;
