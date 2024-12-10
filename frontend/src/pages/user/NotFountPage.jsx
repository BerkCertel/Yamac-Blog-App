// src/pages/NotFoundPage.js
import { Link } from "react-router-dom";

function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center h-[600px]   mx-auto container  bg-mycolor4 text-white text-center rounded-md">
      <h1 className="text-9xl font-extrabold animate-bounce">404</h1>
      <p className="text-2xl mt-4">Üzgünüz, aradığınız sayfa bulunamadı.</p>
      <Link
        to="/"
        className="mt-8 px-6 py-3 bg-blue-500 hover:bg-blue-600 text-lg font-medium rounded-md transition"
      >
        Ana Sayfaya Dön
      </Link>
    </div>
  );
}

export default NotFoundPage;
