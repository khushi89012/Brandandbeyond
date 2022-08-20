import { useState, useEffect } from 'react';
import './App.css';
import Form from './Components/Common/Form';
import Home from './Components/Home';
import Dashboard from './Components/dashboard';
import axios from 'axios';
import {
  Routes,
  Route,
  useNavigate
} from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  let navigate = useNavigate();

const handleAction = (id) => {
  if(id === 1){
    axios.post('https://beyondandbright.herokuapp.com/login', {
      email: email,
      password: password
      })
      .then(response => {
        console.log(response)
        // navigate('/home')
        sessionStorage.setItem('Auth', response.data.user.email)
        sessionStorage.setItem('Auth Token', response.data.token)
        if(response.data.user.email==="admin@gmail.com"){
          navigate('/dashboard')
        }else{
          navigate('/home')
        }
      })
      .catch(error => {
        if (error.response.status === 402) {
          toast.error('Please check the Password');
        }
        if (error.response.status === 401) {
          toast.error('Please check the Email');
        }
        if (error.response.status === 500) {
          toast.error("Internal server error");
        }
        console.log(error)
        
      })
  }
  if(id === 2){
    axios.post('https://beyondandbright.herokuapp.com/registers', {
      email: email,
      password: password
      })
      .then(response => {
        console.log(response)
        sessionStorage.setItem('Auth Token', response.data.token)
        sessionStorage.setItem('Auth', response.data.user.email)
        if(response.data.user.email==="admin@gmail.com"){
          navigate('/dashboard')
        }else{
          navigate('/home')
        }
      })
      .catch(error => {
        if (error.response.status === 500) {
          toast.error("Internal server error");
        }
        if (error.response.status === 400) {
          toast.error('Email Already in Use');
        }
        console.log(error)
      })
  }
}

 useEffect(() => {
    let authToken = sessionStorage.getItem('Auth Token')
    let user = sessionStorage.getItem('Auth')

    if (authToken && user === "admin@gmail.com") {
      navigate('/dashboard')
    }
    if (authToken && user !== "admin@gmail.com") {
      navigate('/home')
    }
    

  }, [])


  return (
    <div className="App">
      <>
     
        <ToastContainer />
        <Routes>
          <Route
            path='/login'
            element={
              <Form
                title="Login"
                setEmail={setEmail}
                setPassword={setPassword}
                handleAction={() => handleAction(1)}
              />}
          />
          <Route
            path='/'
            element={
              <Form
                title="Register"
                setEmail={setEmail}
                setPassword={setPassword}
                handleAction={() => handleAction(2)}
              />}
          />

          <Route
            path='/home'
            element={
              <Home />}
          />
          <Route
            path='/dashboard'
            element={
              <Dashboard />}
          />
              

        </Routes>
      </>
    </div>
  );
}

export default App;
