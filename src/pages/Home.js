import React from "react";
import CommodityList from "../components/CommodityList";
import BuySellForm from "../components/BuySellForm";
import NegotiationSection from "../components/NegotiationSection";

import './Home.css'; // Import the CSS file for animation and styling

const Home = () => {
  return (
    <div style={{ height: "100vh", overflowY: "auto" }}>
        
        <CommodityList />
        <BuySellForm />
        <NegotiationSection />
        
  </div>
  );
};

export default Home;
