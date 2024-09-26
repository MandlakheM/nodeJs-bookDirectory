const http = require("node:http");
const path = require("node:path");
const fs = require("node:fs/promises");

const booksFile = path.join(__dirname, "data.json");
const successHeaders = { "content-Type": "applocation/json" };

async function getBooksFile() {
  try {
    const data = await fs.readFile(booksFile, "utf8");
    return JSON.parse(data);
  } catch (error) {
    console.log("failed to fetch books data:", error);
    return [];
  }
}

async function writeBooksFile(data) {
  try {
    fs.writeFile(booksFile, JSON.stringify(data, null, 2), "utf8");
    console.log("new book added successfully");
  } catch (error) {
    console.log("failed to add new book:", error);
    return [];
  }
}

function validate(book) {
  if (
    !book.bookTitle ||
    !book.author ||
    !book.publisher ||
    !book.publishedDate ||
    !book.isbn
  ) {
    return false;
  }
  return true;
}

const server = http.createServer(async (req, res) => {
  if (req.url === "/" && req.method === "GET") {
    res.writeHead(200, successHeaders);
    res.end(console.log("current books"));
  } else if (req.url === "/add_book" && req.method === "POST") {
    res.writeHead(200, successHeaders);
    res.end(console.log("add new book"));
  } else if (req.url.startsWith === "/delete_book/" && req.method === "DELETE") {
    res.writeHead(200, successHeaders);
    res.end(console.log("delete  book"));
  } else if (req.url.startsWith === "/update_book/" && req.method === "PUT") {
    res.writeHead(200, successHeaders);
    res.end(console.log("update book"));
  } else {
    res.writeHead(404, successHeaders);
    res.end(JSON.stringify({ error: "Route not found" }));
  }
});

server.listen(5001, () => {
  console.log("server running on port 5001");
});
