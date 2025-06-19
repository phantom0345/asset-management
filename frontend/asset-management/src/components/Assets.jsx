import React, { useState, useEffect } from "react";
import "./Assets.css";

const Assets = () => {
  const [view, setView] = useState("add");
  const [addedAssets, setAddedAssets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newAsset, setNewAsset] = useState({
    assetType: "",
    assetName: "",
    assetModelId: "",
    repairThreshold: "",
    dealer: "",
    quantity: "",
    issueDate: "",
    warrantyDate: "",
    costPerUnit: "",
  });

  useEffect(() => {
    fetchAddedAssets();
  }, []);

  const fetchAddedAssets = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:5000/api/assets");
      if (!response.ok) {
        throw new Error(`Failed to fetch assets: ${response.status} ${response.statusText}`);
      }
      const data = await response.json();
      console.log("Fetched assets:", data);
      setAddedAssets(data);
    } catch (error) {
      console.error("❌ Error fetching assets:", error);
      setAddedAssets([]);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewAsset({ ...newAsset, [name]: value });
  };

  const handleAddAsset = async () => {
    const isFormValid = Object.values(newAsset).every((value) => value.trim !== "" && value !== "");
    if (!isFormValid) {
      alert("Please fill out all fields.");
      return;
    }
  
    try {
      const response = await fetch("http://localhost:5000/api/assets/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newAsset),
      });
  
      if (response.ok) {
        await response.json();
        // Refresh the assets list
        fetchAddedAssets();
        
        // Reset the form
        setNewAsset({
          assetType: "",
          assetName: "",
          assetModelId: "",
          repairThreshold: "",
          dealer: "",
          quantity: "",
          issueDate: "",
          warrantyDate: "",
          costPerUnit: "",
        });
        alert("✅ Asset added successfully!");
      } else {
        throw new Error("Failed to add asset.");
      }
    } catch (error) {
      console.error("❌ Error adding asset:", error);
      alert("Failed to add asset. Please try again.");
    }
  };

  return (
    <div className="asset-management-container">
      {/* Sidebar */}
      <div className="sidebar">
        <button
          className={view === "add" ? "active" : ""}
          onClick={() => setView("add")}
        >
          Add Asset
        </button>
        <button
          className={view === "display" ? "active" : ""}
          onClick={() => {
            setView("display");
            fetchAddedAssets(); // Refresh data when switching to display view
          }}
        >
          Display Assets
        </button>
      </div>

      {/* Main Content */}
      <div className="main-content">
        {view === "add" && (
          <div className="add-asset-form">
            <h2>Add New Asset</h2>
            <form>
              <label>
                Asset Type:
                <input
                  type="text"
                  name="assetType"
                  value={newAsset.assetType}
                  onChange={handleInputChange}
                  required
                />
              </label>
              <label>
                Asset Name:
                <input
                  type="text"
                  name="assetName"
                  value={newAsset.assetName}
                  onChange={handleInputChange}
                  required
                />
              </label>
              <label>
                Asset Model ID:
                <input
                  type="text"
                  name="assetModelId"
                  value={newAsset.assetModelId}
                  onChange={handleInputChange}
                  required
                />
              </label>
              <label>
                Repair Threshold:
                <input
                  type="number"
                  name="repairThreshold"
                  value={newAsset.repairThreshold}
                  onChange={handleInputChange}
                  required
                />
              </label>
              <label>
                Dealer:
                <input
                  type="text"
                  name="dealer"
                  value={newAsset.dealer}
                  onChange={handleInputChange}
                  required
                />
              </label>
              <label>
                Quantity:
                <input
                  type="number"
                  name="quantity"
                  value={newAsset.quantity}
                  onChange={handleInputChange}
                  required
                />
              </label>
              <label>
                Issue Date:
                <input
                  type="date"
                  name="issueDate"
                  value={newAsset.issueDate}
                  onChange={handleInputChange}
                  required
                />
              </label>
              <label>
                Warranty Date:
                <input
                  type="date"
                  name="warrantyDate"
                  value={newAsset.warrantyDate}
                  onChange={handleInputChange}
                  required
                />
              </label>
              <label>
                Cost per Unit:
                <input
                  type="number"
                  name="costPerUnit"
                  value={newAsset.costPerUnit}
                  onChange={handleInputChange}
                  required
                />
              </label>

              <button type="button" onClick={handleAddAsset}>
                Add Asset
              </button>
            </form>
          </div>
        )}

        {view === "display" && (
          <div className="display-assets">
            <h2>Added Assets: {addedAssets.length}</h2>
            {loading ? (
              <p>Loading assets...</p>
            ) : addedAssets.length === 0 ? (
              <p>No assets found. Add some assets first.</p>
            ) : (
              <table>
                <thead>
                  <tr>
                    <th>Asset Type</th>
                    <th>Asset Name</th>
                    <th>Model ID</th>
                    <th>Repair Threshold</th>
                    <th>Dealer</th>
                    <th>Quantity</th>
                    <th>Issue Date</th>
                    <th>Warranty Date</th>
                    <th>Cost Per Unit</th>
                  </tr>
                </thead>
                <tbody>
                  {addedAssets.map((asset) => (
                    <tr key={asset._id}>
                      <td>{asset.assetType}</td>
                      <td>{asset.assetName}</td>
                      <td>{asset.assetModelId}</td>
                      <td>{asset.repairThreshold}</td>
                      <td>{asset.dealer}</td>
                      <td>{asset.quantity}</td>
                      <td>{asset.issueDate ? new Date(asset.issueDate).toLocaleDateString() : 'N/A'}</td>
                      <td>{asset.warrantyDate ? new Date(asset.warrantyDate).toLocaleDateString() : 'N/A'}</td>
                      <td>{asset.costPerUnit}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Assets;