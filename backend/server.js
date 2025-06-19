require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const assetRoutes = require("./routes/assets.js");
const dealerRoutes = require("./routes/dealers.js");
const assetServiceRoutes = require("./routes/assetservice.js");
const combinedRoutes = require("./routes/Service.js");
const wareRoutes = require("./routes/ware.js");
//const assetRoutes = require("./routes/UpcomingAsset");
// ✅ Correct import
const upcomingRoutes = require("./routes/upcoming.js");
const dashboardRoutes = require("./routes/dashboard");
const contactRoutes = require("./routes/contact");


const app = express();

//app.use("/contact", contactRoutes);

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(cors({
  origin: "http://localhost:5173", // Your React frontend origin
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

// ✅ Register Routes
app.use("/api/assets", assetRoutes);
app.use("/api/dealers", dealerRoutes);
app.use("/api/assetservice", assetServiceRoutes);
app.use("/api", combinedRoutes);
// app.use("/upcomingAssets", require("./routes/upcoming.js"));
app.use("/upcomingassets", upcomingRoutes); // Handling upcoming assets
app.use("/warehouse", wareRoutes); // Handling warehouse assets
app.use("/", dashboardRoutes);
//app.use("/contacts", contactRoutes);
app.use("/contacts", contactRoutes); // ✅ This makes it POST "/contacts"

const PORT = process.env.PORT || 5000;

// ✅ Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    dbName: "Asset",
    useNewUrlParser: true, 
    useUnifiedTopology: true, 
  })
  .then(() => {
    console.log("✅ MongoDB Connected");
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error("❌ DB Connection Error:", err.message);
    process.exit(1);
  });

// ✅ Global Error Handling Middleware
app.use((err, req, res, next) => {
  console.error("❌ Server Error:", err.message);
  res.status(500).json({ error: "❌ Internal Server Error", details: err.message });
});
