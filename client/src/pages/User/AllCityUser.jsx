import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { addCData, addCity } from "../../redux/dbSlice";
import NavbarUser from "./NavbarUser";
import SidebarUser from "./SidebarUser";

const AllCityUser = () => {
  const userInfo = useSelector((state) => state.user.userInfo);
  const cdata = useSelector((state) => state.db.cdata);
  const city = useSelector((state) => state.db.city);
  const isSidebar = useSelector((state) => state.app.isSidebar);

  const navigate = useNavigate();
  //   console.log("Home ", userInfo);
  const dispatch = useDispatch();

  const searchString = useSelector((state) => state.user.userInfo);

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
        const allvotes = res.data.allVotes
        const isPres = allvotes.some(vote => vote.name === searchString?.email);

        // const isPresent = isStringInVotes(res.data.data, searchString?.email);
        // console.log(isPresent);
        dispatch(changeUserVoted(isPres));
        // const tell=
      }
    } catch (err) {
      console.log("err", err);
    }
  };

  //   console.log(isMatch);

  return (
    <div className=" min-h-full h-fit w-full bg-slate-100 dark:bg-slate-900">
      <div className=" min-h-[89vh] flex w-full  h-fit gap-4 mt-[7px]">
        <div className={isSidebar ? " w-full h-full" : " w-full h-full"}>
          <h1 className="px-10 py-2 text-5xl dark:text-white font-bold underline text-center">
            All Cities
          </h1>
          <div className=" px-10 py-5">
            {city.length === 0 ? (
              <div className=" dark:text-white text-black">No City Found</div>
            ) : (
              <div className=" text-white flex flex-col gap-4 min-h-fit">
                {city.map((d,i) => (
                  <Link key={i} to={"/user/"+d?.name}>
                    <div className=" w-full flex justify-between px-12 py-5 border rounded-2xl border-black dark:border-white text-2xl text-black dark:text-white ">
                      <h1 className=" text-3xl font-bold">{d?.name}</h1>
                      <div className="flex gap-8 justify-center items-center">
                        <p className=" text-2xl">
                          Current Status{" "}
                          {d?.value === "yes" || d?.value === "Yes" ? (
                            <span className=" text-green-600">Running</span>
                          ) : (
                            <span className=" text-red-600">Stoped</span>
                          )}
                        </p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllCityUser;
