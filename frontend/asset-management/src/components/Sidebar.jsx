import React from "react";

const Sidebar = ({ view, setView }) => (
  <div className="sidebar">
    <button className={view === "assetService" ? "active" : ""} onClick={() => setView("assetService")}>
      Asset Service
    </button>
    <button className={view === "serviceSuggestion" ? "active" : ""} onClick={() => setView("serviceSuggestion")}>
      Service Suggestion
    </button>
    <button className={view === "warehouse" ? "active" : ""} onClick={() => setView("warehouse")}>
      Warehouse
    </button>
    <button className={view === "upcomingAssets" ? "active" : ""} onClick={() => setView("upcomingAssets")}>
      Upcoming Assets
    </button>
  </div>
);

export default Sidebar;
