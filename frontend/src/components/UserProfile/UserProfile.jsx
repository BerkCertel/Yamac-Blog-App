import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function UserProfile() {
  const { user, isAuth } = useSelector((state) => state.user);

  const handleLogout = () => {
    localStorage.clear();
    window.location = "/auth";
  };

  if (!isAuth) {
    return (
      <main className="h-[600px] flex items-center justify-center bg-gray-100 bg-cover bg-center   mx-auto container bg-[url('https://res.cloudinary.com/dwykns8ak/image/upload/v1733009634/bg2_s3dbpx.jpg')]  ">
        <div className="w-full sm:w-2/3 md:w-1/2 h-auto flex flex-col items-center justify-center space-y-8 bg-transparent backdrop-blur-lg rounded-lg p-6">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white text-center">
            Lütfen giriş yapınız.
          </h1>
          <Link
            className="px-6 py-3 text-lg sm:text-xl font-semibold text-white bg-mycolor4 rounded-md shadow-lg transition duration-300 ease-in-out transform hover:scale-105"
            to={"/auth"}
          >
            Giriş Yapmak İçin Tıklayın...
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="h-[600px] flex items-center justify-center bg-cover bg-center mx-auto container bg-[url('https://res.cloudinary.com/dwykns8ak/image/upload/v1733009634/bg2_s3dbpx.jpg')] ">
      <div className="bg-white/70 shadow-2xl w-11/12 sm:w-3/4 md:w-2/3 lg:w-1/2 xl:w-1/3 rounded-lg p-6 sm:p-8 backdrop-blur-md">
        <div className="text-center mb-6">
          <h1 className="text-3xl sm:text-4xl font-semibold text-gray-800 mb-4">
            {user?.user?.name}
          </h1>
        </div>
        <div className="flex flex-col sm:flex-row sm:space-x-6 mb-6">
          <div className="flex-1 text-left">
            <label className="text-sm ">E-posta</label>
            <p className="text-lg text-gray-600">{user?.user?.email}</p>
          </div>
          <div className="flex-1 text-left">
            <label className="text-sm ">Rol</label>
            <p className="text-lg text-gray-600 capitalize">
              {user?.user?.role}
            </p>
          </div>
        </div>
        <div className="mb-6">
          <label className="text-sm ">Üyelik Tarihi</label>
          <p className="text-lg text-gray-600">
            {new Date(user?.user?.createdAt).toLocaleDateString("tr-TR")}
          </p>
        </div>
        <div className="flex flex-col items-center gap-4">
          <button className="w-full px-4 py-2 bg-mycolor4 text-white font-semibold rounded-lg shadow-md hover:bg-mycolor4/80 transition-all duration-300">
            Profili Düzenle
          </button>
          <button
            onClick={handleLogout}
            className="w-full px-4 py-2 bg-red-500 text-white font-semibold rounded-lg shadow-md hover:bg-red-600 transition-all duration-300"
          >
            Çıkış Yap
          </button>
        </div>
      </div>
    </main>
  );
}

export default UserProfile;
