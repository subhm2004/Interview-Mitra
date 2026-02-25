import React, { useEffect, useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import axios from "axios"
import { ServerUrl } from '../App'
import { FaArrowLeft, FaChartLine, FaTrophy, FaCalendarAlt } from 'react-icons/fa'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts'

function ProgressDashboard() {
  const [interviews, setInterviews] = useState([])
  const navigate = useNavigate()
  const { theme } = useSelector((state) => state.theme)
  const isLight = theme === 'light'
  const chartColors = {
    grid: isLight ? '#e2e8f0' : '#334155',
    axis: isLight ? '#64748b' : '#94a3b8',
    tooltipBg: isLight ? '#ffffff' : '#1e293b',
    tooltipBorder: isLight ? '#e2e8f0' : '#475569',
    tooltipText: isLight ? '#0f172a' : '#f1f5f9',
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get(ServerUrl + "/api/interview/get-interview", { withCredentials: true })
        setInterviews(result.data.filter((i) => i.status === "completed" && i.finalScore != null))
      } catch (error) {
        console.log(error)
      }
    }
    fetchData()
  }, [])

  const scoreOverTime = useMemo(() => {
    return [...interviews]
      .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
      .map((i) => ({
        date: new Date(i.createdAt).toLocaleDateString("en-IN", { month: "short", day: "numeric", year: "2-digit" }),
        score: i.finalScore || 0,
        role: i.role,
      }))
  }, [interviews])

  const scoreByRole = useMemo(() => {
    const byRole = {}
    interviews.forEach((i) => {
      const r = i.role || "Other"
      if (!byRole[r]) byRole[r] = { role: r, total: 0, count: 0 }
      byRole[r].total += i.finalScore || 0
      byRole[r].count += 1
    })
    return Object.values(byRole).map((r) => ({ role: r.role, avgScore: Number((r.total / r.count).toFixed(1)), count: r.count }))
  }, [interviews])

  const stats = useMemo(() => {
    const completed = interviews.filter((i) => i.finalScore != null)
    const avgScore = completed.length ? (completed.reduce((s, i) => s + (i.finalScore || 0), 0) / completed.length).toFixed(1) : 0
    const bestScore = completed.length ? Math.max(...completed.map((i) => i.finalScore || 0)) : 0
    return { total: completed.length, avgScore, bestScore }
  }, [interviews])

  return (
    <div className='min-h-screen bg-slate-950 py-10 relative overflow-hidden'>
      <div className='absolute inset-0 overflow-hidden pointer-events-none'>
        <div className='absolute -top-40 -right-40 w-96 h-96 bg-blue-700/8 rounded-full blur-3xl' />
      </div>

      <div className='w-[90vw] lg:w-[70vw] max-w-[90%] mx-auto relative z-10'>
        <div className='mb-10 flex items-start gap-4 flex-wrap'>
          <button
            onClick={() => navigate("/")}
            className='p-3 rounded-xl bg-slate-800 border border-slate-600 hover:border-blue-600/50 transition'
          >
            <FaArrowLeft className='text-blue-600' />
          </button>
          <div>
            <h1 className='text-3xl font-bold text-slate-100 flex items-center gap-2'>
              <FaChartLine className='text-blue-600' />
              Progress <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Dashboard</span>
            </h1>
            <p className='text-slate-400 mt-1'>Track your interview performance over time</p>
          </div>
        </div>

        {interviews.length === 0 ? (
          <div className='bg-slate-800 p-12 rounded-2xl shadow-lg border border-slate-600 text-center'>
            <p className='text-slate-400 text-lg'>Complete interviews to see your progress analytics.</p>
            <button
              onClick={() => navigate("/interview")}
              className='mt-4 px-6 py-2 bg-gradient-to-r from-blue-700 to-indigo-700 rounded-xl text-white font-semibold hover:opacity-90'
            >
              Start Interview
            </button>
          </div>
        ) : (
          <>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-4 mb-8'>
              <div className='bg-slate-800/90 border border-slate-600 rounded-2xl p-6'>
                <div className='flex items-center gap-3'>
                  <div className='w-12 h-12 rounded-xl bg-blue-700/30 flex items-center justify-center'>
                    <FaCalendarAlt className='text-blue-600' />
                  </div>
                  <div>
                    <p className='text-slate-400 text-sm'>Total Interviews</p>
                    <p className='text-2xl font-bold text-slate-100'>{stats.total}</p>
                  </div>
                </div>
              </div>
              <div className='bg-slate-800/90 border border-slate-600 rounded-2xl p-6'>
                <div className='flex items-center gap-3'>
                  <div className='w-12 h-12 rounded-xl bg-blue-700/30 flex items-center justify-center'>
                    <FaChartLine className='text-blue-600' />
                  </div>
                  <div>
                    <p className='text-slate-400 text-sm'>Average Score</p>
                    <p className='text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent'>{stats.avgScore}/10</p>
                  </div>
                </div>
              </div>
              <div className='bg-slate-800/90 border border-slate-600 rounded-2xl p-6'>
                <div className='flex items-center gap-3'>
                  <div className='w-12 h-12 rounded-xl bg-amber-500/20 flex items-center justify-center'>
                    <FaTrophy className='text-amber-400' />
                  </div>
                  <div>
                    <p className='text-slate-400 text-sm'>Best Score</p>
                    <p className='text-2xl font-bold text-amber-400'>{stats.bestScore}/10</p>
                  </div>
                </div>
              </div>
            </div>

            <div className='bg-slate-800/90 border border-slate-600 rounded-2xl p-6 mb-8'>
              <h3 className='text-lg font-semibold text-slate-100 mb-4'>Score Over Time</h3>
              <div className='h-64 chart-plot-area'>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={scoreOverTime} margin={{ top: 5, right: 20, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke={chartColors.grid} />
                    <XAxis dataKey="date" stroke={chartColors.axis} fontSize={12} tick={{ fill: chartColors.axis }} />
                    <YAxis domain={[0, 10]} stroke={chartColors.axis} fontSize={12} tick={{ fill: chartColors.axis }} />
                    <Tooltip
                      contentStyle={{ background: chartColors.tooltipBg, border: `1px solid ${chartColors.tooltipBorder}`, borderRadius: "8px", color: chartColors.tooltipText }}
                      labelStyle={{ color: chartColors.tooltipText }}
                    />
                    <Line type="monotone" dataKey="score" stroke="#2563eb" strokeWidth={2} dot={{ fill: "#2563eb" }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {scoreByRole.length > 0 && (
              <div className='bg-slate-800/90 border border-slate-600 rounded-2xl p-6'>
                <h3 className='text-lg font-semibold text-slate-100 mb-4'>Average Score by Role</h3>
                <div className='h-64 chart-plot-area'>
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={scoreByRole} margin={{ top: 5, right: 20, left: 20, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke={chartColors.grid} />
                      <XAxis dataKey="role" stroke={chartColors.axis} fontSize={11} tick={{ fill: chartColors.axis }} />
                      <YAxis domain={[0, 10]} stroke={chartColors.axis} fontSize={12} tick={{ fill: chartColors.axis }} />
                      <Tooltip
                        contentStyle={{ background: chartColors.tooltipBg, border: `1px solid ${chartColors.tooltipBorder}`, borderRadius: "8px", color: chartColors.tooltipText }}
                      />
                      <Bar dataKey="avgScore" fill="#2563eb" radius={[4, 4, 0, 0]} name="Avg Score" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}

export default ProgressDashboard
