import React from "react";

const AddAssetForm = ({ newAsset, setNewAsset, handleAddAsset }) => {
  return (
    <div className="add-asset-form">
      <h2>Add Asset</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleAddAsset();
        }}
      >
        <input
          type="text"
          placeholder="Asset Type"
          value={newAsset.assetType}
          onChange={(e) => setNewAsset({ ...newAsset, assetType: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Asset Name"
          value={newAsset.assetName}
          onChange={(e) => setNewAsset({ ...newAsset, assetName: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Model ID"
          value={newAsset.assetModelId}
          onChange={(e) => setNewAsset({ ...newAsset, assetModelId: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Dealer"
          value={newAsset.dealer}
          onChange={(e) => setNewAsset({ ...newAsset, dealer: e.target.value })}
          required
        />
        <input
          type="date"
          value={newAsset.warrantyDate}
          onChange={(e) => setNewAsset({ ...newAsset, warrantyDate: e.target.value })}
          required
        />
        <button type="submit">Add Asset</button>
      </form>
    </div>
  );
};

export default AddAssetForm;
