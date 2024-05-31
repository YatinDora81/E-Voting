import React, { useRef, useState } from "react";
import { MdLightMode, MdDarkMode } from "react-icons/md";
import { useSelector, useDispatch } from "react-redux";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import { changeTheme } from "../../redux/appSlice";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { validateSignup } from "../../utils/validateSignup";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";
import { auth, provider } from "../../firebase";
import { addUserInfo } from "../../redux/userSlice";

const SignUpCandidate = () => {
  const navigate = useNavigate();
  const isDark = useSelector((state) => state.app.darkTheme);
  const dispatch = useDispatch();
  const [error, setError] = useState("");

  const [isEye, setIsEye] = useState(false);
  const [isEye2, setIsEye2] = useState(false);

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

  const name = useRef();
  const email = useRef();
  const password = useRef();
  const cPassword = useRef();

  const submitHandler = (e) => {
    e.preventDefault();
    let s = validateSignup(
      name.current.value,
      email.current.value,
      password.current.value,
      cPassword.current.value
    );

    // console.log(s);

    if (s) {
      setError(s);
      return;
    }
    if (!s) setError("");

    createUserWithEmailAndPassword(
      auth,
      email.current.value,
      password.current.value
    )
      .then((userCredential) => {
        // Signed up
        const user = userCredential.user;
        updateProfile(auth.currentUser, {
          displayName: name.current.value,
        })
          .then(() => {
            // console.log(typeof auth.currentUser);
            navigate("/homeCandidate");
            //add user to redux store
            const data = auth.currentUser;
            dispatch(addUserInfo(data.toJSON()));
            // Profile updated!
            // ...
          })
          .catch((error) => {
            // An error occurred
            // ...
            setError(error?.message);
          });
        // ...
      })
      .catch((error) => {
        const errorCode = error?.code;
        const errorMessage = error?.message;
        // ..
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
        // IdP data available using getAdditionalUserInfo(result)
        // console.log(user);const data = auth.currentUser;
        dispatch(addUserInfo(user));
        navigate("/homeCandidate");
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
        className=" z-[10] flex flex-col items-center min-w-[32vw]  min-h-[40vh] justify-center gap-7 bg-slate-100 bg-opacity-70 rounded-2xl py-5"
      >
        <h1 className=" w-full  text-3xl font-semibold text-center">
          Sign Up For Candidate
        </h1>
        <input
          ref={name}
          className=" w-[90%] h-11 text-xl rounded-xl px-4"
          type="text"
          placeholder="Enter Your Name"
        ></input>
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

        <div className=" w-full flex justify-center items-center relative">
          <div
            onClick={() => {
              setIsEye2(!isEye2);
            }}
            className=" absolute text-2xl right-[2.5vw] cursor-pointer"
          >
            {isEye2 ? <FaRegEye></FaRegEye> : <FaRegEyeSlash></FaRegEyeSlash>}
          </div>
          <input
            ref={cPassword}
            className=" w-[90%] h-11 text-xl rounded-xl px-4"
            type={!isEye2 ? "password" : "text"}
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
            Sign Up
          </button>

          <h1 className=" w-[90%] my-1 text-center">OR</h1>

          <div onClick={signupgoogleHandler} className=" cursor-pointer w-[90%] bg-blue-600 h-12 text-2xl text-white rounded-xl transition-all hover:bg-blue-500 flex justify-center items-center gap-2">
            Sign Up With Google{" "}
            <FcGoogle className=" bg-white text-3xl rounded-full"></FcGoogle>
          </div>
        </div>
        <div className=" -mt-3 text-center">
          <p className=" text-lg ">
            Already a Candidate ,{" "}
            <Link className=" italic underline" to="/candidateLogin">
              Login Here
            </Link>
          </p>
          <p className=" text-lg ">
            Already a User ,{" "}
            <Link className=" italic underline" to="/login">
              Login Here
            </Link>
          </p>
          <p className=" text-lg ">
            Signup as User ,{" "}
            <Link className=" italic underline" to="/">
              SignUp Here
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default SignUpCandidate;
