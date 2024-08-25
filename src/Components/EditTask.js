import axios from 'axios'
import React, { useState } from 'react'
import "./Styles/EditTask.css"
import { FaWindowClose } from "react-icons/fa";

const EditTask = ({ updateRef, updateClose, display, selectId }) => {

    const [user, setUser] = useState({
        id: "",
        fullname: "",
        mail: "",
        dept: "",
        mobile: "",
        dob: "",
        gender: ""
    })

    const email_Val = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    const password_Val = /^[a-zA-Z0-9!@#$%^&*]{6,16}$/
    const mobile_Val = /(\+91|91)\s?\-?\d+/

    async function handleUpdate() {
        try{
            const register_no = await axios.get(`http://localhost:3000/user-details`)
            const existingUser = register_no.data.filter((user_reg) => user_reg.id === user.id)
            if (existingUser === 0) {
                    if ((email_Val.test(user.mail)) && (password_Val.test(user.password)) && (mobile_Val.test(user.mobile))) {
                        await axios.put(`http://localhost:3000/user-details`, user)
                    //             id: user.id,
                    //             fullname: user.fullname,
                    //             mail: user.mail,
                    //             dept: user.dept,
                    //             mobile: user.mobile,
                    //             dob: user.dob,
                    //             gender: user.gender
                    // });
                    alert("Updated");
                    display();
                    }
                    else{
                        alert("enter valid credentials")
                    }
                }
                else{
                    alert("id not exist")
                }
        }
        catch(err){
            console.error("Error while updating data", err);
        }
    }
    return (
        <div className='update-dialog'>
            <dialog ref={updateRef}>
                <div className='edit-container'>
                <div className='edit-heading'>
                <h1>Edit Your Details</h1>
                <button onClick={updateClose}><FaWindowClose /></button>
                </div>
                    
                    <table>
                        <thead className='table-head'>
                            <tr>
                                <th>Roll Number</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Department</th>
                                <th>Mobile</th>
                                <th>D.O.B</th>
                                <th>Gender</th>
                            </tr>
                        </thead>
                        <tbody className='table-body'>
                            <tr>
                                <td><input type="number" required value={user.id} onChange={(e) => setUser({ ...user, id: e.target.value })} /></td>
                                <td><input type="text" required value={user.fullname} onChange={(e) => setUser({ ...user, fullname: e.target.value })} /></td>
                                <td><input type="text" required value={user.mail} onChange={(e) => setUser({ ...user, mail: e.target.value })} /></td>
                                <td><select name="department" id="dept" onChange={(e) => setUser({ ...user, dept: e.target.value })}>
                                    <option value="Choose Your Department">Choose Your Department</option>
                                    <option value="AI&DS">AI&DS</option>
                                    <option value="ECE">ECE</option>
                                    <option value="CSE">CSE</option>
                                </select></td>
                                <td><input type="number" required value={user.mobile} onChange={(e) => setUser({ ...user, mobile: e.target.value })} /></td>
                                <td><input type="date" max="2023-12-31" required value={user.dob} onChange={(e) => setUser({ ...user, dob: e.target.value })} /></td>
                                <td><select name="gender" id="gen" onChange={(e) => setUser({ ...user, gender: e.target.value })}>
                                    <option value="Choose Your Gender">Choose Your Gender</option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                </select></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="but">
                    <button onClick={handleUpdate}>Update</button>
                    <button onClick={updateClose}>close</button>
                </div>
            
            </dialog>
        </div>
    )
}

export default EditTask