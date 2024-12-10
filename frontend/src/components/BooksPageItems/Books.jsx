import { useDispatch, useSelector } from "react-redux";
import BooksItem from "./BooksItem";
import { useEffect, useState } from "react";
import { getBooks } from "../../redux/bookSlice";
import Loading from "../Loading/Loading";
import ReactPaginate from "react-paginate";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

function Books() {
  const { books, loading } = useSelector((state) => state.books);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBooks());
  }, [dispatch]);

  // Pagination
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 3;
  const endOffset = itemOffset + itemsPerPage;
  const currentItems = books?.books?.slice(itemOffset, endOffset);
  const pageCount = books?.books?.length
    ? Math.ceil(books?.books?.length / itemsPerPage)
    : 0;

  const handlePageClick = (event) => {
    const newOffset = (event.selected * 3) % books?.books?.length;
    setItemOffset(newOffset);
  };

  return (
    <main className="books-main-div container mx-auto">
      <h2 className="text-center text-5xl font-bold">Kitaplar</h2>

      {loading ? (
        <Loading />
      ) : (
        <div className="article-container row p-5">
          {books && books?.books?.length > 0 ? (
            currentItems?.map((book, i) => (
              <div key={i} className="col-12 col-md-6 col-lg-4 mb-4">
                <BooksItem book={book} />
              </div>
            ))
          ) : (
            <p className="text-center">Henüz kitap bulunmamaktadır.</p>
          )}
        </div>
      )}

      <ReactPaginate
        breakLabel="..."
        nextLabel={
          <span className="flex items-center justify-center w-8 h-8 text-white bg-blue-500 rounded-md hover:bg-blue-600">
            <FaChevronRight />
          </span>
        }
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel={
          <span className="flex items-center justify-center w-8 h-8 text-white bg-blue-500 rounded-md hover:bg-blue-600">
            <FaChevronLeft />
          </span>
        }
        renderOnZeroPageCount={null}
        containerClassName="flex items-center justify-center space-x-2 mt-4"
        pageClassName="mx-1"
        pageLinkClassName="px-3 py-1 border rounded-md text-white bg-blue-500 hover:bg-blue-100"
        activeClassName=" font-bold rounded border-2 border-black"
        disabledClassName="text-gray-400 cursor-not-allowed"
      />
    </main>
  );
}

export default Books;
