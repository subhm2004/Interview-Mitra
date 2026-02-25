import React from 'react'
import { BsRobot } from "react-icons/bs";
import { IoSparkles } from "react-icons/io5";
import { motion } from "motion/react"
import { FcGoogle } from "react-icons/fc";
import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from '../utils/firebase';
import axios from 'axios';
import { ServerUrl } from '../App';
import { useDispatch } from 'react-redux';
import { setUserData } from '../redux/userSlice';
function Auth({isModel = false}) {
    const dispatch = useDispatch()

    const handleGoogleAuth = async () => {
        try {
            const response = await signInWithPopup(auth,provider)
            let User = response.user
            let name = User.displayName
            let email = User.email
            const result = await axios.post(ServerUrl + "/api/auth/google" , {name , email} , {withCredentials:true})
            dispatch(setUserData(result.data))
            


            
        } catch (error) {
            console.log(error)
              dispatch(setUserData(null))
        }
    }
  return (
    <div className={`
      w-full 
      ${isModel ? "py-4" : "min-h-screen bg-slate-950 flex items-center justify-center px-6 py-20"}
    `}>
        <motion.div 
        initial={{opacity:0 , y:-40}} 
        animate={{opacity:1 , y:0}} 
        transition={{duration:0.6}}
        className={`
        w-full 
        ${isModel ? "max-w-md p-8 rounded-3xl" : "max-w-lg p-12 rounded-[32px]"}
        bg-slate-800/95 backdrop-blur-xl shadow-2xl border border-slate-600
      `}>
            <div className='flex items-center justify-center gap-3 mb-6'>
                <div className='bg-gradient-to-br from-blue-700 to-indigo-700 text-white p-2.5 rounded-xl shadow-md'>
                    <BsRobot size={18}/>
                </div>
                <h2 className='font-bold text-lg bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent'>InterviewMitra</h2>
            </div>

            <h1 className='text-2xl md:text-3xl font-bold text-center leading-snug mb-4 text-slate-100'>
                Continue with
                <span className='bg-gradient-to-r from-blue-700 to-indigo-700 text-white px-4 py-1.5 rounded-xl inline-flex items-center gap-2 mt-2'>
                    <IoSparkles size={18}/>
                    AI Smart Interview
                </span>
            </h1>

            <p className='text-slate-400 text-center text-sm md:text-base leading-relaxed mb-8'>
                Sign in to start AI-powered mock interviews,
                track your progress, and unlock detailed performance insights.
            </p>


            <motion.button 
            onClick={handleGoogleAuth}
            whileHover={{ scale:1.03, y: -2 }}
            whileTap={{ scale:0.98 }}
            className='w-full flex items-center justify-center gap-3 py-4 bg-gradient-to-r from-blue-700 to-indigo-700 text-white rounded-2xl font-semibold shadow-xl shadow-blue-900/20 hover:shadow-2xl transition-all'>
                <FcGoogle size={22}/>
                Continue with Google
            </motion.button>
        </motion.div>

      
    </div>
  )
}

export default Auth
