import React, { useRef, useState } from "react";
import { MdLightMode, MdDarkMode } from "react-icons/md";
import { useSelector, useDispatch } from "react-redux";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import { changeTheme } from "../../redux/appSlice";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import {
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { auth, provider } from "../../firebase";
import { addUserInfo } from "../../redux/userSlice";
import { validateLogin } from "../../utils/validateLogin";

const LoginUser = () => {
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
    e.preventDefault();
    let s = validateLogin(
      email.current.value,
      password.current.value
    );

    // console.log(s);

    if (s) {
      setError(s);
      return;
    }
    if (!s) setError("");

    //sign in api
    signInWithEmailAndPassword(auth, email.current.value, password.current.value)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        // ...
        // console.log(user);
        dispatch(addUserInfo(user.toJSON()))
        navigate("/homeUser");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setError(errorMessage);
      });
  }; 

  const signupgoogleHandler = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        console.log(user);
        
        // IdP data available using getAdditionalUserInfo(result)
        // console.log(user);const data = auth.currentUser;
        dispatch(addUserInfo(user.toJSON()));
        navigate("/homeUser");
        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // console.log("Bye Bye");
        setError(errorMessage)
        // ...
      });
  };

  return (
    <div className=" w-full h-[100vh] bg-slate-300 dark:bg-slate-900 relative flex justify-center items-center">
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

      <form
        onSubmit={submitHandler}
        className=" z-[10] flex flex-col items-center min-w-[84vw] md:min-w-[32vw]  min-h-[40vh] justify-center gap-7 bg-slate-100 bg-opacity-70 rounded-2xl py-5"
      >
        <h1 className=" w-full  text-3xl font-semibold text-center">
          Login For User
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
            className=" absolute text-2xl right-[5.5vw] md:right-[2.5vw] cursor-pointer"
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

          <h1 className=" w-[90%] my-1 text-center">OR</h1>

          <div onClick={signupgoogleHandler} className=" cursor-pointer w-[90%] bg-blue-600 h-12 text-lg md:text-2xl text-white rounded-xl transition-all hover:bg-blue-500 flex justify-center items-center gap-2">
            Login With Google{" "}
            <FcGoogle className=" bg-white text-3xl rounded-full"></FcGoogle>
          </div>
        </div>
        <div className=" -mt-3 text-center">
        <p className=" text-lg text-center">
            <Link className=" text-xl text-black font-semibold  underline" to="/pass-reset">
              Forgot Password
            </Link>
          </p>
          <p className="text-sm md:text-lg">
            Not a User ,{" "}
            <Link className=" italic underline" to="/">
              Sign Up Here
            </Link>
          </p>
          <p className="text-sm md:text-lg ">
            Already a Candidate ,{" "}
            <Link className=" italic underline" to="/candidateLogin">
              Login Here
            </Link>
          </p>
          <p className="text-sm md:text-lg">
            Signup as Candidate,{" "}
            <Link className=" italic underline" to="/candidateSignup">
              SignUp Here
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default LoginUser;
