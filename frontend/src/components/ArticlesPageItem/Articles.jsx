import { useDispatch, useSelector } from "react-redux";
import ArticlesItem from "./ArticlesItem";
import { useEffect, useState } from "react";
import { getArticles } from "../../redux/articleSlice";
import ReactPaginate from "react-paginate";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import Loading from "../Loading/Loading";

function Articles() {
  const { articles, loading } = useSelector((state) => state.articles);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getArticles());
  }, [dispatch]);

  // Pagination
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 3;
  const endOffset = itemOffset + itemsPerPage;
  const currentItems = articles?.articles?.slice(itemOffset, endOffset);
  const pageCount = articles?.articles?.length
    ? Math.ceil(articles?.articles?.length / itemsPerPage)
    : 0;

  const handlePageClick = (event) => {
    const newOffset = (event.selected * 3) % articles?.articles?.length;
    setItemOffset(newOffset);
  };
  return (
    <main className="articles-main-div mx-auto container">
      <h2 className="text-center text-5xl font-bold">Makaleler</h2>

      {loading ? (
        <Loading />
      ) : (
        <div className="article-container row p-5">
          {articles && articles?.articles?.length > 0 ? (
            currentItems?.map((article, i) => (
              <div key={i} className="col-12 col-md-6 col-lg-4 mb-4">
                <ArticlesItem article={article} />
              </div>
            ))
          ) : (
            <p className="text-center">Henüz makale bulunmamaktadır.</p>
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

export default Articles;
