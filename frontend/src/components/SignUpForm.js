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

export default function SignUpForm() {

    const [city, setCity] = useState("")
    const { register, handleSubmit } = useForm()
    const [signUpLoading, setSignUpLoading] = useState(false)
    const [message, setMessage] = useState("")
    const [type, setType] = useState("")
    const navigate = useNavigate()

    const handleCityChange = (value) => {
        setCity(value.target.value);
    }

    const onSubmit = async (data) => {
        setSignUpLoading(true)
        try {
            const res = await axios.post("https://mindfulgurukilprojectbackend.onrender.com/signup", {
                ...data
            })

            console.log(res);
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
            setSignUpLoading(false)
        }
    }

    useEffect(() => {
        const user = window.localStorage.getItem("user")

        if (user) {
            navigate("/")
        }
    })


    return (
        <Container component="main" maxWidth="sm">

            {
                (message.length > 0) && (
                    <CustomizedSnackbars message={message} type={type} />
                )
            }

            <Typography component="h1" variant="h5" style={{ marginBottom: "10px" }}>
                Sign up
            </Typography>

            <form onSubmit={handleSubmit(onSubmit)} noValidate={false}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            name="name"
                            variant="outlined"
                            required
                            id="name"
                            fullWidth
                            label="Name"
                            autoFocus
                            {...register("name")}
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
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            {...register("password")}
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


                    <Grid item xs={12}>
                        <FormControl>
                            <FormLabel
                                id="demo-row-radio-buttons-group-label"
                            >
                                Gender
                            </FormLabel>
                            <RadioGroup
                                row
                                aria-labelledby="demo-row-radio-buttons-group-label"
                                name="row-radio-buttons-group"
                            >
                                <FormControlLabel value="female" control={<Radio />} label="Female" {...register("gender")} />
                                <FormControlLabel value="male" control={<Radio />} label="Male" {...register("gender")} />

                            </RadioGroup>
                        </FormControl>
                    </Grid>

                    <Grid item xs={12}>
                        <FormLabel
                            id="demo-row-radio-buttons-group-label"
                        >
                            How did you hear about us?
                        </FormLabel>
                        <FormGroup

                        >
                            <div>
                                <FormControlLabel control={<Checkbox defaultChecked />} label="LinkedIn" value="LinkedIn" {...register("howHeard")} />
                                <FormControlLabel control={<Checkbox />} label="Friends" value="Friends" {...register("howHeard")} />
                                <FormControlLabel control={<Checkbox />} label="Job Portal" value="Job Portal" {...register("howHeard")} />
                                <FormControlLabel control={<Checkbox />} label="Others" value="Others" {...register("howHeard")} />
                            </div>
                        </FormGroup>
                    </Grid>

                    <Grid item xs={12}>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">City</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={city}
                                // value={age}
                                label="City"
                                {...register("city")}
                                variant="outlined"
                                onChange={handleCityChange}
                            >
                                <MenuItem value="Mumbai">Mumbai</MenuItem>
                                <MenuItem value="Pune">Pune</MenuItem>
                                <MenuItem value="Ahmedabad">Ahmedabad</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>

                    <Grid item xs={12}>
                        <Autocomplete
                            disablePortal
                            id="state"
                            options={States}
                            renderInput={(params) => <TextField {...params} label="State"  {...register("state")} />}
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
                    Sign Up
                </LoadingButton>

            </form>

            <Typography component="p" variant="body1" style={{ marginBottom: "30px", marginTop: "30px" }}>
                Already have an account? <span style={{ color: "blue", cursor: "pointer" }} onClick={() => navigate("/login")} >Log In</span>
            </Typography>

        </Container>
    );
}
