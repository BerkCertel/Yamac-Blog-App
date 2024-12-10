import HomeImage from "../../components/HomeItems/HomeImage";
import BooksSlider from "../../components/Sliders/BooksSlider/BooksSlider";
import GallerySlider from "../../components/Sliders/GallerySlider/GallerySlider";
import AuthorContent from "../../components/HomeItems/AuthorContent";
import ArticlesSlider from "../../components/Sliders/ArticlesSlider/ArticlesSlider";
import Content from "../../components/HomeItems/Content";
import Countdown from "../../components/HomeItems/CountDown";

function HomePage() {
  return (
    <main className="home-main-div container mx-auto">
      <HomeImage />
      <Countdown />
      <BooksSlider />
      <AuthorContent />
      <GallerySlider />
      <Content />
      <ArticlesSlider />
    </main>
  );
}

export default HomePage;
