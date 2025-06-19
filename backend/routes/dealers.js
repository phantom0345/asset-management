const express = require("express");
const Dealer = require("../models/Dealers.js");

const router = express.Router();

// ➤ Add a new dealer (uses schema directly)
router.post("/add", async (req, res) => {
  try {
    console.log("Received dealer data:", req.body);

    const newDealer = await Dealer.create(req.body);

    console.log("Dealer saved successfully:", newDealer);
    res.status(201).json({ message: "✅ Dealer added successfully!", dealer: newDealer });
  } catch (error) {
    console.error("Error adding dealer:", error.message);
    console.error(error.stack);
    res.status(500).json({ error: "❌ Failed to add dealer", details: error.message });
  }
});

// ➤ Fetch all dealers
router.get("/", async (req, res) => {
  try {
    const dealers = await Dealer.find();
    res.status(200).json(dealers);
  } catch (error) {
    console.error("Error fetching dealers:", error);
    res.status(500).json({ error: "❌ Failed to fetch dealers" });
  }
});

module.exports = router;
