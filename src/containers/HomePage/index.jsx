import React from "react";
import Blog from "../../components/Blog";
import DonationProcess from "../../components/DonationProcess";
import Footer from "../../components/Footer";
import JoinUs from "../../components/JoinUs";
import NavBar from "../../components/NavBar";
import OurGoals from "../../components/OurGoals";
import OurSponsors from "../../components/OurSponsors";
import Team from "../../components/Team";
import WorkingTogether from "../../components/WorkingTogether";
import YouCanHelp from "../../components/YouCanHelp";

const HomePage = () => {
  return (
    <div>
      <NavBar />
      <YouCanHelp />
      <DonationProcess />
      <OurGoals />
      <WorkingTogether />
      <OurSponsors />
      <Blog />
      <Team />
      <JoinUs />
      <Footer />
    </div>
  );
};
export default HomePage;
