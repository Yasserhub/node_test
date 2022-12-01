import express from "express";
import bodyParser from "body-parser";

import moviesRoutes from "./routes/movies.js";

const app = express();
app.use(express.json());
app.use(bodyParser.json());

const PORT = 3000;

app.use("/movies", moviesRoutes);
app.get("/", (req, res) => res.send("Welcome to the Movies API!"));
app.all("*", (req, res) =>
  res.send("You've tried reaching a route that doesn't exist.")
);

app.listen(PORT, () =>
  console.log(`Server running on port: http://localhost:${PORT}`)
);

