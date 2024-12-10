import PropTypes from "prop-types";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addReview } from "../../redux/bookSlice";
import { toast } from "react-toastify";

function BookCommentForm({ bookId }) {
  const [comment, setComment] = useState("");
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);

  const token = localStorage.getItem("token");
  const userId = user?.user?._id;

  const isButtonDisabled = !token && user?.user;

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!comment) {
      toast.error("Yorum boş bırakılamaz.");
      return;
    }

    if (!isButtonDisabled) {
      toast.error("Önce Giriş Yapın.");
      return;
    }

    if (!token) {
      toast.error("Yorum eklemek için giriş yapmalısınız.");
      return;
    }

    const reviewData = { bookId, comment, userId };
    dispatch(addReview(reviewData));
    window.location.reload();
    setComment("");
  };

  return (
    <div className="mt-12">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center lg:text-left">
        Yorum Ekleyin
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <textarea
            placeholder="Yorumunuzu yazın..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="w-full h-32 p-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-300 resize-none"
          ></textarea>
        </div>
        <div className="text-center">
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded-lg shadow hover:bg-blue-700 transition"
            disabled={isButtonDisabled}
          >
            Yorum Ekle
          </button>
          {isButtonDisabled && (
            <p className="text-red-500 text-sm mt-2">
              Yorum eklemek için giriş yapmanız gerekiyor.
            </p>
          )}
        </div>
      </form>
    </div>
  );
}

BookCommentForm.propTypes = {
  bookId: PropTypes.string,
};

export default BookCommentForm;
