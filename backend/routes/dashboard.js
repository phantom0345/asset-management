// backend/routes/dashboard.js
const express = require('express');
const router = express.Router();
const Asset = require('../models/Asset');
const Warehouse = require('../models/Upcoming'); // Adjust path if needed
const Dealer = require('../models/Dealers');

// GET /overview
router.get('/overview', async (req, res) => {
  try {
    const totalAssets = await Asset.countDocuments();
    const availableAssets = await Warehouse.countDocuments({ status: 'available' });
    const totalDealers = await Dealer.countDocuments();

    const usersLoggedIn = Math.floor(Math.random() * 20) + 1;
    const repairAssets = totalAssets - availableAssets;

    res.json({
      overallAssets: totalAssets,
      availableAssets,
      repairAssets,
      usersLoggedIn,
      dealers: totalDealers
    });
  } catch (error) {
    res.status(500).json({ error: 'Error fetching overview' });
  }
});

// GET /recentActivity
router.get('/recentActivity', async (req, res) => {
  try {
    const assets = await Asset.find().sort({ createdAt: -1 }).limit(20);

    const activity = assets.map(asset => {
        console.log('Asset:', asset.assetName, 'Qty:', asset.quantity, 'Cost:', asset.costPerUnit);
      
        return {
          id: asset._id,
          company: 'SRM University',
          product: asset.assetName || 'N/A',
          quantity: asset.quantity ?? 0,
          brand: asset.assetModelId || 'N/A',
          rate: asset.costPerUnit ?? 0,
          total: (asset.quantity ?? 0) * (asset.costPerUnit ?? 0)
        };
      });


// // GET /recentActivity
// router.get('/recentActivity', async (req, res) => {
//     try {
//       const assets = await Asset.find().sort({ createdAt: -1 }).limit(10);
  
//       const activity = assets.map(asset => ({
//         id: asset._id,
//         company: 'SRM University', // hardcoded placeholder
//         product: asset.assetName || 'N/A',
//         quantity: asset.quantity ?? 0,
//         brand: asset.assetModelId || 'N/A',
//         rate: asset.costPerUnit ?? 0,
//         total: (asset.quantity ?? 0) * (asset.costPerUnit ?? 0)
//       }));
  
//       res.json(activity);
//     } catch (error) {
//       res.status(500).json({ error: 'Error fetching recent activity' });
//     }
//   });
  
//   module.exports = router;


      

    res.json(activity);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching recent activity' });
  }
});

module.exports = router;
