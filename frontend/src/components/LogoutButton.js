import { useNavigate } from 'react-router-dom';
import '../styles/dashboard.css'
import Button from '@mui/material/Button';

export default function LogoutButton() {

    const navigate = useNavigate()

    const handleLogout = () => {
        window.localStorage.removeItem("user")
        navigate("/login")
    }

    return (
        <div className='logoutButton'>
            <Button variant="outlined" color="error" onClick={handleLogout}>
                Logout
            </Button>
        </div>
    );
}