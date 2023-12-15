import React, { useEffect, useState } from 'react'
import EditUserFrom from '../components/EditUserForm'
import '../styles/editUser.css'
import BackButton from '../components/BackButton'
import LogoutButton from '../components/LogoutButton'
import axios from 'axios'

const EditUser = () => {

    const [user, setUser] = useState()
    const [id, setId] = useState()

    const getUserData = async () => {
        try {
            const res = await axios.get(`http://127.0.0.1:3001/getSingleUser?id=${id}`)

            setUser(res.data);

        } catch (error) {
            console.log(error.message);
        }
    }

    useEffect(() => {
        setId((window.location.href).split('=')[1])
        if (id) {
            getUserData()
        }
    }, [])

    return (
        <div className='editUserContainer'>
            <LogoutButton />
            <BackButton />
            {
                user && (
                    <EditUserFrom user={user} id={id} />
                )
            }
        </div>
    )
}

export default EditUser