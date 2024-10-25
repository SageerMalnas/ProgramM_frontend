import React, { useState, useContext } from 'react';
import { FaDatabase, FaSignOutAlt, FaThLarge, FaCog } from 'react-icons/fa';
import { Link, NavLink } from 'react-router-dom';
import logo from '../../assets/AppLogo.png';
import styles from './nav.module.css';
import AuthContext from '../../context/AuthContext';
import ConfirmationModal from '../../modal/ConfirmationModal';

export default function Nav() {

  const [isLogoutModalOpen, setLogoutModalOpen] = useState(false); 

  const toggleLogoutModal = () => {
    setLogoutModalOpen(!isLogoutModalOpen);
  };

  return (
    <>
      <div className={styles.container}>
        {/* Logo Section */}
        <div className={styles.logo}>
          <div className={styles.image}>
            <img src={logo} alt="Pro Manage" />
          </div>
          <h4 className={styles.logoText}>
            Pro Manage
          </h4>
        </div>

        {/* Navigation Links */}
        <nav className={styles.links}>
          <NavLink
            to="/dashboard/board"
            className={({ isActive }) => (isActive ? styles.active : '')}
            style={{textDecoration: 'none'}}
          >
            <div className={styles.icon}>
              <FaThLarge color="#767575" />
            </div>
            <span className={styles.NavText}>Board</span>
          </NavLink>

          <NavLink
            to={'/dashboard/analytics'}
            className={({ isActive }) => (isActive ? styles.active : '')}
            style={{textDecoration: 'none'}}
          >
            <div className={styles.icon}>
              <FaDatabase color="#767575" />
            </div>
            <span className={styles.NavText}>Analytics</span>
          </NavLink>

          <NavLink
            to={'/dashboard/settings'}
            className={({ isActive }) => (isActive ? styles.active : '')}
            style={{textDecoration: 'none'}}
          >
            <div className={styles.icon}>
              <FaCog color="#767575" />
            </div>
            <span className={styles.NavText}>Settings</span>
          </NavLink>
        </nav>

        {/* Logout Button */}
        <div onClick={toggleLogoutModal} className={styles.logout}>
          <div className={styles.icon}>
            <FaSignOutAlt />
          </div>
          <span>Logout</span>
        </div>
      </div>

      {/* Logout Modal */}
      {isLogoutModalOpen && (
        <ConfirmationModal toggleModal={toggleLogoutModal} actionType="logout" /> 
      )}
    </>
  );
}
