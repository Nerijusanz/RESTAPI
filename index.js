import express from "express";
import path from "path";
import dotenv from "dotenv";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import bluebirdPromise from "bluebird"; // overwrite default mongoose promise into bluebird promise

import users from "./routes/users";

dotenv.config(); // INITIALIZE .env PARAMS

const app = express();

// -------------MongoDB setups-------------
mongoose.Promise = bluebirdPromise; //mongoose Promise deprecated; add bluebird promise library
mongoose
  .connect(
    process.env.MONGODB_URL,
    { useNewUrlParser: true }
  )
  .then(() => console.log("MongoDB Connected successfully"))
  .catch(err => console.log(err));
mongoose.set("useCreateIndex", true);

// -----------------------------------------

// ----------------bodyParser middleware ---------------
app.use(bodyParser.json());

// ----------------Routers midleware------------------

app.use("/api/users", users);

// --------------------------------------------------------

if (process.env.NODE_ENV === "production") {
  // set static path to react production build folder
  // app.use(express.static('./build'));

  app.get("/*", (req, res) => {
    // load react  build index file
    res.sendFile(path.join(__dirname, "build", "index.html"));
  });
} else {
  app.get("/*", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
  });
}

// ---------------------------------------------------------

const PORT = process.env.LISTEN_PORT || 5000;

app.listen(PORT, () => console.log(`server running on localhost:${PORT}`));
