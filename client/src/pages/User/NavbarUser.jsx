import React from "react";
import { MdDarkMode, MdLightMode } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { changeSideBar, changeTheme } from "../../redux/appSlice";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";
import { useNavigate } from "react-router-dom";
import { getInitials } from "../../utils/getInitials";
import { IoMenu } from "react-icons/io5";

const NavbarUser = () => {
  const isDark = useSelector((state) => state.app.darkTheme);
  const userInfo = useSelector((state) => state.user.userInfo);
  
  const dispatch = useDispatch()
  const navigate = useNavigate()
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

  const logoutHandler = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        navigate("/login")

      })
      .catch((error) => {
        // An error happened.
        console.log(error);
      });
  };

  return (
    <div className=" flex  justify-between items-center text-4xl bg-slate-300 dark:bg-slate-900 bg-gradient-to-b from-blue-300 dark:from-slate-800 w-full h-full pr-24  pl-16 -mt-2 dark:text-white">
      <div className=" flex gap-2 justify-center items-center">
        <div onClick={()=>{dispatch(changeSideBar())}} className=" text-4xl"><IoMenu></IoMenu></div>
        <div><span className=" text-5xl text-green-600">E</span>Voting</div>
      </div>

      <div className=" flex gap-5 items-center">

        <div
          onClick={themeChange}
          className=" text-4xl border rounded-full border-black dark:border-none"
        >
          {isDark ? (
            <MdLightMode className=" dark:text-white"></MdLightMode>
          ) : (
            <MdDarkMode></MdDarkMode>
          )}
        </div>

        <div className=" flex gap-1 items-center">
        <div className=" text-2xl bg-slate-200 w-10 h-10 flex justify-center items-center rounded-full dark:text-black">{getInitials(userInfo?.displayName)}</div>
        <div className=" text-2xl ">{userInfo?.displayName}</div>
        </div>
        <button onClick={logoutHandler} className=" text-xl hover:bg-blue-500 font-semibold bg-blue-700 text-white py-2 px-4">SignOut</button>
      </div>
    </div>
  );
};

export default NavbarUser;
