import React from 'react'
import { useNavigate } from 'react-router-dom'
import { FaArrowLeft, FaLightbulb, FaUsers, FaCode, FaServer } from 'react-icons/fa'
import Navbar from '../components/Navbar'

const HR_QUESTIONS = [
  "Tell me about yourself",
  "Why do you want to join our company?",
  "What are your strengths and weaknesses?",
  "Where do you see yourself in 5 years?",
  "Describe a challenging situation and how you handled it",
  "Why are you leaving your current job?",
  "What is your expected salary?",
  "Do you have any questions for us?",
]

const DSA_TOPICS = [
  "Arrays & Strings",
  "Linked Lists",
  "Stacks & Queues",
  "Trees & Graphs",
  "Dynamic Programming",
  "Sorting & Searching",
  "Hash Maps & Sets",
  "Recursion & Backtracking",
]

const SYSTEM_DESIGN_TIPS = [
  "Start with requirements (functional + non-functional)",
  "Estimate scale (users, QPS, storage)",
  "Design high-level architecture first",
  "Identify bottlenecks and scale horizontally",
  "Discuss caching, load balancing, databases",
]

function Tips() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col relative overflow-hidden">
      <Navbar />
    <div className="flex-1 py-10 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-700/8 rounded-full blur-3xl" />
      </div>

      <div className="w-[90vw] lg:w-[70vw] max-w-4xl mx-auto relative z-10">
        <button
          onClick={() => navigate(-1)}
          className="mb-6 p-3 rounded-xl bg-slate-800 border border-slate-600 hover:border-blue-600/50 transition flex items-center gap-2 text-slate-300 hover:text-blue-600"
        >
          <FaArrowLeft /> Back
        </button>

        <div className="flex items-center gap-3 mb-10">
          <div className="p-3 rounded-xl bg-blue-600/20">
            <FaLightbulb className="text-amber-400" size={28} />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-slate-100">Interview Tips</h1>
            <p className="text-slate-400">Quick reference for common topics</p>
          </div>
        </div>

        <div className="space-y-8">
          <section className="bg-slate-800/90 border border-slate-600 rounded-2xl p-6">
            <h2 className="text-xl font-semibold text-slate-100 mb-4 flex items-center gap-2">
              <FaUsers className="text-blue-500" /> Common HR Questions
            </h2>
            <ul className="space-y-2">
              {HR_QUESTIONS.map((q, i) => (
                <li key={i} className="text-slate-300 pl-4 border-l-2 border-slate-600 hover:border-blue-500/50 transition">
                  {q}
                </li>
              ))}
            </ul>
          </section>

          <section className="bg-slate-800/90 border border-slate-600 rounded-2xl p-6">
            <h2 className="text-xl font-semibold text-slate-100 mb-4 flex items-center gap-2">
              <FaCode className="text-indigo-500" /> DSA Topics to Revise
            </h2>
            <div className="flex flex-wrap gap-2">
              {DSA_TOPICS.map((t, i) => (
                <span key={i} className="px-4 py-2 bg-slate-700/80 rounded-xl text-slate-300 text-sm border border-slate-600">
                  {t}
                </span>
              ))}
            </div>
          </section>

          <section className="bg-slate-800/90 border border-slate-600 rounded-2xl p-6">
            <h2 className="text-xl font-semibold text-slate-100 mb-4 flex items-center gap-2">
              <FaServer className="text-emerald-500" /> System Design Basics
            </h2>
            <ol className="space-y-2 list-decimal list-inside text-slate-300">
              {SYSTEM_DESIGN_TIPS.map((t, i) => (
                <li key={i} className="pl-2">{t}</li>
              ))}
            </ol>
          </section>

          <div className="text-center py-6">
            <p className="text-slate-500 text-sm mb-4">Ready to practice?</p>
            <button
              onClick={() => navigate("/")}
              className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-medium hover:opacity-90 transition"
            >
              Start Interview
            </button>
          </div>
        </div>
      </div>
    </div>
    </div>
  )
}

export default Tips
