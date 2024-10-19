import React from 'react';
import styles from './logout.module.css';

const LogoutModal = ({ toggleLogoutModal }) => {

    const handleClickOutside = (e) => {
        if (e.target.className === styles.modalBackground) {
            toggleLogoutModal();
        }
    };

    return (
        <div className={styles.modalBackground} onClick={handleClickOutside}>
            <div className={styles.modalContent}>
                <p>Are you sure you want to logout?</p>
                <div className={styles.buttonContainer}>
                    <button className={styles.confirmButton}>Yes, Logout</button>
                    <button onClick={toggleLogoutModal} className={styles.cancelButton}>Cancel</button>
                </div>
            </div>
        </div>
    );
};

export default LogoutModal;
