import React, { useState, useEffect } from "react";

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]);
  const [newUser, setNewUser] = useState({ name: "", role: "" });
  const [editingUser, setEditingUser] = useState(null);

  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
    const storedRoles = JSON.parse(localStorage.getItem("roles")) || [];
    setUsers(storedUsers);
    setRoles(storedRoles);
  }, []);

  const handleAddUser = () => {
    if (!newUser.name || !newUser.role) {
      return alert("All fields are required.");
    }
    const updatedUsers = [...users, { id: Date.now(), ...newUser }];
    setUsers(updatedUsers);
    localStorage.setItem("users", JSON.stringify(updatedUsers));
    setNewUser({ name: "", role: "" });
  };

  const handleDeleteUser = (id) => {
    const updatedUsers = users.filter((user) => user.id !== id);
    setUsers(updatedUsers);
    localStorage.setItem("users", JSON.stringify(updatedUsers));
  };

  const handleEditUser = (user) => {
    setEditingUser(user);
  };

  const handleSaveEdit = () => {
    if (!editingUser.name || !editingUser.role) {
      return alert("All fields are required.");
    }
    const updatedUsers = users.map((user) =>
      user.id === editingUser.id ? editingUser : user
    );
    setUsers(updatedUsers);
    localStorage.setItem("users", JSON.stringify(updatedUsers));
    setEditingUser(null);
  };

  return (
    <div>
      <h2>User Management</h2>

      {/* Add User Form */}
      {!editingUser && (
        <div className="user-form">
          <input
            type="text"
            placeholder="User Name"
            value={newUser.name}
            onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
          />
          <select
            value={newUser.role}
            onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
          >
            <option value="">Select Role</option>
            {roles.map((role) => (
              <option key={role.id} value={role.name}>
                {role.name}
              </option>
            ))}
          </select>
          <button onClick={handleAddUser}>Add User</button>
        </div>
      )}

      {/* Edit User Form */}
      {editingUser && (
        <div className="user-form">
          <input
            type="text"
            placeholder="User Name"
            value={editingUser.name}
            onChange={(e) =>
              setEditingUser({ ...editingUser, name: e.target.value })
            }
          />
          <select
            value={editingUser.role}
            onChange={(e) =>
              setEditingUser({ ...editingUser, role: e.target.value })
            }
          >
            <option value="">Select Role</option>
            {roles.map((role) => (
              <option key={role.id} value={role.name}>
                {role.name}
              </option>
            ))}
          </select>
          <button onClick={handleSaveEdit}>Save</button>
          <button onClick={() => setEditingUser(null)}>Cancel</button>
        </div>
      )}

      {/* User List */}
      <ul className="user-list">
        {users.map((user) => (
          <li key={user.id}>
            {user.name} - {user.role}
            <button onClick={() => handleEditUser(user)}>Edit</button>
            <button onClick={() => handleDeleteUser(user.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserManagement;
