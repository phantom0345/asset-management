const mongoose = require("mongoose");

const upcomingAssetSchema = new mongoose.Schema({
  assetType: String,
  assetName: String,
  assetModelId: String,
  dealer: String,
  warrantyDate: String,
});

module.exports = mongoose.model("UpcomingAsset", upcomingAssetSchema);
