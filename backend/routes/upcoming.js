const express = require("express");
const router = express.Router();
const UpcomingAsset = require("../models/Upcoming.js");

// GET all assets
router.get("/", async (req, res) => {
  try {
    const assets = await UpcomingAsset.find();
    res.json(assets);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST new asset
router.post("/", async (req, res) => {
  const asset = new UpcomingAsset({
    assetType: req.body.assetType,
    assetName: req.body.assetName,
    assetModelId: req.body.assetModelId,
    dealer: req.body.dealer,
    warrantyDate: req.body.warrantyDate,
  });

  try {
    const newAsset = await asset.save();
    res.status(201).json(newAsset);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
