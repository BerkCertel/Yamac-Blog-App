import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ReactPaginate from "react-paginate";
import { getAdminBooks } from "../../../redux/bookSlice";
import AdminBooksItem from "./AdminBookItems";
import { FaChevronRight, FaChevronLeft } from "react-icons/fa";

function AdminBooks() {
  const dispatch = useDispatch();
  const { adminbooks } = useSelector((state) => state.books);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 6;

  useEffect(() => {
    dispatch(getAdminBooks());
  }, [dispatch]);

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  const offset = currentPage * itemsPerPage;
  const currentItems =
    adminbooks?.books?.slice(offset, offset + itemsPerPage) || [];
  const pageCount = Math.ceil((adminbooks?.books?.length || 0) / itemsPerPage);

  return (
    <div className="admin-books container mx-auto px-4 py-6">
      {currentItems.length === 0 ? (
        <div className="flex justify-center items-center p-4 border rounded-md bg-gray-100 text-gray-600">
          <p>Henüz kitap bulunmamaktadır.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentItems.map((book, i) => (
            <AdminBooksItem key={i} book={book} />
          ))}
        </div>
      )}

      <div className="mt-6">
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
      </div>
    </div>
  );
}

export default AdminBooks;
