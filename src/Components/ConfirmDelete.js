import React, { forwardRef, useContext } from 'react'
import "./Styles/ConfirmDelete.css"
import {ThemeContext} from "../Context/ThemeContext"

const ConfirmDelete = forwardRef((props) => {
    const {bodycolor, fontcolor} = useContext(ThemeContext)
    return (
        <div className='dialog-container'>
            <dialog ref={props.deleteRef} style={{backgroundColor:bodycolor}}>
                <p style={{color:fontcolor}}>
                    Are you sure you want to remove this user?
                </p>
                <div className="but">
                    <button onClick={props.deleteClose}>Delete</button>
                </div>

            </dialog>
        </div>
    );
});

export default ConfirmDelete