import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

const UserList = ({ onEdit, onAdd }) => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get('https://jsonplaceholder.typicode.com/users')
      .then((response) => setUsers(response.data))
      .catch((err) => setError('Failed to fetch users. Please try again.'));
  }, []);

  const deleteUser = (id) => {
    axios
      .delete(`https://jsonplaceholder.typicode.com/users/${id}`)
      .then(() => setUsers(users.filter((user) => user.id !== id)))
      .catch(() => setError('Failed to delete user. Please try again.'));
  };

  return (
    <div>
      <h2>User List</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <button onClick={onAdd}>Add User</button>
      <ul>


        {users.map((user) => (
          <li key={user.id}>

            <div className="head-container">
              <p className="id"> {`${user.id} `} </p>
              <p className="mail"> {`${user.email} `} </p>
              <p className="name"> {`${user.company.name}`} </p>
            </div>

            <div className="btn-container">
              <button onClick={() => onEdit(user)}>Edit</button>
              <button onClick={() => deleteUser(user.id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
