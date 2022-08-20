import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Image from './Common/logo.png'
import './home.css'
import Button from '@mui/material/Button';

export default function Home() {
    const handleLogout = () => {
        sessionStorage.removeItem('Auth Token');
        sessionStorage.removeItem('Auth');
        navigate('/login')
    }

    let user = sessionStorage.getItem('Auth')
    user  = user.split('@')[0]

    let navigate = useNavigate();
    useEffect(() => {
        let authToken = sessionStorage.getItem('Auth Token')
        let user = sessionStorage.getItem('Auth')
        console.log(authToken)
        if (authToken) {
            navigate('/home')
        }

        if (!authToken) {
            navigate('/login')
        }
    }, [])


    return (
        <div className="home-container">
            <nav className="navbar2">
                <ul>
                    <li><a class="active" href="#home">Home</a></li>
                    <li><a href="#news">News</a></li>
                    <li><a href="#about">About</a></li>
                    <li><a href="#about"></a></li>
                </ul>
                <Button variant="contained" onClick={handleLogout}>Log out</Button>
            </nav>



            <div className="main-container">

        <h1
        className="welcome-text"
        >
            Welcome, {user} to the Admin Panel
        </h1>

            </div>
        </div>
    )
}
