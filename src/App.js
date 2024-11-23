import React, { useState} from "react";
import UserManagement from "./components/UserManagement";
import RoleManagement from "./components/RoleManagement";
import "./App.css";

const App = () => {
  const [activeTab, setActiveTab] = useState("users");

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>RBAC Management System</h1>
        <div className="nav-tabs">
          <button
            className={activeTab === "users" ? "active" : ""}
            onClick={() => setActiveTab("users")}
          >
            User Management
          </button>
          <button
            className={activeTab === "roles" ? "active" : ""}
            onClick={() => setActiveTab("roles")}
          >
            Role Management
          </button>
        </div>
      </header>
      <main>
        {activeTab === "users" && <UserManagement />}
        {activeTab === "roles" && <RoleManagement />}
      </main>
    </div>
  );
};

export default App;
