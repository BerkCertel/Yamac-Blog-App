import { useNavigate } from "react-router-dom";
import Button from "../Button";
import Input from "../Input";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { forgotPassword } from "../../../redux/userSlice";
import Loading from "../../Loading/Loading";

function ForgotPassword() {
  const navigate = useNavigate();

  const { loading } = useSelector((state) => state.user);

  const [email, setEmail] = useState("");
  const dispatch = useDispatch();

  const forgotFunc = async () => {
    await dispatch(forgotPassword(email));
  };
  return (
    <div className="forgot-password-page-main-div mx-auto container flex flex-col items-center justify-center h-[550px] px-4 bg-mycolor4 shadow-lg md:rounded-md">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
        <h1 className="text-3xl font-semibold text-mycolor4 mb-6 text-center">
          Şifremi Unuttum
        </h1>
        <p className="text-center text-gray-600 mb-4">
          E-posta adresinizi girin, size şifre sıfırlama bağlantısı gönderelim.
        </p>
        <Input
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          name="email"
          id=""
          type="email"
          className="border border-gray-300 rounded-md px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-mycolor4"
        />

        {loading ? (
          <div className="h-max-[25px] p-5">
            <Loading />
          </div>
        ) : (
          <Button
            name="Onayla"
            onClick={forgotFunc}
            className="bg-mycolor4 text-white px-6 py-2 rounded-md mt-4 hover:opacity-75 max-w-xs mx-auto block"
          />
        )}

        <button
          onClick={() => navigate("/auth")}
          className="text-mycolor4 font-semibold mt-4 hover:underline block mx-auto"
        >
          Vazgeç
        </button>
      </div>
    </div>
  );
}

export default ForgotPassword;
