import { useNavigate } from 'react-router-dom';
import '../styles/addNewUser.css'
import Button from '@mui/material/Button';

export default function BackButton() {

    const navigate = useNavigate()

    const handleBackClick = () => {
        navigate("/")
    }

    return (
        <div className='backButton'>
            <Button variant="outlined" color="primary" onClick={handleBackClick}>
                Go Back
            </Button>
        </div>
    );
}