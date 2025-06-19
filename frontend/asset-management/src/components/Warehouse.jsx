import React, { useState, useEffect } from "react";
import "./Warehouse.css";

const Warehouse = () => {
  const [warehouseItems, setWarehouseItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    fetch("http://localhost:5000/warehouse") // API endpoint for warehouse items
      .then((response) => response.json())
      .then((data) => setWarehouseItems(data))
      .catch((error) => console.error("Error fetching warehouse items:", error));
  }, []);

  // Pagination Logic
  const totalPages = Math.ceil(warehouseItems.length / itemsPerPage);
  const currentItems = warehouseItems.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePrevPage = () => currentPage > 1 && setCurrentPage(currentPage - 1);
  const handleNextPage = () => currentPage < totalPages && setCurrentPage(currentPage + 1);

  return (
    <div className="warehouse-container">
      <h2>Warehouse Items</h2>
      <table className="warehouse-table">
        <thead>
          <tr>
            <th>Item ID</th>
            <th>Asset Type</th>
            <th>Asset Name</th>
            <th>Model ID</th>
            <th>Dealer</th>
            <th>Warranty Date</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.assetType}</td>
              <td>{item.assetName}</td>
              <td>{item.modelId}</td>
              <td>{item.dealer}</td>
              <td>{item.warrantyDate}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Pagination Controls */}
      <div className="pagination-controls">
        <button onClick={handlePrevPage} disabled={currentPage === 1}>
          ❮
        </button>
        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentPage(index + 1)}
            className={currentPage === index + 1 ? "active" : ""}
          >
            {index + 1}
          </button>
        ))}
        <button onClick={handleNextPage} disabled={currentPage === totalPages}>
          ❯
        </button>
      </div>
    </div>
  );
};

export default Warehouse;
