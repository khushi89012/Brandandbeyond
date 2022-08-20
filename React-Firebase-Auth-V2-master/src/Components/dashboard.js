import axios from 'axios';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import user from "./user.png"
import './dashboard.css';

export const Dashboard = () => {
    const navigate = useNavigate();

    const [data, setData] = useState([]);
    const handleLogout = () => {
        sessionStorage.removeItem('Auth Token');
        navigate('/login')
    }
    useEffect(() => {
        axios.get('https://beyondandbright.herokuapp.com/users')
            .then(response => {
                console.log(response)
                setData(response.data)
            })
            .catch(error => {
                console.log(error)
            }
            )
    }
    , [])




    return (
        <div className="App">
            <nav className = "navbar">
                <div></div>
            <h1>
                Admin Panel 
            </h1>
            <div>
           
            <Button variant="contained" onClick={handleLogout}>Back To Login</Button>
        </div>
            </nav>

<div className="Admin-container">
{data.map(item => (
                <div key={item.id} className="user-div">
                    <div className="user-image">
                        <img src={user} alt="logo" width="80%" height="100%" />
                    </div>
                    <div className="user-info">
                        
                            <li>Email: {item.email}</li>
                            <li>Created date : {
                            (item.createdAt).slice(0,10)
                            }</li>
                            <li>Updated Time : {
                            (item.updatedAt).split('T')[1].slice(0,8)
                            }</li>
                        
                    </div>
                </div>
            ))}
           

</div>
           
            
       
        </div>
    );
    }

    export default Dashboard;
