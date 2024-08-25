import React, { useContext, useState } from 'react'
import "./Styles/Header.css"
import { ThemeContext } from '../Context/ThemeContext'

const Header = () => {
    const {headercolor, changetheme} = useContext(ThemeContext);
    return (
        <div className='header-container' style={{backgroundColor:headercolor}}>
            <label class="switch">
                <input type="checkbox" onClick={changetheme}/>
                    <span class="slider round"></span>
            </label>

        </div>
    )
}

export default Header