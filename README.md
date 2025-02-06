## Book Directory 
A simple Node.js API to manage a directory of books. This API allows users to retrieve, add, update, and delete books using HTTP methods such as GET, POST, PUT, and DELETE. Data is stored in a JSON file.

## Features
GET: Retrieve a list of all books or a specific book by its ISBN.

POST: Add a new book to the directory.

PUT: Update details of an existing book.

DELETE: Remove a book from the directory by ISBN.

Basic validation is implemented to ensure that all book fields are properly populated.
Book Fields
Each book entry in the directory contains the following fields:

bookTitle: The title of the book (string, required)

author: The name of the author (string, required)

publisher: The name of the publishing company (string, required)

publishedDate: The date the book was published (string, required)

isbn: The unique International Standard Book Number (number, required)

## Requirements
Node.js (v16 or higher)

## Installation

```bash

# Clone the repository

git clone https://github.com/MandlakheM/nodeJs-bookDirectory.git

# Navigate to the project directory

cd projectname

# Install dependencies

npm install

# node index.js
```

## How to Use

Use post man.

1. Get All Books

Endpoint: GET /

Response: Returns a list of all books in JSON format.

Example Request: http://localhost:5001




2. Add a New Book

Endpoint: POST /add_book

Request Body: JSON object with book details (bookTitle, author, publisher, publishedDate, isbn).

Response: Returns the newly added book.

Example Request: http://localhost:5001/add_book

{"bookTitle": "Node.js Basics", "author": "John Doe", "publisher": "Tech Press", "publishedDate": "2023-01-01", "isbn": "1234567890"}



3. Update a Book

Endpoint: PUT /update_book/:isbn

Request Body: JSON object with updated book details.

Response: Returns the updated book.

Example Request: http://localhost:5001/update_book/1234567890 

{"bookTitle": "Updated Node.js Basics", "author": "John Doe", "publisher": "Tech Press", "publishedDate": "2023-02-01", "isbn": "1234567890"}



4. Delete a Book

Endpoint: DELETE /delete_book/:isbn

Response: Returns a confirmation message.

Example Request: http://localhost:5001/delete_book/1234567890
