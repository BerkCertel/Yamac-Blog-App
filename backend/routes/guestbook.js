const express = require("express");
const {
  allGuestReview,
  createReviews,
  AdminDeleteReview,
} = require("../controllers/guestbook.js");
const { authenticationMid, roleChecked } = require("../middleware/auth.js");

const router = express.Router();

router.get("/guestreviews", allGuestReview);

router.post("/guestreview/newReview", authenticationMid, createReviews);

router.delete(
  "/guestreview/:reviewId",
  authenticationMid,
  roleChecked("admin"),
  AdminDeleteReview
);

module.exports = router;
