const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());

app.get("/", (req, res) => {
  res.send("Backend is working 🚀");
});

app.get("/api/message", (req, res) => {
  res.json({ message: "Hello from Backend 👋" });
});

app.listen(5000, () => {
  console.log("Backend running on port 5000");
});
