import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ReactPaginate from "react-paginate";

import AdminArticleItems from "./AdminArticleItems";
import { FaChevronRight, FaChevronLeft } from "react-icons/fa";
import { getAdminArticles } from "../../../redux/articleSlice";

function AdminArticles() {
  const dispatch = useDispatch();
  const { adminarticles } = useSelector((state) => state.articles);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 6;

  useEffect(() => {
    dispatch(getAdminArticles());
  }, [dispatch]);

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  const offset = currentPage * itemsPerPage;
  const currentItems =
    adminarticles?.articles?.slice(offset, offset + itemsPerPage) || [];
  const pageCount = Math.ceil(
    (adminarticles?.articles?.length || 0) / itemsPerPage
  );

  return (
    <div className="admin-articles container mx-auto px-4 py-6">
      {/* Eğer liste boşsa */}
      {currentItems.length === 0 ? (
        <div className="flex justify-center items-center p-4 border rounded-md bg-gray-100 text-gray-600">
          <p>Henüz makale bulunmamaktadır.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentItems.map((article, i) => (
            <AdminArticleItems key={i} article={article} />
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

export default AdminArticles;
