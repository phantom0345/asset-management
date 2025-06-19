import React, { useState, useEffect } from "react";
import "./Upcoming.css";

const UpcomingAssets = () => {
  const [showForm, setShowForm] = useState(false);
  const [showAssets, setShowAssets] = useState(false);
  const [formData, setFormData] = useState({
    assetType: "",
    assetName: "",
    assetModelId: "",
    dealer: "",
    warrantyDate: "",
  });
  const [upcomingAssets, setUpcomingAssets] = useState([]);

  const fetchAssets = async () => {
    try {
      const response = await fetch("http://localhost:5000/upcomingassets");
      if (!response.ok) throw new Error("Failed to fetch assets");
      const data = await response.json();
      setUpcomingAssets(data);
      setShowAssets(true);
      setShowForm(false);
    } catch (error) {
      console.error("Error fetching upcoming assets:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/upcomingassets", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        alert("Asset added successfully!");
        setFormData({
          assetType: "",
          assetName: "",
          assetModelId: "",
          dealer: "",
          warrantyDate: "",
        });
        setShowForm(false);
      } else {
        alert("Failed to add asset.");
      }
    } catch (error) {
      console.error("Error adding asset:", error);
    }
  };

  const handleMoveToWarehouse = async (asset) => {
    try {
      // Ensure we pass _id to the backend
      const response = await fetch("http://localhost:5000/warehouse", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...asset, _id: asset._id }),
      });
  
      if (!response.ok) throw new Error("Failed to move asset");
  
      // Optional: Delete asset from upcoming (can skip if backend already does it)
      await fetch(`http://localhost:5000/upcomingassets/${asset._id}`, {
        method: "DELETE",
      });
  
      alert("Asset moved to warehouse successfully!");
      fetchAssets(); // Refresh the list
    } catch (error) {
      console.error("Error moving asset to warehouse:", error);
    }
  };
  
  return (
    <div className="upcoming-assets">
      <h2>Upcoming Assets</h2>
      <div className="buttons">
        <button onClick={() => { setShowForm(true); setShowAssets(false); }}>Add</button>
        <button onClick={fetchAssets}>Display</button>
      </div>

      {showForm && (
        <form className="asset-form" onSubmit={handleSubmit}>
          <h3>Add New Asset</h3>
          <label>Asset Type: <input type="text" name="assetType" value={formData.assetType} onChange={handleInputChange} required /></label>
          <label>Asset Name: <input type="text" name="assetName" value={formData.assetName} onChange={handleInputChange} required /></label>
          <label>Asset Model ID: <input type="text" name="assetModelId" value={formData.assetModelId} onChange={handleInputChange} required /></label>
          <label>Dealer: <input type="text" name="dealer" value={formData.dealer} onChange={handleInputChange} required /></label>
          <label>Warranty Date: <input type="date" name="warrantyDate" value={formData.warrantyDate} onChange={handleInputChange} required /></label>
          <button type="submit">Add Asset</button>
          <button type="button" onClick={() => setShowForm(false)}>Cancel</button>
        </form>
      )}

      {showAssets && upcomingAssets.length > 0 && (
        <table>
          <thead>
            <tr>
              <th>Asset Type</th>
              <th>Asset Name</th>
              <th>Model ID</th>
              <th>Dealer</th>
              <th>Warranty Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {upcomingAssets.map((asset) => (
              <tr key={asset.id}>
                <td>{asset.assetType}</td>
                <td>{asset.assetName}</td>
                <td>{asset.assetModelId}</td>
                <td>{asset.dealer}</td>
                <td>{asset.warrantyDate}</td>
                <td>
                  <button onClick={() => handleMoveToWarehouse(asset)}>Move to Warehouse</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {showAssets && upcomingAssets.length === 0 && <p>No assets found.</p>}
    </div>
  );
};

export default UpcomingAssets;
