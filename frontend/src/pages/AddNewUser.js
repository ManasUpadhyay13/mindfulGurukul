import React from 'react'
import '../styles/addNewUser.css'
import LogoutButton from '../components/LogoutButton'
import BackButton from '../components/BackButton'
import AddNewUserFrom from '../components/AddNewUserForm'

const AddNewUser = () => {
    return (
        <div className='addNewUser'>
            <LogoutButton />
            <BackButton />
            <AddNewUserFrom />
        </div>
    )
}

export default AddNewUser