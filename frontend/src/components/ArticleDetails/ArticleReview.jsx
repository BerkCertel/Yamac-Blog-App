import PropTypes from "prop-types";
import { useState } from "react";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { deleteReview } from "../../redux/articleSlice";
import { FaCheck } from "react-icons/fa6";
import { FaTimes } from "react-icons/fa";

function BookReview({ reviews, articleId, createdAt }) {
  const [confirmDeleteIndex, setConfirmDeleteIndex] = useState(null);
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.user);

  const handleDelete = async (index, reviewId) => {
    try {
      await dispatch(deleteReview({ articleId, reviewId })).unwrap();
      setConfirmDeleteIndex(null);
    } catch (error) {
      console.error("Silme hatası:", error);
    }
  };

  const cancelDelete = () => {
    setConfirmDeleteIndex(null);
  };

  const formatDate = (date) => {
    const formattedDate = new Date(date);
    return formattedDate.toLocaleDateString("tr-TR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  return (
    <div className="mt-12">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center lg:text-left uppercase">
        İncelemeler
      </h2>

      <div className="space-y-6">
        {reviews?.length > 0 ? (
          reviews.map((review, index) => (
            <div
              key={review._id}
              className={`p-5 relative border rounded-lg shadow-md bg-white ${
                confirmDeleteIndex === index ? "bg-opacity-80" : ""
              }`}
            >
              {user?.user?.role === "admin" && (
                <>
                  <button
                    className="absolute right-2 bottom-2 bg-red-600 text-white p-1 rounded hover:bg-red-700"
                    onClick={() => setConfirmDeleteIndex(index)}
                  >
                    <IoIosCloseCircleOutline size={20} />
                  </button>

                  {confirmDeleteIndex === index && (
                    <div className="absolute inset-0 bg-black bg-opacity-60 flex flex-col justify-center items-center space-y-4 rounded-lg">
                      <p className="text-white text-lg font-semibold">
                        Emin misiniz?
                      </p>
                      <div className="flex space-x-4 justify-center items-center">
                        <button
                          className=" w-9 h-9 bg-green-600 text-white rounded hover:bg-green-700 flex items-center justify-center z-40"
                          onClick={() => handleDelete(index, review._id)}
                        >
                          <FaCheck />
                        </button>
                        <button
                          className=" w-9 h-9 bg-gray-500 text-white rounded hover:bg-gray-600 flex items-center justify-center z-40"
                          onClick={cancelDelete}
                        >
                          <FaTimes />
                        </button>
                      </div>
                    </div>
                  )}
                </>
              )}

              <div
                className={`transition-all duration-200 ${
                  confirmDeleteIndex === index ? "blur-sm" : ""
                }`}
              >
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold text-gray-800">
                    {review.name}
                  </h3>
                  <p className="text-sm text-gray-500">
                    Oluşturma Tarihi: {formatDate(createdAt)}
                  </p>
                </div>
                <p className="text-gray-600 mt-2">{review.comment}</p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-600 text-center">
            Henüz inceleme bulunmamaktadır.
          </p>
        )}
      </div>
    </div>
  );
}

BookReview.propTypes = {
  reviews: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      comment: PropTypes.string.isRequired,
    })
  ),
  createdAt: PropTypes.string,
  articleId: PropTypes.string.isRequired,
};

export default BookReview;
