
import React, { useState, useEffect } from "react";
import "./Maintenance.css";
import Warehouse from "./Warehouse";
import Upcoming from "./Upcoming";
import axios from 'axios'

const Maintenance = () => {
  const [view, setView] = useState("assetService");
  const [assets, setAssets] = useState([]);
  const [currentAssets, setCurrentAssets] = useState([]);
  const [suggestedRepairs, setSuggestedRepairs] = useState([]);
  const [currentAsset, setCurrentAsset] = useState(null);
  const [currentAssetDescription, setCurrentAssetDescription] = useState("");
  const [currentRepairDate, setCurrentRepairDate] = useState('');
  const [newAsset, setNewAsset] = useState({
    
    assetType: "",
    assetName: "",
    assetModelId: "",
    dealer: "",
    warrantyDate: "",
    repairSentDate: ""
  });

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  useEffect(() => {
    if (view === "serviceSuggestion") {
      fetch("http://localhost:5000/api/cssassetservice") // or use your full API URL if not using proxy
        .then((res) => res.json())
        .then((data) => {
          // Filter based on repair threshold logic if needed
          const filtered = data.filter((asset) => asset.repairCount >= 3); // threshold logic
          setSuggestedRepairs(filtered);
      setSuggestedRepairs(data)

        })
        .catch((err) => {
          console.error("Error fetching service suggestion data:", err);
        });
    }
  }, [view]);
  
  

  useEffect(() => {
    // fetch("http://localhost:5000/api/cssassetservice")
    //   .then((response) => {
    //     console.log("err")
    //     if (!response.ok) throw new Error("Failed to fetch assets");
    //     console.log(response.json());
    //     return response.json();
        
    //   })
    //   .then((data) => {
    //     console.log(data)
    //     setAssets(data);
    //     setCurrentAssets(data.slice(0, itemsPerPage));
    //     const repairsNeeded = data.filter(
    //       (asset) => asset.repairCount >= asset.repairThreshold
    //     );
    //     setSuggestedRepairs(repairsNeeded);
    //   })

    axios.get('http://localhost:5000/api/assetservice')
    .then((res)=>{
       console.log(res.data)
      //  setAssets(res.data)
      setSuggestedRepairs(res.data)
    })
      .catch((error) => console.error("Error fetching assets:", error));
  }, []); // Only run on initial load

  // Pagination logic
  const totalPages = Math.ceil(assets.length / itemsPerPage);
  const handleClickPage = (page) => {
    setCurrentPage(page);
    const startIndex = (page - 1) * itemsPerPage;
    setCurrentAssets(assets.slice(startIndex, startIndex + itemsPerPage));
  };
  const handlePrevPage = () => currentPage > 1 && handleClickPage(currentPage - 1);
  const handleNextPage = () => currentPage < totalPages && handleClickPage(currentPage + 1);

  // Add new asset
  const handleAddAsset = () => {
    // Ensure the dates are in ISO string format
    const formattedAsset = {
      ...newAsset,
      warrantyDate: newAsset.warrantyDate ? new Date(newAsset.warrantyDate).toISOString() : null,
      repairSentDate: newAsset.repairSentDate ? new Date(newAsset.repairSentDate).toISOString() : null,
    };

    fetch("http://localhost:5000/api/assetservice/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formattedAsset),
    })
      .then((response) => {
        if (!response.ok) throw new Error("Failed to add asset");
        return response.json();
      })
      .then((addedAsset) => {
        setAssets((prevAssets) => [...prevAssets, addedAsset]);
        setNewAsset({
          assetType: "",
          assetName: "",
          assetModelId: "",
          dealer: "",
          warrantyDate: "",
          repairSentDate: "",
        });
        setView("viewAsset");
        handleClickPage(1);
      })
      .catch((error) => console.error("Error adding asset:", error));
      

  };

  
  const handleDeleteAsset = async (id) => {
    try {
      console.log("Attempting to delete asset with ID:", id); // helpful for debugging
  
      const response = await fetch(`http://localhost:5000/api/assetservice/model/${id}`, {
        method: "DELETE",
      });
  
      if (!response.ok) {
        const errMessage = await response.text();
        throw new Error(`Failed to delete asset. Server says: ${errMessage}`);
      }
  
      const result = await response.json();
      console.log("✅ Deleted:", result);
  
      // Remove from state
      setAssets((prevAssets) => prevAssets.filter((asset) => asset._id !== id));
  
      // Adjust pagination
      const isLastItemOnPage = currentAssets.length === 1;
      const newPage = isLastItemOnPage && currentPage > 1 ? currentPage - 1 : currentPage;
      handleClickPage(newPage);
  
    } catch (error) {
      console.error("❌ Error deleting asset:", error.message);
      alert("Error deleting asset: " + error.message); // Optional feedback
    }
  };
  

  // Extend and Update asset
  const handleExtendAsset = (asset) => {
    setCurrentAsset(asset);
    setCurrentAssetDescription(asset.description || "");
    setCurrentRepairDate(asset.repairDate || "");
  };

const handleUpdateAsset = () => {
  // if (!currentAsset || !currentAsset._id) {
  //   console.error("❌ Invalid asset selected for update");
  //   return;
  // }

  const updatedRepairDate = new Date(currentRepairDate);
  const extendedWarrantyDate = new Date(updatedRepairDate);
  extendedWarrantyDate.setFullYear(extendedWarrantyDate.getFullYear() + 1);

  const updatedAsset = {
    ...currentAsset,
    repairDate: updatedRepairDate.toISOString(),
    warrantyDate: extendedWarrantyDate.toISOString(),
  };

  fetch(`http://localhost:5000/api/assets/${currentAsset._id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updatedAsset),
  })
    .then((response) => {
      if (!response.ok) throw new Error("Failed to update asset");
      return response.json();
    })
    .then((updatedAsset) => {
      setAssets((prevAssets) =>
        prevAssets.map((asset) =>
          asset._id === updatedAsset._id ? updatedAsset : asset
        )
      );
      setCurrentAsset(null);
    })
    .catch((error) => console.error("Error updating asset:", error));
};

  
 
  const handleMoveToWarehouse = () => {
    console.log("Asset moved to warehouse:", currentAsset);
    setCurrentAsset(null);
  };

  return (
    <div className="maintenance-container">
      {/* Sidebar */}
      <div className="sidebar">
        <button
          className={view === "assetService" ? "active" : ""}
          onClick={() => setView("assetService")}
        >
          Asset Service
        </button>
        <button
          className={view === "serviceSuggestion" ? "active" : ""}
          onClick={() => setView("serviceSuggestion")}
        >
          Service Suggestion
        </button>
        <button
          className={view === "warehouse" ? "active" : ""}
          onClick={() => setView("warehouse")}
        >
          Warehouse
        </button>
        <button
          className={view === "upcomingAssets" ? "active" : ""}
          onClick={() => setView("upcomingAssets")}
        >
          Upcoming Assets
        </button>
      </div>

      {/* Main Content */}
      <div className="main-content">
        {view === "assetService" && (
          <div>
            <button onClick={() => setView("addAsset")}>Add</button>
            <button onClick={() => setView("viewAsset")}>View</button>
          </div>
        )}
{view === "serviceSuggestion" && (
  <div className="bg-[#e6f0fa] shadow-md p-6 rounded-md">
    {/* Header */}
    <div className="flex justify-between items-center mb-4">
      <h2 className="text-xl font-semibold">Assets Crossed Repair Threshold</h2>
      <span className="text-red-500 font-semibold text-sm">Suggested Repairs: {suggestedRepairs.length}</span>
    </div>

    {/* Table */}
    <div className="overflow-x-auto">
      <table className="w-full border-collapse border border-gray-300 text-sm">
        <thead className="bg-gray-100 text-left text-sm">
          <tr>
            <th className="p-2 border">Asset type</th>
            <th className="p-2 border">Asset name.</th>
            <th className="p-2 border">asset model id.</th>
            <th className="p-2 border">dealer.</th>
            <th className="p-2 border">repair sent date.</th>
            <th className="p-2 border">warranty/expiry.</th>
            <th className="p-2 border">repair count</th>
            <th className="p-2 border">delete/extend</th>
          </tr>
        </thead>
        <tbody>
          {suggestedRepairs.map((asset) => (
            
            <tr key={asset._id || asset.id} className="bg-white text-red-600">
              <td className="p-2 border">{asset.assetType}</td>
              <td className="p-2 border underline">{asset.assetName}</td>
              <td className="p-2 border">{asset.assetModelId}</td>
              <td className="p-2 border">{asset.dealer}</td>
              <td className="p-2 border">{asset.repairSentDate ? new Date(asset.repairSentDate).toLocaleDateString() : "-"}</td>
              <td className="p-2 border">{asset.warrantyDate ? new Date(asset.warrantyDate).toLocaleDateString() : "N/A"}</td>
              <td className="p-2 border text-center">{asset.repairCount}</td>
              <td className="p-2 border flex justify-center space-x-2">
                <button
                  onClick={() => handleDeleteAsset(asset._id || asset.id)}
                  className="px-2 py-1 bg-gray-300 rounded hover:bg-gray-400 text-sm"
                >
                  Delete
                </button>
                <button
                  onClick={() => handleExtendAsset(asset)}
                  className="px-2 py-1 bg-gray-300 rounded hover:bg-gray-400 text-sm"
                >
                  Extend
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

    {/* Note */}
    <p className="mt-4 text-sm text-gray-700 italic">
      Note: Software assets are marked red as they approach their expiry date and can be extended their expiry date (use extend button)
    </p>
  </div>
)}


        {view === "addAsset" && (
          <div className="add-asset-form">
            <h2>Add service assets</h2>
            <form>
              <div className="input-group">
                <label>Asset Type:</label>
                <input
  type="text"
  value={newAsset.assetType}
  onChange={(e) => setNewAsset({ ...newAsset, assetType: e.target.value })}
/>

              </div>
              <div className="input-group">
                <label>Asset Name:</label>
                <input
                  type="text"
                  value={newAsset.assetName}
                  onChange={(e) => setNewAsset({ ...newAsset, assetName: e.target.value })}
                />
              </div>
              <div className="input-group">
                <label>Asset Model ID:</label>
                <input
                  type="text"
                  value={newAsset.assetModelId}
                  onChange={(e) => setNewAsset({ ...newAsset, assetModelId: e.target.value })}
                />
              </div>
              <div className="input-group">
                <label>Dealer:</label>
                <input
                  type="text"
                  value={newAsset.dealer}
                  onChange={(e) => setNewAsset({ ...newAsset, dealer: e.target.value })}
                />
              </div>
              <div className="input-group">
                <label>Warranty Date:</label>
                <input
                  type="date"
                  value={newAsset.warrantyDate}
                  onChange={(e) => setNewAsset({ ...newAsset, warrantyDate: e.target.value })}
                />
              </div>
              <div className="input-group">
                <label>Repair sent date:</label>
                <input
                  type="date"
                  value={newAsset.repairSentDate}
                  onChange={(e) => setNewAsset({ ...newAsset, repairSentDate: e.target.value })}
                />
              </div>
              <button type="button" onClick={handleAddAsset}>
                Add Asset
              </button>
            </form>
          </div>
        )}

        {view === "viewAsset" && (
          <div className="view-asset-list">
            <h2>Items in Repair</h2>
            <table>
              <thead>
                <tr>
                  <th>Asset Type</th>
                  <th>Asset Name</th>
                  <th>Model ID</th>
                  <th>Dealer</th>
                  <th>Warranty Date</th>
                  <th>Repair sent date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentAssets.map((asset) => (
                  <tr key={asset._id}>
                  <td>{asset.assetType}</td>
                  <td>{asset.assetName}</td>
                  <td>{asset.assetModelId}</td>
                  <td>{asset.dealer}</td>
                  <td>{asset.warrantyDate ? new Date(asset.warrantyDate).toLocaleDateString() : "N/A"}</td>
                  <td>{asset.repairSentDate ? new Date(asset.repairSentDate).toLocaleDateString() : "N/A"}</td>
                  <td>
                  <button onClick={() => handleDeleteAsset(asset.assetModelId)}>Delete</button>


                  </td>
                </tr>
                
                ))}
              </tbody>
            </table>
            <div className="pagination">
              <button onClick={handlePrevPage} disabled={currentPage === 1}>
                Prev
              </button>
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i + 1}
                  onClick={() => handleClickPage(i + 1)}
                  className={currentPage === i + 1 ? "active" : ""}
                >
                  {i + 1}
                </button>
              ))}
              <button onClick={handleNextPage} disabled={currentPage === totalPages}>
                Next
              </button>
            </div>
          </div>
        )}
{currentAsset && (
  <div className="extend-modal">
    <h3>Extend Warranty / Description</h3>
    <label>Repair Date:</label>
    <input
      type="date"
      value={currentRepairDate}
      onChange={(e) => setCurrentRepairDate(e.target.value)}
    />
    <button onClick={handleUpdateAsset}>Update</button>
    <button onClick={() => setCurrentAsset(null)}>Cancel</button>
  </div>
)}



        {view === "warehouse" && <Warehouse />}

        {view === "upcomingAssets" && <Upcoming />}
      </div>
    </div>
  );
};

export default Maintenance;
