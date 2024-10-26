import React, { useState } from 'react';
import styles from './modal.module.css';

export default function Modal({ onClose, onAddUser }) {
    const [email, setEmail] = useState('');
    const [statusMessage, setStatusMessage] = useState('');
    const [isSuccessful, setIsSuccessful] = useState(null);

    const handleAddUser = async () => {
        try {
            const response = await onAddUser(email);
            setStatusMessage(response.message);
            setIsSuccessful(response.status === 'success');
        } catch (error) {
            setStatusMessage(error.message || 'An error occurred.');
            setIsSuccessful(false);
        }
    };

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modal}>
                {isSuccessful === null ? (
                    <>
                        <h3>Add People to the board</h3>

                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="  Enter the email"
                        />
                        <div className={styles.buttons}>
                            {statusMessage && <p className={isSuccessful === false ? styles.error : styles.success}>{statusMessage}</p>}
                            <button onClick={onClose} className={styles.cancel}>Cancel</button>
                            <button onClick={handleAddUser} className={styles.add}>Add Email</button>
                        </div>
                    </>
                ) : (
                    <>
                        <div className={styles.after}>
                            <h3>{statusMessage}</h3>
                            <button onClick={onClose} className={styles.ok}>Okay, got it !</button>
                        </div>

                    </>
                )}
            </div>
        </div>
    );
}
