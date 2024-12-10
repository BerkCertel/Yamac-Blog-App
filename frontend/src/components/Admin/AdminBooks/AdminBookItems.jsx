import { useState } from "react";
import PropTypes from "prop-types";
import { FaTimes } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { adminDeleteBook } from "../../../redux/bookSlice";

function AdminBooksItem({ book }) {
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(adminDeleteBook(book?._id))
      .then(() => {
        window.location.reload();
        setShowDeleteModal(false);
      })
      .catch(() => {
        setShowDeleteModal(false);
      });
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-4 flex flex-col justify-between hover:shadow-2xl transition-shadow duration-500 relative border">
      <img
        src={book?.images || "https://via.placeholder.com/150"}
        alt={book?.name}
        className="w-full h-60 bg-center object-contain rounded-lg border p-1 mb-4"
      />
      <h2 className="text-lg font-semibold mb-2">{book?.name}</h2>
      <p className="text-sm text-gray-600 mb-2">
        <span className="font-bold">Kategori: </span> {book?.category}
      </p>
      <p
        className={`text-sm text-gray-600 mb-2 line-clamp-3  ${
          book?.description.length > 150 ? "line-clamp-3 " : ""
        }`}
      >
        <span className="font-bold">Açıklama: </span>
        {book?.description}
      </p>
      <p className="text-sm text-gray-600 mb-2">
        <span className="font-bold">Yorum Sayısı: </span>
        {book?.reviews?.length || 0}
      </p>
      <p className="text-sm text-gray-600 mb-2">
        <span className="font-bold">Yüklenme Tarihi: </span>
        {new Date(book?.createdAt).toLocaleDateString()}
      </p>
      <button
        onClick={() => setShowDeleteModal(true)}
        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
      >
        Sil
      </button>
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-80 relative shadow-lg">
            <button
              onClick={() => setShowDeleteModal(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
            >
              <FaTimes size={20} />
            </button>
            <h2 className="text-lg font-bold mb-4 text-center">
              Emin misiniz?
            </h2>
            <div className="flex justify-between">
              <button
                onClick={handleDelete}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition w-32"
              >
                Evet
              </button>
              <button
                onClick={() => setShowDeleteModal(false)}
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400 transition w-32"
              >
                Hayır
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

AdminBooksItem.propTypes = {
  book: PropTypes.object,
  edit: PropTypes.bool,
};

export default AdminBooksItem;
