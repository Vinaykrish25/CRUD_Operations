import axios from 'axios';
import React, { useEffect, useState } from 'react';
import "./Styles/EditTask.css";
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
    });
    const [err, setErr] = useState("") 

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/user-details/${selectId}`);
                setUser(response.data);
            } catch (error) {
                console.error("Error fetching user data", error);
            }
        };
        fetchData();
    }, [selectId]);

    const email_Val = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const mobile_Val = /(\+91|91)\s?\-?\d+/;

    useEffect(() => {
        display();
    }, [user])

    async function handleUpdate() {
        try {
                if (email_Val.test(user.mail) && mobile_Val.test(user.mobile)) {
                    const edited = await axios.put(`http://localhost:3000/user-details/${selectId}`, user);
                    updateClose();
                    setUser(edited.data);
                } else {
                    setErr("Enter valid credentials");
                }                
        } catch (error) {
            console.error("Error while updating data", error);
        }
    }

    return (
        <div className='update-dialog'>
            <dialog ref={updateRef}>
                <div className='edit-container'>
                    <div className='edit-heading'>
                        <h1>Edit Your Details</h1>
                        <p style={{color:"red", fontWeight:"700"}}>{err}</p>
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
                                <td>
                                    <select name="department" id="dept" value={user.dept} onChange={(e) => setUser({ ...user, dept: e.target.value })}>
                                        <option value="Choose Your Department">Choose Your Department</option>
                                        <option value="AI&DS">AI&DS</option>
                                        <option value="ECE">ECE</option>
                                        <option value="CSE">CSE</option>
                                    </select>
                                </td>
                                <td><input type="number" required value={user.mobile} onChange={(e) => setUser({ ...user, mobile: e.target.value })} /></td>
                                <td><input type="date" max="2023-12-31" required value={user.dob} onChange={(e) => setUser({ ...user, dob: e.target.value })} /></td>
                                <td>
                                    <select name="gender" id="gen" value={user.gender} onChange={(e) => setUser({ ...user, gender: e.target.value })}>
                                        <option value="Choose Your Gender">Choose Your Gender</option>
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                    </select>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="but">
                    <button onClick={handleUpdate}>Update</button>
                    <button onClick={updateClose}>Close</button>
                </div>
            </dialog>
        </div>
    );
}

export default EditTask;
