import { useState } from "react";
import AdminArticles from "./AdminArticles/AdminArticles";
import AdminBooks from "./AdminBooks/AdminBooks";
import AdminCreateArticle from "./AdminCreateArticle/AdminCreateArticle";
import AdminCreateBook from "./AdminCreateBook/AdminCreateBook";

function Admin() {
  const [activeTab, setActiveTab] = useState("articles");

  return (
    <main className="admin-main-div mx-auto container px-4 py-6">
      <div className="flex flex-col justify-center  items-center space-x-2 space-y-3 mb-6">
        <div className="flex items-center justify-center space-x-3">
          <button
            className={` px-4 py-2  text-white font-semibold rounded transition-all duration-300 ${
              activeTab === "articles"
                ? "bg-blue-600"
                : "bg-gray-400 hover:bg-blue-500"
            }`}
            onClick={() => setActiveTab("articles")}
          >
            Makaleler
          </button>
          <button
            className={`px-4 py-2 text-white font-semibold rounded transition-all duration-300 ${
              activeTab === "books"
                ? "bg-blue-600"
                : "bg-gray-400 hover:bg-blue-500"
            }`}
            onClick={() => setActiveTab("books")}
          >
            Kitaplar
          </button>
        </div>
        <div className="flex items-center justify-center space-x-3">
          <button
            className={`px-4 py-2  text-white font-semibold rounded transition-all duration-300 ${
              activeTab === "createArticle"
                ? "bg-blue-600"
                : "bg-gray-400 hover:bg-blue-500"
            }`}
            onClick={() => setActiveTab("createArticle")}
          >
            Makale Oluştur
          </button>
          <button
            className={`px-4 py-2 text-white font-semibold rounded transition-all duration-300 ${
              activeTab === "createBook"
                ? "bg-blue-600"
                : "bg-gray-400 hover:bg-blue-500"
            }`}
            onClick={() => setActiveTab("createBook")}
          >
            Kitap Oluştur
          </button>
        </div>
      </div>

      <div
        className={`transition-all animate__animated ${
          activeTab === "articles" ? "animate__fadeIn" : "animate__fadeOut"
        } ${activeTab === "articles" ? "block" : "hidden"}`}
      >
        <AdminArticles />
      </div>

      <div
        className={`transition-all animate__animated ${
          activeTab === "books" ? "animate__fadeIn" : "animate__fadeOut"
        } ${activeTab === "books" ? "block" : "hidden"}`}
      >
        <AdminBooks />
      </div>

      <div
        className={`transition-all animate__animated ${
          activeTab === "createBook" ? "animate__fadeIn" : "animate__fadeOut"
        } ${activeTab === "createBook" ? "block" : "hidden"}`}
      >
        <AdminCreateBook />
      </div>
      <div
        className={`transition-all animate__animated ${
          activeTab === "createArticle" ? "animate__fadeIn" : "animate__fadeOut"
        } ${activeTab === "createArticle" ? "block" : "hidden"}`}
      >
        <AdminCreateArticle />
      </div>
    </main>
  );
}

export default Admin;
