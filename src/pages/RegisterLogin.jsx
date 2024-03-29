import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const RegisterLogin = () => {
  const navigate = useNavigate();
  const [swap, setSwap] = useState(false);

  const [registerName, setRegisterName] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const token = localStorage.getItem("token");

  async function verifyUser() {
    try {
      const verify = await axios.get(
        `http://localhost:8080/user/verify-user/${token}`
      );
      if (verify.status) {
        navigate("/");
      }
    } catch (e) {
      console.log(e);
    }
  }
  async function handleRegister() {
    try {
      const registerData = await axios.post(
        "http://localhost:8080/user/register",
        {
          name: registerName,
          email: registerEmail,
          password: registerPassword,
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      alert(registerData.data.message);
      setRegisterName("");
      setRegisterEmail("");
      setRegisterPassword("");
      setSwap(!swap);
    } catch (e) {
      alert(e.response.data.message);
    }
  }
  async function handleLogin() {
    console.log(loginEmail, loginPassword);
    try {
      const loginData = await axios.post(
        "http://localhost:8080/user/login",
        {
          email: loginEmail,
          password: loginPassword,
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      alert(loginData.data.message);
      localStorage.setItem("token", loginData.data.data);
      setLoginEmail("");
      setLoginPassword("");
      navigate("/");
    } catch (e) {
      alert(e.response.data.message);
    }
  }

  useEffect(() => {
    verifyUser();
  }, []);

  return (
    <>
      <div className="w-dvw h-dvh flex justify-center items-center bg-amber-100">
        <div className="flex justify-center items-center w-10/12 m-auto bg-white h-4/6 relative">
          <div
            className={`register w-6/12 flex flex-col gap-10 p-10 transform transition duration-500 ease-in-out ${
              swap ? "translate-x-full" : ""
            }`}
          >
            <input
              type="text"
              placeholder="NAME"
              className="p-3 text-xl focus:outline-none border-b-2 border-slate-400 font-comforta"
              onChange={(e) => {
                setRegisterName(e.target.value);
              }}
            />
            <input
              type="text"
              placeholder="EMAIL"
              className="p-3 text-xl focus:outline-none border-b-2 border-slate-400 font-comforta"
              onChange={(e) => {
                setRegisterEmail(e.target.value);
              }}
            />
            <input
              type="text"
              placeholder="PASSWORD"
              className="p-3 text-xl focus:outline-none border-b-2 border-slate-400 font-comforta"
              onChange={(e) => {
                setRegisterPassword(e.target.value);
              }}
            />
            <button
              className="m-auto font-comforta px-10 py-2 text-white bg-slate-800 rounded"
              onClick={handleRegister}
            >
              Sign Up
            </button>
            <h2
              className="text-center font-comforta underline cursor-pointer text-red-500"
              onClick={() => {
                setSwap(!swap);
              }}
            >
              Login
            </h2>
          </div>
          <div
            className={`login w-6/12 flex flex-col gap-10 p-10 transform transition duration-500 ease-in-out ${
              swap ? "-translate-x-full" : ""
            }`}
          >
            <input
              type="text"
              placeholder="EMAIL"
              className="p-3 text-xl focus:outline-none border-b-2 border-slate-400 font-comforta"
              onChange={(e) => {
                setLoginEmail(e.target.value);
              }}
            />
            <input
              type="text"
              placeholder="PASSWORD"
              className="p-3 text-xl focus:outline-none border-b-2 border-slate-400 font-comforta"
              onChange={(e) => {
                setLoginPassword(e.target.value);
              }}
            />
            <button
              className="m-auto font-comforta  px-10 py-2 text-white bg-slate-800 rounded"
              onClick={handleLogin}
            >
              Login
            </button>
            <h2
              className="text-center font-comforta underline cursor-pointer text-red-600"
              onClick={() => {
                setSwap(!swap);
              }}
            >
              Register
            </h2>
          </div>
          <div className="absolute hidden md:visible md:flex w-6/12 bg-gray-900 h-[calc(100%+6rem)] left-0 opacity-90 flex justify-center items-center text-white text-3xl font-comforta">
            NOTES APP
          </div>
        </div>
      </div>
    </>
  );
};

export default RegisterLogin;
