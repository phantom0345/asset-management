const mongoose = require("mongoose");

const warehouseAssetSchema = new mongoose.Schema({
  assetType: { type: String, required: true },
  assetName: { type: String, required: true },
  assetModelId: { type: String, required: true },
  dealer: { type: String, required: true },
  warrantyDate: { type: Date, required: true },
}, { timestamps: true });

const WarehouseAsset = mongoose.model("WarehouseAsset", warehouseAssetSchema);

module.exports = WarehouseAsset;
