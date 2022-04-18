const getProduct = async function () {
  let response = await fetch("http://localhost:3000/books");
  let books = await response.json();

  let template = `
            <table>
                <tr>
                    <th>ID</th>
                    <th>Title</th>
                    <th>ISBN</th>
                    <th>Published Date</th>
                    <th>Author</th>
                    <th></th>
                </tr> 
        `;
  books.forEach((item) => {
    template += `
            <tr>
                <td class="id">${item.id}</td>
                <td>${item.title}</td>
                <td>${item.ISBN}</td>
                <td>${item.publishedDate}</td>
                <td>${item.author}</td>
                <td style="width:250px;">
                  <button class="update" onclick="update(${item.id})">Update</button>
                  <button class="delete" onclick="deleteBook(${item.id})">Delete</button>
                </td>
            </tr>
            `;
  });
  template += "</table>";
  document.getElementById("books").innerHTML = template;
};
getProduct();
document.getElementById("addBookBtn").onclick = async function (evt) {
  evt.preventDefault();

  const book = {
    title: document.getElementById("title").value,
    isbn: document.getElementById("isbn").value,
    date: document.getElementById("date").value,
    author: document.getElementById("author").value,
  };
  let route = "http://localhost:3000/books";
  let method = "POST";
  if (document.getElementById("bid")) {
    book.id = document.getElementById("bid").value;
    method = "PUT";
    route += "/" + book.id;
  }

  const response = await fetch(route, {
    method: method,
    body: JSON.stringify(book),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const result = await response.json();
  getProduct();
  document.getElementById("addBookBtn").innerHTML = "Add New Book";
  document.getElementById("bookForm").reset();
};

async function update(id) {
  let response = await fetch("http://localhost:3000/books/" + id);
  let book = await response.json();
  document.getElementById("title").value = book.title;
  document.getElementById("isbn").value = book.ISBN;
  document.getElementById("date").value = book.publishedDate;
  document.getElementById("author").value = book.author;
  window.scrollTo(0, 0);
  document.getElementById("title").focus();
  let input = document.createElement("input");
  input.type = "hidden";
  input.value = id;
  input.id = "bid";
  document.getElementById("addBookBtn").innerHTML = "Update Book";
  document.getElementById("bookForm").append(input);
}
async function deleteBook(id) {
  const response = await fetch("http://localhost:3000/books/" + id, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
  getProduct();
}
