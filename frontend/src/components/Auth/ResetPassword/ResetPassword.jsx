import { useNavigate, useParams } from "react-router-dom";
import Button from "../Button";
import Input from "../Input";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../Loading/Loading";
import { useState } from "react";
import { resetPassword } from "../../../redux/userSlice";
import { toast } from "react-toastify";

function ResetPassword() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { token } = useParams();

  const [password, setPassword] = useState("");

  const { loading } = useSelector((state) => state.user);

  const isDisabled = password.length < 6;

  const forgotFunc = async () => {
    if (isDisabled >= 6) {
      await dispatch(resetPassword({ token, password }));
      navigate("/auth");
    } else {
      toast.error("Şifreniz en az 6 karakter olmalıdır!");
    }
  };

  return (
    <div className="forgot-password-page-main-div mx-auto container flex flex-col items-center justify-center h-[550px] px-4 bg-mycolor4 shadow-lg md:rounded-md">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
        <h1 className="text-3xl font-semibold text-mycolor4 mb-6 text-center">
          Yeni Şifre Oluştur
        </h1>
        <p className="text-center text-gray-600 mb-4">
          Lütfen yeni şifrenizi en az 6 karakter olacak şekilde giriniz.
        </p>
        <Input
          placeholder="Yeni Şifre"
          onChange={(e) => setPassword(e.target.value)}
          name="password"
          id=""
          type="password"
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
            disabled={isDisabled}
            title={isDisabled ? "Şifreniz 6 karakterden az olamaz!" : ""}
            className={`${
              isDisabled ? "bg-gray-400 cursor-not-allowed" : "bg-mycolor4"
            } text-white px-6 py-2 rounded-md mt-4 hover:opacity-75 max-w-xs mx-auto block`}
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

export default ResetPassword;
