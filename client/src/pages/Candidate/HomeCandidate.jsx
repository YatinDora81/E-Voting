import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { addCData, addCity } from "../../redux/dbSlice";
import CandCard from "./CandCard";
import CandForm from "./CandForm";
import NavBar from "../../components/NavBar";
import Sidebar from "../../components/Sidebar";

const HomeCandidate = () => {
  const userInfo = useSelector((state) => state.user.userInfo);
  const dbData = useSelector((state) => state.db);
  const isSidebar = useSelector((state) => state.app.isSidebar);

  const navigate = useNavigate();
  //   console.log("Home ", userInfo);
  const dispatch = useDispatch();

  const useFechDbData = async () => {
    try {
      const res = await axios.get(
        "http://localhost:3000/api/v1/get-all-candiates"
      );

      // console.log(res);

      if (res.data.success === true) {
        dispatch(addCData(res.data.data));
        dispatch(addCity(res.data.city));
      }
    } catch (err) {
      console.log("err", err);
    }
  };

  useEffect(() => {
    useFechDbData();
  }, []);

  function findEmailMatch(dataArray, searchString) {
    for (let i = 0; i < dataArray.length; i++) {
      if (dataArray[i].createdByEmail === searchString) {
        return true; // Match found
      }
    }
    return false; // No match found
  }
  function findEmailMatchAndReturnObject(dataArray, searchString) {
    for (let i = 0; i < dataArray.length; i++) {
      if (dataArray[i].createdByEmail === searchString) {
        return dataArray[i]; // Return the object if match found
      }
    }
    return null; // Return null if no match found
  }

  const isForm = dbData.cdata;

  const searchString = userInfo?.email;
  const isMatch = findEmailMatch(isForm, searchString);

  const matchedObject = findEmailMatchAndReturnObject(isForm, searchString);

  //   console.log(isMatch);

  return (
    <div className=" h-full w-full bg-slate-100 dark:bg-slate-900">
      <div className=" h-[11vh]">
        <NavBar></NavBar>
      </div>
      <div className=" min-h-[89vh] flex w-full  gap-4 mt-[7px]">
        {isSidebar && (
          <div className=" w-[12vw] h-full ">
            <Sidebar></Sidebar>
          </div>
        )}
        <div className={isSidebar ? " w-full h-full" : " w-full h-full"}>
          {isMatch ? (
            <CandCard data={matchedObject}></CandCard>
          ) : (
            <CandForm email={searchString}></CandForm>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomeCandidate;
