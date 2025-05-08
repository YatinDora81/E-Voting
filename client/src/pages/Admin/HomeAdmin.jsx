import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { addCData, addCity } from "../../redux/dbSlice";
import NavBar from "../../components/NavBar";
import SIdeBarAdmin from "./SIdeBarAdmin";
import NavbarAdmin from "./NavbarAdmin";
import AllCards from "./AllCards";
import { baseurl } from "../../utils/passwords";

const HomeAdmin = () => {
  const userInfo = useSelector((state) => state.user.userInfo);
  const dbData = useSelector((state) => state.db);
  const isSidebar = useSelector((state) => state.app.isSidebar);

  const navigate = useNavigate();
  //   console.log("Home ", userInfo);
  const dispatch = useDispatch();

  const useFechDbData = async () => {
    try {
      const res = await axios.get(
        baseurl+"/api/v1/get-all-candiates"
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

  

  //   console.log(isMatch);

  return (
    <div className=" h-full w-full bg-slate-100 dark:bg-slate-900">
      <div className=" h-[11vh]">
        <NavbarAdmin></NavbarAdmin>
      </div>
      <div className=" min-h-[89vh] h-full flex w-full  gap-4 mt-[7px]">
        {isSidebar && (
          <div className=" w-[12vw] h-full ">
            <SIdeBarAdmin></SIdeBarAdmin>
          </div>
        )}
        <div className=" min-h-full w-full">
          <AllCards></AllCards>
        </div>
      </div>
    </div>
  );
};

export default HomeAdmin;
