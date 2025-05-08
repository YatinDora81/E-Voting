import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import SIdeBarAdmin from "./SIdeBarAdmin";
import NavbarAdmin from "./NavbarAdmin";
import { addCData, addCity } from "../../redux/dbSlice";
import { baseurl } from "../../utils/passwords";

const AllCandidatesAdmin = () => {
  const userInfo = useSelector((state) => state.user.userInfo);
  const cdata = useSelector((state) => state.db.cdata);
  const isSidebar = useSelector((state) => state.app.isSidebar);
  const [text,setText] = useState("All")
  

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
            <h1 className="px-10 py-2 text-5xl dark:text-white font-bold underline text-center">All Candidates</h1>
            {/* <div className=" dark:text-white px-16 flex gap-5"> 
                <button className=" border border-black dark:border-white px-6 py-2 text-2xl rounded-3xl hover:opacity-60">All</button>
                <button className=" border border-black dark:border-white px-6 py-2 text-2xl rounded-3xl hover:opacity-60">Approved</button>
                <button className=" border border-black dark:border-white px-6 py-2 text-2xl rounded-3xl hover:opacity-60">Rejected</button>
                <button className=" border border-black dark:border-white px-6 py-2 text-2xl rounded-3xl hover:opacity-60">Pending</button>    
            </div>
            <h1 className=" text-4xl mt-2 text-black dark:text-white  px-16 py-3">{text} Candidates</h1> */}
            <div className=" px-10 py-5">

                {
                    cdata.length===0 ? <div className=" dark:text-white text-black">No Canndidates Found</div> : 
                    <div className=" text-white flex flex-col gap-4">

                        {
                            cdata.map((d,i)=>(<div key={i} className=" w-full flex justify-between px-10 py-5 border rounded-2xl border-black dark:border-white text-2xl text-black dark:text-white ">
                                <div className=" flex gap-4">
                                    <img src={d?.imageUrl} alt="candidate photo" className=" w-64 h-64 object-cover object-center"></img>
                                    <div>
                                        <h1>Name : {d?.cname}</h1>
                                        <h1>City : {d?.city}</h1>
                                        <h1>PartyName : {d?.partyName}</h1>
                                        <h1>Slogans : {d?.slogans}</h1>
                                        <h1>Address : {d?.address}</h1>
                                        <h1>Pincode : {d?.pincode}</h1>
                                        <h1>Age : {d?.age}</h1>
                                    </div>
                                </div>
                                <div className="flex gap-8 justify-center items-center">
                                    <p className=" text-2xl">Current Status { (d?.visible==="yes" || d?.visible==="Yes") ? <span className=" text-green-600">Running</span> : (d?.visible==="no") ? <span className=" text-red-600">Stoped</span> : <span className=" text-yellow-500">Pending</span>} </p>
                                <button onClick={async()=>{
                                    const data =await axios.post(baseurl+"/api/v1/approve-candidate" , {"id" : d?._id});
                                    // refreshData()
                                    useFechDbData()
                                }} className=" text-2xl border px-4 py-2 bg-green-500"> Approve </button>
                                <button onClick={async()=>{
                                    const data = await axios.post(baseurl+"/api/v1/reject-candidate" , {"id" : d?._id});
                                    // refreshData()
                                    useFechDbData()
                                }} className=" text-2xl border px-4 py-2 bg-red-500"> Reject </button>
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

export default AllCandidatesAdmin;
