import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

function BooksSliderItem({ book }) {
  const navigate = useNavigate();

  const handleNavigation = () => {
    navigate(`/book/${book?._id}`);
    window.scrollTo(0, 0);
  };

  return (
    <div
      onClick={handleNavigation}
      className="flex flex-col items-center justify-center space-y-4 max-w-xs mx-auto border rounded-lg shadow-md cursor-pointer transition duration-300 ease-in-out w-full sm:w-64 h-64 md:h-72 hover:shadow-2xl mt-3 md:mt-5 mb-6 md:mb-10 "
    >
      <img
        className="w-28 h-28 md:w-36 md:h-36 rounded-lg shadow-lg transition duration-300 ease-in-out"
        src={`${book?.images}`}
        alt={`Gallery image ${book?.id}`}
      />
      <div className="w-full text-center">
        <hr className="w-3/4 mx-auto mt-2 mb-2 border-gray-300" />
        <p className="font-cinzel font-semibold text-sm md:text-md text-gray-800 uppercase">
          {book?.name}
        </p>
      </div>
    </div>
  );
}

BooksSliderItem.propTypes = {
  book: PropTypes.object.isRequired,
};

export default BooksSliderItem;
