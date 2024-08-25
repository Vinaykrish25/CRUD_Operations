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

  // Fetches initial data
  useEffect(() => {
    showDetails();
  }, []);

  //Opens Delete Confirmation
  const deleteTask = (id) => {
    setSelectId(id);
    deleteModalRef.current.showModal();
  };

  // Opens update modal window
  const updateTask = (item) => {
    setSelectId(item.id);
    updateModalRef.current.showModal();
  };

  // Closes the update modal window
  const closeUpdateModal = () => {
    updateModalRef.current.close();
  };

  // Deletes the selected task from the JSON file
  const confirmDelete = async () => {
    try {
      await axios.delete(`http://localhost:3000/user-details/${selectId}`);
      setTasks(tasks.filter((info) => info.id !== selectId));
      if (deleteModalRef.current) {
        deleteModalRef.current.close();
      }
    } catch (error) {
      console.error('Error while deleting...', error);
    }
  };

  // Fetches and displays data in the table
  const showDetails = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/user-details`);
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching data...', error);
    }
  };

  return (
    <div id='total-container' style={{ backgroundColor: bodycolor }}>
    <div className='task-table-container'>
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
            <th colSpan={2}>Actions</th>
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
                <button id='edit-button' style={{ color: fontcolor }} onClick={() => updateTask(item)}>
                  <FaEdit />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <ConfirmDelete deleteRef={deleteModalRef} deleteClose={confirmDelete} />
      <EditTask updateRef={updateModalRef} updateClose={closeUpdateModal} display={showDetails} selectId={selectId} />
    </div>
    </div>
  );
};

export default TaskManager;
