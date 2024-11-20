import React, { useState, useEffect } from 'react';
import UserList from './components/UserList';
import UserForm from './components/UserForm';
import axios from 'axios';

const App = () => {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    axios
      .get('https://jsonplaceholder.typicode.com/users')
      .then((response) => setUsers(response.data))
      .catch(() => alert('Failed to fetch users'));
  }, []);

  const handleAdd = () => {
    setEditingUser(null);
    setShowForm(true);
  };

  const handleEdit = (user) => {
    setEditingUser(user);
    setShowForm(true);
  };

  const handleSave = () => {
    setShowForm(false);
  };

  const addUserToState = (newUser) => {
    setUsers((prevUsers) => [...prevUsers, newUser]);
  };

  return (
    <div>
      {showForm ? (
        <UserForm
          initialData={editingUser}
          onSave={handleSave}
          addUserToState={addUserToState}
        />
      ) : (
        <UserList
          users={users}
          onEdit={handleEdit}
          onAdd={handleAdd}
          setUsers={setUsers}
        />
      )}
    </div>
  );
};

export default App;
