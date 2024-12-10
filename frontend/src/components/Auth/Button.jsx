import PropTypes from "prop-types";

function Button({ name, onClick, className }) {
  return (
    <button
      className={`w-full h-12 text-white bg-mycolor4 rounded-md hover:opacity-65  ${className}`}
      onClick={onClick}
    >
      {name}
    </button>
  );
}

Button.propTypes = {
  name: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  className: PropTypes.string,
  disabled: PropTypes.bool,
};

export default Button;
