import { useEffect, useState } from "react";
import ArticleCommentForm from "./ArticleCommentForm";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getArticleDetail } from "../../redux/articleSlice";
import ArticleReview from "./ArticleReview";

function BookDetails() {
  const { id } = useParams();

  const dispatch = useDispatch();
  const { article } = useSelector((state) => state.articles);

  useEffect(() => {
    if (id) {
      dispatch(getArticleDetail(id));
    }
  }, [dispatch, id]);

  const [lineClamp, setLineClamp] = useState(true);

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 border rounded-lg shadow">
      <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8 border rounded-lg">
        <div className="w-full lg:w-1/3 flex items-center justify-center p-2">
          <img
            src={article?.article?.images}
            alt={article?.article?.name}
            className="w-full max-w-[400px] h-full max-h-[450px] object-cover rounded-lg shadow border"
          />
        </div>

        <div className="w-full lg:w-2/3 space-y-6 mt-2 p-3">
          <h1 className="text-3xl font-bold text-gray-800 text-center lg:text-left">
            {article?.article?.name}
          </h1>

          <p
            className={`text-start text-sm md:text-base mt-2 text-gray-600 font-roboto ${
              lineClamp && article?.article?.description?.length > 500
                ? "line-clamp-3"
                : ""
            }`}
          >
            {article?.article?.description}
          </p>

          {article?.article?.description?.length > 500 && (
            <div
              className="text-blue-500 hover:text-blue-700 mt-3 cursor-pointer text-start hover:underline"
              onClick={() => setLineClamp(!lineClamp)}
            >
              {lineClamp ? "Devamını Oku" : "Yazıyı Küçült"}
            </div>
          )}

          <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4 text-gray-700">
            <span className="font-semibold">Kategori:</span>
            <span>{article?.article?.category}</span>
          </div>
        </div>
      </div>

      <ArticleReview
        reviews={article?.article?.reviews}
        createdAt={article?.article?.createdAt}
        articleId={id}
      />

      <ArticleCommentForm articleId={id} />
    </div>
  );
}

export default BookDetails;
