import React from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { clearUserInfo } from '../../redux/userSlice';

const SIdeBarAdmin = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const logoutHandler = () => {
        dispatch(clearUserInfo());
        navigate("/");
    };

  return (
    <div className=' min-h-[89vh] h-full bg-slate-300 dark:bg-slate-900 bg-gradient-to-b from-blue-300 dark:from-slate-800 w-full py-5 flex flex-col items-center  -mt-1 dark:text-white gap-4'>
        <div onClick={()=>{navigate("/admin/home")}} className=' text-xl border border-black dark:border-white w-[80%] text-center  py-2 rounded-2xl cursor-pointer'>Home</div>
        <div onClick={()=>{navigate("/admin/allCity")}} className=' text-xl border border-black dark:border-white w-[80%] text-center py-2 rounded-2xl cursor-pointer'>All Cites</div>
        <div onClick={()=>{navigate("/admin/allCandidates")}} className=' text-xl border border-black dark:border-white w-[80%] text-center py-2 rounded-2xl cursor-pointer'>All Candidates</div>
        <div onClick={logoutHandler} className=' text-xl border border-black dark:border-white w-[80%] text-center py-2 rounded-2xl cursor-pointer'>Sign Out</div>
    </div>
  )
}

export default SIdeBarAdmin