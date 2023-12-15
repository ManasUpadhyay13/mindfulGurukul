import React, { useEffect } from 'react'
import { useNavigate, useRoutes } from 'react-router-dom'
import '../styles/dashboard.css'
import LogoutButton from '../components/LogoutButton'
import AddNewUserButton from '../components/AddNewUserButton'
import UserList from '../components/UserList'

const Dashboard = () => {

    const navigate = useNavigate()

    useEffect(() => {
        const user = window.localStorage.getItem("user")

        if (!user) {
            navigate("/signup")
        }
    })

    return (
        <div className='dashboardContanier'>
            <LogoutButton />
            <AddNewUserButton />
            <UserList />
        </div>
    )
}

export default Dashboard