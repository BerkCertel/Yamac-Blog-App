import { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes, FaUser } from "react-icons/fa";
import { useSelector } from "react-redux";

function Header() {
  // navbar ıtems
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [profileMenu, setProfileMenu] = useState(false);
  const { user, isAuth } = useSelector((state) => state.user);

  const menuItems = [
    {
      name: "Profil",
      url: "/profile",
    },
    ...(user?.user?.role === "admin"
      ? [
          {
            name: "Admin",
            url: "/admin",
          },
        ]
      : []),
    {
      name: "Çıkış",
      url: "/logout",
    },
  ];

  const menuFunc = (item) => {
    if (item.name == "Çıkış") {
      localStorage.clear();
      window.location = "/";
    } else {
      window.location = item.url;
    }
  };

  return (
    <header className="header-main-div bg-mycolor4">
      <div className="container mx-auto flex justify-between items-center h-full gap-6 sm:p-2">
        <Link to="/" className="flex items-center justify-center p-2  mr-3">
          <img className="w-24 h-24 p-2" src="/images/logo.jpg" alt="Logo" />
          <p className="text-xl ml-2 font-thin text-white">Yamaç Erdoğan</p>
        </Link>

        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="sm:hidden text-black focus:outline-none p-5"
        >
          {isMenuOpen ? (
            <FaTimes className="h-6 w-6" />
          ) : (
            <FaBars className="h-6 w-6" />
          )}
        </button>

        <ul className="hidden sm:flex items-center space-x-5">
          <li>
            <Link
              to="/"
              className="text-lg font-cinzel text-white transition duration-500 hover:text-mycolor7"
            >
              Anasayfa
            </Link>
          </li>
          <li>
            <Link
              to="/books"
              className="font-cinzel text-lg text-white transition duration-500 hover:text-mycolor7"
            >
              Kitaplar
            </Link>
          </li>
          <li>
            <Link
              to="/articles"
              className="font-cinzel text-lg text-white transition duration-500 hover:text-mycolor7"
            >
              Makaleler
            </Link>
          </li>
          <li>
            <Link
              to="/about"
              className="font-cinzel text-lg text-white transition duration-500 hover:text-mycolor7"
            >
              Hakkımda
            </Link>
          </li>
          <li>
            <Link
              to="/contact"
              className="font-cinzel text-lg text-white transition duration-500 hover:text-mycolor7"
            >
              İletişim
            </Link>
          </li>
          <li>
            <Link
              to="/guestbook"
              className="font-cinzel text-lg text-white transition duration-500 hover:text-mycolor7"
            >
              Defter
            </Link>
          </li>
        </ul>

        {isAuth ? (
          <ul className="hidden sm:flex space-x-2">
            <li className="relative group flex justify-center items-center">
              <div
                className="flex items-center space-x-1 cursor-pointer text-white bg-black hover:opacity-65 transition-all duration-500 px-3 py-2 rounded-md"
                onClick={() => setProfileMenu(!profileMenu)}
              >
                <FaUser className="h-5 w-5" />
                <p className="text-xs px-2 py-1 truncate max-w-[120px]">
                  {user?.user?.name || "Kullanıcı"}
                </p>
              </div>
              {profileMenu && (
                <div className="absolute left-1/2 transform -translate-x-1/2 top-full mt-2 bg-white shadow-lg rounded w-36 z-10">
                  {menuItems.map((item, i) => (
                    <div
                      onClick={() => menuFunc(item)}
                      key={i}
                      className="block px-4 py-2 text-black hover:bg-gray-200 transition duration-300 cursor-pointer"
                    >
                      {item.name}
                    </div>
                  ))}
                </div>
              )}
            </li>
          </ul>
        ) : (
          <ul className="hidden sm:flex space-x-2">
            <li className="flex justify-center items-center">
              <Link
                to="/auth"
                className="px-4 py-2 bg-zinc-900 font-cinzel text-white rounded hover:opacity-75 transition duration-500"
              >
                Giriş
              </Link>
            </li>
          </ul>
        )}

        <div
          className={`${
            isMenuOpen
              ? "transform translate-x-0 opacity-100"
              : "transform -translate-x-full opacity-0"
          } absolute top-28 right-0 w-full bg-mycolor4 sm:hidden transition-all duration-500 ease-in-out border-t border-black border-b shadow-lg z-[999]`}
        >
          <ul className="flex flex-col items-center space-y-4 py-4">
            <li>
              <Link
                to="/"
                className="font-semibold text-lg text-white transition duration-500 hover:text-mycolor7"
                onClick={() => setIsMenuOpen(false)}
              >
                Anasayfa
              </Link>
            </li>
            <hr className="w-1/2 bg-black" />
            <li>
              <Link
                to="/books"
                className="text-white transition duration-500 hover:text-mycolor7"
                onClick={() => setIsMenuOpen(false)}
              >
                Kitaplar
              </Link>
            </li>
            <li>
              <Link
                to="/articles"
                className="text-white transition duration-500 hover:text-mycolor7"
                onClick={() => setIsMenuOpen(false)}
              >
                Makaleler
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                className="text-white transition duration-500 hover:text-mycolor7"
                onClick={() => setIsMenuOpen(false)}
              >
                Hakkımda
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                className="text-white transition duration-500 hover:text-mycolor7"
                onClick={() => setIsMenuOpen(false)}
              >
                İletişim
              </Link>
            </li>
            <li>
              <Link
                to="/guestbook"
                className="font-cinzel text-lg text-white transition duration-500 hover:text-mycolor7"
              >
                Defter
              </Link>
            </li>
            <hr className="w-1/2" />

            {isAuth ? (
              <li className="relative group">
                <div
                  className="flex items-center space-x-1 cursor-pointer text-white hover:opacity-65  bg-black px-1 py-2 rounded-md"
                  onClick={() => setProfileMenu(!profileMenu)}
                >
                  <FaUser className="h-5 w-5" />
                  <p className="text-md">{user?.user?.name}</p>
                </div>
                {profileMenu && (
                  <div className="absolute left-1/2 transform -translate-x-1/2 top-full mt-2 bg-white shadow-lg rounded w-36 z-10 cursor-pointer">
                    {menuItems.map((item, i) => (
                      <div
                        onClick={() => menuFunc(item)}
                        key={i}
                        className="block px-4 py-2 text-black hover:bg-gray-200 hover:rounded-md"
                      >
                        {item.name}
                      </div>
                    ))}
                  </div>
                )}
              </li>
            ) : (
              <li>
                <Link
                  to="/auth"
                  className="px-4 py-2 bg-mycolor6 text-white rounded hover:opacity-85 transition duration-500"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Giriş
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </header>
  );
}

export default Header;
