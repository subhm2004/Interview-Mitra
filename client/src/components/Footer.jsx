import React from 'react'
import { BsRobot } from 'react-icons/bs'
import { useNavigate } from 'react-router-dom'

function Footer() {
  const navigate = useNavigate()
  return (
    <div className='flex justify-center px-4 pb-10 py-4 pt-10 relative z-10'>
      <div className='w-full max-w-6xl bg-slate-800/80 backdrop-blur-xl rounded-2xl shadow-xl border border-slate-600 py-10 px-6 text-center'>
        <div className='flex justify-center items-center gap-3 mb-4'>
            <div className='bg-gradient-to-br from-blue-700 to-indigo-700 text-white p-2.5 rounded-xl shadow-md'><BsRobot size={18}/></div>
            <h2 className='font-bold text-lg bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent'>InterviewMitra</h2>
        </div>
        <p className='text-slate-400 text-sm max-w-xl mx-auto leading-relaxed'>
          AI-powered interview preparation platform designed to improve
          communication skills, technical depth and professional confidence.
        </p>
        <button onClick={() => navigate("/tips")} className="mt-4 text-blue-500 hover:text-blue-400 text-sm font-medium transition">
          Interview Tips →
        </button>
        <div className='mt-6 pt-6 border-t border-slate-600'>
          <p className='text-xs text-slate-500'>© {new Date().getFullYear()} InterviewMitra — Practice Smarter, Interview Better</p>
        </div>
      </div>
    </div>
  )
}

export default Footer
