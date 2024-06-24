import React from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {Home, AdminLogin, Panel} from './pages/index';

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/panel/login" element={<AdminLogin />} />
        <Route path="/panel" element={<Panel />} />
      </Routes>
    </Router>
  )
}

export default App
