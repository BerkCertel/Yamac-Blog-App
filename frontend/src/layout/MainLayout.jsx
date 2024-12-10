import PropTypes from "prop-types";
import Header from "../components/Layout/Header";
import Footer from "../components/Layout/Footer";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { profile } from "../redux/userSlice";

function MainLayout({ children }) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(profile());
  }, [dispatch]);

  return (
    <div className="flex flex-col min-h-screen justify-center   space-y-10">
      <Header />
      <div className="flex-grow">{children}</div>
      <Footer />
    </div>
  );
}

MainLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default MainLayout;
