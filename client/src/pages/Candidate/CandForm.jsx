import React, { useRef, useState } from "react";
import { validateCandidateForm } from "../../utils/validateCandidateForm";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addCData, addCity } from "../../redux/dbSlice";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { blue } from "@mui/material/colors";
import { cloud_name, folder, upload_preset } from "../../utils/passwords";

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

const CandForm = ({ email }) => {
  const dispatch = useDispatch();
  const cname = useRef();
  const address = useRef();
  const city = useRef();
  const pincode = useRef();
  const age = useRef();
  const slogans = useRef();
  const partyName = useRef();
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [orgOTP, setORGOTP] = useState();
  const [currOtp, setCurrOtp] = useState();

  const submitHandler = async (e) => {
    e.preventDefault();

    let s = validateCandidateForm(
      cname.current.value,
      address.current.value,
      city.current.value,
      pincode.current.value,
      age.current.value,
      slogans.current.value,
      partyName.current.value,
      file
    );

    // if(!file) setError("Please Select image for Candidate")
    if (s) {
      setError(s);
      return;
    }
    if (!s) setError("");

    setCurrOtp("")
    handleOpen();

    try {
      const otp = await axios.post("http://localhost:3000/api/v1/get-otp", {
        email: email,
      });
      const otpcode = otp.data.otp;
      // console.log(otpcode);
      setORGOTP(otpcode);
    } catch (error) {
      console.log(error);
      setError("Error in sending otp to email")
    }
  };

  const handleOtpClick = async () => {
    if (currOtp === orgOTP) {
      handleClose();
      try {
        const formdata = new FormData();
        formdata.append("file", file);
        formdata.append("upload_preset", upload_preset);
        formdata.append("cloud_name", cloud_name);
        formdata.append("folder", folder);
        const allData = await fetch(
          `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`,
          { method: "post", body: formdata }
        );
        const allDataJson = await allData.json();

        // console.log(allDataJson.secure_url);

        // let aa = city.current.value

        const { data } = await axios.post(
          "http://localhost:3000/api/v1/create-candidate",
          {
            cname: cname.current.value,
            address: address.current.value,
            city: city.current.value,
            pincode: pincode.current.value,
            age: age.current.value,
            slogans: slogans.current.value,
            partyName: partyName.current.value,
            imageUrl: allDataJson.secure_url,
            createdByEmail: email,
          }
        );

        // console.log(data);
        // setLoading(false)

        if (data.success && data.success === true) {
          // call api for geting data
          useFechDbData();
          // console.log(data);
          // setLoading(false)
        }
      } catch (data) {
        // console.log(data);
        // setLoading(false)
        if (
          data &&
          data.response &&
          data.response.data &&
          data.response.data.message
        )
          setError(data.response.data.message);
        else setError("Uploading Image Error");
      }
    } else {
      handleClose();
      setError("Otp Not Matching");
    }
  };

  // const email = useRef()
  const emaill = useRef();
  const sendOtp = async () => {};

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

  return (
    <div className="  bg-slate-200 dark:bg-slate-800 dark:text-white pl-10 rounded-2xl w-full h-full">
      <div className=" flex justify-center items-center h-full">
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
        <form
          onSubmit={submitHandler}
          className=" flex flex-col gap-8 border border-black dark:border-none py-28 px-20 rounded-xl"
        >
          <h1 className=" text-5xl font-bold text-center -mt-16 mb-7">
            Candiate Form
          </h1>
          <div className=" flex">
            <div>
              <label
                className=" text-2xl ml-5 mr-2 font-semibold text-black dark:text-white "
                htmlFor="a"
              >
                Candidate Name
              </label>
              <input
                ref={cname}
                className=" text-black py-2 px-4 rounded-2xl border"
                id="a"
                type="text"
              ></input>
            </div>
            <div>
              <label
                className=" text-2xl ml-5 mr-2 font-semibold text-black dark:text-white "
                htmlFor="f"
              >
                Party Name
              </label>
              <input
                ref={partyName}
                className=" text-black py-2 px-4 rounded-2xl border"
                id="f"
                type="text"
              ></input>
            </div>
            <div>
              <label
                className=" text-2xl ml-5 mr-2 font-semibold text-black dark:text-white "
                htmlFor="b"
              >
                City
              </label>
              <input
                ref={city}
                className=" text-black py-2 px-4 rounded-2xl border"
                id="b"
                type="text"
              ></input>
            </div>
          </div>
          <div className=" flex justify-evenly">
            <div>
              <label
                className=" text-2xl ml-5 mr-2 font-semibold text-black dark:text-white "
                htmlFor="c"
              >
                Pincode
              </label>
              <input
                ref={pincode}
                className=" text-black py-2 px-4 rounded-2xl border"
                id="c"
                type="text"
              ></input>
            </div>
            <div>
              <label
                className=" text-2xl ml-5 mr-2 font-semibold text-black dark:text-white "
                htmlFor="h"
              >
                Address
              </label>
              <input
                ref={address}
                className=" text-black py-2 px-4 rounded-2xl border"
                id="h"
                type="text"
              ></input>
            </div>
            <div>
              <label
                className=" text-2xl ml-5 mr-2 font-semibold text-black dark:text-white "
                htmlFor="d"
              >
                Age
              </label>
              <input
                ref={age}
                className=" text-black py-2 px-4 rounded-2xl border"
                id="d"
                type="text"
              ></input>
            </div>
          </div>
          <div className=" flex justify-evenly items-center">
            <div className=" flex justify-center items-center">
              <label
                className=" text-2xl ml-5 mr-2 font-semibold text-black dark:text-white "
                htmlFor="e"
              >
                Slogans
              </label>
              <textarea
                ref={slogans}
                rows={2}
                cols={60}
                className=" text-black py-2 px-4 rounded-2xl border"
                id="e"
                type="text"
              ></textarea>
            </div>

            <div>
              <label
                htmlFor="g"
                className=" text-3xl bg-slate-300 py-10 border border-black text-black font-bold px-5 rounded-2xl cursor-pointer"
              >
                Upload Your Image
              </label>
              <input
                id="g"
                hidden="true"
                type="file"
                accept="image/png, image/jpeg"
                onChange={(e) => setFile(e.target.files[0])}
              ></input>
            </div>
          </div>
          {error !== "" && (
            <p className=" text-red-600 text-center text-2xl ">{error}</p>
          )}
          <button className=" bg-blue-600 w-56 rounded-2xl cursor-pointer hover:bg-blue-500 mx-auto py-2 text-2xl">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default CandForm;
