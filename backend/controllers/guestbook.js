const Guest = require("../models/guestbook"); // Misafir defteri modelini içe aktar

// Tüm Yorumları Al
const allGuestReview = async (req, res) => {
  try {
    const guestbook = await Guest.find({})
      .populate("user", "name")
      .sort({ createdAt: -1 });
    res.status(200).json({ guestbook });
  } catch (error) {
    console.error("Yorumlar alınırken hata oluştu:", error);
    res.status(500).json({ message: "Sunucu hatası" });
  }
};

// Yorum Oluştur
const createReviews = async (req, res) => {
  const { comment } = req.body;

  if (!comment) {
    return res.status(400).json({ message: "Yorum boş bırakılamaz." });
  }

  try {
    const newReview = new Guest({
      user: req.user._id,
      name: req.user.name,
      comment: comment,
    });

    await newReview.save();

    return res.status(200).json({ message: "Yorum başarıyla eklendi!" });
  } catch (error) {
    console.error("Yorum eklerken hata oluştu:", error);
    return res.status(500).json({ message: "Bir hata oluştu." });
  }
};

// Admin Yorum Silme
const AdminDeleteReview = async (req, res) => {
  try {
    const guestbook = await Guest.findByIdAndDelete(req.params.reviewId);

    if (!guestbook) {
      return res.status(404).json({ message: "Yorum bulunamadı." });
    }

    return res.status(200).json({ message: "Yorum başarıyla silindi." });
  } catch (error) {
    console.error("Yorum silinirken hata oluştu:", error);
    return res.status(500).json({ message: "Server hatası." });
  }
};

module.exports = {
  allGuestReview,
  createReviews,
  AdminDeleteReview,
};
