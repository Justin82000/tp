import express from "express";
import path from "path";
import { connectDB } from "./config/server";
import dataRoutes from "./routes/route";

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(express.json());
app.use(express.static("src/public"));

// Routes
app.use("/", dataRoutes);

app.get("/list", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "list.html"));
});

// Démarrage du serveur après connexion à la DB
connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`App listening on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Erreur de connexion à la base de données :", err);
    process.exit(1);
  });
