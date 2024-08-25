import React, { useContext, useEffect, useState } from 'react'
import { FaXmark } from "react-icons/fa6";
import "./Styles/Login.css";
import { ThemeContext } from '../Context/ThemeContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {

    const { bodycolor, buttoncolor, fontcolor } = useContext(ThemeContext);
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [color, setColor] = useState("gray")

    const [err, setErr] = useState("");

    const navigate = useNavigate();

    async function handleSubmit(email, password) {
        const response = await axios.get(`http://localhost:3000/user-details`)
        const getEmail = response.data.filter((useremail) => useremail.mail === email)
        
        if((email && password) !== ''){
            if (getEmail.length !== 0) {
                getEmail.forEach(checkuser => {
                    if (checkuser.password === password) {
                        setErr("Login Successful✅");
                        setTimeout(function navigateLogin() {
                            navigate("/taskmanager");
                        }, 1000)
    
                    }
                    else {
                        setErr("Login Failed❌");
                        setTimeout(function navigateRegister() {
                            navigate("/register");
                        }, 1000)
                    }
                });
            }
            else {
                setErr("Email doesn't exist")
                setTimeout(function navigateRegister() {
                    navigate("/register");
                }, 1000)
            }
        }
        else
        {
            setErr("Enter the credentials")
        }
    }

    return (
        <div id='login-container' style={{ backgroundColor: bodycolor, color: fontcolor }}>
            <div id="Container">
                <p style={{ color: "red", textAlign: "center" }}>{err}</p>
                <p id="loginHead">Login</p>
                <div id="loginInputs">
                    <fieldset style={{ borderColor: color }}>
                        <legend style={{ color: fontcolor }}>Username / Email<span style={{ color: "red" }}>*</span></legend>
                        <input
                            name='email'
                            type="text"
                            placeholder="Enter your username"
                            id="emailInput"
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            style={{ color: fontcolor }}
                            value={email}
                        />
                    </fieldset>
                    <fieldset style={{ borderColor: color }}>
                        <legend style={{ color: fontcolor }}>Password<span style={{ color: "red" }}>*</span></legend>
                        <input
                            name='pass'
                            type="password"
                            placeholder="Enter the password"
                            id="passwordInput"
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            style={{ color: fontcolor }}
                            value={password}
                        />
                    </fieldset>
                </div>
                <button id="loginBtn2" onClick={() => handleSubmit(email, password)}>Login</button>
            </div>
        </div>
    )
}

export default Login