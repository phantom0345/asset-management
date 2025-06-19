const mongoose = require("mongoose");

const AssetServiceSchema = new mongoose.Schema({
  assetName: { type: String, required: true, unique: true },  // Notice small 'a'
  assetType: { type: String, required: true },
  assetModelId: { type: String, required: true },
  dealer: { type: String, required: true },
  warrantyDate: { type: Date, required: true },
  repairSentDate: { type: Date, required: true }
});

// Ensure mongoose builds proper index
AssetServiceSchema.index({ assetName: 1 }, { unique: true });

module.exports = mongoose.model("AssetService", AssetServiceSchema);
