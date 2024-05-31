import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { addCData, addCity, changeUserVoted } from "../../redux/dbSlice";
import NavbarUser from "./NavbarUser";
import SidebarUser from "./SidebarUser";
import ResultPage from "./ResultPage";
import toast from "react-hot-toast";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { blue } from "@mui/material/colors";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  color: "red",
};

const AllCandidatesUser = () => {
  const userInfo = useSelector((state) => state.user.userInfo);
  const data = useSelector((state) => state.db.cdata);
  const orgCity = useSelector((state) => state.db.city);
  const userVoted = useSelector((state) => state.db.userVoted);
  const isSidebar = useSelector((state) => state.app.isSidebar);
  const [text, setText] = useState("All");
  const { city } = useParams();

  const [orgOTP, setORGOTP] = useState();
  const [currOtp, setCurrOtp] = useState();

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [id, setId] = useState("");

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
        
        const isPresent = isStringInVotes(res.data.data, searchString?.email);
        // console.log(isPresent);
        dispatch(changeUserVoted(isPresent))
        // const tell=
      }
    } catch (err) {
      console.log("err", err);
      setCurrOtp("")
    }
  };

  const handleOtpClick = async () => {
    if (currOtp === orgOTP) {
      handleClose();

      //sys
      //   console.log("Otp match");
      // success addvotes api call then refresh data
      console.log(id);
      try {
        //add vote api
        const otp = await axios.post("http://localhost:3000/api/v1/add-vote", {
          "email": userInfo.email, "candidateId" : id
        });
        const votedSuccess = otp.data.success;
        // console.log(otpcode);
        
        if(votedSuccess){

            // refreshData
            toast.success("Voted Successfully")
            useFechDbData()
        }



      } catch (error) {
        console.log(error);
        toast.error("Internal Server error. Please Try Again later!!!");
        setCurrOtp("")
      }
    } else {
      handleClose();
      toast.error("Otp Not Matched !!!");
      setCurrOtp("");
    }
  };

  const findCityValue = (city, cityName) => {
    // Find the object in the city array with matching name
    const cityObj = city.find((obj) => obj.name === cityName);

    // If a matching object is found, return its value, otherwise return null
    return cityObj ? cityObj.value : null;
  };

  const cityValue = findCityValue(orgCity, city);
  // console.log(cityValue);

  const cdata = data.filter((d) => d.city === city);

  return (
    <div className=" h-full w-full bg-slate-100 dark:bg-slate-900">
      <div className=" h-[11vh]">
        <NavbarUser></NavbarUser>
      </div>
      <div className=" min-h-[89vh] flex w-full  gap-4 mt-[7px]">
        {isSidebar && (
          <div className=" w-[12vw] h-full ">
            <SidebarUser></SidebarUser>
          </div>
        )}
        <div className={isSidebar ? " w-full h-full" : " w-full h-full"}>
          <h1 className="px-10 py-2 text-5xl dark:text-white font-bold underline text-center">
            All Candidates of {city}
          </h1>

          {cityValue === "no" ? (
            <ResultPage></ResultPage>
          ) : (
            <div className=" px-10 py-5">
              {cdata.length === 0 ? (
                <div className=" dark:text-white text-black">
                  No Canndidates Found
                </div>
              ) : (
                <div className=" text-white flex flex-col gap-4">
                  {cdata.map((d,i) => (
                    <div key={i} className=" w-full flex justify-between px-10 py-5 border rounded-2xl border-black dark:border-white text-2xl text-black dark:text-white ">
                      <div className=" flex gap-4">
                        <img
                          src={d?.imageUrl}
                          alt="candidate photo"
                          className=" w-64 h-64 object-cover object-center"
                        ></img>
                        <div className=" flex flex-col justify-center items-start text-3xl gap-2 font-semibold">
                          <h1>Name : {d?.cname}</h1>
                          <h1>PartyName : {d?.partyName}</h1>
                          <h1>Slogans : {d?.slogans}</h1>
                          <h1>City : {d?.city}</h1>
                        </div>
                      </div>
                      <div className="flex gap-8 justify-center items-center">
                        {userVoted ? (
                          <button
                            onClick={() => {
                              toast.success("You Have Already Voted");
                            }}
                            className=" text-2xl border px-4 py-2 bg-gray-500"
                          >
                            {" "}
                            You Have Already Voted{" "}
                          </button>
                        ) : (
                          <button
                            onClick={async () => {
                              handleOpen();
                              try {
                                const otp = await axios.post(
                                  "http://localhost:3000/api/v1/get-otp",
                                  {
                                    email: userInfo.email,
                                  }
                                );
                                const otpcode = otp.data.otp;
                                console.log(otpcode);
                                console.log("hello");
                                setORGOTP(otpcode);
                                setId(d?._id);
                              } catch (error) {
                                setId("");
                                console.log(error);
                              }
                            }}
                            className=" text-2xl border px-4 py-2 bg-green-500"
                          >
                            {" "}
                            Vote Now{" "}
                          </button>
                        )}
                      </div>
                      <Modal
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                      >
                        <div
                          style={{
                            position: "absolute",
                            top: "50%",
                            left: "50%",
                            transform: "translate(-50%, -50%)",
                            backgroundColor: "whitesmoke",
                            width: "30vw",
                            height: "20vh",
                          }}
                          className=" flex flex-col justify-center items-center gap-9"
                        >
                          <h1 className=" text-2xl font-bold text-center ">
                            Email Otp Verification
                          </h1>
                          <div className="   mx-auto w-full ">
                            <div className="w-full flex justify-center items-center px-32">
                              <input
                                className=" h-12 rounded-l-full px-4 text-white text-xl bg-slate-800"
                                type="text"
                                placeholder="Enter OTP"
                                value={currOtp}
                                onChange={(e) => {
                                  setCurrOtp(e.target.value);
                                }}
                              ></input>
                              <button
                                onClick={handleOtpClick}
                                className=" h-12 bg-blue-700 text-xl text-white min-w-28 rounded-r-full hover:opacity-80"
                              >
                                Verify Otp
                              </button>
                            </div>
                          </div>
                        </div>
                      </Modal>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AllCandidatesUser;
