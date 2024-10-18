import React, { useContext } from "react";
import AuthContext from "../../../context/AuthContext";
import styles from './dashboard.module.css'; 


const Dashboard = () => {
    const { user, logout } = useContext(AuthContext);

    return (
        <div>
            <h2>Dashboard</h2>
            <p>Welcome, {user?.name || "User"}</p>
            <button onClick={logout}>Logout</button>
        </div>
    );
};

export default Dashboard;
