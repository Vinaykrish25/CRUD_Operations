import React, { useContext, useEffect, useRef, useState } from 'react';
import axios from 'axios';
import './Styles/TaskManager.css';
import { MdDelete } from 'react-icons/md';
import { FaEdit } from 'react-icons/fa';
import { ThemeContext } from '../Context/ThemeContext';
import ConfirmDelete from './ConfirmDelete';
import EditTask from './EditTask';

const TaskManager = () => {
  const { bodycolor, fontcolor } = useContext(ThemeContext);

  const [tasks, setTasks] = useState([]);
  const [selectId, setSelectId] = useState(null);

  const deleteModalRef = useRef();
  const updateModalRef = useRef();

  //Opens Delete Confirmation
  function deleteTask(id) {
    setSelectId(id);
    deleteModalRef.current.showModal();
  }

  //open update modalwindow
  function updateTask(id) {
    setSelectId(id)
    updateModalRef.current.showModal();
  }

  //close taskUpdation
  function closeUpdation(){
    updateModalRef.current.close();
  }

  //deletes from json file
  async function confirmDelete() {
    try {
      await axios.delete(`http://localhost:3000/user-details/${selectId}`);
      setTasks(tasks.filter((info) => info.id !== selectId));
      if (deleteModalRef.current) {
        deleteModalRef.current.close();
      }
    } catch (error) {
      console.error('Error while deleting...', error);
    }
  }

  useEffect(() => {
    showDetails();
  }, [tasks]);

  //shows data in the table
  async function showDetails() {
    const response = await axios.get(`http://localhost:3000/user-details`);
    setTasks(response.data);
  }

  return (
    <div className='task-table-container' style={{ backgroundColor: bodycolor }}>
      <table style={{ width: '100%' }}>
        <thead>
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
        <tbody>
          {tasks.map((item) => (
            <tr key={item.id} style={{ color: fontcolor }}>
              <td>{item.id}</td>
              <td>{item.fullname}</td>
              <td>{item.mail}</td>
              <td>{item.dept}</td>
              <td>{item.mobile}</td>
              <td>{item.dob}</td>
              <td>{item.gender}</td>
              <td id='delete'>
                <button id='delete-button' style={{ color: fontcolor }} onClick={() => deleteTask(item.id)}>
                  <MdDelete />
                </button>
              </td>
              <td id='edit'>
                <button id='edit-button' style={{ color: fontcolor }} onClick={() => updateTask(item.id)}>
                  <FaEdit />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <ConfirmDelete deleteRef={deleteModalRef} deleteClose={confirmDelete} />
      <EditTask updateRef={updateModalRef} updateClose={closeUpdation} display={showDetails} showId={selectId}/>
    </div>
  );
};

export default TaskManager;
