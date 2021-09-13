const express = require("express");

const app = express;

const bookRoute = express.Router();

let book = require("../model/Book");

// Add Book
bookRoute.route("/add-book").post((req, res, next) => {
  Book.create(req.body, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data);
    }
  });
});

// Gel All Books
bookRoute.route("/").get((req, res) => {
  Book.find((error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data);
    }
  });
});

// Get Book
bookRoute.route("/read-book/:id").get((req, res) => {
  Book.findById(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data);
    }
  });
});

// Update a book
bookRoute.route("/update-book/:id").put((req, res, next) => {
  Book.findByIdAndUpdate(
    req.params.id,
    {
      $set: req.body,
    },
    (error, data) => {
      if (error) {
        console.log(error);
        return next(error);
      } else {
        res.json(data);
        console.log("Book updated successfully");
      }
    }
  );
});

// Delete a book
bookRoute.route("/delete-book/:id").delete((req, res, next) => {
  Book.findByIdAndRemove(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.status(200).json({
        msg: data,
      });
    }
  });
});

module.exports = bookRoute;
