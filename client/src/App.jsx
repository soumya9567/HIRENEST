import React, { useContext, useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import ApplyJob from './pages/ApplyJob'
import Applications from './pages/Applications'
import { AppContext } from './Context/AppContext'
import RecruiterLogin from './Components/RecruiterLogin'
import Dashboard from './pages/Dashboard'
import AddJob from './pages/AddJob'
import ManageJobs from './pages/ManageJobs'
import ViewApplications from './pages/ViewApplications'
import 'quill/dist/quill.snow.css' 

function App() {
  const { showRecruiterLogin } = useContext(AppContext)
  return (
    <div >
      {
        showRecruiterLogin && <RecruiterLogin />
      }

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/apply-job/:id" element={<ApplyJob />} />
        <Route path="/applications" element={<Applications />} />
        <Route path="/dashboard" element={<Dashboard />} >
          <Route path="add-job" element={<AddJob />} />
          <Route path="manage-job" element={<ManageJobs />} />
          <Route path="view-applications" element={<ViewApplications />} />




        </Route>



      </Routes>
    </div>
  )
}

export default App
