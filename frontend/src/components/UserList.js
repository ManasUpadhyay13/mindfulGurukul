import React, { useEffect, useState } from 'react'
import '../styles/userList.css'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import axios from 'axios'
import Loader from './Loader';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';

const UserList = () => {

    const [userList, setUserList] = useState([])
    const [open, setOpen] = useState(false);
    const [deleteName, setDeleteName] = useState("")
    const [deleteId, setDeleteId] = useState("")
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const [sort, setSort] = React.useState('');
    const [filterWord, setFilterWord] = useState("")

    const handleChange = (event) => {
        setSort(event.target.value);
    };

    const handleClickOpen = (item) => {
        setDeleteName(item.username)
        setDeleteId(item._id)
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const getAllUserData = async () => {
        setLoading(true)
        try {
            // const res = await axios.get("https://mindfulgurukilprojectbackend.onrender.com/viewAllUsers")
            const res = await axios.get(`http://127.0.0.1:3001/viewAllUsers?sort=${sort}`)
            setUserList(res.data);
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    const handleFilterChange = (event) => {
        const value = event.target.value;
        setFilterWord(value);
    };

    const filteredUsers = userList.filter(user => user.username.toLowerCase().includes(filterWord.toLowerCase()));

    useEffect(() => {
        console.log("trigger");
        getAllUserData()
    }, [sort])


    const handleDelete = async () => {
        try {
            const res = await axios.delete(`https://mindfulgurukilprojectbackend.onrender.com/deleteUser/${deleteId}`)
            console.log(res);
            setOpen(false)
            getAllUserData()
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getAllUserData()
    }, [])

    return (
        <>
            <div className="filterContainer">
                <Box sx={{ width: 150 }}>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Filters</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={sort}
                            label="sort"
                            onChange={handleChange}
                        >
                            <MenuItem value="az">Sort by A - Z</MenuItem>
                            <MenuItem value="za">Sort by Z - A</MenuItem>
                            <MenuItem value="lastModified">Last Modified</MenuItem>
                            <MenuItem value="lastInserted">Last Inserted</MenuItem>
                        </Select>
                    </FormControl>
                </Box>
            </div>

            <div className="filterTextfield">
                <TextField id="outlined-basic" label="Filter" variant="outlined" onChange={handleFilterChange} />
            </div>


            {
                (userList.length == 0 || filteredUsers.length == 0) && (
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            height: "100vh"
                        }}
                    >
                        <Typography variant="h5" component="div">
                            No data found
                        </Typography>
                    </div>
                )
            }

            {
                (!loading) ?
                    <div className="userListContainer">
                        {
                            filteredUsers.map((item) => (
                                <Card sx={{ minWidth: 250, margin: 2 }} key={item._id}>
                                    <CardContent >
                                        {item.email}
                                        <Typography variant="h5" component="div">
                                            {item.username}
                                        </Typography>
                                        <Typography variant="body2">
                                            {item.phone}
                                        </Typography>
                                    </CardContent>
                                    <CardActions>
                                        <Button size="small" onClick={() => navigate(`/editUser?id=${item._id}`)}>Edit</Button>
                                        <Button size="small" color='error' onClick={() => handleClickOpen(item)}>Delete</Button>
                                    </CardActions>
                                </Card>
                            ))
                        }
                    </div>
                    :
                    <Loader />
            }

            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    Delete record for {deleteName} ?
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Are you sure you want to delete the user?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={() => handleDelete()} color='error' autoFocus>
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default UserList