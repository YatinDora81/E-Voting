import React, { useRef, useState } from "react";
import { MdLightMode, MdDarkMode } from "react-icons/md";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { changeTheme } from "../../redux/appSlice";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { addUserInfo } from "../../redux/userSlice";

const LoginAdmin = () => {
  const navigate = useNavigate();
  const isDark = useSelector((state) => state.app.darkTheme);
  const dispatch = useDispatch();
  const [error, setError] = useState("");

  const [isEye, setIsEye] = useState(false);

  const themeChange = () => {
    if (!isDark) {
      //set dark
      document.querySelector("html").classList.remove("light");
      document.querySelector("html").classList.add("dark");
    } else {
      document.querySelector("html").classList.remove("dark");
      document.querySelector("html").classList.add("light");
    }
    dispatch(changeTheme());
  };

  const email = useRef();
  const password = useRef();

  const submitHandler = (e) => {
    e.preventDefault()
    if( email.current.value !== "a" ){
        setError("Email is Wrong");
        return;
    }
    if( password.current.value !== "a"){
        setError("Password is wrong")
        return;
    }
    setError("");
    const obj = { displayName : "Admin" , "email" : email.current.value }
    dispatch(addUserInfo(obj))
    navigate("/admin/home");
  };

  return (
    <div className=" w-full h-[100vh] bg-slate-300 dark:bg-slate-900 relative flex justify-center items-center">
      <div className=" absolute top-0 left-0 text-4xl bg-slate-300 dark:bg-slate-900 bg-gradient-to-b from-blue-300 dark:from-slate-800 w-full h-28 pl-20 py-5 dark:text-white">
        <span className=" text-5xl text-green-600">E</span>Voting
      </div>
      <div
        onClick={themeChange}
        className=" absolute top-0 right-0 text-4xl  pr-28 py-5"
      >
        {isDark ? (
          <MdLightMode className=" dark:text-white"></MdLightMode>
        ) : (
          <MdDarkMode></MdDarkMode>
        )}
      </div>

      <form
        onSubmit={submitHandler}
        className=" flex flex-col items-center min-w-[32vw]  min-h-[40vh] justify-center gap-7 bg-slate-100 bg-opacity-70 rounded-2xl py-5"
      >
        <h1 className=" w-full  text-3xl font-semibold text-center">
          Login For Admin
        </h1>
        <input
          ref={email}
          className=" w-[90%] h-11 text-xl rounded-xl px-4"
          type="text"
          placeholder="Enter Your Email"
        ></input>
        <div className=" w-full flex justify-center items-center relative">
          <div
            onClick={() => {
              setIsEye(!isEye);
            }}
            className=" absolute text-2xl right-[2.5vw] cursor-pointer"
          >
            {isEye ? <FaRegEye></FaRegEye> : <FaRegEyeSlash></FaRegEyeSlash>}
          </div>
          <input
            ref={password}
            className=" w-[90%] h-11 text-xl rounded-xl px-4"
            type={!isEye ? "password" : "text"}
            placeholder="Enter Your Password"
          ></input>
        </div>

        {error !== "" && (
          <p className=" -my-5 w-[90%] text-lg font-semibold text-red-600 px-4 ">
            {error}
          </p>
        )}

        <div className=" w-full flex flex-col  items-center">
          <button className=" w-[90%] bg-blue-600 h-12 text-2xl text-white rounded-xl transition-all hover:bg-blue-500 ">
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginAdmin;
