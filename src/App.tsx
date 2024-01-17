import { FC, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CampaignsTable from "./components/CampaignsTable";
import ProfilesTable from "./components/ProfilesTable";
import AccountsTable from "./components/AccountsTable";
import { accountsData, profilesData, campaingsData } from "./data";
import { Account, Profile, Campaign } from "./types/types";
import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./components/Home";

const App: FC = () => {
  const propertyLabels: Record<string, string> = {
    accountId: "Account ID",
    creationDate: "Creation Date",
    authToken: "Auth Token",
    email: "Email",
    campaignId: "Campaign ID",
    clicks: "Campaign Clicks",
    cost: "Campaign Cost",
    date: "Campaign Date",
    profileId: "Profile ID",
    country: "Country",
    marketplace: "MarketPlace",
  };

  const [selectedEntity, setSelectedEntity] = useState<
    Account | Profile | Campaign | null
  >(null);

  const handleRowClick = (entity: Account | Profile | Campaign) => {
    setSelectedEntity(entity);
  };

  return (
    <div className="ms-lg-3">
    <Router>
      <Navbar />
      <Routes>
        <Route index element={<Home />} />
        <Route
          path="/profiles"
          element={
            <ProfilesTable data={profilesData} onRowClick={handleRowClick} />
          }
        />
        <Route
          path="/account"
          element={
            <AccountsTable data={accountsData} onRowClick={handleRowClick} />
          }
        />
        <Route
          path="/campaigns"
          element={
            <CampaignsTable data={campaingsData} onRowClick={handleRowClick} />
          }
        />
      </Routes>
      {selectedEntity && (
        <div>
          <h2>Selected Entity</h2>
          {Object.entries(selectedEntity).map(([key, value], index) => (
            <p key={index}>
              <strong>{propertyLabels[key] || key}:</strong> {value}
            </p>
          ))}
        </div>
      )}
    </Router>
    </div>
  );
};

export default App;
