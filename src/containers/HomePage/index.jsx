import React from "react";
import DonationProcess from "../../components/DonationProcess";
import Blog from "../../components/Blog";
import JoinUs from "../../components/JoinUs";
import OurGoals from "../../components/OurGoals";
import OurSponsors from "../../components/OurSponsors";
import Team from "../../components/Team";
import WorkingTogether from "../../components/WorkingTogether";
import YouCanHelp from "../../components/YouCanHelp";

const HomePage = () => {
  return (
    <div>
      <YouCanHelp />
      <DonationProcess />
      <OurGoals />
      <WorkingTogether />
      <OurSponsors />
      <Blog />
      <Team />
      <JoinUs />
    </div>
  );
};

export default HomePage;
