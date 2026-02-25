import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { motion } from "motion/react"
import { BsRobot, BsCoin, BsSun, BsMoon } from "react-icons/bs";
import { HiOutlineLogout } from "react-icons/hi";
import { FaUserAstronaut } from "react-icons/fa";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ServerUrl } from '../App';
import { setUserData } from '../redux/userSlice';
import { toggleTheme } from '../redux/themeSlice';
import AuthModel from './AuthModel';
function Navbar() {
    const { userData } = useSelector((state) => state.user)
    const { theme } = useSelector((state) => state.theme)
    const [showCreditPopup,setShowCreditPopup] = useState(false)
    const [showUserPopup,setShowUserPopup] = useState(false)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [showAuth, setShowAuth] = useState(false);

    const handleLogout = async () => {
        try {
            await axios.get(ServerUrl + "/api/auth/logout" , {withCredentials:true})
            dispatch(setUserData(null))
            setShowCreditPopup(false)
            setShowUserPopup(false)
            navigate("/")

        } catch (error) {
            console.log(error)
        }
    }
  return (
    <div className='flex justify-center px-4 pt-6 relative z-20'>
        <motion.div 
        initial={{opacity:0 , y:-40}}
        animate={{opacity:1 , y:0}}
        transition={{duration: 0.3}}
        className='w-full max-w-6xl bg-slate-800/80 backdrop-blur-xl rounded-2xl shadow-xl border border-slate-600 px-8 py-4 flex justify-between items-center relative'>
            <div 
              onClick={() => navigate("/")}
              className='flex items-center gap-3 cursor-pointer group'>
                <div className='bg-gradient-to-br from-blue-700 to-indigo-700 text-white p-2 rounded-xl shadow-md group-hover:shadow-lg transition-shadow'>
                    <BsRobot size={18}/>
                </div>
                <h1 className='font-bold hidden md:block text-lg bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent'>InterviewMitra</h1>
            </div>

            <div className='flex items-center gap-4 relative'>
                <button
                    onClick={() => dispatch(toggleTheme())}
                    className='p-2.5 rounded-xl bg-slate-700/80 border border-slate-600 hover:bg-slate-600/80 transition text-slate-300 hover:text-blue-600'
                    title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
                >
                    {theme === 'dark' ? <BsSun size={18} /> : <BsMoon size={18} />}
                </button>
                <div className='relative'>
                    <button onClick={()=>{
                        if(!userData){
                            setShowAuth(true)
                            return;
                        }
                        setShowCreditPopup(!showCreditPopup);
                        setShowUserPopup(false)
                    }} className='flex items-center gap-2 bg-slate-700/80 border border-slate-600 px-4 py-2 rounded-xl text-md font-medium text-blue-600 hover:bg-slate-600/80 transition'>
                        <BsCoin size={20} className="text-blue-600"/>
                        {userData?.credits || 0}
                    </button>

                    {showCreditPopup && (
                        <div className='absolute right-[-50px] mt-3 w-64 bg-slate-800 shadow-xl border border-slate-600 rounded-2xl p-5 z-50'>
                            <p className='text-sm text-slate-300 mb-4'>Need more credits to continue interviews?</p>
                            <button onClick={()=>navigate("/pricing")} className='w-full bg-gradient-to-r from-blue-700 to-indigo-700 text-white py-2.5 rounded-xl text-sm font-semibold hover:opacity-90 transition'>Buy more credits</button>
                        </div>
                    )}
                </div>

                <div className='relative'>
                    <button
                    onClick={()=>{
                         if(!userData){
                            setShowAuth(true)
                            return;
                        }
                        setShowUserPopup(!showUserPopup);
                        setShowCreditPopup(false)
                    }} className='w-10 h-10 bg-gradient-to-br from-blue-700 to-indigo-700 text-white rounded-xl flex items-center justify-center font-bold shadow-md hover:shadow-lg transition-shadow'>
                        {userData ? userData?.name.slice(0,1).toUpperCase() : <FaUserAstronaut size={16}/>}
                    </button>

                    {showUserPopup && (
                        <div className='absolute right-0 mt-3 w-48 bg-slate-800 shadow-xl border border-slate-600 rounded-2xl p-4 z-50'>
                            <p className='text-md text-blue-600 font-semibold mb-2'>{userData?.name}</p>
                            <button onClick={()=>navigate("/history")} className='w-full text-left text-sm py-2.5 px-3 rounded-lg hover:bg-slate-700 text-slate-300 hover:text-blue-600 transition'>Interview History</button>
                            <button onClick={()=>navigate("/dashboard")} className='w-full text-left text-sm py-2.5 px-3 rounded-lg hover:bg-slate-700 text-slate-300 hover:text-blue-600 transition'>Progress Dashboard</button>
                            <button onClick={handleLogout} 
                            className='w-full text-left text-sm py-2.5 px-3 rounded-lg flex items-center gap-2 text-red-400 hover:bg-red-500/20 transition'>
                                <HiOutlineLogout size={16}/>
                                Logout</button>
                        </div>
                    )}
                </div>

            </div>



        </motion.div>

        {showAuth && <AuthModel onClose={()=>setShowAuth(false)}/>}
      
    </div>
  )
}

export default Navbar
