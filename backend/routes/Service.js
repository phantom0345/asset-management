const express = require("express");
const router = express.Router();
const AssetService = require("../models/Asset-service");
const Dealer = require("../models/Dealers");

// Get combined asset + dealer data
router.get("/assetservice", async (req, res) => {
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
    console.error("❌ Error in GET /assetservice:", error);
    res.status(500).json({ error: "Failed to fetch asset data" });
  }
});

// Add asset
// router.post("/assetservice/add", async (req, res) => {
//   try {
//     const newAsset = new AssetService(req.body);
//     const saved = await newAsset.save();
//     res.status(201).json(saved);
//   } catch (error) {
//     console.error("❌ Error in POST /assetservice/add:", error);
//     res.status(400).json({ error: "Failed to add asset" });
//   }
// });

// Delete asset
router.delete("/assetservice/model/:id", async (req, res) => {
  try {
    const deleted = await AssetService.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: "Asset not found" });
    res.json(deleted);
  } catch (error) {
    console.error("❌ Error in DELETE /assetservice/model/:id:", error);
    res.status(500).json({ error: "Failed to delete asset" });
  }
});

// Update asset
router.put("/assets/:_id", async (req, res) => {
  try {
    const updated = await AssetService.findByIdAndUpdate(req.params._id, req.body, { new: true });
    if (!updated) return res.status(404).json({ error: "Asset not found" });
    res.json(updated);
  } catch (error) {
    console.error("❌ Error in PUT /assets/:id:", error);
    res.status(400).json({ error: "Failed to update asset" });
  }
});

module.exports = router;
