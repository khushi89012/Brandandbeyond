import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from './Button';
import "./form.css";
import Image from "./logo.png"
import { useNavigate } from 'react-router-dom';


export default function BasicTextFields({ title, setPassword, setEmail, handleAction }) {
    let navigate = useNavigate();
    return (

        <div className="heading-container">
            <div className="header-left">
                <img src={Image} alt="logo" width="100%" height="100%" />
            </div>



            <div className="header-right">
                <h2 >
                    {title} Form
                </h2>


                <Box
                    component="form"
                    sx={{
                        '& > :not(style)': { m: 1, width: '35ch' },
                    }}
                    noValidate
                    autoComplete="off"
                >
                </Box>


                <Box mt={2}>
                    <TextField
                        id="email"
                        label="Enter the Email"
                        variant="outlined"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </Box>

                <Box mt={2} >

                    <TextField
                        id="password"
                        label="Enter the Password"
                        variant="outlined"
                    />
                </Box>






                <Box mt={2}>

                    <TextField
                        id="password"
                        label="Confirmed Password"
                        variant="outlined"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </Box>



                <br />
                <Box>
                    <Button title={title} handleAction={handleAction} />
                </Box>

                {title === "Register"
                    ? <Box mt={2}>
                        <p>Already have an account?
                            <span
                            className="login-link"
                                onClick={() => navigate('/login')}>
                                Login
                            </span></p>
                    </Box> : null}

                {title === "Login"
                    ? <Box mt={2}>
                        <p>Don't have an account?
                            <span
                            className="login-link"

                                onClick={() => navigate('/')}>
                                Register
                            </span>
                        </p>
                    </Box> : null}








            </div>





        </div>

    );
}
