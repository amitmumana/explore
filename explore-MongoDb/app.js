const express = require("express");
const { connectToDb, getDb } = require("./db");
const { ObjectId } = require("mongodb");

// init app & middleware
const app = express();
app.use(express.json());

/**
 *  db connection
 */
let db;
connectToDb((err) => {
  if (!err) {
    app.listen(8080, () => {
      console.log("app listening on port 8080 ");
    });
    db = getDb();
  }
});

//
// routes
//

/**
 * Get all books and pagination
 */

app.get("/books", (req, res) => {
  // cursor toArray forEach

  const page = req.query.page || 0;
  const booksPerSize = 2;

  let books = [];
  db.collection("books")
    .find()
    .sort({ author: 1 })
    .skip(page * booksPerSize)
    .limit(booksPerSize)
    .forEach((book) => books.push(book))
    .then(() => {
      res.status(200).json(books);
    })
    .catch(() => {
      res.status(500).json({ error: "cloud not fetch the document" });
    });
});

/**
 * Get book by id
 */

app.get("/books/:id", (req, res) => {
  // is valid for id validation
  if (ObjectId.isValid(req.params.id)) {
    db.collection("books")
      .findOne({ _id: new ObjectId(req.params.id) })
      .then((doc) => {
        console.log("document log", doc);
        res.status(200).json(doc);
      })
      .catch((error) => {
        res.status(500).json({ error: "Could not fetch the document" });
      });
  } else {
    res.json({ msg: "Book id dose not match" });
  }
});

/**
 * Add Book
 * */

app.post("/books", (req, res) => {
  const book = req.body;

  db.collection("books")
    .insertOne(book)
    .then((result) => {
      res.status(201).json({ message: "Document added successfully", documentId: result.insertedId });
    })
    .catch((err) => {
      res.status(500).json({ err: "could not create a book" });
    });
});

/**
 * Delete Book
 */

app.delete("/books/:id", (req, res) => {
  // is valid for id validation
  if (ObjectId.isValid(req.params.id)) {
    db.collection("books")
      .deleteOne({ _id: new ObjectId(req.params.id) })
      .then((result) => {
        res.status(200).json({ msg: "book deleted successfully" });
      })
      .catch((error) => {
        res.status(500).json({ error: "Could not delete the document" });
      });
  } else {
    res.json({ msg: "Book id dose not match" });
  }
});

/**
 *  update book
 */

app.patch("/books/:id", (req, res) => {
  const update = req.body;

  if (ObjectId.isValid(req.params.id)) {
    db.collection("books")
      .updateOne({ _id: new ObjectId(req.params.id) }, { $set: update })
      .then((result) => {
        res.status(200).json({ msg: "book updated successfully" });
      })
      .catch((error) => {
        res.status(500).json({ error: "Could not update the document" });
      });
  } else {
    res.json({ msg: "Book id dose not match" });
  }
});
