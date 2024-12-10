import { useNavigate } from "react-router-dom";

function Content() {
  const navigate = useNavigate();

  const handleNavigation = () => {
    navigate("/books");
    window.scrollTo(0, 0);
  };

  return (
    <section className="my-10 p-10 bg-gray-100 rounded-lg shadow-xl ">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-4">
        İlham Kaynağı ve Yazma Süreci
      </h2>
      <p className="text-lg text-gray-700 leading-relaxed mb-4 font-semibold">
        Her eserin ardında, yazarın derin bir ilham kaynağı ve özel bir hikayesi
        yatar. Yazılarımda genellikle doğadan, insan ilişkilerinden ve tarih
        boyunca yaşanmış hikayelerden esinleniyorum. Yazma sürecim, sabahın
        erken saatlerinde sessiz bir ortamda başlar ve bazen saatler boyunca bir
        fikir üzerinde çalışırken zamanın nasıl geçtiğini fark etmem.
      </p>
      <p className="text-lg text-gray-700 leading-relaxed font-semibold">
        Bu yolculukta, okurlarıma dokunacak hikayeler oluşturmak ve onları
        farklı dünyalara taşımak en büyük amacım. Siz de yazılarımı keşfederken
        kendi ilhamınızı bulabilir ve bu duygusal yolculuğa katılabilirsiniz.
      </p>
      <div className="flex justify-center mt-6">
        <button
          onClick={handleNavigation}
          className="px-6 py-3 bg-mycolor4 text-white text-lg font-semibold rounded hover:opacity-85 transition"
        >
          Daha Fazlasını Keşfet
        </button>
      </div>
    </section>
  );
}

export default Content;
