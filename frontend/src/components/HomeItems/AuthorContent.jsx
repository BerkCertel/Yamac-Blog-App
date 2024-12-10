import { useNavigate } from "react-router-dom";

function AuthorContent() {
  const navigate = useNavigate();

  const handleNavigation = () => {
    navigate("/contact");
    window.scrollTo(0, 0);
  };

  return (
    <div className="py-20 bg-gray-50 mb-5 shadow-xl">
      <div className="text-center mb-16 px-4">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-5 ">
          Yamaç Erdoğan ile Tanışın
        </h2>
        <p className="text-base sm:text-lg max-w-3xl mx-auto text-gray-600">
          Yamaç Erdoğan, modern düşünceye ve özgür iradeye önem veren, yazın
          dünyasında kendini özgün bir şekilde ifade eden bir yazardır.
          Kendisini yalnızca bir yazar olarak değil, aynı zamanda toplumun
          kültürel mirasına katkıda bulunan biri olarak da tanımlar.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row justify-center items-center mb-16 px-4 lg:px-6">
        <div className="w-full lg:w-1/3 mb-6 lg:mb-0">
          <img
            src="https://res.cloudinary.com/dwykns8ak/image/upload/v1733001568/HomePageImage_zsvgmr.jpg"
            alt="Yamaç Erdoğan"
            className="max-w-[600px] max-h-[400px] sm:max-h-[400px] lg:max-h-[600px] rounded-full shadow-xl mx-auto"
          />
        </div>
        <div className="lg:ml-8 w-full lg:w-2/3">
          <h3 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-3 text-center lg:text-left">
            Felsefi Bakış Açısı
          </h3>
          <p className="text-sm sm:text-base lg:text-lg text-gray-600 text-center lg:text-left">
            Yamaç Erdoğan, yazılarında özgür iradeyi ve insanın ruhsal doğasını
            öne çıkaran bir bakış açısına sahiptir. Maddi dünyanın ötesinde bir
            anlam arayışına yönelerek insanın manevi yönünü keşfetmeye
            çalışmaktadır.
          </p>
        </div>
      </div>

      <div className="bg-gray-100 py-12 mb-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h4 className="text-lg sm:text-xl font-semibold text-gray-800 mb-5">
            Yamaç Erdoğan’dan Bir Alıntı
          </h4>
          <p className="text-sm sm:text-base lg:text-lg italic text-gray-600">
            Düşüncelerimiz, ruhumuzun bir yansımasıdır. Her birey kendi yolunu,
            kendi iradesiyle çizer ve bu yol sonsuz bir keşif yolculuğudur.
          </p>
        </div>
      </div>

      <div className="text-center px-4">
        <div
          className="bg-mycolor4 text-white px-6 py-3 rounded-lg text-lg sm:text-xl hover:opacity-75 transition cursor-pointer"
          onClick={handleNavigation}
        >
          Yamaç Erdoğan ile İletişime Geç
        </div>
      </div>
    </div>
  );
}

export default AuthorContent;
