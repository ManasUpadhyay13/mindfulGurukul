import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import { useForm } from 'react-hook-form'
import LoadingButton from '@mui/lab/LoadingButton';
import axios from 'axios'
import { useNavigate } from "react-router-dom";


export default function EditUserFrom({ user, id }) {

    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const { register, handleSubmit } = useForm({
        defaultValues: { ...user }
    })

    const onSubmit = async (data) => {
        setLoading(true)
        try {
            const res = await axios.patch(`https://mindfulgurukilprojectbackend.onrender.com/editUser/${id}`, {
                ...data
            })
            navigate("/")

        } catch (error) {
            console.log(error.message);
        }
        finally {
            setLoading(false)
        }
    }

    return (
        <Container component="main" maxWidth="sm">

            <Typography component="h1" variant="h5" style={{ marginBottom: "10px" }}>
                Edit User
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
                    loading={loading}
                    style={{ marginTop: "40px" }}
                    variant="outlined"
                    color="primary"
                >
                    Update User
                </LoadingButton>

            </form>

        </Container>
    );
}
