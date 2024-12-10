import PropTypes from "prop-types";

function GallerySliderItem({ image }) {
  return (
    <div className=" w-full h-full border p-2 rounded-lg shadow-lg">
      <img
        className="w-full h-full rounded  bg-contain aspect-auto "
        src={image.url}
        alt={`Gallery image ${image.id}`}
      />
    </div>
  );
}

GallerySliderItem.propTypes = {
  image: PropTypes.object.isRequired,
};

export default GallerySliderItem;
