import React from "react";
import CommodityList from "../components/CommodityList";
import BuySellForm from "../components/BuySellForm";

const Home = ({balance, setBalance, updateAssets, assets }) => {
  return (
    <div style={{ height: "100vh", overflowY: "auto" }}>
      {/* Pass balance, setBalance, updateAssets, and assets to BuySellForm */}
      <CommodityList />
      <BuySellForm 
        balance={balance} 
        setBalance={setBalance} 
        updateAssets={updateAssets} 
        assets={assets} 
      />
      
    </div>
  );
};

export default Home;
