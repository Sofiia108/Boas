import { useRef, useState, useEffect } from "react";
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, TextField } from '@mui/material';
import axios from '../../api/axios';
import { Link } from "react-router-dom";
import './Autorization.css'

const FIRST_AND_LAST_NAME_REGEX = /^[A-z]{1,23}$/;
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const EMAIL_REGEX = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

const REGISTER_URL = '/register';

const Register = () => {

    const userRef = useRef();
    const errRef = useRef();

    const [firstName, setFirstName] = useState('');
    const [validFirstName, setValidFirstName] = useState(false);
    const [firstNameFocus, setFirstNameFocus] = useState(false);

    const [lastName, setLastName] = useState('');
    const [validLastName, setValidLastName] = useState(false);
    const [lastNameFocus, setLastNameFocus] = useState(false);

    const [email, setEmail] = useState('');
    const [validEmail, setValidEmail] = useState(false);
    const [emailFocus, setEmailFocus] = useState(false);

    const [password, setPassword] = useState('');
    const [validPassword, setValidPassword] = useState(false);
    const [passwordFocus, setPasswordFocus] = useState(false);

    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        setValidFirstName(FIRST_AND_LAST_NAME_REGEX.test(firstName));
    }, [firstName])

    useEffect(() => {
        setValidLastName(FIRST_AND_LAST_NAME_REGEX.test(lastName));
    }, [lastName])

    useEffect(() => {
        setValidEmail(EMAIL_REGEX.test(email));
    }, [email])

    useEffect(() => {
        setValidPassword(PASSWORD_REGEX.test(password));
    }, [password])

    useEffect(() => {
        setErrMsg('');
    }, [firstName, lastName, email, password])

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(REGISTER_URL,
                JSON.stringify({ user: firstName, pwd: password }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );
            
            setSuccess(true);
            setFirstName('');
            setLastName('');
            setEmail('');
            setPassword('');
        } catch (err) {
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else if (err.response?.status === 409) {
                setErrMsg('Username Taken');
            } else {
                setErrMsg('Registration Failed')
            }
            errRef.current.focus();
        }
    }

    return (
        <>
            {success ? (
                <section>
                    <h1>Success!</h1>
                        <span>
                            <Link to="/login">Login</Link>
                        </span>
                </section>
            ) : (
                <section className="main-container">
                    <p ref={errRef} aria-live="assertive">{errMsg}</p>
                    <h1>Create Account</h1>
                    <form onSubmit={handleSubmit} className="form">
                        <div className="form-item">
                            <TextField 
                                label="First name" 
                                variant="outlined"
                                type="text"
                                id="firstName"
                                ref={userRef}
                                autoComplete="first name"
                                onChange={(e) => setFirstName(e.target.value)}
                                value={firstName}
                                required
                                aria-invalid={validFirstName ? "false" : "true"}
                                aria-describedby="uidnote"
                                onFocus={() => setFirstNameFocus(true)}
                                onBlur={() => setFirstNameFocus(false)}
                            />
                        </div>
                       
                        <div className="form-item">
                            <TextField 
                                label="Last Name" 
                                variant="outlined"
                                type="text"
                                id="lastName"
                                ref={userRef}
                                autoComplete="off"
                                onChange={(e) => setLastName(e.target.value)}
                                value={lastName}
                                required
                                aria-invalid={validLastName ? "false" : "true"}
                                aria-describedby="uidnote"
                                onFocus={() => setLastNameFocus(true)}
                                onBlur={() => setLastNameFocus(false)}
                            />
                        </div>
                        
                        <div className="form-item">
                            <TextField 
                                label="Email" 
                                variant="outlined"
                                type="email"
                                id="email"
                                ref={userRef}
                                autoComplete="off"
                                onChange={(e) => setEmail(e.target.value)}
                                value={email}
                                required
                                aria-invalid={validEmail ? "false" : "true"}
                                aria-describedby="uidnote"
                                onFocus={() => setEmailFocus(true)}
                                onBlur={() => setEmailFocus(false)}
                            />
                        </div>
                        
                        <div className="form-item">
                            <TextField 
                                label="Password" 
                                variant="outlined"
                                type="password"
                                id="password"
                                onChange={(e) => setPassword(e.target.value)}
                                value={password}
                                required
                                aria-invalid={validPassword ? "false" : "true"}
                                aria-describedby="pwdnote"
                                onFocus={() => setPasswordFocus(true)}
                                onBlur={() => setPasswordFocus(false)}
                            />
                        </div>
                       
                        <div className="form-item"> 
                        <Button
                        disabled={!validFirstName || !validLastName || !validEmail || !validPassword ? true : false}
                        >
                            Sign Up
                        </Button>
                        </div>
                    </form>

                    <div className="redirect">
                        Already registered?
                        <span>
                            <Link to="/login">Sign In</Link>
                        </span>
                    </div>

                    <div id="link-to-home">
                        <Link to="/" id="link-to-home">Return to store</Link>
                    </div>

                </section>
            )}
        </>
    )
}

export default Register
