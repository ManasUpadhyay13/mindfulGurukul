import React, { useEffect, useState } from 'react'
import EditUserFrom from '../components/EditUserForm'
import '../styles/editUser.css'
import BackButton from '../components/BackButton'
import LogoutButton from '../components/LogoutButton'
import axios from 'axios'
import { useParams } from 'react-router-dom'

const EditUser = () => {

    const [user, setUser] = useState()
    const [userId, setId] = useState()
    const params = useParams()

    const getUserData = async (id) => {
        try {
            const res = await axios.get(`https://mindfulgurukilprojectbackend.onrender.com/getSingleUser?id=${id}`)

            setUser(res.data);

        } catch (error) {
            console.log(error.message);
        }
    }

    useEffect(() => {
        const temp = (window.location.href).split('=')[1]
        setId(temp)
        getUserData(temp)
    }, [])

    return (
        <div className='editUserContainer'>
            <LogoutButton />
            <BackButton />
            {
                user && (
                    <EditUserFrom user={user} id={userId} />
                )
            }
        </div>
    )
}

export default EditUser