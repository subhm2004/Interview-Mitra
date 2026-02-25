import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Auth from './pages/auth'
import { useEffect } from 'react'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { setUserData } from './redux/userSlice'
import { setTheme } from './redux/themeSlice'
import InterviewPage from './pages/InterviewPage'
import InterviewHistory from './pages/InterviewHistory'
import Pricing from './pages/Pricing'
import InterviewReport from './pages/InterviewReport'
import ProgressDashboard from './pages/ProgressDashboard'
import Tips from './pages/Tips'
import NotFound from './pages/NotFound'

export const ServerUrl  = "https://interview-mitra.onrender.com"

function App() {

  const dispatch = useDispatch()

  useEffect(() => {
    const saved = localStorage.getItem('theme') || 'dark'
    dispatch(setTheme(saved))
    const html = document.documentElement
    html.classList.toggle('theme-light', saved === 'light')
    html.classList.toggle('theme-dark', saved === 'dark')
  }, [dispatch])

  useEffect(()=>{
    const getUser = async () => {
      try {
        const result = await axios.get(ServerUrl + "/api/user/current-user", {withCredentials:true})
        dispatch(setUserData(result.data))
      } catch (error) {
        console.log(error)
        dispatch(setUserData(null))
      }
    }
    getUser()

  },[dispatch])
  return (
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/auth' element={<Auth/>}/>
      <Route path='/interview' element={<InterviewPage/>}/>
      <Route path='/history' element={<InterviewHistory/>}/>
      <Route path='/pricing' element={<Pricing/>}/>
      <Route path='/report/:id' element={<InterviewReport/>}/>
      <Route path='/dashboard' element={<ProgressDashboard/>}/>
      <Route path='/tips' element={<Tips/>}/>
      <Route path='*' element={<NotFound/>}/>
    </Routes>
  )
}

export default App
