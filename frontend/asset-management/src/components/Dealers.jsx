import React, { useState, useEffect } from "react";
import "./Dealers.css";

const Dealers = () => {
  const [view, setView] = useState("add");
  const [dealers, setDealers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [newDealer, setNewDealer] = useState({
    dealerName: "",
    dealerId: "",
    assetModelId: "",
    entryDate: "",
  });

  // Fetch dealers from backend
  const fetchDealers = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("http://localhost:5000/api/dealers");
      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
      const data = await response.json();
      setDealers(data);
    } catch (err) {
      console.error("Error fetching dealers:", err);
      setError("❌ Failed to load dealers.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDealers();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewDealer({ ...newDealer, [name]: value });
  };

  const handleAddDealer = async () => {
    const { dealerName, dealerId, assetModelId } = newDealer;

    if (!dealerName || !dealerId || !assetModelId) {
      alert("⚠️ Please fill all required fields.");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/dealers/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newDealer),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to add dealer");
      }

      setNewDealer({ dealerName: "", dealerId: "", assetModelId: "", entryDate: "" });
      fetchDealers(); // Refresh dealer list
    } catch (error) {
      console.error("Error adding dealer:", error.message);
      alert(`❌ ${error.message}`);
    }
  };

  return (
    <div className="asset-management-container">
      <div className="sidebar">
        <button className={view === "add" ? "active" : ""} onClick={() => setView("add")}>
          Add Dealer
        </button>
        <button className={view === "view" ? "active" : ""} onClick={() => setView("view")}>
          View Dealers
        </button>
      </div>

      <div className="main-content">
        {view === "add" && (
          <div className="add-dealer-form">
            <h2>Add Dealer</h2>
            <form>
              <label>
                Dealer Name:
                <input type="text" name="dealerName" value={newDealer.dealerName} onChange={handleInputChange} />
              </label>
              <label>
                Dealer ID:
                <input type="text" name="dealerId" value={newDealer.dealerId} onChange={handleInputChange} />
              </label>
              <label>
                Asset Model ID:
                <input type="text" name="assetModelId" value={newDealer.assetModelId} onChange={handleInputChange} />
              </label>
              <label>
                Entry Date:
                <input type="date" name="entryDate" value={newDealer.entryDate} onChange={handleInputChange} />
              </label>
              <button type="button" onClick={handleAddDealer}>Add Dealer</button>
            </form>
          </div>
        )}

        {view === "view" && (
          <div className="dealer-list">
            <h2>Dealer List</h2>
            {loading ? (
              <p>Loading...</p>
            ) : error ? (
              <p>{error}</p>
            ) : dealers.length === 0 ? (
              <p>No dealers available.</p>
            ) : (
              <table className="dealer-table">
                <thead>
                  <tr>
                    <th>Dealer Name</th>
                    <th>Dealer ID</th>
                    <th>Asset Model ID</th>
                    <th>Entry Date</th>
                  </tr>
                </thead>
                <tbody>
                  {dealers.map((dealer) => (
                    <tr key={dealer._id}>
                      <td>{dealer.dealerName}</td>
                      <td>{dealer.dealerId}</td>
                      <td>{dealer.assetModelId}</td>
                      <td>{dealer.entryDate ? new Date(dealer.entryDate).toLocaleDateString() : "N/A"}</td>
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

export default Dealers;
