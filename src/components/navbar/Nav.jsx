import React, { useState, useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
import logo from '../../assets/AppLogo.png';
import styles from './nav.module.css';
import AuthContext from '../../context/AuthContext';
import ConfirmationModal from '../../modal/ConfirmationModal';
import { Database, LogOut, PanelsTopLeft, Settings } from 'lucide-react';

export default function Nav() {

  const [isLogoutModalOpen, setLogoutModalOpen] = useState(false); 

  const toggleLogoutModal = () => {
    setLogoutModalOpen(!isLogoutModalOpen);
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.logo}>
          <div className={styles.image}>
            <img src={logo} alt="Pro Manage" />
          </div>
          <h4 className={styles.logoText}>
            Pro Manage
          </h4>
        </div>

        <nav className={styles.links}>
          <NavLink
            to="/dashboard/board"
            className={({ isActive }) => (isActive ? styles.active : '')}
            style={{textDecoration: 'none'}}
          >
            <div className={styles.icon}>
              <PanelsTopLeft size={14} color="black" />
            </div>
            <span className={styles.NavText}>Board</span>
          </NavLink>

          <NavLink
            to={'/dashboard/analytics'}
            className={({ isActive }) => (isActive ? styles.active : '')}
            style={{textDecoration: 'none'}}
          >
            <div className={styles.icon}>
              <Database size={14} color="black" />
            </div>
            <span className={styles.NavText}>Analytics</span>
          </NavLink>

          <NavLink
            to={'/dashboard/settings'}
            className={({ isActive }) => (isActive ? styles.active : '')}
            style={{textDecoration: 'none'}}
          >
            <div className={styles.icon}>
              <Settings size={14} color="black" />
            </div>
            <span className={styles.NavText}>Settings</span>
          </NavLink>
        </nav>

        <div onClick={toggleLogoutModal} className={styles.logout}>
          <div className={styles.icon}>
            <LogOut size={14} />
          </div>
          <span>Logout</span>
        </div>
      </div>

      {isLogoutModalOpen && (
        <ConfirmationModal toggleModal={toggleLogoutModal} actionType="logout" /> 
      )}
    </>
  );
}
