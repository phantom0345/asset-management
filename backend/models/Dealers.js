const mongoose = require("mongoose");

const dealerSchema = new mongoose.Schema({
  dealerName: { type: String, required: true },
  dealerId: { type: String, required: true },
  assetModelId: { type: String, required: true },
  entryDate: { type: Date, default: Date.now },
  assetsSupplied: [{ type: mongoose.Schema.Types.ObjectId, ref: "Asset" }],
});

const Dealer = mongoose.model("Dealer", dealerSchema);

module.exports = Dealer;
