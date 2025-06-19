const express = require("express");
const Asset = require("../models/Asset.js");
const router = express.Router();

router.post("/add", async (req, res) => {
  try {
    console.log("Received asset data:", req.body);
    const newAsset = await Asset.create(req.body);
    console.log("Created new asset object:", newAsset);
    
    console.log("Asset saved successfully");
    res.status(201).json({ message: "✅ Asset added successfully!", asset: newAsset });
  } catch (error) {
    console.error("Error adding asset:", error.message);
    console.error(error.stack);
    res.status(500).json({ error: "❌ Failed to add asset", details: error.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const assets = await Asset.find();
    res.status(200).json(assets);
  } catch (error) {
    console.error("Error fetching assets:", error);
    res.status(500).json({ error: "❌ Failed to fetch assets" });
  }
});

module.exports = router;