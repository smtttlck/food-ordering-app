import React, { useEffect } from 'react'
import LoginForm from '../components/LoginForm'
import { useNavigate } from 'react-router-dom';
import "react-toastify/dist/ReactToastify.min.css";

const AdminLogin = () => {

  const navigate = useNavigate()

  useEffect(() => {
    if (localStorage.getItem('adminToken'))
      navigate('/panel')
  }, [])

  return (
    <div className="login">
      <div className="container">

        <LoginForm />

      </div>
    </div>
  )
}

export default AdminLogin