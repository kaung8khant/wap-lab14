let books = [];

class Book {
  constructor(title, isbn, date, author, id = null) {
    this.id = id;
    this.title = title;
    this.ISBN = isbn;
    this.publishedDate = date;
    this.author = author;
  }

  save() {
    this.id = Math.random().toString();
    books.push(this);
    return this;
  }

  update(pID) {
    const index = books.findIndex((item) => item.id === pID);
    if (index < 0) throw new Error("Not Found");

    books[index] = this;
    return this;
  }

  static fetchAll() {
    return books;
  }

  static findByID(pID) {
    const index = books.findIndex((item) => item.id === pID);
    if (index < 0) throw new Error({ message: "Not Found" });
    return books[index];
  }

  static delete(pID) {
    const index = books.findIndex((item) => item.id === pID);
    if (index < 0) throw new Error("Not Found");
    books = books.filter((item) => item.id !== pID);
  }

  static getIndexByID(pID) {
    const index = books.findIndex((item) => item.id === pID);
    if (index < 0) throw new Error("Not Found");
    return index;
  }
}

module.exports = Book;
