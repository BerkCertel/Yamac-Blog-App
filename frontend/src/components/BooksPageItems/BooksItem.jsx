import PropTypes from "prop-types";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function BooksItem({ book }) {
  const navigate = useNavigate();

  const handleNavigation = () => {
    navigate(`/book/${book?._id}`);
    window.scrollTo(0, 0);
  };

  const [lineClamp, setLineClamp] = useState(true);

  return (
    <div className="w-full border p-5 mt-5 shadow-lg rounded-lg hover:shadow-xl transition-all duration-300 ease-in-out ">
      <div className="flex flex-col justify-center items-center md:items-start md:flex-row md:space-x-6 space-y-5 md:space-y-0">
        <img
          className="h-64 md:h-80 w-full max-w-[300px] md:w-96 object-cover rounded-lg shadow-lg border p-1"
          src={`${book?.images}`}
          alt={book?.name || "Book image"}
        />
        <div className="flex flex-col h-full w-full">
          <div className="flex flex-col space-y-3 items-start justify-center">
            <h2 className="text-left md:text-left w-full text-2xl md:text-3xl font-semibold text-gray-800">
              {book?.name}
            </h2>
            <hr className="w-1/2 border-t border-mycolor4" />
          </div>

          <p
            className={`text-start text-sm md:text-base mt-2 text-gray-600 font-roboto 
              ${
                lineClamp && book?.description.length > 500
                  ? "line-clamp-3"
                  : ""
              }`}
          >
            {book?.description}
          </p>

          {book?.description.length > 500 && (
            <div
              className="text-blue-500 hover:text-blue-700 mt-3 cursor-pointer text-start hover:underline"
              onClick={() => setLineClamp(!lineClamp)}
            >
              {lineClamp ? "Devamını Oku" : "Yazıyı Küçült"}
            </div>
          )}

          <div className="mt-3 text-md text-gray-500 text-end font-semibold">
            Kategori:
            <span className="text-gray-500"> {book?.category}</span>
          </div>

          <div className="mt-4 text-center md:text-right">
            <button
              onClick={handleNavigation}
              className="bg-mycolor4 text-white px-5 py-3  rounded-md shadow-md hover:bg-mycolor5 transition duration-300 transform hover:scale-105"
            >
              İncelemek İçin Tıklayın
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

BooksItem.propTypes = {
  book: PropTypes.object.isRequired,
};

export default BooksItem;
