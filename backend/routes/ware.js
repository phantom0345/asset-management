const express = require("express");
const router = express.Router();
const UpcomingAsset = require("../models/Upcoming.js");
const WarehouseAsset = require("../models/warehouse.js");

// Get all assets in the warehouse
router.get("/", async (req, res) => {
  try {
    const assets = await WarehouseAsset.find();
    res.json(assets);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Move asset to warehouse
router.post("/", async (req, res) => {
  const { assetType, assetName, assetModelId, dealer, warrantyDate, _id } = req.body;

  const asset = new WarehouseAsset({
    assetType,
    assetName,
    assetModelId,
    dealer,
    warrantyDate,
  });

  try {
    const newAsset = await asset.save();

    const upcomingAsset = await UpcomingAsset.findByIdAndDelete(_id);
    if (!upcomingAsset) {
      return res.status(404).json({ message: "Asset not found in upcoming assets" });
    }

    res.status(201).json(newAsset);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});
module.exports = router;
