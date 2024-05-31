import { signOut } from 'firebase/auth';
import React from 'react'
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';

const Sidebar = () => {

    const navigate = useNavigate()

    const logoutHandler = () => {
        signOut(auth)
          .then(() => {
            // Sign-out successful.
            navigate("/candidateLogin")
    
          })
          .catch((error) => {
            // An error happened.
            console.log(error);
          });
      };

  return (
    <div className=' min-h-full bg-slate-300 dark:bg-slate-900 bg-gradient-to-b from-blue-300 dark:from-slate-800 w-full py-5 flex flex-col items-center  -mt-1 dark:text-white gap-4'>
        <div className=' text-xl border border-black dark:border-white w-[80%] text-center  py-2 rounded-2xl cursor-pointer'>Home</div>
        <div onClick={logoutHandler} className=' text-xl border border-black dark:border-white w-[80%] text-center py-2 rounded-2xl cursor-pointer'>Sign Out</div>
    </div>
  )
}

export default Sidebar