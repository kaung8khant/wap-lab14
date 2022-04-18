const express = require("express");
const BookController = require("../controllers/book");

const router = express.Router();

router.get("/", BookController.getBooks);

router.get("/:id", BookController.getBookByID);

router.post("/", BookController.save);

router.put("/:id", BookController.update);

router.delete("/:id", BookController.deleteByID);

module.exports = router;
