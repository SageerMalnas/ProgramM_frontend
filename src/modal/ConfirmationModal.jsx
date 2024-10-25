import React, { useContext } from 'react';
import styles from './confirmModal.module.css';
import AuthContext from '../context/AuthContext';
import { TaskContext } from '../context/TaskContext';


const ConfirmationModal = ({ toggleModal, actionType, taskId }) => {
    const { logout } = useContext(AuthContext);
    const { deleteTask } = useContext(TaskContext);

    const handleClickOutside = (e) => {
        if (e.target.className === styles.modalBackground) {
            toggleLogoutModal();
        }
    };

    // function handleSubmit(){
    //     logout()
    // };
    const handleSubmit = () => {
        if (actionType === 'logout') {
            logout();
        } else if (actionType === 'deleteTask' && taskId) {
            deleteTask(taskId);
        }
        toggleModal();
    };

    return (
        <div className={styles.modalBackground} onClick={handleClickOutside}>
            <div className={styles.modalContent}>
                <p>
                    {actionType === 'logout'
                        ? 'Are you sure you want to logout?'
                        : 'Are you sure you want to delete this task?'}
                </p>

                <div className={styles.buttonContainer}>
                    <button className={styles.confirmButton} onClick={handleSubmit}>
                        {actionType === 'logout' ? 'Yes, Logout' : 'Yes, Delete'}
                    </button>
                    <button onClick={toggleModal} className={styles.cancelButton}>
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmationModal;
