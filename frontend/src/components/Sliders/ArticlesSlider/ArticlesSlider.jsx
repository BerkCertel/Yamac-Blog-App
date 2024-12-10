import Slider from "react-slick"; // Slick'i içe aktar
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import Loading from "../../Loading/Loading";
import ArticleSliderItem from "./ArticleSliderItem";
import { getArticles } from "../../../redux/articleSlice";

function ArticlesSlider() {
  const { articles, loading } = useSelector((state) => state.articles);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getArticles());
  }, [dispatch]);

  const settings = {
    infinite: true,
    speed: 300,
    slidesToShow: 4,
    slidesToScroll: 1,
    centerMode: true,
    focusOnSelect: false,
    autoplay: true,
    autoplaySpeed: 2000,
    lazyLoad: true,
    arrows: true,

    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        },
      },
      {
        breakpoint: 464,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div className="container mx-auto px-4">
      <div className="flex flex-col items-center justify-center mt-10">
        <h2 className="text-center text-4xl md:text-5xl">Makalelerim</h2>
        <hr className="w-3/4 md:w-1/2 mt-2" />
      </div>
      <div className="p-10">
        {loading ? (
          <Loading />
        ) : articles?.articles?.length > 3 ? (
          <Slider {...settings}>
            {articles?.articles?.map((article, i) => (
              <ArticleSliderItem key={i} article={article} />
            ))}
          </Slider>
        ) : (
          <div className="text-center text-lg text-gray-500">
            Henüz yeterince makale yok...
          </div>
        )}
      </div>
    </div>
  );
}
export default ArticlesSlider;
