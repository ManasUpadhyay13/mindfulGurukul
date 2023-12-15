import React, { useEffect, useState } from "react";
import TextField from "@material-ui/core/TextField";
import Checkbox from "@material-ui/core/Checkbox";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import { useForm } from 'react-hook-form'
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import FormGroup from '@mui/material/FormGroup';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Autocomplete from '@mui/material/Autocomplete';
import LoadingButton from '@mui/lab/LoadingButton';
import axios from 'axios'

import { useNavigate } from "react-router-dom";
import CustomizedSnackbars from "./Snackbar";

const States = [
    "Gujrat",
    "Maharashtra",
    "Karnataka"
]

export default function AddNewUserFrom() {

    const { register, handleSubmit } = useForm()
    const [signUpLoading, setSignUpLoading] = useState(false)
    const [message, setMessage] = useState("")
    const [type, setType] = useState("")
    const navigate = useNavigate()

    const onSubmit = async (data) => {
        setSignUpLoading(true)
        try {
            const res = await axios.post("https://mindfulgurukilprojectbackend.onrender.com/addUserData", {
                ...data
            })
            navigate("/")

        } catch (error) {
            setMessage("Internal Error! Please try again")
            setType("error")
        }
        finally {
            setSignUpLoading(false)
        }
    }


    return (
        <Container component="main" maxWidth="sm">

            {
                (message.length > 0) && (
                    <CustomizedSnackbars message={message} type={type} />
                )
            }

            <Typography component="h1" variant="h5" style={{ marginBottom: "10px" }}>
                Add User
            </Typography>

            <form onSubmit={handleSubmit(onSubmit)} noValidate={false}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            name="username"
                            variant="outlined"
                            required
                            id="username"
                            fullWidth
                            label="Name"
                            autoFocus
                            {...register("username")}
                        />
                    </Grid>


                    <Grid item xs={12}>
                        <TextField
                            variant="outlined"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            {...register("email")}
                        />
                    </Grid>


                    <Grid item xs={12}>
                        <TextField
                            variant="outlined"
                            required
                            fullWidth
                            type="number"
                            id="phone"
                            label="Phone Number"
                            name="phone"
                            {...register("phone")}
                        />
                    </Grid>

                </Grid>

                <LoadingButton
                    type="submit"
                    fullWidth
                    loading={signUpLoading}
                    style={{ marginTop: "40px" }}
                    variant="outlined"
                    color="primary"
                >
                    Add User
                </LoadingButton>

            </form>

        </Container>
    );
}
