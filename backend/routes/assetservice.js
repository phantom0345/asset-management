const express = require("express");
const router = express.Router();
const AssetService = require("../models/Asset-service");
const { ObjectId } = require("mongodb"); // make sure correct path

// Add new asset
router.post("/add", async (req, res) => {
  try {
    console.log("Received asset data:", req.body);

    // Validate request body
    const { assetName, assetType, assetModelId, dealer, warrantyDate, repairSentDate } = req.body;
    if (!assetName || !assetType || !assetModelId || !dealer || !warrantyDate || !repairSentDate) {
      return res.status(400).json({ error: "❗ All fields are required." });
    }

    const newAsset = new AssetService({
      assetName,
      assetType,
      assetModelId,
      dealer,
      warrantyDate,
      repairSentDate
    });

    const savedAsset = await newAsset.save();

    console.log("Asset saved:", savedAsset);
    res.status(201).json({ message: "Asset service added successfully!", asset: savedAsset });

  } catch (error) {
    console.error("Error adding asset:", error);
    if (error.code === 11000) {
      res.status(409).json({ error: "Duplicate assetName detected.", details: error.keyValue });
    } else {
      res.status(500).json({ error: "Failed to add asset", details: error.message });
    }
  }
});
// ➤ Fetch all asset services
// Example using Express.js
router.delete("/model/:assetModelId", async (req, res) => {
  const { assetModelId } = req.params;

  try {
    const result = await AssetService.deleteOne({ assetModelId });

    if (result.deletedCount === 0) {
      return res.status(404).send("Asset not found with given assetModelId");
    }

    res.status(200).json({ message: "Asset deleted based on assetModelId" });
  } catch (err) {
    console.error("Error deleting asset by assetModelId:", err);
    res.status(500).send("Server error");
  }
});


// Get combined asset + dealer data
router.get("/newassetservice", async (req, res) => {
  try {
    const assets = await AssetService.find();
    const dealers = await Dealer.find();

    const enrichedAssets = assets.map((asset) => {
      const matchedDealer = dealers.find(d => d.dealerName === asset.dealer);

      return {
        id: asset._id,
        assetName: asset.assetName,
        assetType: asset.assetType,
        assetModelId: asset.assetModelId,
        warrantyDate: asset.warrantyDate?.toISOString().split("T")[0],
        repairSentDate: asset.repairSentDate?.toISOString().split("T")[0],
        repairCount: asset.repairCount || 0,
        repairThreshold: asset.repairThreshold || 3,
        dealer: asset.dealer,
        dealerId: matchedDealer ? matchedDealer.dealerId : "N/A",
        entryDate: matchedDealer?.entryDate?.toISOString().split("T")[0] || "N/A",
        description: asset.description || "",
        repairDate: asset.repairDate || null
      };
    });
    console.log(enrichedAssets)
    res.status(200).json(enrichedAssets);
   
  } catch (error) {
    console.error("Error in GET /assetservice:", error);
    res.status(500).json({ error: "Failed to fetch asset data" });
  }
});






module.exports = router;
