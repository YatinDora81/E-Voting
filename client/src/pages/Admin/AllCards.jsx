import React from "react";
import { Link } from "react-router-dom";

const AllCards = () => {
  return (
    <div className=" w-full h-full bg-slate-200 bg-opacity-80 px-10 py-5 dark:bg-slate-800 dark:text-white ">
      <div className=" flex items-center justify-start gap-12 py-7">
        <Link to="/admin/allCity">
          <div className=" border border-black h-44 w-[20vw] flex flex-col justify-center items-center px-3 rounded-3xl cursor-pointer dark:border-white">
            <h1 className=" text-3xl font-bold"> All City </h1>
            <p className=" text-lg font-semibold text-slate-700 dark:text-white ">
              Here You can approve city or reject city for voting
            </p>
          </div>
        </Link>

        <Link to="/admin/allCandidates">
          <div className=" border border-black h-44 w-[20vw] flex flex-col justify-center items-center px-3 rounded-3xl cursor-pointer dark:border-white">
            <h1 className=" text-3xl font-bold"> All Candidates </h1>
            <p className=" text-lg font-semibold text-slate-700 dark:text-white ">
              Here You can approve requests for Candidates
            </p>
          </div>
        </Link>

        
      </div>
    </div>
  );
};

export default AllCards;
