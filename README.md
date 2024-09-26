## Book Directory API
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
