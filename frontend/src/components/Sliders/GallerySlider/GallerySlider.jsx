import Carousel from "react-multi-carousel";
import { useSelector } from "react-redux";
import GallerySliderItem from "./GallerySliderItem";
import "react-multi-carousel/lib/styles.css";

function GallerySlider() {
  const galleryImages = useSelector((state) => state.gallery.images);

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 5,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 3,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  return (
    <div className="Gallery-Slider-main-div">
      <h2 className="text-center text-5xl mb-2">Sizden Gelenler</h2>
      <Carousel
        responsive={responsive}
        swipeable={false}
        draggable={false}
        showDots={false}
        arrows={false}
        ssr={true}
        infinite={true}
        autoPlay={true}
        autoPlaySpeed={200}
        keyBoardControl={false}
        customTransition="all .7s"
        transitionDuration={1000}
        containerClass="carousel-container border shadow-lg mb-5"
        itemClass="flex justify-center items-center p-12"
      >
        {galleryImages.map((image) => (
          <GallerySliderItem key={image.id} image={image} />
        ))}
      </Carousel>
    </div>
  );
}

export default GallerySlider;
