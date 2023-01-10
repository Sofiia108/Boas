import { useRef, useState, useEffect } from 'react';
import useAuth from '../../hooks/useAuth';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Button, TextField } from '@mui/material';
import axios from '../../api/axios';

import './Autorization.css'

const LOGIN_URL = '/auth';

const Login = () => {

    const { setAuth } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    const userRef = useRef();
    const errRef = useRef();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errMessage, setErrMessage] = useState('');

    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        setErrMessage('');
    }, [email, password])

    const handleSubmit = async (e) => {

        e.preventDefault();
        try {
            const response = await axios.post(LOGIN_URL,
                JSON.stringify({ email, password }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );

            console.log(JSON.stringify(response?.data));
            const accessToken = response?.data?.accessToken;
            const roles = response?.data?.roles;
            setAuth({ email, password, roles, accessToken });
            setEmail('');
            setPassword('');
            navigate(from, { replace: true });
        } catch (err) {
            if (!err?.response) {
                setErrMessage('No Server Response');
            } else if (err.response?.status === 400) {
                setErrMessage('Missing Username or Password');
            } else if (err.response?.status === 401) {
                setErrMessage('Unauthorized');
            } else {
                setErrMessage('Login Failed');
            }
            errRef.current.focus();
        }
    }

    return (

        <section className='main-container'>

            <p ref={errRef} aria-live="assertive">{errMessage}</p>
            <h1>Login</h1>

            <form onSubmit={handleSubmit} className="form">
                <div className="form-item">
                <TextField 
                   label="Email" 
                   variant="outlined"
                   type="email"
                   ref={userRef}
                   autoComplete="off"
                   onChange={(e) => setEmail(e.target.value)}
                   value={email}
                   required
               />
                </div>

                <div className="form-item">
                <TextField 
                    label="Password" 
                    variant="outlined"
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    required
                />
                </div> 

                <div className="form-item"> 
                    <Link to="/forgot-password">Forgot Your Password?</Link>
                </div>
                
                <div className="form-item"> 
                <Button>
                    Sign In
                </Button>
                </div>

            </form>
            <div className='redirect'> 
                <text>
                    Don't Have an Account yet?
                </text>


                <span>
                    <Link to="/register">Create Account</Link>
                </span>
            </div>
        </section>

    )
}

export default Login
