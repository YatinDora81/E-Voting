import React from "react";

const CandCard = ({ data }) => {
//   console.log(data);
  const approval = data?.visible;

  return (
    <div className=" bg-slate-100 dark:bg-slate-800 dark:text-white pl-10 rounded-2xl w-full h-full">
      <div className=" w-full h-full flex  gap-8 flex-col items-center py-10">
        <h1 className=" text-5xl underline">Candidate Details</h1>
        <div className=" flex justify-between items-center capitalize w-9/12 py-10 border border-black px-10 rounded-2xl">
          <div className=" text-3xl flex flex-col gap-5">
            <div>Candidate Name : {data?.cname}</div>
            <div>Party Name : {data?.partyName}</div>
            <div>City : {data?.city}</div>
            <div>Candidate Age : {data?.age}</div>
            <div>Slogans{data?.slogans}</div>
            <div>Pincode : {data?.pincode}</div>
            <div>
              {" "}
              Approval Status : {approval === "yes"
                ? "Approved"
                : "Pending"}{" "}
            </div>
          </div>
          <div>
            <img src={data?.imageUrl} className=" w-[70vh] h-[50vh] object-cover object-center" alt="image"></img>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CandCard;
