import PropTypes from "prop-types";

function Input({ placeholder, value, name, id, type, className, onChange }) {
  return (
    <input
      className={`w-full h-12 px-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-mycolor4 ${className}`}
      placeholder={placeholder}
      value={value}
      name={name}
      id={id}
      type={type}
      onChange={onChange}
    />
  );
}

Input.propTypes = {
  placeholder: PropTypes.string,
  value: PropTypes.string,
  name: PropTypes.string,
  id: PropTypes.string,
  type: PropTypes.string,
  className: PropTypes.string,
  onChange: PropTypes.func,
};

export default Input;
