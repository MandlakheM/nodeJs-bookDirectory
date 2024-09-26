const http = require("node:http");
const path = require("node:path");
const fs = require("node:fs/promises");

const booksFile = path.join(__dirname, "data.json");
const successHeaders = { "Content-Type": "application/json" };

async function getBooksFile() {
  try {
    const data = await fs.readFile(booksFile, "utf8");
    return JSON.parse(data);
  } catch (error) {
    console.log("Failed to fetch books data:", error);
    return [];
  }
}

async function writeBooksFile(data) {
  try {
    await fs.writeFile(booksFile, JSON.stringify(data, null, 2), "utf8");
    console.log("Books file updated successfully");
  } catch (error) {
    console.log("Failed to update the books file:", error);
  }
}

function validate(book) {
  return (
    book.bookTitle &&
    book.author &&
    book.publisher &&
    book.publishedDate &&
    book.isbn
  );
}

const server = http.createServer(async (req, res) => {
  if (req.url === "/" && req.method === "GET") {
    const booksList = await getBooksFile();
    res.writeHead(200, successHeaders);
    res.end(JSON.stringify(booksList));

  } else if (req.url === "/add_book" && req.method === "POST") {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk;
    });

    req.on("end", async () => {
      const newBook = JSON.parse(body); 

      if (!validate(newBook)) {
        res.writeHead(400, successHeaders);
        return res.end(
          JSON.stringify({ error: "All fields bookTitle, author, publisher, publishedDate, isbn must be populated" })
        );
      }

      const bookList = await getBooksFile();

      if (bookList.some((book) => book.isbn === newBook.isbn)) {
        res.writeHead(400, successHeaders);
        return res.end(JSON.stringify({ error: "Book with this ISBN already exists" }));
      }

      bookList.push(newBook); 
      await writeBooksFile(bookList);

      res.writeHead(201, successHeaders);
      res.end(JSON.stringify(newBook)); 
    });

  } else if (req.url.startsWith("/delete_book/") && req.method === "DELETE") {
    const isbn = req.url.split("/")[2];

    const bookList = await getBooksFile();
    const filteredBooks = bookList.filter((book) => book.isbn !== isbn);

    if (filteredBooks.length === bookList.length) {
      res.writeHead(404, successHeaders);
      return res.end(JSON.stringify({ error: "Book not found" }));
    }

    await writeBooksFile(filteredBooks);
    res.writeHead(200, successHeaders);
    res.end(JSON.stringify({ message: "Book deleted successfully" }));

  } else if (req.url.startsWith("/update_book/") && req.method === "PUT") {
    const isbn = req.url.split("/")[2];
    let body = "";

    req.on("data", (chunk) => {
      body += chunk;
    });

    req.on("end", async () => {
      const updatedBook = JSON.parse(body); 
      const bookList = await getBooksFile();
      const bookIndex = bookList.findIndex((book) => book.isbn === isbn);

      if (bookIndex === -1) {
        res.writeHead(404, successHeaders);
        return res.end(JSON.stringify({ error: "Book not found" }));
      }

      if (!validate(updatedBook)) {
        res.writeHead(400, successHeaders);
        return res.end(
          JSON.stringify({ error: "All fields bookTitle, author, publisher, publishedDate, isbn must be populated" })
        );
      }

      bookList[bookIndex] = updatedBook;
      await writeBooksFile(bookList);

      res.writeHead(200, successHeaders);
      res.end(JSON.stringify(updatedBook));
    });

  } else {
    res.writeHead(404, successHeaders);
    res.end(JSON.stringify({ error: "Route not found" }));
  }
});

server.listen(5001, () => {
  console.log("Server running on port 5001");
});
