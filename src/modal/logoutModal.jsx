import React, { useContext } from 'react';
import styles from './logout.module.css';
import AuthContext from '../context/AuthContext';

const LogoutModal = ({ toggleLogoutModal }) => {
    const { logout } = useContext(AuthContext); 
    const handleClickOutside = (e) => {
        if (e.target.className === styles.modalBackground) {
            toggleLogoutModal();
        }
    };

    function handleSubmit(){
        logout()
    };

    return (
        <div className={styles.modalBackground} onClick={handleClickOutside}>
            <div className={styles.modalContent}>
                <p>Are you sure you want to logout?</p>
                <div className={styles.buttonContainer}>
                    <button className={styles.confirmButton} onClick={handleSubmit}>Yes, Logout</button>
                    <button onClick={toggleLogoutModal} className={styles.cancelButton}>Cancel</button>
                </div>
            </div>
        </div>
    );
};

export default LogoutModal;
