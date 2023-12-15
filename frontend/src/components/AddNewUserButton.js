import { useNavigate } from 'react-router-dom';
import '../styles/dashboard.css'
import Button from '@mui/material/Button';

export default function AddNewUserButton() {

    const navigate = useNavigate()

    const handleNewUserClick = () => {
        navigate("/newUser")
    }

    return (
        <div className='addNewUserButton'>
            <Button variant="outlined" color="primary" onClick={handleNewUserClick}>
                Add New User
            </Button>
        </div>
    );
}