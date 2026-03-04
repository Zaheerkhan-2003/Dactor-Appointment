const express = require("express");
const dotenv = require("dotenv");
//////dotenv config/////////////////////
dotenv.config();

const cors = require("cors");
const connectToDB = require("./config/connectToDB");

const app = express();
connectToDB();
const PORT = process.env.PORT || 8080;

///////////////// middlewares ////////////////
app.use(express.json());
app.use(cors());

// 1. ADD THIS: Root Route so the browser shows "Running"
app.get("/", (req, res) => {
  res.status(200).send("<h1>Backend Server is Running Successfully!</h1>");
});

///////// routes //////////////////////
app.use('/api/user/', require('./routes/userRoutes'));
app.use('/api/admin/', require('./routes/adminRoutes'));
app.use('/api/doctor', require('./routes/doctorRoutes'));

// 2. FIXED: Error handler must be AFTER routes
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: "Something went wrong", success: false });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});