import { useState } from "react";
import Button from "../../Auth/Button";
import Input from "../../Auth/Input";
import { useDispatch } from "react-redux";
import { addAdminArticle } from "../../../redux/articleSlice";

function AdminCreateBook() {
  const dispatch = useDispatch();

  const [data, setData] = useState({
    name: "",
    description: "",
    category: "",
    images: "",
  });

  const articleHandle = (e) => {
    const { name, value } = e.target;

    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    dispatch(addAdminArticle(data));
    window.location.reload();
    setData({
      name: "",
      description: "",
      category: "",
      images: "",
    });
  };

  return (
    <main className="create-article-main container mx-auto p-4">
      <h1 className="font-bold text-3xl text-center mb-4">
        Yeni Makale Oluştur
      </h1>
      <hr className="w-full mb-4" />

      <div className="content-div grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          name="name"
          placeholder="Makale Adı"
          type="text"
          value={data.name}
          onChange={articleHandle}
          className="p-2 border rounded"
        />
        <Input
          name="category"
          placeholder="Kategori"
          type="text"
          value={data.category}
          onChange={articleHandle}
          className="p-2 border rounded"
        />
        <textarea
          name="description"
          placeholder="Açıklama"
          value={data.description}
          onChange={articleHandle}
          className="p-2 border rounded col-span-full h-24"
        />

        <Input
          name="images"
          placeholder="Resim Linki (Url)"
          type="text"
          value={data.images}
          onChange={articleHandle}
          className="p-2 border rounded col-span-full"
        />
      </div>

      <div className="mt-4 flex justify-center">
        <Button
          name="Yeni Makale Oluştur"
          onClick={handleSubmit}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        />
      </div>
    </main>
  );
}

export default AdminCreateBook;
