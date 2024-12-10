import { useRef } from "react";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import { toast } from "react-toastify";
import emailjs from "@emailjs/browser";

function ContactPage() {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm("service_hdybi5p", "template_ntho1qx", form.current, {
        publicKey: "hUjED638ZEmVCfGAx",
      })
      .then(
        () => {
          toast.success("Mesaj gönderiminiz başarılı.");
        },
        (error) => {
          toast.error("Mesaj gönderiminiz başarısız, lütfen tekrar deneyin!");
          throw error;
        }
      );
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
        <div className="p-4 bg-gradient-to-r from-indigo-500 to-blue-500 text-white rounded-lg shadow-lg text-center transform hover:scale-105 transition duration-300 animate__animated animate__fadeIn">
          <FaPhoneAlt className="text-2xl  w-full mb-5" size={36} />
          <p className="text-lg font-semibold">+90-505-505-5556</p>
        </div>
        <div className="p-4 bg-gradient-to-r from-green-400 to-teal-400 text-white rounded-lg shadow-lg text-center transform hover:scale-105 transition duration-300 animate__animated animate__fadeIn animate__delay-1s">
          <FaEnvelope className="text-2xl w-full  mb-5" size={36} />
          <p className="text-lg font-semibold">yamac.erdogan@outlook.com</p>
        </div>
        <div className="p-4 bg-gradient-to-r from-yellow-400 to-red-500 text-white rounded-lg shadow-lg text-center transform hover:scale-105 transition duration-300 animate__animated animate__fadeIn animate__delay-2s">
          <FaMapMarkerAlt className="text-2xl w-full  mb-5" size={36} />
          <p className="text-lg font-semibold">Türkiye</p>
        </div>
      </div>
      <h1 className="text-center text-5xl animate__animated animate__fadeIn animate__delay-3s">
        BANA ULAŞIN !
      </h1>

      <hr className="w-full  mb-5 mt-5 animate__animated animate__fadeIn animate__delay-3s" />
      <form
        ref={form}
        onSubmit={sendEmail}
        className="space-y-6 bg-white p-6 rounded-lg shadow-lg w-full sm:w-1/2 mx-auto animate__animated animate__fadeIn animate__delay-3s border"
      >
        <div className="flex flex-col space-y-2">
          <label className="text-lg font-medium">İsim</label>
          <input
            type="text"
            name="user_name"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300"
            required
          />
        </div>
        <div className="flex flex-col space-y-2">
          <label className="text-lg font-medium">Email</label>
          <input
            type="email"
            name="user_email"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300"
            required
          />
        </div>
        <div className="flex flex-col space-y-2">
          <label className="text-lg font-medium">Mesaj</label>
          <textarea
            name="message"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300"
            required
          />
        </div>
        <div>
          <input
            type="submit"
            value="Gönder"
            className="w-full py-3 bg-indigo-600 text-white text-lg font-semibold rounded-lg hover:bg-indigo-700 cursor-pointer transition duration-300"
          />
        </div>
      </form>
    </div>
  );
}

export default ContactPage;
