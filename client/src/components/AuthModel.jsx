import React from 'react'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { FaTimes } from "react-icons/fa";
import Auth from '../pages/auth';

function AuthModel({onClose, onSuccess}) {
    const {userData} = useSelector((state)=>state.user)

    useEffect(()=>{
        if(userData){
            onClose()
            onSuccess?.()
        }
    },[userData , onClose, onSuccess])

  return (
    <div className='fixed inset-0 z-[999] flex items-center justify-center bg-black/60 backdrop-blur-md px-4'>
        <div className='relative w-full max-w-md'>
            <button onClick={onClose} className='absolute -top-2 -right-2 z-10 w-10 h-10 bg-slate-700 rounded-full shadow-lg flex items-center justify-center text-slate-300 hover:text-blue-600 hover:bg-slate-600 transition-all'>
             <FaTimes size={18}/>
            </button>
            <Auth isModel={true}/>
        </div>
    </div>
  )
}

export default AuthModel
