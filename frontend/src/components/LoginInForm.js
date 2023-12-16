import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import { useForm } from 'react-hook-form'
import LoadingButton from '@mui/lab/LoadingButton';
import axios from 'axios'

import { useNavigate } from "react-router-dom";
import CustomizedSnackbars from "./Snackbar";


export default function LoginInForm() {

    const { register, handleSubmit } = useForm()
    const [logInLoading, setLogInLoading] = useState(false)
    const [message, setMessage] = useState("")
    const [type, setType] = useState("")
    const navigate = useNavigate()

    const onSubmit = async (data) => {
        setLogInLoading(true)
        try {
            const res = await axios.post(`https://mindfulgurukilprojectbackend.onrender.com/login`, {
                ...data
            })

            if (res.status === 200) {
                setMessage("Email already registered")
                setType("error")
                return
            }

            window.localStorage.setItem("user", JSON.stringify(res.data))
            navigate("/")

        } catch (error) {
            setMessage("Internal Error! Please try again")
            setType("error")
        }
        finally {
            setLogInLoading(false)
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
                Log In
            </Typography>

            <form onSubmit={handleSubmit(onSubmit)} noValidate={false}>
                <Grid container spacing={2}>

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
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            {...register("password")}
                        />
                    </Grid>


                </Grid>

                <LoadingButton
                    type="submit"
                    fullWidth
                    loading={logInLoading}
                    style={{ marginTop: "40px" }}
                    variant="outlined"
                    color="primary"
                >
                    Log In
                </LoadingButton>

            </form>

            <Typography component="p" variant="body1" style={{ marginBottom: "30px", marginTop: "30px" }}>
                Don't have a account? <span style={{ color: "blue", cursor: "pointer" }} onClick={() => navigate("/signup")}>Sign Up</span>
            </Typography>

        </Container>
    );
}
