import React, { useEffect } from 'react'
import LoginInForm from '../components/LoginInForm'
import '../styles/login.css'
import { useNavigate } from 'react-router-dom'

const Login = () => {
    const navigate = useNavigate()
    useEffect(() => {
        const user = window.localStorage.getItem("user")

        if (user) {
            navigate("/")
        }
    })
    return (
        <div className='logInContainer'>
            <LoginInForm />
        </div>
    )
}

export default Login