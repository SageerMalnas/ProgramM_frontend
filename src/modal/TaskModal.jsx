import React, { useState } from 'react';
import styles from './TaskModal.module.css';

const TaskModal = ({ onClose, onSubmit }) => {
  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState('high');
  const [checklist, setChecklist] = useState([]);

  const handleSubmit = () => {
    const taskData = {
      title,
      priority,
      checklists: checklist,
    };
    onSubmit(taskData);
  };

  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <div className={styles.modalHeader}>
          <h3>Add Task</h3>
          <button className={styles.closeButton} onClick={onClose}>
            &times;
          </button>
        </div>
        <div className={styles.modalBody}>
          <label htmlFor="title" className={styles.label}>
            Title *
          </label>
          <input
            type="text"
            id="title"
            className={styles.input}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />

          <label htmlFor="priority" className={styles.label}>
            Select Priority *
          </label>
          <select
            id="priority"
            className={styles.select}
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            required
          >
            <option value="high">High Priority</option>
            <option value="moderate">Moderate Priority</option>
            <option value="low">Low Priority</option>
          </select>

          {/* Add more form fields for checklists */}

          <div className={styles.modalFooter}>
            <button className={styles.cancelButton} onClick={onClose}>
              Cancel
            </button>
            <button className={styles.saveButton} onClick={handleSubmit}>
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskModal;