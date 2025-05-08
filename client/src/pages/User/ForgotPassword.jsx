import React, { useRef, useState } from "react";
import { MdLightMode, MdDarkMode } from "react-icons/md";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { changeTheme } from "../../redux/appSlice";
import { auth } from "../../firebase";
import { sendPasswordResetEmail } from "firebase/auth";
import { toast } from "react-hot-toast";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const isDark = useSelector((state) => state.app.darkTheme);
  const dispatch = useDispatch();
  const [error, setError] = useState("");
  const email = useRef();
  const [is, Setis] = useState(false);

  const submitHandler = (e) => {
    e.preventDefault();
    if (!email.current.value) {
      setError("Please Enter Email");
      return;
    }
    setError("");
    sendPasswordResetEmail(auth, email.current.value)
      .then(() => {
        // Password reset email sent!
        console.log("email send successfully");
        toast.success("Email Send Successful");
        // navigate("/login")
        Setis(true)
        // ..
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setError(errorMessage);
        Setis(false)
        // ..
      });
  };

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

  return (
    <div className=" w-full h-[100vh] bg-slate-300 dark:bg-slate-900 relative flex justify-center items-center px-8 md:px-0">
      <div className=" absolute top-0 left-0 text-4xl bg-slate-300 dark:bg-slate-900 bg-gradient-to-b from-blue-300 dark:from-slate-800 w-full h-28 pl-10 md:pl-20 py-5 dark:text-white">
        <span className=" text-5xl text-green-600">E</span>Voting
      </div>
      <div
        onClick={themeChange}
        className="absolute top-0 right-0 text-4xl pr-10 md:pr-28 py-8 md:py-5"
      >
        {isDark ? (
          <MdLightMode className=" dark:text-white"></MdLightMode>
        ) : (
          <MdDarkMode></MdDarkMode>
        )}
      </div>

      {is ? (
        <form
          onSubmit={(e)=>{e.preventDefault();
            navigate("/login");
          }}
          className=" z-[10] flex flex-col items-center min-w-[32vw]  min-h-[40vh] justify-center gap-7 bg-slate-100 bg-opacity-70 rounded-2xl py-5"
        >
          <h1 className=" w-full  text-3xl font-semibold text-center">
            Password Reset
          </h1>
          <h1 className=" italic w-full px-4 text-red-500  text-xl font-semibold text-center">
            An link send to your email for reset the password
          </h1>

          {error !== "" && (
            <p className=" -my-5 w-[90%] text-lg font-semibold text-red-600 px-4 ">
              {error}
            </p>
          )}
          <div className=" w-full flex flex-col  items-center">
            <button className=" w-[90%] bg-blue-600 h-12 text-2xl text-white rounded-xl transition-all hover:bg-blue-500 ">
              Back to Login
            </button>
          </div>
        </form>
      ) : (
        <form
          onSubmit={submitHandler}
          className=" z-[10] flex flex-col items-center min-w-[32vw]  min-h-[40vh] justify-center gap-7 bg-slate-100 bg-opacity-70 rounded-2xl py-5"
        >
          <h1 className=" w-full  text-3xl font-semibold text-center">
            Password Reset
          </h1>
          <h1 className=" italic w-full px-4 text-red-500  text-xl font-semibold text-center">
            An link send to your email for reset the password
          </h1>
          <input
            ref={email}
            className=" w-[90%] h-11 text-xl rounded-xl px-4"
            type="text"
            placeholder="Enter Your Email"
          ></input>

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
      )}
    </div>
  );
};

export default ForgotPassword;
