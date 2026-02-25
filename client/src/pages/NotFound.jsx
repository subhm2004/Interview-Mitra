import React from 'react'
import { useNavigate } from 'react-router-dom'
import { FaHome, FaArrowLeft } from 'react-icons/fa'
import { motion } from "motion/react"

function NotFound() {
  const navigate = useNavigate()
  return (
    <div className='min-h-screen bg-slate-950 flex items-center justify-center px-4'>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className='text-center max-w-md'
      >
        <p className='text-8xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent'>404</p>
        <h1 className='text-2xl font-bold text-slate-100 mt-4'>Page Not Found</h1>
        <p className='text-slate-400 mt-2'>The page you're looking for doesn't exist or has been moved.</p>
        <div className='flex gap-4 justify-center mt-8'>
          <button
            onClick={() => navigate(-1)}
            className='flex items-center gap-2 px-6 py-3 bg-slate-800 border border-slate-600 rounded-xl text-slate-200 hover:bg-slate-700 transition'
          >
            <FaArrowLeft /> Go Back
          </button>
          <button
            onClick={() => navigate("/")}
            className='flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-700 to-indigo-700 text-white rounded-xl hover:opacity-90 transition'
          >
            <FaHome /> Home
          </button>
        </div>
      </motion.div>
    </div>
  )
}

export default NotFound
