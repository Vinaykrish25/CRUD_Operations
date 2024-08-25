import React, { useContext } from 'react'
import { MdAccountCircle } from "react-icons/md";
import "./Styles/FrontPage.css"
import { ThemeContext } from '../Context/ThemeContext';
import {Link} from "react-router-dom"

const FrontPage = () => {
    const { fontcolor, bodycolor } = useContext(ThemeContext)
    return (
        <div className='container' style={{ backgroundColor: bodycolor, color: fontcolor }}>
            <h1>Welcome to Task Manager 📝</h1>
            <h1 style={{ fontSize: "180px" }}><MdAccountCircle /></h1>
            <div className="but">
                <Link to="/register"><button className='but-1'>Sign Up</button></Link>
                <Link to="/login"><button className='but-2'>Login</button></Link>
            </div>
        </div>
    )
}

export default FrontPage