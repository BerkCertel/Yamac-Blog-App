import { useEffect, useState } from "react";
import BookReview from "./BookReview";
import BookCommentForm from "./BookCommentForm";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getBookDetail } from "../../redux/bookSlice";

function BookDetails() {
  const { id } = useParams();

  const dispatch = useDispatch();
  const { book } = useSelector((state) => state.books);

  useEffect(() => {
    if (id) {
      dispatch(getBookDetail(id));
    }
  }, [dispatch, id]);

  const [lineClamp, setLineClamp] = useState(true);

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 border rounded-lg shadow">
      <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8 border rounded-lg">
        <div className="w-full lg:w-1/3 flex items-center justify-center p-2">
          <img
            src={book?.book?.images}
            alt={book?.book?.name}
            className="w-full max-w-[400px] h-full max-h-[450px] object-cover rounded-lg shadow border"
          />
        </div>

        <div className="w-full lg:w-2/3 space-y-6 mt-2 p-3">
          <h1 className="text-3xl font-bold text-gray-800 text-center lg:text-left">
            {book?.book?.name}
          </h1>

          <p
            className={`text-start text-sm md:text-base mt-2 text-gray-600 font-roboto ${
              lineClamp && book?.book?.description?.length > 500
                ? "line-clamp-3"
                : ""
            }`}
          >
            {book?.book?.description}
          </p>

          {book?.book?.description?.length > 500 && (
            <div
              className="text-blue-500 hover:text-blue-700 mt-3 cursor-pointer text-start hover:underline"
              onClick={() => setLineClamp(!lineClamp)}
            >
              {lineClamp ? "Devamını Oku" : "Yazıyı Küçült"}
            </div>
          )}

          <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4 text-gray-700">
            <span className="font-semibold">Kategori:</span>
            <span>{book?.book?.category}</span>
          </div>
        </div>
      </div>

      <BookReview
        reviews={book?.book?.reviews}
        createdAt={book?.book?.createdAt}
        bookId={id}
      />

      <BookCommentForm bookId={id} />
    </div>
  );
}

export default BookDetails;
