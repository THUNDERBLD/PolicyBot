// import { useState, useEffect } from "react"
import { Routes, Route } from "react-router-dom"
import { ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css'
import Home from "./Pages/Home"
// import History from "./Pages/History"
// import Login from "./Pages/Login"
// import Profile from "./Pages/Profile"

function App() {

  return (
    <>
      <div className="w-full">
        <ToastContainer />
        <div className="w-full px-4 sm:px-[5vw] md:px-[6vw] lg:px-[8vw]">
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </div>
      </div>
    </>
  )
}

export default App
