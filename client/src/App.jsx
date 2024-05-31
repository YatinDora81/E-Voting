import {createBrowserRouter , RouterProvider} from "react-router-dom"
import SignUpUser from './pages/User/SignUpUser.jsx'
import SignUpCandidate from './pages/Candidate/SignUpCandidate.jsx'
import LoginCandidate from './pages/Candidate/LoginCandidate.jsx'
import HomeCandidate from "./pages/Candidate/HomeCandidate.jsx"
import HomeAdmin from "./pages/Admin/HomeAdmin.jsx"
import LoginAdmin from "./pages/Admin/LoginAdmin.jsx"
import AllCityAdmin from "./pages/Admin/AllCityAdmin.jsx"
import AllCandidatesAdmin from "./pages/Admin/AllCandidatesAdmin.jsx"
import HomeUser from "./pages/User/HomeUser.jsx"
import LoginUser from "./pages/User/LoginUser.jsx"
import AllCandidatesUser from "./pages/User/AllCandidatesUser.jsx"
import  { Toaster } from 'react-hot-toast';
import ForgotPassword from "./pages/User/ForgotPassword.jsx"
import ForgotPasswordCandidate from "./pages/Candidate/ForgotPasswordCandidate.jsx"

function App() {

  const router = createBrowserRouter([
    {
      path : '/',
      element : <SignUpUser></SignUpUser>
    },
    {
      path : '/login',
      element : <LoginUser></LoginUser>
    },
    {
      path : '/homeUser',
      element : <HomeUser></HomeUser>
    },
    {
      path : '/pass-reset',
      element : <ForgotPassword></ForgotPassword>
    },
    {
      path : '/pass-reset-cand',
      element : <ForgotPasswordCandidate></ForgotPasswordCandidate>
    },
    {
      path : '/user/:city',
      element : <AllCandidatesUser></AllCandidatesUser>
    },
    {
      path : '/candidateSignup',
      element : <SignUpCandidate></SignUpCandidate>
    },
    {
      path : '/candidateLogin',
      element : <LoginCandidate></LoginCandidate>
    },
    {
      path : '/homeCandidate',
      element : <HomeCandidate></HomeCandidate>
    },
    {
      path : '/admin',
      element : <LoginAdmin></LoginAdmin>,
    },
    {
      path : '/admin/home',
      element : <HomeAdmin></HomeAdmin>,
    },
    {
      path : '/admin/allCity',
      element : <AllCityAdmin></AllCityAdmin>
    },
    {
      path : '/admin/allCandidates',
      element : <AllCandidatesAdmin></AllCandidatesAdmin>
    },
  
  ])

  return (
    <>
    
    <RouterProvider router={router}></RouterProvider>
    <Toaster></Toaster>
    </>
  )
}

export default App

{/* <h1 className=" w-full h-24 bg-slate-200 bg-gradient-to-b from-blue-300 ">yatin</h1>
<div className=" w-full h-[100vh] bg-slate-100">j</div>
<div className=" absolute w-36 h-[100vh] bg-blue-300 bg-opacity-30 top-0 left-0"></div> */}