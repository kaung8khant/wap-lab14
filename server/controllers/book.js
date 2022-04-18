const Book = require("../models/book");

const getBooks = (req, res, next) => {
  res.status(200).json(Book.fetchAll());
};

const getBookByID = (req, res, next) => {
  res.status(200).json(Book.findByID(req.params.id));
};

const save = (req, res, next) => {
  const body = req.body;
  res
    .status(201)
    .json(new Book(body.title, body.isbn, body.date, body.author).save());
};

const update = (req, res, next) => {
  const body = req.body;
  res
    .status(200)
    .json(
      new Book(
        body.title,
        body.isbn,
        body.date,
        body.author,
        req.params.id
      ).update(req.params.id)
    );
};

const deleteByID = (req, res, next) => {
  Book.delete(req.params.id);
  res.status(200).json({ message: "Success" });
};

module.exports = {
  getBookByID,
  getBooks,
  save,
  update,
  deleteByID,
};
