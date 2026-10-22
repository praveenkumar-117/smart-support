const dotenv = require("dotenv");
dotenv.config({ quiet: true });
const express = require("express");
const cors = require("cors");
const app = express();
const connectDB = require("./config/db.js");
const authRoutes = require("./routes/authRoutes");
const ticketRoutes = require("./routes/ticketRoutes.js");
const userroutes = require("./routes/userRoutes.js");
const knowledgeRoutes = require("./routes/knowledgeRoutes.js");
const categoryRoutes = require("./routes/categoryRoutes");
const announcementRoutes = require("./routes/announcementRoutes");
const seedCategories = require("./utils/seedCategories");

const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/ticket", ticketRoutes);
app.use("/api/user", userroutes);
app.use("/api/knowledge", knowledgeRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/announcements", announcementRoutes);

const startServer = async () => {
  try {
    await connectDB();
    await seedCategories();

    app.listen(PORT, () => {
      console.log(`Server is running at localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Backend startup failed:", error.message);
    process.exit(1);
  }
};

startServer();