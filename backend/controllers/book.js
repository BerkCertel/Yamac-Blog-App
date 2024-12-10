const Book = require("../models/book.js");

const allBooks = async (req, res) => {
  try {
    const books = await Book.find({});
    res.status(200).json({ books });
  } catch (error) {
    console.error("Error fetching books:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

const detaislBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    res.status(200).json({ book });
  } catch (error) {
    console.error("Error fetching books:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

// Admin all
const adminBooks = async (req, res, next) => {
  try {
    const books = await Book.find({});
    res.status(200).json({ books });
  } catch (error) {
    console.error("Error fetching books:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

// Admin Create
const createBook = async (req, res) => {
  try {
    const bookData = req.body;

    const book = await Book.create(bookData);
    res.status(201).json({ book });
  } catch (error) {
    console.error("Error fetching books:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

// Admin Delete
const deleteBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);

    if (!book) {
      return res.status(404).json({ message: "Kitap bulunamadı." });
    }

    await Book.findByIdAndDelete(req.params.id);

    res.status(200).json({ message: "The book has been deleted successfully" });
  } catch (error) {
    console.error("Error fetching books:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

// Admin Update
const updateBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);

    book = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });

    res.status(200).json({ message: "The book has been deleted successfully" });
  } catch (error) {
    console.error("Error fetching books:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

// Reviews Create
const createReviews = async (req, res, next) => {
  const { bookId, comment } = req.body;

  if (!comment) {
    return res.status(400).json({ message: "Yorum boş bırakılamaz." });
  }

  try {
    const book = await Book.findById(bookId);

    if (!book) {
      return res.status(404).json({ message: "Kitap bulunamadı." });
    }

    const newReview = {
      user: req.user._id,
      name: req.user.name,
      comment,
    };

    book.reviews.push(newReview);

    await book.save();

    return res.status(200).json({ message: "Yorum başarıyla eklendi!" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Bir hata oluştu." });
  }
};

//Delete Review
const AdminDeleteReview = async (req, res) => {
  try {
    const book = await Book.findById(req.params.bookId);

    if (!book) {
      return res.status(404).json({ message: "Kitap bulunamadı." });
    }

    const { reviewId } = req.params;

    const reviewIndex = book.reviews.findIndex(
      (review) => review._id.toString() === reviewId
    );

    if (reviewIndex === -1) {
      return res.status(404).json({ message: "Yorum bulunamadı." });
    }

    book.reviews.splice(reviewIndex, 1);

    await book.save();

    res.status(200).json({ message: "Yorum başarıyla silindi." });
  } catch (error) {
    console.error("Yorum silinirken hata oluştu:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = {
  allBooks,
  detaislBook,
  createBook,
  deleteBook,
  updateBook,
  createReviews,
  adminBooks,
  AdminDeleteReview,
};
