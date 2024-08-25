import React, { useContext, useState } from 'react'
import "./Styles/Header.css"
import { ThemeContext } from '../Context/ThemeContext'
import logo from "../Images/logo.png"

const Header = () => {
    const {headercolor, changetheme} = useContext(ThemeContext);
    return (
        <div className='header-container' style={{backgroundColor:headercolor}}>
            <img src={logo} alt="tesla" width={100} height={50}/>
            <label class="switch">
                <input type="checkbox" onClick={changetheme}/>
                    <span class="slider round"></span>
            </label>

        </div>
    )
}

export default Header