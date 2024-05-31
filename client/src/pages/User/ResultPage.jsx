import React from "react";
import { PieChart } from "@mui/x-charts/PieChart";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const ResultPage = () => {

  const { city } = useParams();
  const data = useSelector((state) => state.db.cdata);
  const orgCity = useSelector((state) => state.db.city);

  const findCityValue = (city, cityName) => {
    // Find the object in the city array with matching name
    const cityObj = city.find((obj) => obj.name === cityName);

    // If a matching object is found, return its value, otherwise return null
    return cityObj ? cityObj.value : null;
  };

  const cityValue = findCityValue(orgCity, city);
  // console.log(cityValue);

  const cdata = data.filter((d) => d.city === city);
  cdata.sort((a, b) => b.votes.length - a.votes.length);

  console.log(cdata);

  return (
    <div className=" px-12 dark:text-white">
      <div className=" flex justify-center items-center h-[55vh] mt-10 dark:bg-blue-100 ">
        <PieChart 
          series={[
            {
              data: cdata.map((item, index) => ({
                id: index,
                value: item.votes.length,
                label: item.cname
            }))
            
            },
          ]}
          width={700}
          height={450}
          
        />
      </div>

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
                        <div className=" bg-green-700 text-white font-semibold px-5 py-2 rounded-3xl">Total Votes {d?.votes?.length}</div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
    </div>
  );
};

export default ResultPage;
