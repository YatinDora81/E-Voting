import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import SIdeBarAdmin from "./SIdeBarAdmin";
import NavbarAdmin from "./NavbarAdmin";
import { addCData, addCity } from "../../redux/dbSlice";
import { baseurl } from "../../utils/passwords";

const AllCityAdmin = () => {
  const userInfo = useSelector((state) => state.user.userInfo);
  const cdata = useSelector((state) => state.db.cdata);
  const city = useSelector((state) => state.db.city);
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

  //   console.log(isMatch);

  return (
    <div className=" h-full w-full bg-slate-100 dark:bg-slate-900">
      <div className=" h-[11vh]">
        <NavbarAdmin></NavbarAdmin>
      </div>
      <div className=" min-h-[89vh] flex w-full  gap-4 mt-[7px]">
        {isSidebar && (
          <div className=" w-[12vw] h-full ">
            <SIdeBarAdmin></SIdeBarAdmin>
          </div>
        )}
        <div className={isSidebar ? " w-full h-full" : " w-full h-full"}>
            <h1 className="px-10 py-2 text-5xl dark:text-white font-bold underline text-center">All Cities</h1>
            <div className=" px-10 py-5">

                {
                    city.length===0 ? <div className=" dark:text-white text-black">No City Found</div> : 
                    <div className=" text-white flex flex-col gap-4">

                        {
                            city.map((d,i)=>(<div key={i} className=" w-full flex justify-between px-10 py-5 border rounded-2xl border-black dark:border-white text-2xl text-black dark:text-white ">
                                <h1 className=" text-3xl font-bold">{d?.name}</h1>
                                <div className="flex gap-8 justify-center items-center">
                                    <p className=" text-2xl">Current Status { (d?.value==="yes" || d?.value==="Yes") ?<span className=" text-green-600">Running</span> : <span className=" text-red-600">Stoped</span> }</p>
                                <button onClick={async()=>{
                                    const data =await axios.post(baseurl+"/api/v1/approve-city" , {"name" : d.name});
                                    // refreshData()
                                    useFechDbData()
                                }} className=" text-2xl border px-4 py-2 bg-green-500"> Run For Voting </button>
                                <button onClick={async()=>{
                                    const data = await axios.post(baseurl+"/api/v1/reject-city" , {"name" : d.name});
                                    // refreshData()
                                    useFechDbData()
                                }} className=" text-2xl border px-4 py-2 bg-red-500"> Stop For Voting </button>
                                    </div>
                            </div>))
                        }

                    </div>
                }

            </div>
        </div>
      </div>
    </div>
  );
};

export default AllCityAdmin;
