import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { addCData, addCity, changeUserVoted } from "../../redux/dbSlice";
import NavBar from "../../components/NavBar";
import Sidebar from "../../components/Sidebar";
import NavbarUser from "./NavbarUser";
import SidebarUser from "./SidebarUser";
import AllCityUser from "./AllCityUser";

const HomeUser = () => {
  const userInfo = useSelector((state) => state.user.userInfo);
  const dbData = useSelector((state) => state.db);
  const isSidebar = useSelector((state) => state.app.isSidebar);
  
  const navigate = useNavigate();
  //   console.log("Home ", userInfo);
  const dispatch = useDispatch();
  
  
  
  const searchString = useSelector((state)=>state.user.userInfo)
  const isStringInVotes = (data, searchString) => {
    // Iterate over each object in the data array
    return data.some((obj) => {
      // Check if the object has a votes array and if it contains the search string
      return obj.votes && obj.votes.includes(searchString);
    });
  };
  const useFechDbData = async () => {
    try {
      const res = await axios.get(
        "http://localhost:3000/api/v1/get-all-candiates"
      );

      // console.log(res);

      if (res.data.success === true) {
        dispatch(addCData(res.data.data));
        dispatch(addCity(res.data.city));

        const allVotes = res.data.allVotes
        const isPres = allVotes?.some(vote => vote?.name === searchString?.email);
        
        // const isPresent = isStringInVotes(res.data.data, searchString?.email);
        // console.log(isPresent);
        dispatch(changeUserVoted(isPres))
        // const tell=
      }
    } catch (err) {
      console.log("err", err);
    }
  };

  useEffect(() => {
    useFechDbData();
  }, []);

  //   console.log(isMatch);

  return (
    <div className="  h-full w-full bg-slate-100 dark:bg-slate-900">
      <div className=" h-[11vh]">
        <NavbarUser></NavbarUser>
      </div>
      <div className=" min-h-[89vh] flex w-full  gap-4 mt-[7px] ">
        {isSidebar && (
          <div className=" w-[12vw] h-full ">
            <SidebarUser></SidebarUser>
          </div>
        )}
        <div className="w-full h-full">
            <AllCityUser></AllCityUser>
        </div>
      </div>
    </div>
  );
};

export default HomeUser;
