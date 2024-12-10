import { useEffect, useState } from "react";
import Input from "./Input";
import Button from "./Button";
import { useDispatch, useSelector } from "react-redux";
import { login, register } from "../../redux/userSlice";
import { useNavigate } from "react-router-dom";

function AuthForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [signUp, setsignUp] = useState(false);
  const { isAuth } = useSelector((state) => state.user);
  const [data, setData] = useState({ name: "", email: "", password: "" });

  const handleChanage = (e) => {
    setData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // Register
  const registerFunc = () => {
    dispatch(register(data));
  };

  // Login
  const loginFunc = () => {
    dispatch(login(data));
  };

  useEffect(() => {
    if (isAuth) {
      navigate(`/`);
    }
  }, [isAuth, navigate]);

  return (
    <div className="auth-main-div mx-auto container flex flex-col items-center justify-center px-4 md:px-8 h-[550px] bg-mycolor4 md:rounded ">
      <div className="bg-white shadow-2xl rounded-lg p-6 w-full max-w-md">
        <h1 className="text-3xl font-semibold text-center text-mycolor4 mb-6">
          {signUp ? "Kayıt Ol" : "Giriş Yap"}
        </h1>
        {signUp && (
          <Input
            onChange={handleChanage}
            value={data.name}
            type="text"
            name="name"
            placeholder="Ad"
          />
        )}
        <Input
          onChange={handleChanage}
          value={data.email}
          type="email"
          name="email"
          placeholder="Email"
          className="mt-4"
        />
        <Input
          onChange={handleChanage}
          value={data.password}
          type="password"
          name="password"
          placeholder="Şifre"
          className="mt-4"
        />
        <Button
          name={signUp ? "Kayıt Ol" : "Giriş Yap"}
          onClick={signUp ? registerFunc : loginFunc}
          className="mt-6"
        />
        <div className="text-center mt-4 text-gray-500 ">
          {signUp ? "Zaten bir hesabınız var mı?" : "Hesabınız yok mu?"}
          <button
            onClick={() => setsignUp(!signUp)}
            className="text-mycolor4 font-semibold hover:underline ml-2"
          >
            {signUp ? "Giriş Yap" : "Kayıt Ol"}
          </button>
        </div>
        {!signUp && (
          <div className="text-center mt-4">
            <button
              onClick={() => navigate("/forgot-password")}
              className="text-mycolor4 font-semibold hover:underline"
            >
              Şifremi Unuttum
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default AuthForm;
