import React, { useContext, useState } from 'react'
import "./Styles/Header.css"
import { ThemeContext } from '../Context/ThemeContext'
import logo from "../Images/logo.png"
import {Link} from "react-router-dom"

const Header = () => {
    const {headercolor, changetheme} = useContext(ThemeContext);
    return (
        <div className='header-container' style={{backgroundColor:headercolor}}>
            <Link to="/"><img src={logo} alt="tesla" width={100} height={50}/></Link>
            <label class="switch">
                <input type="checkbox" onClick={changetheme}/>
                    <span class="slider round"></span>
            </label>

        </div>
    )
}

export default Header