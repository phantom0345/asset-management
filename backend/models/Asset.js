const mongoose = require("mongoose");

const AssetSchema = new mongoose.Schema({
  assetType: String,
  assetName: String,
  assetModelId: String,
  repairThreshold: Number,
  dealer: String,
  quantity: Number,
  issueDate: Date,
  warrantyDate: Date,
  costPerUnit: Number,
});

module.exports = mongoose.model("Asset", AssetSchema);
