import React, { useEffect, useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from "axios"
import { ServerUrl } from '../App'
import { FaArrowLeft, FaFilter } from 'react-icons/fa'
function InterviewHistory() {
    const [interviews, setInterviews] = useState([])
    const [filterRole, setFilterRole] = useState("")
    const [filterMode, setFilterMode] = useState("")
    const [filterScoreMin, setFilterScoreMin] = useState("")
    const [filterScoreMax, setFilterScoreMax] = useState("")
    const [sortBy, setSortBy] = useState("date-desc")
    const navigate = useNavigate()

    useEffect(() => {
        const getMyInterviews = async () => {
            try {
                const result = await axios.get(ServerUrl + "/api/interview/get-interview", { withCredentials: true })
                setInterviews(result.data)
            } catch (error) {
                console.log(error)
            }
        }
        getMyInterviews()
    }, [])

    const filteredInterviews = useMemo(() => {
        let list = [...interviews]
        if (filterRole) list = list.filter((i) => i.role?.toLowerCase().includes(filterRole.toLowerCase()))
        if (filterMode) list = list.filter((i) => i.mode === filterMode)
        if (filterScoreMin !== "") list = list.filter((i) => (i.finalScore || 0) >= Number(filterScoreMin))
        if (filterScoreMax !== "") list = list.filter((i) => (i.finalScore || 0) <= Number(filterScoreMax))
        list.sort((a, b) => {
            if (sortBy === "date-desc") return new Date(b.createdAt) - new Date(a.createdAt)
            if (sortBy === "date-asc") return new Date(a.createdAt) - new Date(b.createdAt)
            if (sortBy === "score-desc") return (b.finalScore || 0) - (a.finalScore || 0)
            if (sortBy === "score-asc") return (a.finalScore || 0) - (b.finalScore || 0)
            return 0
        })
        return list
    }, [interviews, filterRole, filterMode, filterScoreMin, filterScoreMax, sortBy])

    const uniqueRoles = useMemo(() => [...new Set(interviews.map((i) => i.role).filter(Boolean))], [interviews])


    return (
        <div className='min-h-screen bg-slate-950 py-10 relative overflow-hidden' >
            <div className='absolute inset-0 overflow-hidden pointer-events-none'>
                <div className='absolute -top-40 -right-40 w-96 h-96 bg-blue-700/8 rounded-full blur-3xl' />
            </div>

            <div className='w-[90vw] lg:w-[70vw] max-w-[90%] mx-auto relative z-10'>

                <div className='mb-10 w-full flex items-start gap-4 flex-wrap'>
                    <button
                        onClick={() => navigate("/")}
                        className='mt-1 p-3 rounded-xl bg-slate-800 border border-slate-600 hover:border-blue-600/50 transition'><FaArrowLeft className='text-blue-600' /></button>

                    <div>
                        <h1 className='text-3xl font-bold flex-nowrap text-slate-100'>
                            Interview <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">History</span>
                        </h1>
                        <p className='text-slate-400 mt-2'>
                            Track your past interviews and performance reports
                        </p>
                    </div>
                </div>

                {interviews.length > 0 && (
                    <div className='mb-6 p-4 bg-slate-800/80 rounded-2xl border border-slate-600'>
                        <div className='flex items-center gap-2 mb-3'>
                            <FaFilter className='text-blue-600' />
                            <span className='font-semibold text-slate-200'>Filters</span>
                        </div>
                        <div className='flex flex-wrap gap-3'>
                            <select value={filterRole} onChange={(e) => setFilterRole(e.target.value)} className='px-3 py-2 bg-slate-900 border border-slate-600 rounded-xl text-slate-200 text-sm'>
                                <option value="">All Roles</option>
                                {uniqueRoles.map((r) => <option key={r} value={r}>{r}</option>)}
                            </select>
                            <select value={filterMode} onChange={(e) => setFilterMode(e.target.value)} className='px-3 py-2 bg-slate-900 border border-slate-600 rounded-xl text-slate-200 text-sm'>
                                <option value="">All Modes</option>
                                <option value="Technical">Technical</option>
                                <option value="HR">HR</option>
                            </select>
                            <input type="number" placeholder="Min score" min="0" max="10" value={filterScoreMin} onChange={(e) => setFilterScoreMin(e.target.value)} className='w-24 px-3 py-2 bg-slate-900 border border-slate-600 rounded-xl text-slate-200 text-sm placeholder-slate-500' />
                            <input type="number" placeholder="Max score" min="0" max="10" value={filterScoreMax} onChange={(e) => setFilterScoreMax(e.target.value)} className='w-24 px-3 py-2 bg-slate-900 border border-slate-600 rounded-xl text-slate-200 text-sm placeholder-slate-500' />
                            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className='px-3 py-2 bg-slate-900 border border-slate-600 rounded-xl text-slate-200 text-sm'>
                                <option value="date-desc">Newest first</option>
                                <option value="date-asc">Oldest first</option>
                                <option value="score-desc">Score: High to Low</option>
                                <option value="score-asc">Score: Low to High</option>
                            </select>
                        </div>
                    </div>
                )}

                {interviews.length === 0 ? (
                    <div className='bg-slate-800 p-12 rounded-2xl shadow-lg border border-slate-600 text-center'>
                        <p className='text-slate-400 text-lg'>No interviews found. Start your first interview.</p>
                    </div>
                ) : filteredInterviews.length === 0 ? (
                    <div className='bg-slate-800 p-12 rounded-2xl shadow-lg border border-slate-600 text-center'>
                        <p className='text-slate-400 text-lg'>No interviews match your filters. Try adjusting filters.</p>
                    </div>
                ) : (
                    <div className='grid gap-6'>
                        {filteredInterviews.map((item, index) => (
                            <div key={index}
                            onClick={()=>navigate(`/report/${item._id}`)}
                             className='bg-slate-800 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer border border-slate-600 hover:border-blue-600/50'>
                                <div className='flex flex-col md:flex-row md:items-center md:justify-between gap-4'>
                                    <div>
                                        <h3 className="text-lg font-semibold text-slate-100">
                                            {item.role}
                                        </h3>

                                        <p className="text-slate-400 text-sm mt-1">
                                            {item.experience} • {item.mode}
                                        </p>

                                        <p className="text-xs text-slate-500 mt-2">
                                            {new Date(item.createdAt).toLocaleDateString()}
                                        </p>
                                    </div>

                                    <div className='flex items-center gap-6'>

                                        {/* SCORE */}
                                        <div className="text-right">
                                            <p className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                                                {item.finalScore || 0}/10
                                            </p>
                                            <p className="text-xs text-slate-500">
                                                Overall Score
                                            </p>
                                        </div>

                                        {/* STATUS BADGE */}
                                        <span
                                            className={`px-4 py-1.5 rounded-full text-xs font-semibold ${item.status === "completed"
                                                    ? "bg-blue-700/30 text-blue-600"
                                                    : "bg-amber-500/20 text-amber-400"
                                                }`}
                                        >
                                            {item.status}
                                        </span>


                                    </div>
                                </div>

                            </div>

                        ))
                        }

                    </div>
                )}
            </div>

        </div>
    )
}

export default InterviewHistory
