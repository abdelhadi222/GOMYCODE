const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

// import routes

const categorieRoutes = require("./routes/categorieRoutes");
const pokemonRoutes = require("./routes/pokemonRoutes");

// create an express app
const app = express();

app.use(cors({
  origin: "http://localhost:5173",
}))

// middlewares
app.use(express.json());

// routes
app.use("/api/categories", categorieRoutes);
app.use("/api/pokemons", pokemonRoutes);

//  connecting to database
const dbURL = process.env.URLDB;
mongoose
  .connect(dbURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((result) => {
    console.log("Connected to database");

    // listin to requests
    app.listen(process.env.PORT || 3000, () => {
      console.log(`listining to requests on port ${process.env.PORT || 3000}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });