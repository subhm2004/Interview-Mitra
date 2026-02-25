import React from 'react'
import Navbar from '../components/Navbar'
import { useSelector } from 'react-redux'
import { motion } from "motion/react";
import {
  BsRobot,
  BsMic,
  BsClock,
  BsBarChart,
  BsFileEarmarkText,
  BsStarFill,
  BsQuote
} from "react-icons/bs";
import { HiSparkles } from "react-icons/hi";
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import AuthModel from '../components/AuthModel';
import hrImg from "../assets/HR.png";
import techImg from "../assets/tech.png";
import confidenceImg from "../assets/confi.png";
import creditImg from "../assets/credit.png";
import evalImg from "../assets/ai-ans.png";
import resumeImg from "../assets/resume.png";
import pdfImg from "../assets/pdf.png";
import analyticsImg from "../assets/history.png";
import Footer from '../components/Footer';


function Home() {
  const { userData } = useSelector((state) => state.user)
  const [showAuth, setShowAuth] = useState(false);
  const [authRedirect, setAuthRedirect] = useState(null);
  const navigate = useNavigate()
  return (
    <div className='min-h-screen bg-slate-950 flex flex-col relative overflow-hidden'>
      <div className='absolute inset-0 overflow-hidden pointer-events-none'>
        <div className='absolute -top-40 -right-40 w-96 h-96 bg-blue-700/8 rounded-full blur-3xl' />
        <div className='absolute top-1/2 -left-20 w-72 h-72 bg-indigo-700/8 rounded-full blur-3xl' />
        <div className='absolute bottom-20 right-1/3 w-64 h-64 bg-blue-800/5 rounded-full blur-3xl' />
        <div className='absolute top-1/3 right-1/4 w-48 h-48 bg-indigo-600/5 rounded-full blur-3xl' />
      </div>
      <Navbar />

      <div className='flex-1 px-6 py-20 relative z-10'>
        <div className='max-w-6xl mx-auto'>

          <div className='flex justify-center mb-6'>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className='bg-slate-800/80 backdrop-blur-sm text-blue-600 text-sm px-5 py-2.5 rounded-full flex items-center gap-2 border border-blue-600/40'>
              <HiSparkles size={18} className="text-blue-600" />
              <span className='font-medium'>AI Powered Smart Interview Platform</span>
            </motion.div>
          </div>
          <div className='text-center mb-28'>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className='text-4xl md:text-6xl lg:text-7xl font-bold leading-tight max-w-4xl mx-auto tracking-tight text-slate-100'>
              Practice Interviews with
              <span className='relative inline-block mt-2'>
                <span className='bg-gradient-to-r from-blue-700 via-indigo-700 to-blue-800 text-white px-6 py-2 rounded-2xl shadow-xl shadow-blue-900/30'>
                  AI Intelligence
                </span>
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className='text-slate-400 mt-6 max-w-2xl mx-auto text-lg md:text-xl'>
              Role-based mock interviews with smart follow-ups,
              adaptive difficulty and real-time performance evaluation.
            </motion.p>

            <div className='flex flex-wrap justify-center gap-4 mt-12'>
              <motion.button
                onClick={() => {
                  if (!userData) {
                    setAuthRedirect("/interview")
                    setShowAuth(true)
                    return;
                  }
                  navigate("/interview")
                }}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className='bg-gradient-to-r from-blue-700 to-indigo-700 text-white px-10 py-4 rounded-2xl font-semibold shadow-xl shadow-blue-900/20 hover:shadow-2xl transition-all duration-300'>
                Start Interview
              </motion.button>

              <motion.button
                onClick={() => {
                  if (!userData) {
                    setAuthRedirect("/history")
                    setShowAuth(true)
                    return;
                  }
                  navigate("/history")
                }}
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className='bg-slate-800/80 backdrop-blur-sm border-2 border-blue-600/40 text-blue-600 px-10 py-4 rounded-2xl font-semibold hover:bg-slate-700/80 hover:border-blue-600 transition-all duration-300'>
                View History
              </motion.button>

              <motion.button
                onClick={() => {
                  if (!userData) {
                    setAuthRedirect("/dashboard")
                    setShowAuth(true)
                    return;
                  }
                  navigate("/dashboard")
                }}
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className='bg-slate-800/80 backdrop-blur-sm border-2 border-blue-600/40 text-blue-600 px-10 py-4 rounded-2xl font-semibold hover:bg-slate-700/80 hover:border-blue-600 transition-all duration-300'>
                Progress Dashboard
              </motion.button>
            </div>
          </div>

          <div className='flex flex-col md:flex-row justify-center items-center gap-10 mb-28'>
            {
              [
                {
                  icon: <BsRobot size={24} />,
                  step: "STEP 1",
                  title: "Role & Experience Selection",
                  desc: "AI adjusts difficulty based on selected job role."
                },
                {
                  icon: <BsMic size={24} />,
                  step: "STEP 2",
                  title: "Smart Voice Interview",
                  desc: "Dynamic follow-up questions based on your answers."
                },
                {
                  icon: <BsClock size={24} />,
                  step: "STEP 3",
                  title: "Timer Based Simulation",
                  desc: "Real interview pressure with time tracking."
                }
              ].map((item, index) => (
                <motion.div key={index}
                  initial={{ opacity: 0, y: 60 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 + index * 0.2 }}
                  whileHover={{ rotate: 0, scale: 1.06, y: -8 }}

                  className={`
        relative bg-slate-800/90 backdrop-blur-sm rounded-3xl border border-slate-600 
        hover:border-blue-600/40 p-10 w-80 max-w-[90%] shadow-xl hover:shadow-2xl hover:shadow-blue-900/10
        transition-all duration-300
        ${index === 0 ? "rotate-[-4deg]" : ""}
        ${index === 1 ? "rotate-[3deg] md:-mt-6 shadow-xl" : ""}
        ${index === 2 ? "rotate-[-3deg]" : ""}
      `}>

                  <div className='absolute -top-8 left-1/2 -translate-x-1/2 bg-gradient-to-br from-blue-700 to-indigo-700 text-white w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-900/30'>
                    {item.icon}</div>
                  <div className='pt-10 text-center'>
                    <div className='text-xs text-blue-600 font-semibold mb-2 tracking-wider'>{item.step}</div>
                    <h3 className='font-semibold mb-3 text-lg text-slate-100'>{item.title}</h3>
                    <p className='text-sm text-slate-400 leading-relaxed'>{item.desc}</p>
                  </div>


                </motion.div>
              ))
            }
          </div>


          <div className='mb-32'>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className='text-4xl font-bold text-center mb-16 text-slate-100'>
              Advanced AI{" "}
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Capabilities</span>
            </motion.h2>

            <div className='grid md:grid-cols-2 gap-10'>
              {
                [
                  {
                    image: evalImg,
                    icon: <BsBarChart size={20} />,
                    title: "AI Answer Evaluation",
                    desc: "Scores communication, technical accuracy and confidence."
                  },
                  {
                    image: resumeImg,
                    icon: <BsFileEarmarkText size={20} />,
                    title: "Resume Based Interview",
                    desc: "Project-specific questions based on uploaded resume."
                  },
                  {
                    image: pdfImg,
                    icon: <BsFileEarmarkText size={20} />,
                    title: "Downloadable PDF Report",
                    desc: "Detailed strengths, weaknesses and improvement insights."
                  },
                  {
                    image: analyticsImg,
                    icon: <BsBarChart size={20} />,
                    title: "History & Analytics",
                    desc: "Track progress with performance graphs and topic analysis."
                  }
                ].map((item, index) => (
                  <motion.div key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    whileHover={{ scale: 1.02, y: -4 }}
                    className='bg-slate-800/90 backdrop-blur-sm border border-slate-600 rounded-3xl p-8 shadow-sm hover:shadow-xl hover:border-blue-600/30 transition-all'>
                    <div className='flex flex-col md:flex-row items-center gap-8'>
                      <div className='w-full md:w-1/2 flex justify-center'>
                        <img src={item.image} alt={item.title} className='w-full h-auto object-contain max-h-64' />
                      </div>

                      <div className='w-full md:w-1/2'>
                        <div className='bg-blue-700/25 text-blue-600 w-12 h-12 rounded-xl flex items-center justify-center mb-6'>
                          {item.icon}
                        </div>
                        <h3 className='font-semibold mb-3 text-xl text-slate-100'>{item.title}</h3>
                        <p className='text-slate-400 text-sm leading-relaxed'>{item.desc}</p>
                      </div>

                    </div>


                  </motion.div>
                ))
              }
            </div>


          </div>

          <div className='mb-32'>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className='text-4xl font-bold text-center mb-16 text-slate-100'>
              Multiple Interview{" "}
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Modes</span>
            </motion.h2>

            <div className='grid md:grid-cols-2 gap-10'>
              {
                [
                  {
                    img: hrImg,
                    title: "HR Interview Mode",
                    desc: "Behavioral and communication based evaluation."
                  },
                  {
                    img: techImg,
                    title: "Technical Mode",
                    desc: "Deep technical questioning based on selected role."
                  },

                  {
                    img: confidenceImg,
                    title: "Confidence Detection",
                    desc: "Basic tone and voice analysis insights."
                  },
                  {
                    img: creditImg,
                    title: "Credits System",
                    desc: "Unlock premium interview sessions easily."
                  }
                ].map((mode, index) => (
                  <motion.div key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    whileHover={{ y: -6 }}
                    className="bg-slate-800/90 backdrop-blur-sm border border-slate-600 rounded-3xl p-8 shadow-sm hover:shadow-xl hover:border-blue-600/30 transition-all">

                    <div className='flex items-center justify-between gap-6'>
                      <div className="w-1/2">
                        <h3 className="font-semibold text-xl mb-3 text-slate-100">
                          {mode.title}
                        </h3>

                        <p className="text-slate-400 text-sm leading-relaxed">
                          {mode.desc}
                        </p>
                      </div>

                      {/* RIGHT IMAGE */}
                      <div className="w-1/2 flex justify-end">
                        <img
                          src={mode.img}
                          alt={mode.title}
                          className="w-28 h-28 object-contain"
                        />
                      </div>



                    </div>


                  </motion.div>
                ))
              }
            </div>
          </div>

          {/* Testimonials */}
          <div className='mb-32'>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className='text-4xl font-bold text-center mb-4 text-slate-100'>
              What Our <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Users Say</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className='text-slate-400 text-center mb-16 max-w-2xl mx-auto'>
              Join thousands who cracked their dream interviews with InterviewMitra
            </motion.p>

            <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-8'>
              {[
                {
                  name: "Priya Sharma",
                  role: "SDE at Flipkart",
                  quote: "InterviewMitra helped me practice for my tech rounds. The AI follow-up questions were so realistic! Landed my dream job in 2 weeks.",
                  rating: 5,
                  avatar: "PS"
                },
                {
                  name: "Rahul Verma",
                  role: "Product Manager",
                  quote: "Best mock interview platform I have used. HR mode prepared me perfectly for behavioral questions. Highly recommend!",
                  rating: 5,
                  avatar: "RV"
                },
                {
                  name: "Ananya Singh",
                  role: "Frontend Developer",
                  quote: "The resume-based questions were spot on. Felt like a real interview. PDF report helped me identify my weak areas.",
                  rating: 5,
                  avatar: "AS"
                }
              ].map((t, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -6, scale: 1.02 }}
                  className='bg-slate-800/90 backdrop-blur-sm border border-slate-600 rounded-2xl p-6 shadow-lg hover:shadow-xl hover:border-blue-600/30 transition-all'>
                  <BsQuote className='text-blue-600/60 text-3xl mb-4' />
                  <p className='text-slate-300 text-sm leading-relaxed mb-4'>&ldquo;{t.quote}&rdquo;</p>
                  <div className='flex gap-1 mb-4'>
                    {[...Array(t.rating)].map((_, i) => (
                      <BsStarFill key={i} className='text-amber-400 text-sm' />
                    ))}
                  </div>
                  <div className='flex items-center gap-3'>
                    <div className='w-10 h-10 rounded-full bg-gradient-to-br from-blue-700 to-indigo-700 flex items-center justify-center text-white font-semibold text-sm'>
                      {t.avatar}
                    </div>
                    <div>
                      <p className='font-semibold text-slate-100 text-sm'>{t.name}</p>
                      <p className='text-xs text-slate-500'>{t.role}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

        </div>
      </div>

      {showAuth && <AuthModel onClose={() => { setShowAuth(false); setAuthRedirect(null); }} onSuccess={() => { if (authRedirect) navigate(authRedirect); }} />}

        <Footer/>

    </div>
  )
}

export default Home
