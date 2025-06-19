const express = require("express");
const router = express.Router();
const { createContact } = require("../services/contactService");

router.post("/", async (req, res) => {
  try {
    const { name, email, address, helpRequest } = req.body;
    
    // Call the service function with the extracted data
    const result = await createContact(name, email, address, helpRequest);
    
    if (result.success) {
      return res.status(201).json({ message: result.message });
    } else {
      return res.status(500).json({ error: result.error });
    }
  } catch (error) {
    console.error("Contact route error:", error);
    return res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;