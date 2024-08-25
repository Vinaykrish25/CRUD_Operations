import React, { useContext, useState } from 'react';
import "./Styles/Register.css"
import { } from "react-icons/fa";
import { ThemeContext } from '../Context/ThemeContext';
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";

const Register = () => {
  const { bodycolor, fontcolor } = useContext(ThemeContext);

  const [user, setUser] = useState({
    id: '',
    fullname: '',
    mail: '',
    dob: '',
    mobile: '',
    gender: '',
    dept: '',
    password: ''
  });

  const navigate = useNavigate();

  const [err, setErr] = useState("");

  const email_Val = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
  const password_Val = /^[a-zA-Z0-9!@#$%^&*]{6,16}$/
  const mobile_Val = /(\+91|91)\s?\-?\d+/

//   function validateDOB(dob){
//   let dateObj = new Date(dob);
//   if (!isNaN(dateObj)) {
//     let day = dateObj.getDate();
//     day = day < 10 ? "0" + day : day;
//     let month = dateObj.getMonth() + 1;
//     month = month < 10 ? "0" + month : month;
//     const year = dateObj.getFullYear();
//     const resultDate = `${day}-${month}-${year}`;
//     return dob < resultDate;
//   }
// }
  async function handleRegister() {
    const register_no = await axios.get(`http://localhost:3000/user-details`)
    const existingUser = register_no.data.filter((user_reg) => user_reg.id === user.id)
  
    if (existingUser.length === 0) {
      if ((user.id && user.fullname && user.mail && user.mobile && user.password) !== "") {
        // if (validateDOB(user.dob)){
          if ((email_Val.test(user.mail)) && (password_Val.test(user.password)) && (mobile_Val.test(user.mobile))) {
            const response = await axios.post(`http://localhost:3000/user-details`,
              user)
            navigate("/login");
          }
          else {
            setErr("Enter the credentials correctly")
          }
        // }
        // // else {
        // //   setErr("Your D.O.B is not valid")
        // // }
      }
      else {
        setErr("You must fill all the fields")
      }
    }
    else {
      setErr("Register number exists");
    }
  }

  return (
    <div className="signup-container" style={{ backgroundColor: bodycolor, color: fontcolor }}>
      <p style={{ color: "red", textAlign: "center" }}>{err}</p>
      <h1 id='title'>Register Form</h1>
      <div className="form-group">
        <label>Reg. Number  <span style={{ color: "red" }}>*</span></label>
        <input type='number' required onChange={(e) => setUser({ ...user, id: e.target.value })} value={user.id}/>
      </div>
      <div className="form-group">
        <label>Full Name  <span style={{ color: "red" }}>*</span></label>
        <input type='text' required onChange={(e) => setUser({ ...user, fullname: e.target.value })} value={user.fullname}/>
      </div>
      <div className="form-group">
        <label>Email Address  <span style={{ color: "red" }}>*</span></label>
        <input type='email' required onChange={(e) => setUser({ ...user, mail: e.target.value })} value={user.mail}/>
      </div>
      <div className="form-group">
        <label>Date of Birth  <span style={{ color: "red" }}>*</span></label>
        <input type='date' required onChange={(e) => setUser({ ...user, dob: e.target.value })} max="2023-12-31" value={user.dob}/>
      </div>
      <div className="form-group">
        <label>Phone Number  <span style={{ color: "red" }}>*</span></label>
        <input type='number' required onChange={(e) => setUser({ ...user, mobile: e.target.value })} value={user.mobile}/>
      </div>
      <div className="form-group">
        <label>Gender  <span style={{ color: "red" }}>*</span></label>
        <select name="gender" id="gen" className='gender' onChange={(e) => setUser({ ...user, gender: e.target.value })}>
          <option value="">Choose Your Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
      </div>
      <div className="form-group">
        <label>Department  <span style={{ color: "red" }}>*</span></label>
        <select name="department" id="dept" className='depart' onChange={(e) => setUser({ ...user, dept: e.target.value })}>
        <option value="">Choose Your Department</option>
          <option value="AI&DS">AI&DS</option>
          <option value="CSE">CSE</option>
          <option value="ECE">ECE</option>
        </select>
      </div>
      <div className="form-group">
        <label>Password  <span style={{ color: "red" }}>*</span></label>
        <input type='password' required onChange={(e) => setUser({ ...user, password: e.target.value })} value={user.password}/>
      </div>
      <button id='submit' onClick={() => handleRegister()}>Submit</button>
    </div>
  )
}

export default Register