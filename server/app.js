const express = require("express");

const bookRouter = require("./routes/book");

const cors = require("cors");
const app = express();

//middleware
app.use(cors());
app.use(express.json());

//routes
app.use("/books", bookRouter);

//Error Handler
app.use((req, res, next) => {
  res.status(404).json({ error: req.url + " API not supported" });
});

app.use((err, req, res, next) => {
  if (err.message === "NOT FOUND") {
    res.status(404).json({ error: err.message });
  } else {
    res.status(500).json({ error: "Server error!" });
  }
});

app.listen(3000, () => console.log("running on 3000..."));
