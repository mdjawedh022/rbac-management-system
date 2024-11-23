import React, { useState, useEffect } from "react";

const RoleManagement = () => {
  const [roles, setRoles] = useState([]);
  const [permissions,setPermissions ] = useState(["Read", "Write", "Delete"]);
  const [newRole, setNewRole] = useState({ name: "", permissions: [] });
  const [editingRole, setEditingRole] = useState(null);

  useEffect(() => {
    const storedRoles = JSON.parse(localStorage.getItem("roles")) || [];
    setRoles(storedRoles);
  }, []);

  const handleAddRole = () => {
    if (!newRole.name || newRole.permissions.length === 0) {
      return alert("Role name and at least one permission are required.");
    }
    const updatedRoles = [...roles, { id: Date.now(), ...newRole }];
    setRoles(updatedRoles);
    localStorage.setItem("roles", JSON.stringify(updatedRoles));
    setNewRole({ name: "", permissions: [] });
  };

  const handleEditRole = (role) => {
    setEditingRole(role);
  };

  const handleSaveEdit = () => {
    if (!editingRole.name || editingRole.permissions.length === 0) {
      return alert("Role name and at least one permission are required.");
    }
    const updatedRoles = roles.map((role) =>
      role.id === editingRole.id ? editingRole : role
    );
    setRoles(updatedRoles);
    localStorage.setItem("roles", JSON.stringify(updatedRoles));
    setEditingRole(null);
  };

  const handleDeleteRole = (id) => {
    const updatedRoles = roles.filter((role) => role.id !== id);
    setRoles(updatedRoles);
    localStorage.setItem("roles", JSON.stringify(updatedRoles));
  };

  const togglePermission = (permission, isEditing = false) => {
    const role = isEditing ? editingRole : newRole;
    const updatedPermissions = role.permissions.includes(permission)
      ? role.permissions.filter((perm) => perm !== permission)
      : [...role.permissions, permission];
    if (isEditing) {
      setEditingRole({ ...editingRole, permissions: updatedPermissions });
    } else {
      setNewRole({ ...newRole, permissions: updatedPermissions });
    }
  };

  return (
    <div>
      <h2>Role Management</h2>

      {/* Add Role Form */}
      {!editingRole && (
        <div className="role-form">
          <input
            type="text"
            placeholder="Role Name"
            value={newRole.name}
            onChange={(e) => setNewRole({ ...newRole, name: e.target.value })}
          />
          <div className="permissions">
            <label>Permissions:</label>
            {permissions.map((permission) => (
              <div key={permission}>
                <input
                  type="checkbox"
                  checked={newRole.permissions.includes(permission)}
                  onChange={() => togglePermission(permission)}
                />
                {permission}
              </div>
            ))}
          </div>
          <button onClick={handleAddRole}>Add Role</button>
        </div>
      )}

      {/* Edit Role Form */}
      {editingRole && (
        <div className="role-form">
          <input
            type="text"
            placeholder="Role Name"
            value={editingRole.name}
            onChange={(e) =>
              setEditingRole({ ...editingRole, name: e.target.value })
            }
          />
          <div className="permissions">
            <label>Permissions:</label>
            {permissions.map((permission) => (
              <div key={permission}>
                <input
                  type="checkbox"
                  checked={editingRole.permissions.includes(permission)}
                  onChange={() => togglePermission(permission, true)}
                />
                {permission}
              </div>
            ))}
          </div>
          <button onClick={handleSaveEdit}>Save</button>
          <button onClick={() => setEditingRole(null)}>Cancel</button>
        </div>
      )}

      {/* Role List */}
      <ul className="role-list">
        {roles.map((role) => (
          <li key={role.id}>
            <strong>{role.name}</strong> - Permissions:{" "}
            {role.permissions.join(", ")}
            <button onClick={() => handleEditRole(role)}>Edit</button>
            <button onClick={() => handleDeleteRole(role.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RoleManagement;
