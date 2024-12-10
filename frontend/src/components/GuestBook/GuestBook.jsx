import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  addReview,
  deleteReview,
  getAllReviews,
} from "../../redux/guestbookSlice";
import { toast } from "react-toastify";
import { FaRegTimesCircle, FaCheck, FaTimes } from "react-icons/fa";

function GuestBook() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { guestbook } = useSelector((state) => state.guestbook);
  const { user } = useSelector((state) => state.user);
  const token = localStorage.getItem("token");
  const [comment, setComment] = useState("");
  const [confirmDeleteIndex, setConfirmDeleteIndex] = useState(null);

  const isAuthenticated = user?.user && token;
  const isAdmin = user?.user?.role === "admin";

  const handleAuth = () => {
    navigate("/auth");
  };

  const handleAddReview = () => {
    if (!comment.trim()) {
      toast.error("Lütfen yorum alanını doldurun.");
      return;
    }

    const reviewData = {
      comment,
      userId: user?.user._id,
      name: user?.user.name,
    };

    dispatch(addReview(reviewData)).then(() => {
      setComment("");
      window.location.reload();
    });
  };

  const handleDelete = async (index, reviewId) => {
    try {
      const reviewIdString = reviewId.toString();
      await dispatch(deleteReview(reviewIdString)).unwrap();
      setConfirmDeleteIndex(null);
      window.location.reload();
    } catch (error) {
      console.error("Silme hatası:", error);
    }
  };

  useEffect(() => {
    dispatch(getAllReviews());
  }, [dispatch]);

  const formatDate = (date) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(date).toLocaleDateString("tr-TR", options);
  };

  return (
    <main className="guestbook-main-div p-6 max-w-3xl mx-auto bg-gray-100 shadow-lg rounded-lg">
      <div className="h-72 flex items-center justify-center text-white text-3xl font-bold rounded-md mb-6 bg-cover bg-center shadow-lg bg-[url('https://res.cloudinary.com/dwykns8ak/image/upload/v1733009634/bg2_s3dbpx.jpg')]">
        <div className="bg-black bg-opacity-50 p-4 rounded">
          Hatıra Defteri: Bir Yorum Bırakın
        </div>
      </div>
      <textarea
        className="w-full p-4 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none shadow-sm"
        placeholder="Yorumunuzu buraya yazın..."
        rows="4"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        disabled={!isAuthenticated}
      />
      <button
        onClick={!isAuthenticated ? handleAuth : handleAddReview}
        className={`w-full py-2 px-4 text-white font-medium rounded-lg transition-colors duration-300 ${
          isAuthenticated
            ? "bg-blue-500 hover:bg-blue-600"
            : "bg-gray-400 hover:bg-gray-500"
        }`}
        disabled={!isAuthenticated}
      >
        {isAuthenticated ? "Yorum Ekle" : "Yorum yapmak için Giriş yapınız"}
      </button>
      <div className="mt-6">
        <h3 className="text-2xl font-semibold mb-4 text-gray-800">
          Kullanıcı Yorumları
        </h3>
        {guestbook?.guestbook && guestbook?.guestbook?.length > 0 ? (
          guestbook?.guestbook?.map((review, index) => (
            <div
              key={index}
              className="mb-4 p-6 border border-gray-300 rounded-lg bg-white shadow-lg hover:shadow-xl transition-shadow duration-300 relative"
            >
              <p className="text-gray-800 text-lg font-semibold mb-2">
                {review?.name}
              </p>
              <hr className="border-gray-300 my-1" />
              <span className="text-gray-600 text-base">
                {review?.comment || "Anonim"}
              </span>
              <p className="text-xs text-end text-gray-500 mt-2">
                {formatDate(review?.createdAt) || "Tarih bilinmiyor"}
              </p>

              {isAuthenticated && isAdmin && confirmDeleteIndex !== index && (
                <button
                  onClick={() => setConfirmDeleteIndex(index)}
                  className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                >
                  <FaRegTimesCircle size={20} />
                </button>
              )}

              {isAuthenticated && isAdmin && confirmDeleteIndex === index && (
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 z-40">
                  <div className="bg-white w-60 p-4 rounded-lg flex justify-around items-center shadow-lg">
                    <button
                      onClick={() => handleDelete(index, review._id)}
                      className="text-green-500 w-16 h-16 hover:text-green-700 flex justify-center items-center border-2 border-green-500 rounded-full transition-all duration-300 transform hover:scale-105"
                    >
                      <FaCheck className="text-xl" />
                    </button>
                    <button
                      onClick={() => setConfirmDeleteIndex(null)}
                      className="text-red-500 w-16 h-16 hover:text-red-700 flex justify-center items-center border-2 border-red-500 rounded-full transition-all duration-300 transform hover:scale-105"
                    >
                      <FaTimes className="text-xl" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))
        ) : (
          <p className="text-gray-500">Henüz yorum yapılmamış.</p>
        )}
      </div>
    </main>
  );
}

export default GuestBook;
